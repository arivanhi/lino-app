
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model TahunAjaran
 * 
 */
export type TahunAjaran = $Result.DefaultSelection<Prisma.$TahunAjaranPayload>
/**
 * Model Kelas
 * 
 */
export type Kelas = $Result.DefaultSelection<Prisma.$KelasPayload>
/**
 * Model Guru
 * 
 */
export type Guru = $Result.DefaultSelection<Prisma.$GuruPayload>
/**
 * Model KelasWali
 * 
 */
export type KelasWali = $Result.DefaultSelection<Prisma.$KelasWaliPayload>
/**
 * Model Siswa
 * 
 */
export type Siswa = $Result.DefaultSelection<Prisma.$SiswaPayload>
/**
 * Model RiwayatKelasSiswa
 * 
 */
export type RiwayatKelasSiswa = $Result.DefaultSelection<Prisma.$RiwayatKelasSiswaPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN_TU: 'ADMIN_TU',
  WAKA: 'WAKA',
  KEPSEK: 'KEPSEK',
  WALI_KELAS: 'WALI_KELAS',
  GURU: 'GURU',
  SISWA: 'SISWA'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tahunAjaran`: Exposes CRUD operations for the **TahunAjaran** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TahunAjarans
    * const tahunAjarans = await prisma.tahunAjaran.findMany()
    * ```
    */
  get tahunAjaran(): Prisma.TahunAjaranDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kelas`: Exposes CRUD operations for the **Kelas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Kelas
    * const kelas = await prisma.kelas.findMany()
    * ```
    */
  get kelas(): Prisma.KelasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guru`: Exposes CRUD operations for the **Guru** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Gurus
    * const gurus = await prisma.guru.findMany()
    * ```
    */
  get guru(): Prisma.GuruDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.kelasWali`: Exposes CRUD operations for the **KelasWali** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KelasWalis
    * const kelasWalis = await prisma.kelasWali.findMany()
    * ```
    */
  get kelasWali(): Prisma.KelasWaliDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.siswa`: Exposes CRUD operations for the **Siswa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Siswas
    * const siswas = await prisma.siswa.findMany()
    * ```
    */
  get siswa(): Prisma.SiswaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.riwayatKelasSiswa`: Exposes CRUD operations for the **RiwayatKelasSiswa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RiwayatKelasSiswas
    * const riwayatKelasSiswas = await prisma.riwayatKelasSiswa.findMany()
    * ```
    */
  get riwayatKelasSiswa(): Prisma.RiwayatKelasSiswaDelegate<ExtArgs, ClientOptions>;
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
    User: 'User',
    TahunAjaran: 'TahunAjaran',
    Kelas: 'Kelas',
    Guru: 'Guru',
    KelasWali: 'KelasWali',
    Siswa: 'Siswa',
    RiwayatKelasSiswa: 'RiwayatKelasSiswa'
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
      modelProps: "user" | "tahunAjaran" | "kelas" | "guru" | "kelasWali" | "siswa" | "riwayatKelasSiswa"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      TahunAjaran: {
        payload: Prisma.$TahunAjaranPayload<ExtArgs>
        fields: Prisma.TahunAjaranFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TahunAjaranFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahunAjaranPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TahunAjaranFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahunAjaranPayload>
          }
          findFirst: {
            args: Prisma.TahunAjaranFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahunAjaranPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TahunAjaranFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahunAjaranPayload>
          }
          findMany: {
            args: Prisma.TahunAjaranFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahunAjaranPayload>[]
          }
          create: {
            args: Prisma.TahunAjaranCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahunAjaranPayload>
          }
          createMany: {
            args: Prisma.TahunAjaranCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TahunAjaranDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahunAjaranPayload>
          }
          update: {
            args: Prisma.TahunAjaranUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahunAjaranPayload>
          }
          deleteMany: {
            args: Prisma.TahunAjaranDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TahunAjaranUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TahunAjaranUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TahunAjaranPayload>
          }
          aggregate: {
            args: Prisma.TahunAjaranAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTahunAjaran>
          }
          groupBy: {
            args: Prisma.TahunAjaranGroupByArgs<ExtArgs>
            result: $Utils.Optional<TahunAjaranGroupByOutputType>[]
          }
          count: {
            args: Prisma.TahunAjaranCountArgs<ExtArgs>
            result: $Utils.Optional<TahunAjaranCountAggregateOutputType> | number
          }
        }
      }
      Kelas: {
        payload: Prisma.$KelasPayload<ExtArgs>
        fields: Prisma.KelasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KelasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KelasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>
          }
          findFirst: {
            args: Prisma.KelasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KelasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>
          }
          findMany: {
            args: Prisma.KelasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>[]
          }
          create: {
            args: Prisma.KelasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>
          }
          createMany: {
            args: Prisma.KelasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.KelasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>
          }
          update: {
            args: Prisma.KelasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>
          }
          deleteMany: {
            args: Prisma.KelasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KelasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.KelasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>
          }
          aggregate: {
            args: Prisma.KelasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKelas>
          }
          groupBy: {
            args: Prisma.KelasGroupByArgs<ExtArgs>
            result: $Utils.Optional<KelasGroupByOutputType>[]
          }
          count: {
            args: Prisma.KelasCountArgs<ExtArgs>
            result: $Utils.Optional<KelasCountAggregateOutputType> | number
          }
        }
      }
      Guru: {
        payload: Prisma.$GuruPayload<ExtArgs>
        fields: Prisma.GuruFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuruFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuruPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuruFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuruPayload>
          }
          findFirst: {
            args: Prisma.GuruFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuruPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuruFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuruPayload>
          }
          findMany: {
            args: Prisma.GuruFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuruPayload>[]
          }
          create: {
            args: Prisma.GuruCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuruPayload>
          }
          createMany: {
            args: Prisma.GuruCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.GuruDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuruPayload>
          }
          update: {
            args: Prisma.GuruUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuruPayload>
          }
          deleteMany: {
            args: Prisma.GuruDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuruUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GuruUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuruPayload>
          }
          aggregate: {
            args: Prisma.GuruAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuru>
          }
          groupBy: {
            args: Prisma.GuruGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuruGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuruCountArgs<ExtArgs>
            result: $Utils.Optional<GuruCountAggregateOutputType> | number
          }
        }
      }
      KelasWali: {
        payload: Prisma.$KelasWaliPayload<ExtArgs>
        fields: Prisma.KelasWaliFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KelasWaliFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasWaliPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KelasWaliFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasWaliPayload>
          }
          findFirst: {
            args: Prisma.KelasWaliFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasWaliPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KelasWaliFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasWaliPayload>
          }
          findMany: {
            args: Prisma.KelasWaliFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasWaliPayload>[]
          }
          create: {
            args: Prisma.KelasWaliCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasWaliPayload>
          }
          createMany: {
            args: Prisma.KelasWaliCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.KelasWaliDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasWaliPayload>
          }
          update: {
            args: Prisma.KelasWaliUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasWaliPayload>
          }
          deleteMany: {
            args: Prisma.KelasWaliDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KelasWaliUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.KelasWaliUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasWaliPayload>
          }
          aggregate: {
            args: Prisma.KelasWaliAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKelasWali>
          }
          groupBy: {
            args: Prisma.KelasWaliGroupByArgs<ExtArgs>
            result: $Utils.Optional<KelasWaliGroupByOutputType>[]
          }
          count: {
            args: Prisma.KelasWaliCountArgs<ExtArgs>
            result: $Utils.Optional<KelasWaliCountAggregateOutputType> | number
          }
        }
      }
      Siswa: {
        payload: Prisma.$SiswaPayload<ExtArgs>
        fields: Prisma.SiswaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiswaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiswaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          findFirst: {
            args: Prisma.SiswaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiswaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          findMany: {
            args: Prisma.SiswaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>[]
          }
          create: {
            args: Prisma.SiswaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          createMany: {
            args: Prisma.SiswaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SiswaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          update: {
            args: Prisma.SiswaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          deleteMany: {
            args: Prisma.SiswaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiswaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SiswaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          aggregate: {
            args: Prisma.SiswaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiswa>
          }
          groupBy: {
            args: Prisma.SiswaGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiswaGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiswaCountArgs<ExtArgs>
            result: $Utils.Optional<SiswaCountAggregateOutputType> | number
          }
        }
      }
      RiwayatKelasSiswa: {
        payload: Prisma.$RiwayatKelasSiswaPayload<ExtArgs>
        fields: Prisma.RiwayatKelasSiswaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RiwayatKelasSiswaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiwayatKelasSiswaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RiwayatKelasSiswaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiwayatKelasSiswaPayload>
          }
          findFirst: {
            args: Prisma.RiwayatKelasSiswaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiwayatKelasSiswaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RiwayatKelasSiswaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiwayatKelasSiswaPayload>
          }
          findMany: {
            args: Prisma.RiwayatKelasSiswaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiwayatKelasSiswaPayload>[]
          }
          create: {
            args: Prisma.RiwayatKelasSiswaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiwayatKelasSiswaPayload>
          }
          createMany: {
            args: Prisma.RiwayatKelasSiswaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.RiwayatKelasSiswaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiwayatKelasSiswaPayload>
          }
          update: {
            args: Prisma.RiwayatKelasSiswaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiwayatKelasSiswaPayload>
          }
          deleteMany: {
            args: Prisma.RiwayatKelasSiswaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RiwayatKelasSiswaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RiwayatKelasSiswaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RiwayatKelasSiswaPayload>
          }
          aggregate: {
            args: Prisma.RiwayatKelasSiswaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRiwayatKelasSiswa>
          }
          groupBy: {
            args: Prisma.RiwayatKelasSiswaGroupByArgs<ExtArgs>
            result: $Utils.Optional<RiwayatKelasSiswaGroupByOutputType>[]
          }
          count: {
            args: Prisma.RiwayatKelasSiswaCountArgs<ExtArgs>
            result: $Utils.Optional<RiwayatKelasSiswaCountAggregateOutputType> | number
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
    user?: UserOmit
    tahunAjaran?: TahunAjaranOmit
    kelas?: KelasOmit
    guru?: GuruOmit
    kelasWali?: KelasWaliOmit
    siswa?: SiswaOmit
    riwayatKelasSiswa?: RiwayatKelasSiswaOmit
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
   * Count Type TahunAjaranCountOutputType
   */

  export type TahunAjaranCountOutputType = {
    riwayatSiswa: number
  }

  export type TahunAjaranCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riwayatSiswa?: boolean | TahunAjaranCountOutputTypeCountRiwayatSiswaArgs
  }

  // Custom InputTypes
  /**
   * TahunAjaranCountOutputType without action
   */
  export type TahunAjaranCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TahunAjaranCountOutputType
     */
    select?: TahunAjaranCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TahunAjaranCountOutputType without action
   */
  export type TahunAjaranCountOutputTypeCountRiwayatSiswaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiwayatKelasSiswaWhereInput
  }


  /**
   * Count Type KelasCountOutputType
   */

  export type KelasCountOutputType = {
    riwayatSiswa: number
    waliKelas: number
  }

  export type KelasCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riwayatSiswa?: boolean | KelasCountOutputTypeCountRiwayatSiswaArgs
    waliKelas?: boolean | KelasCountOutputTypeCountWaliKelasArgs
  }

  // Custom InputTypes
  /**
   * KelasCountOutputType without action
   */
  export type KelasCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasCountOutputType
     */
    select?: KelasCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KelasCountOutputType without action
   */
  export type KelasCountOutputTypeCountRiwayatSiswaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiwayatKelasSiswaWhereInput
  }

  /**
   * KelasCountOutputType without action
   */
  export type KelasCountOutputTypeCountWaliKelasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KelasWaliWhereInput
  }


  /**
   * Count Type GuruCountOutputType
   */

  export type GuruCountOutputType = {
    waliKelasDi: number
  }

  export type GuruCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    waliKelasDi?: boolean | GuruCountOutputTypeCountWaliKelasDiArgs
  }

  // Custom InputTypes
  /**
   * GuruCountOutputType without action
   */
  export type GuruCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuruCountOutputType
     */
    select?: GuruCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GuruCountOutputType without action
   */
  export type GuruCountOutputTypeCountWaliKelasDiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KelasWaliWhereInput
  }


  /**
   * Count Type SiswaCountOutputType
   */

  export type SiswaCountOutputType = {
    riwayatKelas: number
  }

  export type SiswaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riwayatKelas?: boolean | SiswaCountOutputTypeCountRiwayatKelasArgs
  }

  // Custom InputTypes
  /**
   * SiswaCountOutputType without action
   */
  export type SiswaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiswaCountOutputType
     */
    select?: SiswaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SiswaCountOutputType without action
   */
  export type SiswaCountOutputTypeCountRiwayatKelasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiwayatKelasSiswaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    nama: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password: string | null
    nama: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    password: number
    nama: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    password?: true
    nama?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    password?: true
    nama?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    password?: true
    nama?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    password: string
    nama: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password?: boolean
    nama?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    guru?: boolean | User$guruArgs<ExtArgs>
    siswa?: boolean | User$siswaArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    password?: boolean
    nama?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "password" | "nama" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guru?: boolean | User$guruArgs<ExtArgs>
    siswa?: boolean | User$siswaArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      guru: Prisma.$GuruPayload<ExtArgs> | null
      siswa: Prisma.$SiswaPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password: string
      nama: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    guru<T extends User$guruArgs<ExtArgs> = {}>(args?: Subset<T, User$guruArgs<ExtArgs>>): Prisma__GuruClient<$Result.GetResult<Prisma.$GuruPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    siswa<T extends User$siswaArgs<ExtArgs> = {}>(args?: Subset<T, User$siswaArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly nama: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.guru
   */
  export type User$guruArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guru
     */
    select?: GuruSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guru
     */
    omit?: GuruOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuruInclude<ExtArgs> | null
    where?: GuruWhereInput
  }

  /**
   * User.siswa
   */
  export type User$siswaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    where?: SiswaWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model TahunAjaran
   */

  export type AggregateTahunAjaran = {
    _count: TahunAjaranCountAggregateOutputType | null
    _min: TahunAjaranMinAggregateOutputType | null
    _max: TahunAjaranMaxAggregateOutputType | null
  }

  export type TahunAjaranMinAggregateOutputType = {
    id: string | null
    nama: string | null
    isActive: boolean | null
  }

  export type TahunAjaranMaxAggregateOutputType = {
    id: string | null
    nama: string | null
    isActive: boolean | null
  }

  export type TahunAjaranCountAggregateOutputType = {
    id: number
    nama: number
    isActive: number
    _all: number
  }


  export type TahunAjaranMinAggregateInputType = {
    id?: true
    nama?: true
    isActive?: true
  }

  export type TahunAjaranMaxAggregateInputType = {
    id?: true
    nama?: true
    isActive?: true
  }

  export type TahunAjaranCountAggregateInputType = {
    id?: true
    nama?: true
    isActive?: true
    _all?: true
  }

  export type TahunAjaranAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TahunAjaran to aggregate.
     */
    where?: TahunAjaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TahunAjarans to fetch.
     */
    orderBy?: TahunAjaranOrderByWithRelationInput | TahunAjaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TahunAjaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TahunAjarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TahunAjarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TahunAjarans
    **/
    _count?: true | TahunAjaranCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TahunAjaranMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TahunAjaranMaxAggregateInputType
  }

  export type GetTahunAjaranAggregateType<T extends TahunAjaranAggregateArgs> = {
        [P in keyof T & keyof AggregateTahunAjaran]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTahunAjaran[P]>
      : GetScalarType<T[P], AggregateTahunAjaran[P]>
  }




  export type TahunAjaranGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TahunAjaranWhereInput
    orderBy?: TahunAjaranOrderByWithAggregationInput | TahunAjaranOrderByWithAggregationInput[]
    by: TahunAjaranScalarFieldEnum[] | TahunAjaranScalarFieldEnum
    having?: TahunAjaranScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TahunAjaranCountAggregateInputType | true
    _min?: TahunAjaranMinAggregateInputType
    _max?: TahunAjaranMaxAggregateInputType
  }

  export type TahunAjaranGroupByOutputType = {
    id: string
    nama: string
    isActive: boolean
    _count: TahunAjaranCountAggregateOutputType | null
    _min: TahunAjaranMinAggregateOutputType | null
    _max: TahunAjaranMaxAggregateOutputType | null
  }

  type GetTahunAjaranGroupByPayload<T extends TahunAjaranGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TahunAjaranGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TahunAjaranGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TahunAjaranGroupByOutputType[P]>
            : GetScalarType<T[P], TahunAjaranGroupByOutputType[P]>
        }
      >
    >


  export type TahunAjaranSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    isActive?: boolean
    riwayatSiswa?: boolean | TahunAjaran$riwayatSiswaArgs<ExtArgs>
    _count?: boolean | TahunAjaranCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tahunAjaran"]>



  export type TahunAjaranSelectScalar = {
    id?: boolean
    nama?: boolean
    isActive?: boolean
  }

  export type TahunAjaranOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nama" | "isActive", ExtArgs["result"]["tahunAjaran"]>
  export type TahunAjaranInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riwayatSiswa?: boolean | TahunAjaran$riwayatSiswaArgs<ExtArgs>
    _count?: boolean | TahunAjaranCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $TahunAjaranPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TahunAjaran"
    objects: {
      riwayatSiswa: Prisma.$RiwayatKelasSiswaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nama: string
      isActive: boolean
    }, ExtArgs["result"]["tahunAjaran"]>
    composites: {}
  }

  type TahunAjaranGetPayload<S extends boolean | null | undefined | TahunAjaranDefaultArgs> = $Result.GetResult<Prisma.$TahunAjaranPayload, S>

  type TahunAjaranCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TahunAjaranFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TahunAjaranCountAggregateInputType | true
    }

  export interface TahunAjaranDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TahunAjaran'], meta: { name: 'TahunAjaran' } }
    /**
     * Find zero or one TahunAjaran that matches the filter.
     * @param {TahunAjaranFindUniqueArgs} args - Arguments to find a TahunAjaran
     * @example
     * // Get one TahunAjaran
     * const tahunAjaran = await prisma.tahunAjaran.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TahunAjaranFindUniqueArgs>(args: SelectSubset<T, TahunAjaranFindUniqueArgs<ExtArgs>>): Prisma__TahunAjaranClient<$Result.GetResult<Prisma.$TahunAjaranPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TahunAjaran that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TahunAjaranFindUniqueOrThrowArgs} args - Arguments to find a TahunAjaran
     * @example
     * // Get one TahunAjaran
     * const tahunAjaran = await prisma.tahunAjaran.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TahunAjaranFindUniqueOrThrowArgs>(args: SelectSubset<T, TahunAjaranFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TahunAjaranClient<$Result.GetResult<Prisma.$TahunAjaranPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TahunAjaran that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahunAjaranFindFirstArgs} args - Arguments to find a TahunAjaran
     * @example
     * // Get one TahunAjaran
     * const tahunAjaran = await prisma.tahunAjaran.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TahunAjaranFindFirstArgs>(args?: SelectSubset<T, TahunAjaranFindFirstArgs<ExtArgs>>): Prisma__TahunAjaranClient<$Result.GetResult<Prisma.$TahunAjaranPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TahunAjaran that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahunAjaranFindFirstOrThrowArgs} args - Arguments to find a TahunAjaran
     * @example
     * // Get one TahunAjaran
     * const tahunAjaran = await prisma.tahunAjaran.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TahunAjaranFindFirstOrThrowArgs>(args?: SelectSubset<T, TahunAjaranFindFirstOrThrowArgs<ExtArgs>>): Prisma__TahunAjaranClient<$Result.GetResult<Prisma.$TahunAjaranPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TahunAjarans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahunAjaranFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TahunAjarans
     * const tahunAjarans = await prisma.tahunAjaran.findMany()
     * 
     * // Get first 10 TahunAjarans
     * const tahunAjarans = await prisma.tahunAjaran.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tahunAjaranWithIdOnly = await prisma.tahunAjaran.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TahunAjaranFindManyArgs>(args?: SelectSubset<T, TahunAjaranFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TahunAjaranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TahunAjaran.
     * @param {TahunAjaranCreateArgs} args - Arguments to create a TahunAjaran.
     * @example
     * // Create one TahunAjaran
     * const TahunAjaran = await prisma.tahunAjaran.create({
     *   data: {
     *     // ... data to create a TahunAjaran
     *   }
     * })
     * 
     */
    create<T extends TahunAjaranCreateArgs>(args: SelectSubset<T, TahunAjaranCreateArgs<ExtArgs>>): Prisma__TahunAjaranClient<$Result.GetResult<Prisma.$TahunAjaranPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TahunAjarans.
     * @param {TahunAjaranCreateManyArgs} args - Arguments to create many TahunAjarans.
     * @example
     * // Create many TahunAjarans
     * const tahunAjaran = await prisma.tahunAjaran.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TahunAjaranCreateManyArgs>(args?: SelectSubset<T, TahunAjaranCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TahunAjaran.
     * @param {TahunAjaranDeleteArgs} args - Arguments to delete one TahunAjaran.
     * @example
     * // Delete one TahunAjaran
     * const TahunAjaran = await prisma.tahunAjaran.delete({
     *   where: {
     *     // ... filter to delete one TahunAjaran
     *   }
     * })
     * 
     */
    delete<T extends TahunAjaranDeleteArgs>(args: SelectSubset<T, TahunAjaranDeleteArgs<ExtArgs>>): Prisma__TahunAjaranClient<$Result.GetResult<Prisma.$TahunAjaranPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TahunAjaran.
     * @param {TahunAjaranUpdateArgs} args - Arguments to update one TahunAjaran.
     * @example
     * // Update one TahunAjaran
     * const tahunAjaran = await prisma.tahunAjaran.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TahunAjaranUpdateArgs>(args: SelectSubset<T, TahunAjaranUpdateArgs<ExtArgs>>): Prisma__TahunAjaranClient<$Result.GetResult<Prisma.$TahunAjaranPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TahunAjarans.
     * @param {TahunAjaranDeleteManyArgs} args - Arguments to filter TahunAjarans to delete.
     * @example
     * // Delete a few TahunAjarans
     * const { count } = await prisma.tahunAjaran.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TahunAjaranDeleteManyArgs>(args?: SelectSubset<T, TahunAjaranDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TahunAjarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahunAjaranUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TahunAjarans
     * const tahunAjaran = await prisma.tahunAjaran.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TahunAjaranUpdateManyArgs>(args: SelectSubset<T, TahunAjaranUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TahunAjaran.
     * @param {TahunAjaranUpsertArgs} args - Arguments to update or create a TahunAjaran.
     * @example
     * // Update or create a TahunAjaran
     * const tahunAjaran = await prisma.tahunAjaran.upsert({
     *   create: {
     *     // ... data to create a TahunAjaran
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TahunAjaran we want to update
     *   }
     * })
     */
    upsert<T extends TahunAjaranUpsertArgs>(args: SelectSubset<T, TahunAjaranUpsertArgs<ExtArgs>>): Prisma__TahunAjaranClient<$Result.GetResult<Prisma.$TahunAjaranPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TahunAjarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahunAjaranCountArgs} args - Arguments to filter TahunAjarans to count.
     * @example
     * // Count the number of TahunAjarans
     * const count = await prisma.tahunAjaran.count({
     *   where: {
     *     // ... the filter for the TahunAjarans we want to count
     *   }
     * })
    **/
    count<T extends TahunAjaranCountArgs>(
      args?: Subset<T, TahunAjaranCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TahunAjaranCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TahunAjaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahunAjaranAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TahunAjaranAggregateArgs>(args: Subset<T, TahunAjaranAggregateArgs>): Prisma.PrismaPromise<GetTahunAjaranAggregateType<T>>

    /**
     * Group by TahunAjaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TahunAjaranGroupByArgs} args - Group by arguments.
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
      T extends TahunAjaranGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TahunAjaranGroupByArgs['orderBy'] }
        : { orderBy?: TahunAjaranGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TahunAjaranGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTahunAjaranGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TahunAjaran model
   */
  readonly fields: TahunAjaranFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TahunAjaran.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TahunAjaranClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    riwayatSiswa<T extends TahunAjaran$riwayatSiswaArgs<ExtArgs> = {}>(args?: Subset<T, TahunAjaran$riwayatSiswaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiwayatKelasSiswaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the TahunAjaran model
   */
  interface TahunAjaranFieldRefs {
    readonly id: FieldRef<"TahunAjaran", 'String'>
    readonly nama: FieldRef<"TahunAjaran", 'String'>
    readonly isActive: FieldRef<"TahunAjaran", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * TahunAjaran findUnique
   */
  export type TahunAjaranFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TahunAjaran
     */
    select?: TahunAjaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TahunAjaran
     */
    omit?: TahunAjaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahunAjaranInclude<ExtArgs> | null
    /**
     * Filter, which TahunAjaran to fetch.
     */
    where: TahunAjaranWhereUniqueInput
  }

  /**
   * TahunAjaran findUniqueOrThrow
   */
  export type TahunAjaranFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TahunAjaran
     */
    select?: TahunAjaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TahunAjaran
     */
    omit?: TahunAjaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahunAjaranInclude<ExtArgs> | null
    /**
     * Filter, which TahunAjaran to fetch.
     */
    where: TahunAjaranWhereUniqueInput
  }

  /**
   * TahunAjaran findFirst
   */
  export type TahunAjaranFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TahunAjaran
     */
    select?: TahunAjaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TahunAjaran
     */
    omit?: TahunAjaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahunAjaranInclude<ExtArgs> | null
    /**
     * Filter, which TahunAjaran to fetch.
     */
    where?: TahunAjaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TahunAjarans to fetch.
     */
    orderBy?: TahunAjaranOrderByWithRelationInput | TahunAjaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TahunAjarans.
     */
    cursor?: TahunAjaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TahunAjarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TahunAjarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TahunAjarans.
     */
    distinct?: TahunAjaranScalarFieldEnum | TahunAjaranScalarFieldEnum[]
  }

  /**
   * TahunAjaran findFirstOrThrow
   */
  export type TahunAjaranFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TahunAjaran
     */
    select?: TahunAjaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TahunAjaran
     */
    omit?: TahunAjaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahunAjaranInclude<ExtArgs> | null
    /**
     * Filter, which TahunAjaran to fetch.
     */
    where?: TahunAjaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TahunAjarans to fetch.
     */
    orderBy?: TahunAjaranOrderByWithRelationInput | TahunAjaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TahunAjarans.
     */
    cursor?: TahunAjaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TahunAjarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TahunAjarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TahunAjarans.
     */
    distinct?: TahunAjaranScalarFieldEnum | TahunAjaranScalarFieldEnum[]
  }

  /**
   * TahunAjaran findMany
   */
  export type TahunAjaranFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TahunAjaran
     */
    select?: TahunAjaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TahunAjaran
     */
    omit?: TahunAjaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahunAjaranInclude<ExtArgs> | null
    /**
     * Filter, which TahunAjarans to fetch.
     */
    where?: TahunAjaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TahunAjarans to fetch.
     */
    orderBy?: TahunAjaranOrderByWithRelationInput | TahunAjaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TahunAjarans.
     */
    cursor?: TahunAjaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TahunAjarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TahunAjarans.
     */
    skip?: number
    distinct?: TahunAjaranScalarFieldEnum | TahunAjaranScalarFieldEnum[]
  }

  /**
   * TahunAjaran create
   */
  export type TahunAjaranCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TahunAjaran
     */
    select?: TahunAjaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TahunAjaran
     */
    omit?: TahunAjaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahunAjaranInclude<ExtArgs> | null
    /**
     * The data needed to create a TahunAjaran.
     */
    data: XOR<TahunAjaranCreateInput, TahunAjaranUncheckedCreateInput>
  }

  /**
   * TahunAjaran createMany
   */
  export type TahunAjaranCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TahunAjarans.
     */
    data: TahunAjaranCreateManyInput | TahunAjaranCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TahunAjaran update
   */
  export type TahunAjaranUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TahunAjaran
     */
    select?: TahunAjaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TahunAjaran
     */
    omit?: TahunAjaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahunAjaranInclude<ExtArgs> | null
    /**
     * The data needed to update a TahunAjaran.
     */
    data: XOR<TahunAjaranUpdateInput, TahunAjaranUncheckedUpdateInput>
    /**
     * Choose, which TahunAjaran to update.
     */
    where: TahunAjaranWhereUniqueInput
  }

  /**
   * TahunAjaran updateMany
   */
  export type TahunAjaranUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TahunAjarans.
     */
    data: XOR<TahunAjaranUpdateManyMutationInput, TahunAjaranUncheckedUpdateManyInput>
    /**
     * Filter which TahunAjarans to update
     */
    where?: TahunAjaranWhereInput
    /**
     * Limit how many TahunAjarans to update.
     */
    limit?: number
  }

  /**
   * TahunAjaran upsert
   */
  export type TahunAjaranUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TahunAjaran
     */
    select?: TahunAjaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TahunAjaran
     */
    omit?: TahunAjaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahunAjaranInclude<ExtArgs> | null
    /**
     * The filter to search for the TahunAjaran to update in case it exists.
     */
    where: TahunAjaranWhereUniqueInput
    /**
     * In case the TahunAjaran found by the `where` argument doesn't exist, create a new TahunAjaran with this data.
     */
    create: XOR<TahunAjaranCreateInput, TahunAjaranUncheckedCreateInput>
    /**
     * In case the TahunAjaran was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TahunAjaranUpdateInput, TahunAjaranUncheckedUpdateInput>
  }

  /**
   * TahunAjaran delete
   */
  export type TahunAjaranDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TahunAjaran
     */
    select?: TahunAjaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TahunAjaran
     */
    omit?: TahunAjaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahunAjaranInclude<ExtArgs> | null
    /**
     * Filter which TahunAjaran to delete.
     */
    where: TahunAjaranWhereUniqueInput
  }

  /**
   * TahunAjaran deleteMany
   */
  export type TahunAjaranDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TahunAjarans to delete
     */
    where?: TahunAjaranWhereInput
    /**
     * Limit how many TahunAjarans to delete.
     */
    limit?: number
  }

  /**
   * TahunAjaran.riwayatSiswa
   */
  export type TahunAjaran$riwayatSiswaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
    where?: RiwayatKelasSiswaWhereInput
    orderBy?: RiwayatKelasSiswaOrderByWithRelationInput | RiwayatKelasSiswaOrderByWithRelationInput[]
    cursor?: RiwayatKelasSiswaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RiwayatKelasSiswaScalarFieldEnum | RiwayatKelasSiswaScalarFieldEnum[]
  }

  /**
   * TahunAjaran without action
   */
  export type TahunAjaranDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TahunAjaran
     */
    select?: TahunAjaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TahunAjaran
     */
    omit?: TahunAjaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TahunAjaranInclude<ExtArgs> | null
  }


  /**
   * Model Kelas
   */

  export type AggregateKelas = {
    _count: KelasCountAggregateOutputType | null
    _min: KelasMinAggregateOutputType | null
    _max: KelasMaxAggregateOutputType | null
  }

  export type KelasMinAggregateOutputType = {
    id: string | null
    nama: string | null
  }

  export type KelasMaxAggregateOutputType = {
    id: string | null
    nama: string | null
  }

  export type KelasCountAggregateOutputType = {
    id: number
    nama: number
    _all: number
  }


  export type KelasMinAggregateInputType = {
    id?: true
    nama?: true
  }

  export type KelasMaxAggregateInputType = {
    id?: true
    nama?: true
  }

  export type KelasCountAggregateInputType = {
    id?: true
    nama?: true
    _all?: true
  }

  export type KelasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kelas to aggregate.
     */
    where?: KelasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kelas to fetch.
     */
    orderBy?: KelasOrderByWithRelationInput | KelasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KelasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kelas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kelas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Kelas
    **/
    _count?: true | KelasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KelasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KelasMaxAggregateInputType
  }

  export type GetKelasAggregateType<T extends KelasAggregateArgs> = {
        [P in keyof T & keyof AggregateKelas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKelas[P]>
      : GetScalarType<T[P], AggregateKelas[P]>
  }




  export type KelasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KelasWhereInput
    orderBy?: KelasOrderByWithAggregationInput | KelasOrderByWithAggregationInput[]
    by: KelasScalarFieldEnum[] | KelasScalarFieldEnum
    having?: KelasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KelasCountAggregateInputType | true
    _min?: KelasMinAggregateInputType
    _max?: KelasMaxAggregateInputType
  }

  export type KelasGroupByOutputType = {
    id: string
    nama: string
    _count: KelasCountAggregateOutputType | null
    _min: KelasMinAggregateOutputType | null
    _max: KelasMaxAggregateOutputType | null
  }

  type GetKelasGroupByPayload<T extends KelasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KelasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KelasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KelasGroupByOutputType[P]>
            : GetScalarType<T[P], KelasGroupByOutputType[P]>
        }
      >
    >


  export type KelasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    riwayatSiswa?: boolean | Kelas$riwayatSiswaArgs<ExtArgs>
    waliKelas?: boolean | Kelas$waliKelasArgs<ExtArgs>
    _count?: boolean | KelasCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kelas"]>



  export type KelasSelectScalar = {
    id?: boolean
    nama?: boolean
  }

  export type KelasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nama", ExtArgs["result"]["kelas"]>
  export type KelasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    riwayatSiswa?: boolean | Kelas$riwayatSiswaArgs<ExtArgs>
    waliKelas?: boolean | Kelas$waliKelasArgs<ExtArgs>
    _count?: boolean | KelasCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $KelasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Kelas"
    objects: {
      riwayatSiswa: Prisma.$RiwayatKelasSiswaPayload<ExtArgs>[]
      waliKelas: Prisma.$KelasWaliPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nama: string
    }, ExtArgs["result"]["kelas"]>
    composites: {}
  }

  type KelasGetPayload<S extends boolean | null | undefined | KelasDefaultArgs> = $Result.GetResult<Prisma.$KelasPayload, S>

  type KelasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KelasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KelasCountAggregateInputType | true
    }

  export interface KelasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Kelas'], meta: { name: 'Kelas' } }
    /**
     * Find zero or one Kelas that matches the filter.
     * @param {KelasFindUniqueArgs} args - Arguments to find a Kelas
     * @example
     * // Get one Kelas
     * const kelas = await prisma.kelas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KelasFindUniqueArgs>(args: SelectSubset<T, KelasFindUniqueArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Kelas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KelasFindUniqueOrThrowArgs} args - Arguments to find a Kelas
     * @example
     * // Get one Kelas
     * const kelas = await prisma.kelas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KelasFindUniqueOrThrowArgs>(args: SelectSubset<T, KelasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kelas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasFindFirstArgs} args - Arguments to find a Kelas
     * @example
     * // Get one Kelas
     * const kelas = await prisma.kelas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KelasFindFirstArgs>(args?: SelectSubset<T, KelasFindFirstArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Kelas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasFindFirstOrThrowArgs} args - Arguments to find a Kelas
     * @example
     * // Get one Kelas
     * const kelas = await prisma.kelas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KelasFindFirstOrThrowArgs>(args?: SelectSubset<T, KelasFindFirstOrThrowArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Kelas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Kelas
     * const kelas = await prisma.kelas.findMany()
     * 
     * // Get first 10 Kelas
     * const kelas = await prisma.kelas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kelasWithIdOnly = await prisma.kelas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KelasFindManyArgs>(args?: SelectSubset<T, KelasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Kelas.
     * @param {KelasCreateArgs} args - Arguments to create a Kelas.
     * @example
     * // Create one Kelas
     * const Kelas = await prisma.kelas.create({
     *   data: {
     *     // ... data to create a Kelas
     *   }
     * })
     * 
     */
    create<T extends KelasCreateArgs>(args: SelectSubset<T, KelasCreateArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Kelas.
     * @param {KelasCreateManyArgs} args - Arguments to create many Kelas.
     * @example
     * // Create many Kelas
     * const kelas = await prisma.kelas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KelasCreateManyArgs>(args?: SelectSubset<T, KelasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Kelas.
     * @param {KelasDeleteArgs} args - Arguments to delete one Kelas.
     * @example
     * // Delete one Kelas
     * const Kelas = await prisma.kelas.delete({
     *   where: {
     *     // ... filter to delete one Kelas
     *   }
     * })
     * 
     */
    delete<T extends KelasDeleteArgs>(args: SelectSubset<T, KelasDeleteArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Kelas.
     * @param {KelasUpdateArgs} args - Arguments to update one Kelas.
     * @example
     * // Update one Kelas
     * const kelas = await prisma.kelas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KelasUpdateArgs>(args: SelectSubset<T, KelasUpdateArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Kelas.
     * @param {KelasDeleteManyArgs} args - Arguments to filter Kelas to delete.
     * @example
     * // Delete a few Kelas
     * const { count } = await prisma.kelas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KelasDeleteManyArgs>(args?: SelectSubset<T, KelasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kelas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Kelas
     * const kelas = await prisma.kelas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KelasUpdateManyArgs>(args: SelectSubset<T, KelasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Kelas.
     * @param {KelasUpsertArgs} args - Arguments to update or create a Kelas.
     * @example
     * // Update or create a Kelas
     * const kelas = await prisma.kelas.upsert({
     *   create: {
     *     // ... data to create a Kelas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Kelas we want to update
     *   }
     * })
     */
    upsert<T extends KelasUpsertArgs>(args: SelectSubset<T, KelasUpsertArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Kelas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasCountArgs} args - Arguments to filter Kelas to count.
     * @example
     * // Count the number of Kelas
     * const count = await prisma.kelas.count({
     *   where: {
     *     // ... the filter for the Kelas we want to count
     *   }
     * })
    **/
    count<T extends KelasCountArgs>(
      args?: Subset<T, KelasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KelasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Kelas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KelasAggregateArgs>(args: Subset<T, KelasAggregateArgs>): Prisma.PrismaPromise<GetKelasAggregateType<T>>

    /**
     * Group by Kelas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasGroupByArgs} args - Group by arguments.
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
      T extends KelasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KelasGroupByArgs['orderBy'] }
        : { orderBy?: KelasGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KelasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKelasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Kelas model
   */
  readonly fields: KelasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Kelas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KelasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    riwayatSiswa<T extends Kelas$riwayatSiswaArgs<ExtArgs> = {}>(args?: Subset<T, Kelas$riwayatSiswaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiwayatKelasSiswaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    waliKelas<T extends Kelas$waliKelasArgs<ExtArgs> = {}>(args?: Subset<T, Kelas$waliKelasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KelasWaliPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Kelas model
   */
  interface KelasFieldRefs {
    readonly id: FieldRef<"Kelas", 'String'>
    readonly nama: FieldRef<"Kelas", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Kelas findUnique
   */
  export type KelasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kelas
     */
    omit?: KelasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasInclude<ExtArgs> | null
    /**
     * Filter, which Kelas to fetch.
     */
    where: KelasWhereUniqueInput
  }

  /**
   * Kelas findUniqueOrThrow
   */
  export type KelasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kelas
     */
    omit?: KelasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasInclude<ExtArgs> | null
    /**
     * Filter, which Kelas to fetch.
     */
    where: KelasWhereUniqueInput
  }

  /**
   * Kelas findFirst
   */
  export type KelasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kelas
     */
    omit?: KelasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasInclude<ExtArgs> | null
    /**
     * Filter, which Kelas to fetch.
     */
    where?: KelasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kelas to fetch.
     */
    orderBy?: KelasOrderByWithRelationInput | KelasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kelas.
     */
    cursor?: KelasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kelas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kelas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kelas.
     */
    distinct?: KelasScalarFieldEnum | KelasScalarFieldEnum[]
  }

  /**
   * Kelas findFirstOrThrow
   */
  export type KelasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kelas
     */
    omit?: KelasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasInclude<ExtArgs> | null
    /**
     * Filter, which Kelas to fetch.
     */
    where?: KelasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kelas to fetch.
     */
    orderBy?: KelasOrderByWithRelationInput | KelasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kelas.
     */
    cursor?: KelasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kelas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kelas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kelas.
     */
    distinct?: KelasScalarFieldEnum | KelasScalarFieldEnum[]
  }

  /**
   * Kelas findMany
   */
  export type KelasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kelas
     */
    omit?: KelasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasInclude<ExtArgs> | null
    /**
     * Filter, which Kelas to fetch.
     */
    where?: KelasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kelas to fetch.
     */
    orderBy?: KelasOrderByWithRelationInput | KelasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Kelas.
     */
    cursor?: KelasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kelas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kelas.
     */
    skip?: number
    distinct?: KelasScalarFieldEnum | KelasScalarFieldEnum[]
  }

  /**
   * Kelas create
   */
  export type KelasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kelas
     */
    omit?: KelasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasInclude<ExtArgs> | null
    /**
     * The data needed to create a Kelas.
     */
    data: XOR<KelasCreateInput, KelasUncheckedCreateInput>
  }

  /**
   * Kelas createMany
   */
  export type KelasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Kelas.
     */
    data: KelasCreateManyInput | KelasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kelas update
   */
  export type KelasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kelas
     */
    omit?: KelasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasInclude<ExtArgs> | null
    /**
     * The data needed to update a Kelas.
     */
    data: XOR<KelasUpdateInput, KelasUncheckedUpdateInput>
    /**
     * Choose, which Kelas to update.
     */
    where: KelasWhereUniqueInput
  }

  /**
   * Kelas updateMany
   */
  export type KelasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Kelas.
     */
    data: XOR<KelasUpdateManyMutationInput, KelasUncheckedUpdateManyInput>
    /**
     * Filter which Kelas to update
     */
    where?: KelasWhereInput
    /**
     * Limit how many Kelas to update.
     */
    limit?: number
  }

  /**
   * Kelas upsert
   */
  export type KelasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kelas
     */
    omit?: KelasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasInclude<ExtArgs> | null
    /**
     * The filter to search for the Kelas to update in case it exists.
     */
    where: KelasWhereUniqueInput
    /**
     * In case the Kelas found by the `where` argument doesn't exist, create a new Kelas with this data.
     */
    create: XOR<KelasCreateInput, KelasUncheckedCreateInput>
    /**
     * In case the Kelas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KelasUpdateInput, KelasUncheckedUpdateInput>
  }

  /**
   * Kelas delete
   */
  export type KelasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kelas
     */
    omit?: KelasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasInclude<ExtArgs> | null
    /**
     * Filter which Kelas to delete.
     */
    where: KelasWhereUniqueInput
  }

  /**
   * Kelas deleteMany
   */
  export type KelasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kelas to delete
     */
    where?: KelasWhereInput
    /**
     * Limit how many Kelas to delete.
     */
    limit?: number
  }

  /**
   * Kelas.riwayatSiswa
   */
  export type Kelas$riwayatSiswaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
    where?: RiwayatKelasSiswaWhereInput
    orderBy?: RiwayatKelasSiswaOrderByWithRelationInput | RiwayatKelasSiswaOrderByWithRelationInput[]
    cursor?: RiwayatKelasSiswaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RiwayatKelasSiswaScalarFieldEnum | RiwayatKelasSiswaScalarFieldEnum[]
  }

  /**
   * Kelas.waliKelas
   */
  export type Kelas$waliKelasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasWali
     */
    select?: KelasWaliSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KelasWali
     */
    omit?: KelasWaliOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasWaliInclude<ExtArgs> | null
    where?: KelasWaliWhereInput
    orderBy?: KelasWaliOrderByWithRelationInput | KelasWaliOrderByWithRelationInput[]
    cursor?: KelasWaliWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KelasWaliScalarFieldEnum | KelasWaliScalarFieldEnum[]
  }

  /**
   * Kelas without action
   */
  export type KelasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Kelas
     */
    omit?: KelasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasInclude<ExtArgs> | null
  }


  /**
   * Model Guru
   */

  export type AggregateGuru = {
    _count: GuruCountAggregateOutputType | null
    _min: GuruMinAggregateOutputType | null
    _max: GuruMaxAggregateOutputType | null
  }

  export type GuruMinAggregateOutputType = {
    id: string | null
    npp: string | null
    jenisKelamin: string | null
    status: boolean | null
    userId: string | null
  }

  export type GuruMaxAggregateOutputType = {
    id: string | null
    npp: string | null
    jenisKelamin: string | null
    status: boolean | null
    userId: string | null
  }

  export type GuruCountAggregateOutputType = {
    id: number
    npp: number
    jenisKelamin: number
    status: number
    userId: number
    _all: number
  }


  export type GuruMinAggregateInputType = {
    id?: true
    npp?: true
    jenisKelamin?: true
    status?: true
    userId?: true
  }

  export type GuruMaxAggregateInputType = {
    id?: true
    npp?: true
    jenisKelamin?: true
    status?: true
    userId?: true
  }

  export type GuruCountAggregateInputType = {
    id?: true
    npp?: true
    jenisKelamin?: true
    status?: true
    userId?: true
    _all?: true
  }

  export type GuruAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guru to aggregate.
     */
    where?: GuruWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gurus to fetch.
     */
    orderBy?: GuruOrderByWithRelationInput | GuruOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuruWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gurus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gurus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Gurus
    **/
    _count?: true | GuruCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuruMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuruMaxAggregateInputType
  }

  export type GetGuruAggregateType<T extends GuruAggregateArgs> = {
        [P in keyof T & keyof AggregateGuru]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuru[P]>
      : GetScalarType<T[P], AggregateGuru[P]>
  }




  export type GuruGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuruWhereInput
    orderBy?: GuruOrderByWithAggregationInput | GuruOrderByWithAggregationInput[]
    by: GuruScalarFieldEnum[] | GuruScalarFieldEnum
    having?: GuruScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuruCountAggregateInputType | true
    _min?: GuruMinAggregateInputType
    _max?: GuruMaxAggregateInputType
  }

  export type GuruGroupByOutputType = {
    id: string
    npp: string
    jenisKelamin: string
    status: boolean
    userId: string
    _count: GuruCountAggregateOutputType | null
    _min: GuruMinAggregateOutputType | null
    _max: GuruMaxAggregateOutputType | null
  }

  type GetGuruGroupByPayload<T extends GuruGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuruGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuruGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuruGroupByOutputType[P]>
            : GetScalarType<T[P], GuruGroupByOutputType[P]>
        }
      >
    >


  export type GuruSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    npp?: boolean
    jenisKelamin?: boolean
    status?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    waliKelasDi?: boolean | Guru$waliKelasDiArgs<ExtArgs>
    _count?: boolean | GuruCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guru"]>



  export type GuruSelectScalar = {
    id?: boolean
    npp?: boolean
    jenisKelamin?: boolean
    status?: boolean
    userId?: boolean
  }

  export type GuruOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "npp" | "jenisKelamin" | "status" | "userId", ExtArgs["result"]["guru"]>
  export type GuruInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    waliKelasDi?: boolean | Guru$waliKelasDiArgs<ExtArgs>
    _count?: boolean | GuruCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $GuruPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Guru"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      waliKelasDi: Prisma.$KelasWaliPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      npp: string
      jenisKelamin: string
      status: boolean
      userId: string
    }, ExtArgs["result"]["guru"]>
    composites: {}
  }

  type GuruGetPayload<S extends boolean | null | undefined | GuruDefaultArgs> = $Result.GetResult<Prisma.$GuruPayload, S>

  type GuruCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuruFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuruCountAggregateInputType | true
    }

  export interface GuruDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Guru'], meta: { name: 'Guru' } }
    /**
     * Find zero or one Guru that matches the filter.
     * @param {GuruFindUniqueArgs} args - Arguments to find a Guru
     * @example
     * // Get one Guru
     * const guru = await prisma.guru.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuruFindUniqueArgs>(args: SelectSubset<T, GuruFindUniqueArgs<ExtArgs>>): Prisma__GuruClient<$Result.GetResult<Prisma.$GuruPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Guru that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuruFindUniqueOrThrowArgs} args - Arguments to find a Guru
     * @example
     * // Get one Guru
     * const guru = await prisma.guru.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuruFindUniqueOrThrowArgs>(args: SelectSubset<T, GuruFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuruClient<$Result.GetResult<Prisma.$GuruPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guru that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuruFindFirstArgs} args - Arguments to find a Guru
     * @example
     * // Get one Guru
     * const guru = await prisma.guru.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuruFindFirstArgs>(args?: SelectSubset<T, GuruFindFirstArgs<ExtArgs>>): Prisma__GuruClient<$Result.GetResult<Prisma.$GuruPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guru that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuruFindFirstOrThrowArgs} args - Arguments to find a Guru
     * @example
     * // Get one Guru
     * const guru = await prisma.guru.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuruFindFirstOrThrowArgs>(args?: SelectSubset<T, GuruFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuruClient<$Result.GetResult<Prisma.$GuruPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Gurus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuruFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Gurus
     * const gurus = await prisma.guru.findMany()
     * 
     * // Get first 10 Gurus
     * const gurus = await prisma.guru.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guruWithIdOnly = await prisma.guru.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GuruFindManyArgs>(args?: SelectSubset<T, GuruFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuruPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Guru.
     * @param {GuruCreateArgs} args - Arguments to create a Guru.
     * @example
     * // Create one Guru
     * const Guru = await prisma.guru.create({
     *   data: {
     *     // ... data to create a Guru
     *   }
     * })
     * 
     */
    create<T extends GuruCreateArgs>(args: SelectSubset<T, GuruCreateArgs<ExtArgs>>): Prisma__GuruClient<$Result.GetResult<Prisma.$GuruPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Gurus.
     * @param {GuruCreateManyArgs} args - Arguments to create many Gurus.
     * @example
     * // Create many Gurus
     * const guru = await prisma.guru.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuruCreateManyArgs>(args?: SelectSubset<T, GuruCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Guru.
     * @param {GuruDeleteArgs} args - Arguments to delete one Guru.
     * @example
     * // Delete one Guru
     * const Guru = await prisma.guru.delete({
     *   where: {
     *     // ... filter to delete one Guru
     *   }
     * })
     * 
     */
    delete<T extends GuruDeleteArgs>(args: SelectSubset<T, GuruDeleteArgs<ExtArgs>>): Prisma__GuruClient<$Result.GetResult<Prisma.$GuruPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Guru.
     * @param {GuruUpdateArgs} args - Arguments to update one Guru.
     * @example
     * // Update one Guru
     * const guru = await prisma.guru.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuruUpdateArgs>(args: SelectSubset<T, GuruUpdateArgs<ExtArgs>>): Prisma__GuruClient<$Result.GetResult<Prisma.$GuruPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Gurus.
     * @param {GuruDeleteManyArgs} args - Arguments to filter Gurus to delete.
     * @example
     * // Delete a few Gurus
     * const { count } = await prisma.guru.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuruDeleteManyArgs>(args?: SelectSubset<T, GuruDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Gurus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuruUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Gurus
     * const guru = await prisma.guru.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuruUpdateManyArgs>(args: SelectSubset<T, GuruUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Guru.
     * @param {GuruUpsertArgs} args - Arguments to update or create a Guru.
     * @example
     * // Update or create a Guru
     * const guru = await prisma.guru.upsert({
     *   create: {
     *     // ... data to create a Guru
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Guru we want to update
     *   }
     * })
     */
    upsert<T extends GuruUpsertArgs>(args: SelectSubset<T, GuruUpsertArgs<ExtArgs>>): Prisma__GuruClient<$Result.GetResult<Prisma.$GuruPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Gurus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuruCountArgs} args - Arguments to filter Gurus to count.
     * @example
     * // Count the number of Gurus
     * const count = await prisma.guru.count({
     *   where: {
     *     // ... the filter for the Gurus we want to count
     *   }
     * })
    **/
    count<T extends GuruCountArgs>(
      args?: Subset<T, GuruCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuruCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Guru.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuruAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GuruAggregateArgs>(args: Subset<T, GuruAggregateArgs>): Prisma.PrismaPromise<GetGuruAggregateType<T>>

    /**
     * Group by Guru.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuruGroupByArgs} args - Group by arguments.
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
      T extends GuruGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuruGroupByArgs['orderBy'] }
        : { orderBy?: GuruGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GuruGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuruGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Guru model
   */
  readonly fields: GuruFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Guru.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuruClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    waliKelasDi<T extends Guru$waliKelasDiArgs<ExtArgs> = {}>(args?: Subset<T, Guru$waliKelasDiArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KelasWaliPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Guru model
   */
  interface GuruFieldRefs {
    readonly id: FieldRef<"Guru", 'String'>
    readonly npp: FieldRef<"Guru", 'String'>
    readonly jenisKelamin: FieldRef<"Guru", 'String'>
    readonly status: FieldRef<"Guru", 'Boolean'>
    readonly userId: FieldRef<"Guru", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Guru findUnique
   */
  export type GuruFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guru
     */
    select?: GuruSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guru
     */
    omit?: GuruOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuruInclude<ExtArgs> | null
    /**
     * Filter, which Guru to fetch.
     */
    where: GuruWhereUniqueInput
  }

  /**
   * Guru findUniqueOrThrow
   */
  export type GuruFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guru
     */
    select?: GuruSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guru
     */
    omit?: GuruOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuruInclude<ExtArgs> | null
    /**
     * Filter, which Guru to fetch.
     */
    where: GuruWhereUniqueInput
  }

  /**
   * Guru findFirst
   */
  export type GuruFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guru
     */
    select?: GuruSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guru
     */
    omit?: GuruOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuruInclude<ExtArgs> | null
    /**
     * Filter, which Guru to fetch.
     */
    where?: GuruWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gurus to fetch.
     */
    orderBy?: GuruOrderByWithRelationInput | GuruOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gurus.
     */
    cursor?: GuruWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gurus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gurus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gurus.
     */
    distinct?: GuruScalarFieldEnum | GuruScalarFieldEnum[]
  }

  /**
   * Guru findFirstOrThrow
   */
  export type GuruFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guru
     */
    select?: GuruSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guru
     */
    omit?: GuruOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuruInclude<ExtArgs> | null
    /**
     * Filter, which Guru to fetch.
     */
    where?: GuruWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gurus to fetch.
     */
    orderBy?: GuruOrderByWithRelationInput | GuruOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Gurus.
     */
    cursor?: GuruWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gurus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gurus.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Gurus.
     */
    distinct?: GuruScalarFieldEnum | GuruScalarFieldEnum[]
  }

  /**
   * Guru findMany
   */
  export type GuruFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guru
     */
    select?: GuruSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guru
     */
    omit?: GuruOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuruInclude<ExtArgs> | null
    /**
     * Filter, which Gurus to fetch.
     */
    where?: GuruWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Gurus to fetch.
     */
    orderBy?: GuruOrderByWithRelationInput | GuruOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Gurus.
     */
    cursor?: GuruWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Gurus from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Gurus.
     */
    skip?: number
    distinct?: GuruScalarFieldEnum | GuruScalarFieldEnum[]
  }

  /**
   * Guru create
   */
  export type GuruCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guru
     */
    select?: GuruSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guru
     */
    omit?: GuruOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuruInclude<ExtArgs> | null
    /**
     * The data needed to create a Guru.
     */
    data: XOR<GuruCreateInput, GuruUncheckedCreateInput>
  }

  /**
   * Guru createMany
   */
  export type GuruCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Gurus.
     */
    data: GuruCreateManyInput | GuruCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Guru update
   */
  export type GuruUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guru
     */
    select?: GuruSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guru
     */
    omit?: GuruOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuruInclude<ExtArgs> | null
    /**
     * The data needed to update a Guru.
     */
    data: XOR<GuruUpdateInput, GuruUncheckedUpdateInput>
    /**
     * Choose, which Guru to update.
     */
    where: GuruWhereUniqueInput
  }

  /**
   * Guru updateMany
   */
  export type GuruUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Gurus.
     */
    data: XOR<GuruUpdateManyMutationInput, GuruUncheckedUpdateManyInput>
    /**
     * Filter which Gurus to update
     */
    where?: GuruWhereInput
    /**
     * Limit how many Gurus to update.
     */
    limit?: number
  }

  /**
   * Guru upsert
   */
  export type GuruUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guru
     */
    select?: GuruSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guru
     */
    omit?: GuruOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuruInclude<ExtArgs> | null
    /**
     * The filter to search for the Guru to update in case it exists.
     */
    where: GuruWhereUniqueInput
    /**
     * In case the Guru found by the `where` argument doesn't exist, create a new Guru with this data.
     */
    create: XOR<GuruCreateInput, GuruUncheckedCreateInput>
    /**
     * In case the Guru was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuruUpdateInput, GuruUncheckedUpdateInput>
  }

  /**
   * Guru delete
   */
  export type GuruDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guru
     */
    select?: GuruSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guru
     */
    omit?: GuruOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuruInclude<ExtArgs> | null
    /**
     * Filter which Guru to delete.
     */
    where: GuruWhereUniqueInput
  }

  /**
   * Guru deleteMany
   */
  export type GuruDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Gurus to delete
     */
    where?: GuruWhereInput
    /**
     * Limit how many Gurus to delete.
     */
    limit?: number
  }

  /**
   * Guru.waliKelasDi
   */
  export type Guru$waliKelasDiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasWali
     */
    select?: KelasWaliSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KelasWali
     */
    omit?: KelasWaliOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasWaliInclude<ExtArgs> | null
    where?: KelasWaliWhereInput
    orderBy?: KelasWaliOrderByWithRelationInput | KelasWaliOrderByWithRelationInput[]
    cursor?: KelasWaliWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KelasWaliScalarFieldEnum | KelasWaliScalarFieldEnum[]
  }

  /**
   * Guru without action
   */
  export type GuruDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guru
     */
    select?: GuruSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guru
     */
    omit?: GuruOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuruInclude<ExtArgs> | null
  }


  /**
   * Model KelasWali
   */

  export type AggregateKelasWali = {
    _count: KelasWaliCountAggregateOutputType | null
    _min: KelasWaliMinAggregateOutputType | null
    _max: KelasWaliMaxAggregateOutputType | null
  }

  export type KelasWaliMinAggregateOutputType = {
    id: string | null
    guruId: string | null
    kelasId: string | null
    createdAt: Date | null
  }

  export type KelasWaliMaxAggregateOutputType = {
    id: string | null
    guruId: string | null
    kelasId: string | null
    createdAt: Date | null
  }

  export type KelasWaliCountAggregateOutputType = {
    id: number
    guruId: number
    kelasId: number
    createdAt: number
    _all: number
  }


  export type KelasWaliMinAggregateInputType = {
    id?: true
    guruId?: true
    kelasId?: true
    createdAt?: true
  }

  export type KelasWaliMaxAggregateInputType = {
    id?: true
    guruId?: true
    kelasId?: true
    createdAt?: true
  }

  export type KelasWaliCountAggregateInputType = {
    id?: true
    guruId?: true
    kelasId?: true
    createdAt?: true
    _all?: true
  }

  export type KelasWaliAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KelasWali to aggregate.
     */
    where?: KelasWaliWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KelasWalis to fetch.
     */
    orderBy?: KelasWaliOrderByWithRelationInput | KelasWaliOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KelasWaliWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KelasWalis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KelasWalis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KelasWalis
    **/
    _count?: true | KelasWaliCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KelasWaliMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KelasWaliMaxAggregateInputType
  }

  export type GetKelasWaliAggregateType<T extends KelasWaliAggregateArgs> = {
        [P in keyof T & keyof AggregateKelasWali]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKelasWali[P]>
      : GetScalarType<T[P], AggregateKelasWali[P]>
  }




  export type KelasWaliGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KelasWaliWhereInput
    orderBy?: KelasWaliOrderByWithAggregationInput | KelasWaliOrderByWithAggregationInput[]
    by: KelasWaliScalarFieldEnum[] | KelasWaliScalarFieldEnum
    having?: KelasWaliScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KelasWaliCountAggregateInputType | true
    _min?: KelasWaliMinAggregateInputType
    _max?: KelasWaliMaxAggregateInputType
  }

  export type KelasWaliGroupByOutputType = {
    id: string
    guruId: string
    kelasId: string
    createdAt: Date
    _count: KelasWaliCountAggregateOutputType | null
    _min: KelasWaliMinAggregateOutputType | null
    _max: KelasWaliMaxAggregateOutputType | null
  }

  type GetKelasWaliGroupByPayload<T extends KelasWaliGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KelasWaliGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KelasWaliGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KelasWaliGroupByOutputType[P]>
            : GetScalarType<T[P], KelasWaliGroupByOutputType[P]>
        }
      >
    >


  export type KelasWaliSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guruId?: boolean
    kelasId?: boolean
    createdAt?: boolean
    guru?: boolean | GuruDefaultArgs<ExtArgs>
    kelas?: boolean | KelasDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kelasWali"]>



  export type KelasWaliSelectScalar = {
    id?: boolean
    guruId?: boolean
    kelasId?: boolean
    createdAt?: boolean
  }

  export type KelasWaliOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "guruId" | "kelasId" | "createdAt", ExtArgs["result"]["kelasWali"]>
  export type KelasWaliInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guru?: boolean | GuruDefaultArgs<ExtArgs>
    kelas?: boolean | KelasDefaultArgs<ExtArgs>
  }

  export type $KelasWaliPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KelasWali"
    objects: {
      guru: Prisma.$GuruPayload<ExtArgs>
      kelas: Prisma.$KelasPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      guruId: string
      kelasId: string
      createdAt: Date
    }, ExtArgs["result"]["kelasWali"]>
    composites: {}
  }

  type KelasWaliGetPayload<S extends boolean | null | undefined | KelasWaliDefaultArgs> = $Result.GetResult<Prisma.$KelasWaliPayload, S>

  type KelasWaliCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KelasWaliFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KelasWaliCountAggregateInputType | true
    }

  export interface KelasWaliDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KelasWali'], meta: { name: 'KelasWali' } }
    /**
     * Find zero or one KelasWali that matches the filter.
     * @param {KelasWaliFindUniqueArgs} args - Arguments to find a KelasWali
     * @example
     * // Get one KelasWali
     * const kelasWali = await prisma.kelasWali.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KelasWaliFindUniqueArgs>(args: SelectSubset<T, KelasWaliFindUniqueArgs<ExtArgs>>): Prisma__KelasWaliClient<$Result.GetResult<Prisma.$KelasWaliPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KelasWali that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KelasWaliFindUniqueOrThrowArgs} args - Arguments to find a KelasWali
     * @example
     * // Get one KelasWali
     * const kelasWali = await prisma.kelasWali.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KelasWaliFindUniqueOrThrowArgs>(args: SelectSubset<T, KelasWaliFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KelasWaliClient<$Result.GetResult<Prisma.$KelasWaliPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KelasWali that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasWaliFindFirstArgs} args - Arguments to find a KelasWali
     * @example
     * // Get one KelasWali
     * const kelasWali = await prisma.kelasWali.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KelasWaliFindFirstArgs>(args?: SelectSubset<T, KelasWaliFindFirstArgs<ExtArgs>>): Prisma__KelasWaliClient<$Result.GetResult<Prisma.$KelasWaliPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KelasWali that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasWaliFindFirstOrThrowArgs} args - Arguments to find a KelasWali
     * @example
     * // Get one KelasWali
     * const kelasWali = await prisma.kelasWali.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KelasWaliFindFirstOrThrowArgs>(args?: SelectSubset<T, KelasWaliFindFirstOrThrowArgs<ExtArgs>>): Prisma__KelasWaliClient<$Result.GetResult<Prisma.$KelasWaliPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KelasWalis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasWaliFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KelasWalis
     * const kelasWalis = await prisma.kelasWali.findMany()
     * 
     * // Get first 10 KelasWalis
     * const kelasWalis = await prisma.kelasWali.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kelasWaliWithIdOnly = await prisma.kelasWali.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KelasWaliFindManyArgs>(args?: SelectSubset<T, KelasWaliFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KelasWaliPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KelasWali.
     * @param {KelasWaliCreateArgs} args - Arguments to create a KelasWali.
     * @example
     * // Create one KelasWali
     * const KelasWali = await prisma.kelasWali.create({
     *   data: {
     *     // ... data to create a KelasWali
     *   }
     * })
     * 
     */
    create<T extends KelasWaliCreateArgs>(args: SelectSubset<T, KelasWaliCreateArgs<ExtArgs>>): Prisma__KelasWaliClient<$Result.GetResult<Prisma.$KelasWaliPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KelasWalis.
     * @param {KelasWaliCreateManyArgs} args - Arguments to create many KelasWalis.
     * @example
     * // Create many KelasWalis
     * const kelasWali = await prisma.kelasWali.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KelasWaliCreateManyArgs>(args?: SelectSubset<T, KelasWaliCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a KelasWali.
     * @param {KelasWaliDeleteArgs} args - Arguments to delete one KelasWali.
     * @example
     * // Delete one KelasWali
     * const KelasWali = await prisma.kelasWali.delete({
     *   where: {
     *     // ... filter to delete one KelasWali
     *   }
     * })
     * 
     */
    delete<T extends KelasWaliDeleteArgs>(args: SelectSubset<T, KelasWaliDeleteArgs<ExtArgs>>): Prisma__KelasWaliClient<$Result.GetResult<Prisma.$KelasWaliPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KelasWali.
     * @param {KelasWaliUpdateArgs} args - Arguments to update one KelasWali.
     * @example
     * // Update one KelasWali
     * const kelasWali = await prisma.kelasWali.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KelasWaliUpdateArgs>(args: SelectSubset<T, KelasWaliUpdateArgs<ExtArgs>>): Prisma__KelasWaliClient<$Result.GetResult<Prisma.$KelasWaliPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KelasWalis.
     * @param {KelasWaliDeleteManyArgs} args - Arguments to filter KelasWalis to delete.
     * @example
     * // Delete a few KelasWalis
     * const { count } = await prisma.kelasWali.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KelasWaliDeleteManyArgs>(args?: SelectSubset<T, KelasWaliDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KelasWalis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasWaliUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KelasWalis
     * const kelasWali = await prisma.kelasWali.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KelasWaliUpdateManyArgs>(args: SelectSubset<T, KelasWaliUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one KelasWali.
     * @param {KelasWaliUpsertArgs} args - Arguments to update or create a KelasWali.
     * @example
     * // Update or create a KelasWali
     * const kelasWali = await prisma.kelasWali.upsert({
     *   create: {
     *     // ... data to create a KelasWali
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KelasWali we want to update
     *   }
     * })
     */
    upsert<T extends KelasWaliUpsertArgs>(args: SelectSubset<T, KelasWaliUpsertArgs<ExtArgs>>): Prisma__KelasWaliClient<$Result.GetResult<Prisma.$KelasWaliPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KelasWalis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasWaliCountArgs} args - Arguments to filter KelasWalis to count.
     * @example
     * // Count the number of KelasWalis
     * const count = await prisma.kelasWali.count({
     *   where: {
     *     // ... the filter for the KelasWalis we want to count
     *   }
     * })
    **/
    count<T extends KelasWaliCountArgs>(
      args?: Subset<T, KelasWaliCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KelasWaliCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KelasWali.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasWaliAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KelasWaliAggregateArgs>(args: Subset<T, KelasWaliAggregateArgs>): Prisma.PrismaPromise<GetKelasWaliAggregateType<T>>

    /**
     * Group by KelasWali.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasWaliGroupByArgs} args - Group by arguments.
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
      T extends KelasWaliGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KelasWaliGroupByArgs['orderBy'] }
        : { orderBy?: KelasWaliGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KelasWaliGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKelasWaliGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KelasWali model
   */
  readonly fields: KelasWaliFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KelasWali.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KelasWaliClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    guru<T extends GuruDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GuruDefaultArgs<ExtArgs>>): Prisma__GuruClient<$Result.GetResult<Prisma.$GuruPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    kelas<T extends KelasDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KelasDefaultArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the KelasWali model
   */
  interface KelasWaliFieldRefs {
    readonly id: FieldRef<"KelasWali", 'String'>
    readonly guruId: FieldRef<"KelasWali", 'String'>
    readonly kelasId: FieldRef<"KelasWali", 'String'>
    readonly createdAt: FieldRef<"KelasWali", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KelasWali findUnique
   */
  export type KelasWaliFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasWali
     */
    select?: KelasWaliSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KelasWali
     */
    omit?: KelasWaliOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasWaliInclude<ExtArgs> | null
    /**
     * Filter, which KelasWali to fetch.
     */
    where: KelasWaliWhereUniqueInput
  }

  /**
   * KelasWali findUniqueOrThrow
   */
  export type KelasWaliFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasWali
     */
    select?: KelasWaliSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KelasWali
     */
    omit?: KelasWaliOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasWaliInclude<ExtArgs> | null
    /**
     * Filter, which KelasWali to fetch.
     */
    where: KelasWaliWhereUniqueInput
  }

  /**
   * KelasWali findFirst
   */
  export type KelasWaliFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasWali
     */
    select?: KelasWaliSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KelasWali
     */
    omit?: KelasWaliOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasWaliInclude<ExtArgs> | null
    /**
     * Filter, which KelasWali to fetch.
     */
    where?: KelasWaliWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KelasWalis to fetch.
     */
    orderBy?: KelasWaliOrderByWithRelationInput | KelasWaliOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KelasWalis.
     */
    cursor?: KelasWaliWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KelasWalis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KelasWalis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KelasWalis.
     */
    distinct?: KelasWaliScalarFieldEnum | KelasWaliScalarFieldEnum[]
  }

  /**
   * KelasWali findFirstOrThrow
   */
  export type KelasWaliFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasWali
     */
    select?: KelasWaliSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KelasWali
     */
    omit?: KelasWaliOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasWaliInclude<ExtArgs> | null
    /**
     * Filter, which KelasWali to fetch.
     */
    where?: KelasWaliWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KelasWalis to fetch.
     */
    orderBy?: KelasWaliOrderByWithRelationInput | KelasWaliOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KelasWalis.
     */
    cursor?: KelasWaliWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KelasWalis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KelasWalis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KelasWalis.
     */
    distinct?: KelasWaliScalarFieldEnum | KelasWaliScalarFieldEnum[]
  }

  /**
   * KelasWali findMany
   */
  export type KelasWaliFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasWali
     */
    select?: KelasWaliSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KelasWali
     */
    omit?: KelasWaliOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasWaliInclude<ExtArgs> | null
    /**
     * Filter, which KelasWalis to fetch.
     */
    where?: KelasWaliWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KelasWalis to fetch.
     */
    orderBy?: KelasWaliOrderByWithRelationInput | KelasWaliOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KelasWalis.
     */
    cursor?: KelasWaliWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KelasWalis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KelasWalis.
     */
    skip?: number
    distinct?: KelasWaliScalarFieldEnum | KelasWaliScalarFieldEnum[]
  }

  /**
   * KelasWali create
   */
  export type KelasWaliCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasWali
     */
    select?: KelasWaliSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KelasWali
     */
    omit?: KelasWaliOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasWaliInclude<ExtArgs> | null
    /**
     * The data needed to create a KelasWali.
     */
    data: XOR<KelasWaliCreateInput, KelasWaliUncheckedCreateInput>
  }

  /**
   * KelasWali createMany
   */
  export type KelasWaliCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KelasWalis.
     */
    data: KelasWaliCreateManyInput | KelasWaliCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KelasWali update
   */
  export type KelasWaliUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasWali
     */
    select?: KelasWaliSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KelasWali
     */
    omit?: KelasWaliOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasWaliInclude<ExtArgs> | null
    /**
     * The data needed to update a KelasWali.
     */
    data: XOR<KelasWaliUpdateInput, KelasWaliUncheckedUpdateInput>
    /**
     * Choose, which KelasWali to update.
     */
    where: KelasWaliWhereUniqueInput
  }

  /**
   * KelasWali updateMany
   */
  export type KelasWaliUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KelasWalis.
     */
    data: XOR<KelasWaliUpdateManyMutationInput, KelasWaliUncheckedUpdateManyInput>
    /**
     * Filter which KelasWalis to update
     */
    where?: KelasWaliWhereInput
    /**
     * Limit how many KelasWalis to update.
     */
    limit?: number
  }

  /**
   * KelasWali upsert
   */
  export type KelasWaliUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasWali
     */
    select?: KelasWaliSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KelasWali
     */
    omit?: KelasWaliOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasWaliInclude<ExtArgs> | null
    /**
     * The filter to search for the KelasWali to update in case it exists.
     */
    where: KelasWaliWhereUniqueInput
    /**
     * In case the KelasWali found by the `where` argument doesn't exist, create a new KelasWali with this data.
     */
    create: XOR<KelasWaliCreateInput, KelasWaliUncheckedCreateInput>
    /**
     * In case the KelasWali was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KelasWaliUpdateInput, KelasWaliUncheckedUpdateInput>
  }

  /**
   * KelasWali delete
   */
  export type KelasWaliDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasWali
     */
    select?: KelasWaliSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KelasWali
     */
    omit?: KelasWaliOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasWaliInclude<ExtArgs> | null
    /**
     * Filter which KelasWali to delete.
     */
    where: KelasWaliWhereUniqueInput
  }

  /**
   * KelasWali deleteMany
   */
  export type KelasWaliDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KelasWalis to delete
     */
    where?: KelasWaliWhereInput
    /**
     * Limit how many KelasWalis to delete.
     */
    limit?: number
  }

  /**
   * KelasWali without action
   */
  export type KelasWaliDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KelasWali
     */
    select?: KelasWaliSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KelasWali
     */
    omit?: KelasWaliOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KelasWaliInclude<ExtArgs> | null
  }


  /**
   * Model Siswa
   */

  export type AggregateSiswa = {
    _count: SiswaCountAggregateOutputType | null
    _min: SiswaMinAggregateOutputType | null
    _max: SiswaMaxAggregateOutputType | null
  }

  export type SiswaMinAggregateOutputType = {
    id: string | null
    nisn: string | null
    nis: string | null
    jenisKelamin: string | null
    userId: string | null
  }

  export type SiswaMaxAggregateOutputType = {
    id: string | null
    nisn: string | null
    nis: string | null
    jenisKelamin: string | null
    userId: string | null
  }

  export type SiswaCountAggregateOutputType = {
    id: number
    nisn: number
    nis: number
    jenisKelamin: number
    userId: number
    _all: number
  }


  export type SiswaMinAggregateInputType = {
    id?: true
    nisn?: true
    nis?: true
    jenisKelamin?: true
    userId?: true
  }

  export type SiswaMaxAggregateInputType = {
    id?: true
    nisn?: true
    nis?: true
    jenisKelamin?: true
    userId?: true
  }

  export type SiswaCountAggregateInputType = {
    id?: true
    nisn?: true
    nis?: true
    jenisKelamin?: true
    userId?: true
    _all?: true
  }

  export type SiswaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Siswa to aggregate.
     */
    where?: SiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siswas to fetch.
     */
    orderBy?: SiswaOrderByWithRelationInput | SiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Siswas
    **/
    _count?: true | SiswaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiswaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiswaMaxAggregateInputType
  }

  export type GetSiswaAggregateType<T extends SiswaAggregateArgs> = {
        [P in keyof T & keyof AggregateSiswa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiswa[P]>
      : GetScalarType<T[P], AggregateSiswa[P]>
  }




  export type SiswaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiswaWhereInput
    orderBy?: SiswaOrderByWithAggregationInput | SiswaOrderByWithAggregationInput[]
    by: SiswaScalarFieldEnum[] | SiswaScalarFieldEnum
    having?: SiswaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiswaCountAggregateInputType | true
    _min?: SiswaMinAggregateInputType
    _max?: SiswaMaxAggregateInputType
  }

  export type SiswaGroupByOutputType = {
    id: string
    nisn: string
    nis: string
    jenisKelamin: string
    userId: string
    _count: SiswaCountAggregateOutputType | null
    _min: SiswaMinAggregateOutputType | null
    _max: SiswaMaxAggregateOutputType | null
  }

  type GetSiswaGroupByPayload<T extends SiswaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiswaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiswaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiswaGroupByOutputType[P]>
            : GetScalarType<T[P], SiswaGroupByOutputType[P]>
        }
      >
    >


  export type SiswaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nisn?: boolean
    nis?: boolean
    jenisKelamin?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    riwayatKelas?: boolean | Siswa$riwayatKelasArgs<ExtArgs>
    _count?: boolean | SiswaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["siswa"]>



  export type SiswaSelectScalar = {
    id?: boolean
    nisn?: boolean
    nis?: boolean
    jenisKelamin?: boolean
    userId?: boolean
  }

  export type SiswaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nisn" | "nis" | "jenisKelamin" | "userId", ExtArgs["result"]["siswa"]>
  export type SiswaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    riwayatKelas?: boolean | Siswa$riwayatKelasArgs<ExtArgs>
    _count?: boolean | SiswaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SiswaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Siswa"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      riwayatKelas: Prisma.$RiwayatKelasSiswaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nisn: string
      nis: string
      jenisKelamin: string
      userId: string
    }, ExtArgs["result"]["siswa"]>
    composites: {}
  }

  type SiswaGetPayload<S extends boolean | null | undefined | SiswaDefaultArgs> = $Result.GetResult<Prisma.$SiswaPayload, S>

  type SiswaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SiswaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SiswaCountAggregateInputType | true
    }

  export interface SiswaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Siswa'], meta: { name: 'Siswa' } }
    /**
     * Find zero or one Siswa that matches the filter.
     * @param {SiswaFindUniqueArgs} args - Arguments to find a Siswa
     * @example
     * // Get one Siswa
     * const siswa = await prisma.siswa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiswaFindUniqueArgs>(args: SelectSubset<T, SiswaFindUniqueArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Siswa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SiswaFindUniqueOrThrowArgs} args - Arguments to find a Siswa
     * @example
     * // Get one Siswa
     * const siswa = await prisma.siswa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiswaFindUniqueOrThrowArgs>(args: SelectSubset<T, SiswaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Siswa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaFindFirstArgs} args - Arguments to find a Siswa
     * @example
     * // Get one Siswa
     * const siswa = await prisma.siswa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiswaFindFirstArgs>(args?: SelectSubset<T, SiswaFindFirstArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Siswa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaFindFirstOrThrowArgs} args - Arguments to find a Siswa
     * @example
     * // Get one Siswa
     * const siswa = await prisma.siswa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiswaFindFirstOrThrowArgs>(args?: SelectSubset<T, SiswaFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Siswas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Siswas
     * const siswas = await prisma.siswa.findMany()
     * 
     * // Get first 10 Siswas
     * const siswas = await prisma.siswa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siswaWithIdOnly = await prisma.siswa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiswaFindManyArgs>(args?: SelectSubset<T, SiswaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Siswa.
     * @param {SiswaCreateArgs} args - Arguments to create a Siswa.
     * @example
     * // Create one Siswa
     * const Siswa = await prisma.siswa.create({
     *   data: {
     *     // ... data to create a Siswa
     *   }
     * })
     * 
     */
    create<T extends SiswaCreateArgs>(args: SelectSubset<T, SiswaCreateArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Siswas.
     * @param {SiswaCreateManyArgs} args - Arguments to create many Siswas.
     * @example
     * // Create many Siswas
     * const siswa = await prisma.siswa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiswaCreateManyArgs>(args?: SelectSubset<T, SiswaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Siswa.
     * @param {SiswaDeleteArgs} args - Arguments to delete one Siswa.
     * @example
     * // Delete one Siswa
     * const Siswa = await prisma.siswa.delete({
     *   where: {
     *     // ... filter to delete one Siswa
     *   }
     * })
     * 
     */
    delete<T extends SiswaDeleteArgs>(args: SelectSubset<T, SiswaDeleteArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Siswa.
     * @param {SiswaUpdateArgs} args - Arguments to update one Siswa.
     * @example
     * // Update one Siswa
     * const siswa = await prisma.siswa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiswaUpdateArgs>(args: SelectSubset<T, SiswaUpdateArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Siswas.
     * @param {SiswaDeleteManyArgs} args - Arguments to filter Siswas to delete.
     * @example
     * // Delete a few Siswas
     * const { count } = await prisma.siswa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiswaDeleteManyArgs>(args?: SelectSubset<T, SiswaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Siswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Siswas
     * const siswa = await prisma.siswa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiswaUpdateManyArgs>(args: SelectSubset<T, SiswaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Siswa.
     * @param {SiswaUpsertArgs} args - Arguments to update or create a Siswa.
     * @example
     * // Update or create a Siswa
     * const siswa = await prisma.siswa.upsert({
     *   create: {
     *     // ... data to create a Siswa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Siswa we want to update
     *   }
     * })
     */
    upsert<T extends SiswaUpsertArgs>(args: SelectSubset<T, SiswaUpsertArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Siswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaCountArgs} args - Arguments to filter Siswas to count.
     * @example
     * // Count the number of Siswas
     * const count = await prisma.siswa.count({
     *   where: {
     *     // ... the filter for the Siswas we want to count
     *   }
     * })
    **/
    count<T extends SiswaCountArgs>(
      args?: Subset<T, SiswaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiswaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Siswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SiswaAggregateArgs>(args: Subset<T, SiswaAggregateArgs>): Prisma.PrismaPromise<GetSiswaAggregateType<T>>

    /**
     * Group by Siswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaGroupByArgs} args - Group by arguments.
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
      T extends SiswaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiswaGroupByArgs['orderBy'] }
        : { orderBy?: SiswaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SiswaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiswaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Siswa model
   */
  readonly fields: SiswaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Siswa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiswaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    riwayatKelas<T extends Siswa$riwayatKelasArgs<ExtArgs> = {}>(args?: Subset<T, Siswa$riwayatKelasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiwayatKelasSiswaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Siswa model
   */
  interface SiswaFieldRefs {
    readonly id: FieldRef<"Siswa", 'String'>
    readonly nisn: FieldRef<"Siswa", 'String'>
    readonly nis: FieldRef<"Siswa", 'String'>
    readonly jenisKelamin: FieldRef<"Siswa", 'String'>
    readonly userId: FieldRef<"Siswa", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Siswa findUnique
   */
  export type SiswaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswa to fetch.
     */
    where: SiswaWhereUniqueInput
  }

  /**
   * Siswa findUniqueOrThrow
   */
  export type SiswaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswa to fetch.
     */
    where: SiswaWhereUniqueInput
  }

  /**
   * Siswa findFirst
   */
  export type SiswaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswa to fetch.
     */
    where?: SiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siswas to fetch.
     */
    orderBy?: SiswaOrderByWithRelationInput | SiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Siswas.
     */
    cursor?: SiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Siswas.
     */
    distinct?: SiswaScalarFieldEnum | SiswaScalarFieldEnum[]
  }

  /**
   * Siswa findFirstOrThrow
   */
  export type SiswaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswa to fetch.
     */
    where?: SiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siswas to fetch.
     */
    orderBy?: SiswaOrderByWithRelationInput | SiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Siswas.
     */
    cursor?: SiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Siswas.
     */
    distinct?: SiswaScalarFieldEnum | SiswaScalarFieldEnum[]
  }

  /**
   * Siswa findMany
   */
  export type SiswaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswas to fetch.
     */
    where?: SiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siswas to fetch.
     */
    orderBy?: SiswaOrderByWithRelationInput | SiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Siswas.
     */
    cursor?: SiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siswas.
     */
    skip?: number
    distinct?: SiswaScalarFieldEnum | SiswaScalarFieldEnum[]
  }

  /**
   * Siswa create
   */
  export type SiswaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * The data needed to create a Siswa.
     */
    data: XOR<SiswaCreateInput, SiswaUncheckedCreateInput>
  }

  /**
   * Siswa createMany
   */
  export type SiswaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Siswas.
     */
    data: SiswaCreateManyInput | SiswaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Siswa update
   */
  export type SiswaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * The data needed to update a Siswa.
     */
    data: XOR<SiswaUpdateInput, SiswaUncheckedUpdateInput>
    /**
     * Choose, which Siswa to update.
     */
    where: SiswaWhereUniqueInput
  }

  /**
   * Siswa updateMany
   */
  export type SiswaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Siswas.
     */
    data: XOR<SiswaUpdateManyMutationInput, SiswaUncheckedUpdateManyInput>
    /**
     * Filter which Siswas to update
     */
    where?: SiswaWhereInput
    /**
     * Limit how many Siswas to update.
     */
    limit?: number
  }

  /**
   * Siswa upsert
   */
  export type SiswaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * The filter to search for the Siswa to update in case it exists.
     */
    where: SiswaWhereUniqueInput
    /**
     * In case the Siswa found by the `where` argument doesn't exist, create a new Siswa with this data.
     */
    create: XOR<SiswaCreateInput, SiswaUncheckedCreateInput>
    /**
     * In case the Siswa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiswaUpdateInput, SiswaUncheckedUpdateInput>
  }

  /**
   * Siswa delete
   */
  export type SiswaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter which Siswa to delete.
     */
    where: SiswaWhereUniqueInput
  }

  /**
   * Siswa deleteMany
   */
  export type SiswaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Siswas to delete
     */
    where?: SiswaWhereInput
    /**
     * Limit how many Siswas to delete.
     */
    limit?: number
  }

  /**
   * Siswa.riwayatKelas
   */
  export type Siswa$riwayatKelasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
    where?: RiwayatKelasSiswaWhereInput
    orderBy?: RiwayatKelasSiswaOrderByWithRelationInput | RiwayatKelasSiswaOrderByWithRelationInput[]
    cursor?: RiwayatKelasSiswaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RiwayatKelasSiswaScalarFieldEnum | RiwayatKelasSiswaScalarFieldEnum[]
  }

  /**
   * Siswa without action
   */
  export type SiswaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Siswa
     */
    omit?: SiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
  }


  /**
   * Model RiwayatKelasSiswa
   */

  export type AggregateRiwayatKelasSiswa = {
    _count: RiwayatKelasSiswaCountAggregateOutputType | null
    _min: RiwayatKelasSiswaMinAggregateOutputType | null
    _max: RiwayatKelasSiswaMaxAggregateOutputType | null
  }

  export type RiwayatKelasSiswaMinAggregateOutputType = {
    id: string | null
    siswaId: string | null
    kelasId: string | null
    tahunAjaranId: string | null
  }

  export type RiwayatKelasSiswaMaxAggregateOutputType = {
    id: string | null
    siswaId: string | null
    kelasId: string | null
    tahunAjaranId: string | null
  }

  export type RiwayatKelasSiswaCountAggregateOutputType = {
    id: number
    siswaId: number
    kelasId: number
    tahunAjaranId: number
    _all: number
  }


  export type RiwayatKelasSiswaMinAggregateInputType = {
    id?: true
    siswaId?: true
    kelasId?: true
    tahunAjaranId?: true
  }

  export type RiwayatKelasSiswaMaxAggregateInputType = {
    id?: true
    siswaId?: true
    kelasId?: true
    tahunAjaranId?: true
  }

  export type RiwayatKelasSiswaCountAggregateInputType = {
    id?: true
    siswaId?: true
    kelasId?: true
    tahunAjaranId?: true
    _all?: true
  }

  export type RiwayatKelasSiswaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiwayatKelasSiswa to aggregate.
     */
    where?: RiwayatKelasSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiwayatKelasSiswas to fetch.
     */
    orderBy?: RiwayatKelasSiswaOrderByWithRelationInput | RiwayatKelasSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RiwayatKelasSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiwayatKelasSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiwayatKelasSiswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RiwayatKelasSiswas
    **/
    _count?: true | RiwayatKelasSiswaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RiwayatKelasSiswaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RiwayatKelasSiswaMaxAggregateInputType
  }

  export type GetRiwayatKelasSiswaAggregateType<T extends RiwayatKelasSiswaAggregateArgs> = {
        [P in keyof T & keyof AggregateRiwayatKelasSiswa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRiwayatKelasSiswa[P]>
      : GetScalarType<T[P], AggregateRiwayatKelasSiswa[P]>
  }




  export type RiwayatKelasSiswaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RiwayatKelasSiswaWhereInput
    orderBy?: RiwayatKelasSiswaOrderByWithAggregationInput | RiwayatKelasSiswaOrderByWithAggregationInput[]
    by: RiwayatKelasSiswaScalarFieldEnum[] | RiwayatKelasSiswaScalarFieldEnum
    having?: RiwayatKelasSiswaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RiwayatKelasSiswaCountAggregateInputType | true
    _min?: RiwayatKelasSiswaMinAggregateInputType
    _max?: RiwayatKelasSiswaMaxAggregateInputType
  }

  export type RiwayatKelasSiswaGroupByOutputType = {
    id: string
    siswaId: string
    kelasId: string
    tahunAjaranId: string
    _count: RiwayatKelasSiswaCountAggregateOutputType | null
    _min: RiwayatKelasSiswaMinAggregateOutputType | null
    _max: RiwayatKelasSiswaMaxAggregateOutputType | null
  }

  type GetRiwayatKelasSiswaGroupByPayload<T extends RiwayatKelasSiswaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RiwayatKelasSiswaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RiwayatKelasSiswaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RiwayatKelasSiswaGroupByOutputType[P]>
            : GetScalarType<T[P], RiwayatKelasSiswaGroupByOutputType[P]>
        }
      >
    >


  export type RiwayatKelasSiswaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siswaId?: boolean
    kelasId?: boolean
    tahunAjaranId?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
    kelas?: boolean | KelasDefaultArgs<ExtArgs>
    tahunAjaran?: boolean | TahunAjaranDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["riwayatKelasSiswa"]>



  export type RiwayatKelasSiswaSelectScalar = {
    id?: boolean
    siswaId?: boolean
    kelasId?: boolean
    tahunAjaranId?: boolean
  }

  export type RiwayatKelasSiswaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "siswaId" | "kelasId" | "tahunAjaranId", ExtArgs["result"]["riwayatKelasSiswa"]>
  export type RiwayatKelasSiswaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
    kelas?: boolean | KelasDefaultArgs<ExtArgs>
    tahunAjaran?: boolean | TahunAjaranDefaultArgs<ExtArgs>
  }

  export type $RiwayatKelasSiswaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RiwayatKelasSiswa"
    objects: {
      siswa: Prisma.$SiswaPayload<ExtArgs>
      kelas: Prisma.$KelasPayload<ExtArgs>
      tahunAjaran: Prisma.$TahunAjaranPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      siswaId: string
      kelasId: string
      tahunAjaranId: string
    }, ExtArgs["result"]["riwayatKelasSiswa"]>
    composites: {}
  }

  type RiwayatKelasSiswaGetPayload<S extends boolean | null | undefined | RiwayatKelasSiswaDefaultArgs> = $Result.GetResult<Prisma.$RiwayatKelasSiswaPayload, S>

  type RiwayatKelasSiswaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RiwayatKelasSiswaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RiwayatKelasSiswaCountAggregateInputType | true
    }

  export interface RiwayatKelasSiswaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RiwayatKelasSiswa'], meta: { name: 'RiwayatKelasSiswa' } }
    /**
     * Find zero or one RiwayatKelasSiswa that matches the filter.
     * @param {RiwayatKelasSiswaFindUniqueArgs} args - Arguments to find a RiwayatKelasSiswa
     * @example
     * // Get one RiwayatKelasSiswa
     * const riwayatKelasSiswa = await prisma.riwayatKelasSiswa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RiwayatKelasSiswaFindUniqueArgs>(args: SelectSubset<T, RiwayatKelasSiswaFindUniqueArgs<ExtArgs>>): Prisma__RiwayatKelasSiswaClient<$Result.GetResult<Prisma.$RiwayatKelasSiswaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RiwayatKelasSiswa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RiwayatKelasSiswaFindUniqueOrThrowArgs} args - Arguments to find a RiwayatKelasSiswa
     * @example
     * // Get one RiwayatKelasSiswa
     * const riwayatKelasSiswa = await prisma.riwayatKelasSiswa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RiwayatKelasSiswaFindUniqueOrThrowArgs>(args: SelectSubset<T, RiwayatKelasSiswaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RiwayatKelasSiswaClient<$Result.GetResult<Prisma.$RiwayatKelasSiswaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RiwayatKelasSiswa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiwayatKelasSiswaFindFirstArgs} args - Arguments to find a RiwayatKelasSiswa
     * @example
     * // Get one RiwayatKelasSiswa
     * const riwayatKelasSiswa = await prisma.riwayatKelasSiswa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RiwayatKelasSiswaFindFirstArgs>(args?: SelectSubset<T, RiwayatKelasSiswaFindFirstArgs<ExtArgs>>): Prisma__RiwayatKelasSiswaClient<$Result.GetResult<Prisma.$RiwayatKelasSiswaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RiwayatKelasSiswa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiwayatKelasSiswaFindFirstOrThrowArgs} args - Arguments to find a RiwayatKelasSiswa
     * @example
     * // Get one RiwayatKelasSiswa
     * const riwayatKelasSiswa = await prisma.riwayatKelasSiswa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RiwayatKelasSiswaFindFirstOrThrowArgs>(args?: SelectSubset<T, RiwayatKelasSiswaFindFirstOrThrowArgs<ExtArgs>>): Prisma__RiwayatKelasSiswaClient<$Result.GetResult<Prisma.$RiwayatKelasSiswaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RiwayatKelasSiswas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiwayatKelasSiswaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RiwayatKelasSiswas
     * const riwayatKelasSiswas = await prisma.riwayatKelasSiswa.findMany()
     * 
     * // Get first 10 RiwayatKelasSiswas
     * const riwayatKelasSiswas = await prisma.riwayatKelasSiswa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const riwayatKelasSiswaWithIdOnly = await prisma.riwayatKelasSiswa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RiwayatKelasSiswaFindManyArgs>(args?: SelectSubset<T, RiwayatKelasSiswaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RiwayatKelasSiswaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RiwayatKelasSiswa.
     * @param {RiwayatKelasSiswaCreateArgs} args - Arguments to create a RiwayatKelasSiswa.
     * @example
     * // Create one RiwayatKelasSiswa
     * const RiwayatKelasSiswa = await prisma.riwayatKelasSiswa.create({
     *   data: {
     *     // ... data to create a RiwayatKelasSiswa
     *   }
     * })
     * 
     */
    create<T extends RiwayatKelasSiswaCreateArgs>(args: SelectSubset<T, RiwayatKelasSiswaCreateArgs<ExtArgs>>): Prisma__RiwayatKelasSiswaClient<$Result.GetResult<Prisma.$RiwayatKelasSiswaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RiwayatKelasSiswas.
     * @param {RiwayatKelasSiswaCreateManyArgs} args - Arguments to create many RiwayatKelasSiswas.
     * @example
     * // Create many RiwayatKelasSiswas
     * const riwayatKelasSiswa = await prisma.riwayatKelasSiswa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RiwayatKelasSiswaCreateManyArgs>(args?: SelectSubset<T, RiwayatKelasSiswaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RiwayatKelasSiswa.
     * @param {RiwayatKelasSiswaDeleteArgs} args - Arguments to delete one RiwayatKelasSiswa.
     * @example
     * // Delete one RiwayatKelasSiswa
     * const RiwayatKelasSiswa = await prisma.riwayatKelasSiswa.delete({
     *   where: {
     *     // ... filter to delete one RiwayatKelasSiswa
     *   }
     * })
     * 
     */
    delete<T extends RiwayatKelasSiswaDeleteArgs>(args: SelectSubset<T, RiwayatKelasSiswaDeleteArgs<ExtArgs>>): Prisma__RiwayatKelasSiswaClient<$Result.GetResult<Prisma.$RiwayatKelasSiswaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RiwayatKelasSiswa.
     * @param {RiwayatKelasSiswaUpdateArgs} args - Arguments to update one RiwayatKelasSiswa.
     * @example
     * // Update one RiwayatKelasSiswa
     * const riwayatKelasSiswa = await prisma.riwayatKelasSiswa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RiwayatKelasSiswaUpdateArgs>(args: SelectSubset<T, RiwayatKelasSiswaUpdateArgs<ExtArgs>>): Prisma__RiwayatKelasSiswaClient<$Result.GetResult<Prisma.$RiwayatKelasSiswaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RiwayatKelasSiswas.
     * @param {RiwayatKelasSiswaDeleteManyArgs} args - Arguments to filter RiwayatKelasSiswas to delete.
     * @example
     * // Delete a few RiwayatKelasSiswas
     * const { count } = await prisma.riwayatKelasSiswa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RiwayatKelasSiswaDeleteManyArgs>(args?: SelectSubset<T, RiwayatKelasSiswaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RiwayatKelasSiswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiwayatKelasSiswaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RiwayatKelasSiswas
     * const riwayatKelasSiswa = await prisma.riwayatKelasSiswa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RiwayatKelasSiswaUpdateManyArgs>(args: SelectSubset<T, RiwayatKelasSiswaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RiwayatKelasSiswa.
     * @param {RiwayatKelasSiswaUpsertArgs} args - Arguments to update or create a RiwayatKelasSiswa.
     * @example
     * // Update or create a RiwayatKelasSiswa
     * const riwayatKelasSiswa = await prisma.riwayatKelasSiswa.upsert({
     *   create: {
     *     // ... data to create a RiwayatKelasSiswa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RiwayatKelasSiswa we want to update
     *   }
     * })
     */
    upsert<T extends RiwayatKelasSiswaUpsertArgs>(args: SelectSubset<T, RiwayatKelasSiswaUpsertArgs<ExtArgs>>): Prisma__RiwayatKelasSiswaClient<$Result.GetResult<Prisma.$RiwayatKelasSiswaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RiwayatKelasSiswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiwayatKelasSiswaCountArgs} args - Arguments to filter RiwayatKelasSiswas to count.
     * @example
     * // Count the number of RiwayatKelasSiswas
     * const count = await prisma.riwayatKelasSiswa.count({
     *   where: {
     *     // ... the filter for the RiwayatKelasSiswas we want to count
     *   }
     * })
    **/
    count<T extends RiwayatKelasSiswaCountArgs>(
      args?: Subset<T, RiwayatKelasSiswaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RiwayatKelasSiswaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RiwayatKelasSiswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiwayatKelasSiswaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RiwayatKelasSiswaAggregateArgs>(args: Subset<T, RiwayatKelasSiswaAggregateArgs>): Prisma.PrismaPromise<GetRiwayatKelasSiswaAggregateType<T>>

    /**
     * Group by RiwayatKelasSiswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RiwayatKelasSiswaGroupByArgs} args - Group by arguments.
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
      T extends RiwayatKelasSiswaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RiwayatKelasSiswaGroupByArgs['orderBy'] }
        : { orderBy?: RiwayatKelasSiswaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RiwayatKelasSiswaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRiwayatKelasSiswaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RiwayatKelasSiswa model
   */
  readonly fields: RiwayatKelasSiswaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RiwayatKelasSiswa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RiwayatKelasSiswaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    siswa<T extends SiswaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SiswaDefaultArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    kelas<T extends KelasDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KelasDefaultArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tahunAjaran<T extends TahunAjaranDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TahunAjaranDefaultArgs<ExtArgs>>): Prisma__TahunAjaranClient<$Result.GetResult<Prisma.$TahunAjaranPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RiwayatKelasSiswa model
   */
  interface RiwayatKelasSiswaFieldRefs {
    readonly id: FieldRef<"RiwayatKelasSiswa", 'String'>
    readonly siswaId: FieldRef<"RiwayatKelasSiswa", 'String'>
    readonly kelasId: FieldRef<"RiwayatKelasSiswa", 'String'>
    readonly tahunAjaranId: FieldRef<"RiwayatKelasSiswa", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RiwayatKelasSiswa findUnique
   */
  export type RiwayatKelasSiswaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
    /**
     * Filter, which RiwayatKelasSiswa to fetch.
     */
    where: RiwayatKelasSiswaWhereUniqueInput
  }

  /**
   * RiwayatKelasSiswa findUniqueOrThrow
   */
  export type RiwayatKelasSiswaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
    /**
     * Filter, which RiwayatKelasSiswa to fetch.
     */
    where: RiwayatKelasSiswaWhereUniqueInput
  }

  /**
   * RiwayatKelasSiswa findFirst
   */
  export type RiwayatKelasSiswaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
    /**
     * Filter, which RiwayatKelasSiswa to fetch.
     */
    where?: RiwayatKelasSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiwayatKelasSiswas to fetch.
     */
    orderBy?: RiwayatKelasSiswaOrderByWithRelationInput | RiwayatKelasSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiwayatKelasSiswas.
     */
    cursor?: RiwayatKelasSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiwayatKelasSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiwayatKelasSiswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiwayatKelasSiswas.
     */
    distinct?: RiwayatKelasSiswaScalarFieldEnum | RiwayatKelasSiswaScalarFieldEnum[]
  }

  /**
   * RiwayatKelasSiswa findFirstOrThrow
   */
  export type RiwayatKelasSiswaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
    /**
     * Filter, which RiwayatKelasSiswa to fetch.
     */
    where?: RiwayatKelasSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiwayatKelasSiswas to fetch.
     */
    orderBy?: RiwayatKelasSiswaOrderByWithRelationInput | RiwayatKelasSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RiwayatKelasSiswas.
     */
    cursor?: RiwayatKelasSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiwayatKelasSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiwayatKelasSiswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RiwayatKelasSiswas.
     */
    distinct?: RiwayatKelasSiswaScalarFieldEnum | RiwayatKelasSiswaScalarFieldEnum[]
  }

  /**
   * RiwayatKelasSiswa findMany
   */
  export type RiwayatKelasSiswaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
    /**
     * Filter, which RiwayatKelasSiswas to fetch.
     */
    where?: RiwayatKelasSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RiwayatKelasSiswas to fetch.
     */
    orderBy?: RiwayatKelasSiswaOrderByWithRelationInput | RiwayatKelasSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RiwayatKelasSiswas.
     */
    cursor?: RiwayatKelasSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RiwayatKelasSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RiwayatKelasSiswas.
     */
    skip?: number
    distinct?: RiwayatKelasSiswaScalarFieldEnum | RiwayatKelasSiswaScalarFieldEnum[]
  }

  /**
   * RiwayatKelasSiswa create
   */
  export type RiwayatKelasSiswaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
    /**
     * The data needed to create a RiwayatKelasSiswa.
     */
    data: XOR<RiwayatKelasSiswaCreateInput, RiwayatKelasSiswaUncheckedCreateInput>
  }

  /**
   * RiwayatKelasSiswa createMany
   */
  export type RiwayatKelasSiswaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RiwayatKelasSiswas.
     */
    data: RiwayatKelasSiswaCreateManyInput | RiwayatKelasSiswaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RiwayatKelasSiswa update
   */
  export type RiwayatKelasSiswaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
    /**
     * The data needed to update a RiwayatKelasSiswa.
     */
    data: XOR<RiwayatKelasSiswaUpdateInput, RiwayatKelasSiswaUncheckedUpdateInput>
    /**
     * Choose, which RiwayatKelasSiswa to update.
     */
    where: RiwayatKelasSiswaWhereUniqueInput
  }

  /**
   * RiwayatKelasSiswa updateMany
   */
  export type RiwayatKelasSiswaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RiwayatKelasSiswas.
     */
    data: XOR<RiwayatKelasSiswaUpdateManyMutationInput, RiwayatKelasSiswaUncheckedUpdateManyInput>
    /**
     * Filter which RiwayatKelasSiswas to update
     */
    where?: RiwayatKelasSiswaWhereInput
    /**
     * Limit how many RiwayatKelasSiswas to update.
     */
    limit?: number
  }

  /**
   * RiwayatKelasSiswa upsert
   */
  export type RiwayatKelasSiswaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
    /**
     * The filter to search for the RiwayatKelasSiswa to update in case it exists.
     */
    where: RiwayatKelasSiswaWhereUniqueInput
    /**
     * In case the RiwayatKelasSiswa found by the `where` argument doesn't exist, create a new RiwayatKelasSiswa with this data.
     */
    create: XOR<RiwayatKelasSiswaCreateInput, RiwayatKelasSiswaUncheckedCreateInput>
    /**
     * In case the RiwayatKelasSiswa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RiwayatKelasSiswaUpdateInput, RiwayatKelasSiswaUncheckedUpdateInput>
  }

  /**
   * RiwayatKelasSiswa delete
   */
  export type RiwayatKelasSiswaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
    /**
     * Filter which RiwayatKelasSiswa to delete.
     */
    where: RiwayatKelasSiswaWhereUniqueInput
  }

  /**
   * RiwayatKelasSiswa deleteMany
   */
  export type RiwayatKelasSiswaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RiwayatKelasSiswas to delete
     */
    where?: RiwayatKelasSiswaWhereInput
    /**
     * Limit how many RiwayatKelasSiswas to delete.
     */
    limit?: number
  }

  /**
   * RiwayatKelasSiswa without action
   */
  export type RiwayatKelasSiswaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RiwayatKelasSiswa
     */
    select?: RiwayatKelasSiswaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RiwayatKelasSiswa
     */
    omit?: RiwayatKelasSiswaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RiwayatKelasSiswaInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    nama: 'nama',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const TahunAjaranScalarFieldEnum: {
    id: 'id',
    nama: 'nama',
    isActive: 'isActive'
  };

  export type TahunAjaranScalarFieldEnum = (typeof TahunAjaranScalarFieldEnum)[keyof typeof TahunAjaranScalarFieldEnum]


  export const KelasScalarFieldEnum: {
    id: 'id',
    nama: 'nama'
  };

  export type KelasScalarFieldEnum = (typeof KelasScalarFieldEnum)[keyof typeof KelasScalarFieldEnum]


  export const GuruScalarFieldEnum: {
    id: 'id',
    npp: 'npp',
    jenisKelamin: 'jenisKelamin',
    status: 'status',
    userId: 'userId'
  };

  export type GuruScalarFieldEnum = (typeof GuruScalarFieldEnum)[keyof typeof GuruScalarFieldEnum]


  export const KelasWaliScalarFieldEnum: {
    id: 'id',
    guruId: 'guruId',
    kelasId: 'kelasId',
    createdAt: 'createdAt'
  };

  export type KelasWaliScalarFieldEnum = (typeof KelasWaliScalarFieldEnum)[keyof typeof KelasWaliScalarFieldEnum]


  export const SiswaScalarFieldEnum: {
    id: 'id',
    nisn: 'nisn',
    nis: 'nis',
    jenisKelamin: 'jenisKelamin',
    userId: 'userId'
  };

  export type SiswaScalarFieldEnum = (typeof SiswaScalarFieldEnum)[keyof typeof SiswaScalarFieldEnum]


  export const RiwayatKelasSiswaScalarFieldEnum: {
    id: 'id',
    siswaId: 'siswaId',
    kelasId: 'kelasId',
    tahunAjaranId: 'tahunAjaranId'
  };

  export type RiwayatKelasSiswaScalarFieldEnum = (typeof RiwayatKelasSiswaScalarFieldEnum)[keyof typeof RiwayatKelasSiswaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    username: 'username',
    password: 'password',
    nama: 'nama'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const TahunAjaranOrderByRelevanceFieldEnum: {
    id: 'id',
    nama: 'nama'
  };

  export type TahunAjaranOrderByRelevanceFieldEnum = (typeof TahunAjaranOrderByRelevanceFieldEnum)[keyof typeof TahunAjaranOrderByRelevanceFieldEnum]


  export const KelasOrderByRelevanceFieldEnum: {
    id: 'id',
    nama: 'nama'
  };

  export type KelasOrderByRelevanceFieldEnum = (typeof KelasOrderByRelevanceFieldEnum)[keyof typeof KelasOrderByRelevanceFieldEnum]


  export const GuruOrderByRelevanceFieldEnum: {
    id: 'id',
    npp: 'npp',
    jenisKelamin: 'jenisKelamin',
    userId: 'userId'
  };

  export type GuruOrderByRelevanceFieldEnum = (typeof GuruOrderByRelevanceFieldEnum)[keyof typeof GuruOrderByRelevanceFieldEnum]


  export const KelasWaliOrderByRelevanceFieldEnum: {
    id: 'id',
    guruId: 'guruId',
    kelasId: 'kelasId'
  };

  export type KelasWaliOrderByRelevanceFieldEnum = (typeof KelasWaliOrderByRelevanceFieldEnum)[keyof typeof KelasWaliOrderByRelevanceFieldEnum]


  export const SiswaOrderByRelevanceFieldEnum: {
    id: 'id',
    nisn: 'nisn',
    nis: 'nis',
    jenisKelamin: 'jenisKelamin',
    userId: 'userId'
  };

  export type SiswaOrderByRelevanceFieldEnum = (typeof SiswaOrderByRelevanceFieldEnum)[keyof typeof SiswaOrderByRelevanceFieldEnum]


  export const RiwayatKelasSiswaOrderByRelevanceFieldEnum: {
    id: 'id',
    siswaId: 'siswaId',
    kelasId: 'kelasId',
    tahunAjaranId: 'tahunAjaranId'
  };

  export type RiwayatKelasSiswaOrderByRelevanceFieldEnum = (typeof RiwayatKelasSiswaOrderByRelevanceFieldEnum)[keyof typeof RiwayatKelasSiswaOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    nama?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    guru?: XOR<GuruNullableScalarRelationFilter, GuruWhereInput> | null
    siswa?: XOR<SiswaNullableScalarRelationFilter, SiswaWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    guru?: GuruOrderByWithRelationInput
    siswa?: SiswaOrderByWithRelationInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    nama?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    guru?: XOR<GuruNullableScalarRelationFilter, GuruWhereInput> | null
    siswa?: XOR<SiswaNullableScalarRelationFilter, SiswaWhereInput> | null
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    nama?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type TahunAjaranWhereInput = {
    AND?: TahunAjaranWhereInput | TahunAjaranWhereInput[]
    OR?: TahunAjaranWhereInput[]
    NOT?: TahunAjaranWhereInput | TahunAjaranWhereInput[]
    id?: StringFilter<"TahunAjaran"> | string
    nama?: StringFilter<"TahunAjaran"> | string
    isActive?: BoolFilter<"TahunAjaran"> | boolean
    riwayatSiswa?: RiwayatKelasSiswaListRelationFilter
  }

  export type TahunAjaranOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
    isActive?: SortOrder
    riwayatSiswa?: RiwayatKelasSiswaOrderByRelationAggregateInput
    _relevance?: TahunAjaranOrderByRelevanceInput
  }

  export type TahunAjaranWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nama?: string
    AND?: TahunAjaranWhereInput | TahunAjaranWhereInput[]
    OR?: TahunAjaranWhereInput[]
    NOT?: TahunAjaranWhereInput | TahunAjaranWhereInput[]
    isActive?: BoolFilter<"TahunAjaran"> | boolean
    riwayatSiswa?: RiwayatKelasSiswaListRelationFilter
  }, "id" | "nama">

  export type TahunAjaranOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    isActive?: SortOrder
    _count?: TahunAjaranCountOrderByAggregateInput
    _max?: TahunAjaranMaxOrderByAggregateInput
    _min?: TahunAjaranMinOrderByAggregateInput
  }

  export type TahunAjaranScalarWhereWithAggregatesInput = {
    AND?: TahunAjaranScalarWhereWithAggregatesInput | TahunAjaranScalarWhereWithAggregatesInput[]
    OR?: TahunAjaranScalarWhereWithAggregatesInput[]
    NOT?: TahunAjaranScalarWhereWithAggregatesInput | TahunAjaranScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TahunAjaran"> | string
    nama?: StringWithAggregatesFilter<"TahunAjaran"> | string
    isActive?: BoolWithAggregatesFilter<"TahunAjaran"> | boolean
  }

  export type KelasWhereInput = {
    AND?: KelasWhereInput | KelasWhereInput[]
    OR?: KelasWhereInput[]
    NOT?: KelasWhereInput | KelasWhereInput[]
    id?: StringFilter<"Kelas"> | string
    nama?: StringFilter<"Kelas"> | string
    riwayatSiswa?: RiwayatKelasSiswaListRelationFilter
    waliKelas?: KelasWaliListRelationFilter
  }

  export type KelasOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
    riwayatSiswa?: RiwayatKelasSiswaOrderByRelationAggregateInput
    waliKelas?: KelasWaliOrderByRelationAggregateInput
    _relevance?: KelasOrderByRelevanceInput
  }

  export type KelasWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nama?: string
    AND?: KelasWhereInput | KelasWhereInput[]
    OR?: KelasWhereInput[]
    NOT?: KelasWhereInput | KelasWhereInput[]
    riwayatSiswa?: RiwayatKelasSiswaListRelationFilter
    waliKelas?: KelasWaliListRelationFilter
  }, "id" | "nama">

  export type KelasOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    _count?: KelasCountOrderByAggregateInput
    _max?: KelasMaxOrderByAggregateInput
    _min?: KelasMinOrderByAggregateInput
  }

  export type KelasScalarWhereWithAggregatesInput = {
    AND?: KelasScalarWhereWithAggregatesInput | KelasScalarWhereWithAggregatesInput[]
    OR?: KelasScalarWhereWithAggregatesInput[]
    NOT?: KelasScalarWhereWithAggregatesInput | KelasScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Kelas"> | string
    nama?: StringWithAggregatesFilter<"Kelas"> | string
  }

  export type GuruWhereInput = {
    AND?: GuruWhereInput | GuruWhereInput[]
    OR?: GuruWhereInput[]
    NOT?: GuruWhereInput | GuruWhereInput[]
    id?: StringFilter<"Guru"> | string
    npp?: StringFilter<"Guru"> | string
    jenisKelamin?: StringFilter<"Guru"> | string
    status?: BoolFilter<"Guru"> | boolean
    userId?: StringFilter<"Guru"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    waliKelasDi?: KelasWaliListRelationFilter
  }

  export type GuruOrderByWithRelationInput = {
    id?: SortOrder
    npp?: SortOrder
    jenisKelamin?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    waliKelasDi?: KelasWaliOrderByRelationAggregateInput
    _relevance?: GuruOrderByRelevanceInput
  }

  export type GuruWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    npp?: string
    userId?: string
    AND?: GuruWhereInput | GuruWhereInput[]
    OR?: GuruWhereInput[]
    NOT?: GuruWhereInput | GuruWhereInput[]
    jenisKelamin?: StringFilter<"Guru"> | string
    status?: BoolFilter<"Guru"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    waliKelasDi?: KelasWaliListRelationFilter
  }, "id" | "npp" | "userId">

  export type GuruOrderByWithAggregationInput = {
    id?: SortOrder
    npp?: SortOrder
    jenisKelamin?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    _count?: GuruCountOrderByAggregateInput
    _max?: GuruMaxOrderByAggregateInput
    _min?: GuruMinOrderByAggregateInput
  }

  export type GuruScalarWhereWithAggregatesInput = {
    AND?: GuruScalarWhereWithAggregatesInput | GuruScalarWhereWithAggregatesInput[]
    OR?: GuruScalarWhereWithAggregatesInput[]
    NOT?: GuruScalarWhereWithAggregatesInput | GuruScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Guru"> | string
    npp?: StringWithAggregatesFilter<"Guru"> | string
    jenisKelamin?: StringWithAggregatesFilter<"Guru"> | string
    status?: BoolWithAggregatesFilter<"Guru"> | boolean
    userId?: StringWithAggregatesFilter<"Guru"> | string
  }

  export type KelasWaliWhereInput = {
    AND?: KelasWaliWhereInput | KelasWaliWhereInput[]
    OR?: KelasWaliWhereInput[]
    NOT?: KelasWaliWhereInput | KelasWaliWhereInput[]
    id?: StringFilter<"KelasWali"> | string
    guruId?: StringFilter<"KelasWali"> | string
    kelasId?: StringFilter<"KelasWali"> | string
    createdAt?: DateTimeFilter<"KelasWali"> | Date | string
    guru?: XOR<GuruScalarRelationFilter, GuruWhereInput>
    kelas?: XOR<KelasScalarRelationFilter, KelasWhereInput>
  }

  export type KelasWaliOrderByWithRelationInput = {
    id?: SortOrder
    guruId?: SortOrder
    kelasId?: SortOrder
    createdAt?: SortOrder
    guru?: GuruOrderByWithRelationInput
    kelas?: KelasOrderByWithRelationInput
    _relevance?: KelasWaliOrderByRelevanceInput
  }

  export type KelasWaliWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    guruId_kelasId?: KelasWaliGuruIdKelasIdCompoundUniqueInput
    AND?: KelasWaliWhereInput | KelasWaliWhereInput[]
    OR?: KelasWaliWhereInput[]
    NOT?: KelasWaliWhereInput | KelasWaliWhereInput[]
    guruId?: StringFilter<"KelasWali"> | string
    kelasId?: StringFilter<"KelasWali"> | string
    createdAt?: DateTimeFilter<"KelasWali"> | Date | string
    guru?: XOR<GuruScalarRelationFilter, GuruWhereInput>
    kelas?: XOR<KelasScalarRelationFilter, KelasWhereInput>
  }, "id" | "guruId_kelasId">

  export type KelasWaliOrderByWithAggregationInput = {
    id?: SortOrder
    guruId?: SortOrder
    kelasId?: SortOrder
    createdAt?: SortOrder
    _count?: KelasWaliCountOrderByAggregateInput
    _max?: KelasWaliMaxOrderByAggregateInput
    _min?: KelasWaliMinOrderByAggregateInput
  }

  export type KelasWaliScalarWhereWithAggregatesInput = {
    AND?: KelasWaliScalarWhereWithAggregatesInput | KelasWaliScalarWhereWithAggregatesInput[]
    OR?: KelasWaliScalarWhereWithAggregatesInput[]
    NOT?: KelasWaliScalarWhereWithAggregatesInput | KelasWaliScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KelasWali"> | string
    guruId?: StringWithAggregatesFilter<"KelasWali"> | string
    kelasId?: StringWithAggregatesFilter<"KelasWali"> | string
    createdAt?: DateTimeWithAggregatesFilter<"KelasWali"> | Date | string
  }

  export type SiswaWhereInput = {
    AND?: SiswaWhereInput | SiswaWhereInput[]
    OR?: SiswaWhereInput[]
    NOT?: SiswaWhereInput | SiswaWhereInput[]
    id?: StringFilter<"Siswa"> | string
    nisn?: StringFilter<"Siswa"> | string
    nis?: StringFilter<"Siswa"> | string
    jenisKelamin?: StringFilter<"Siswa"> | string
    userId?: StringFilter<"Siswa"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    riwayatKelas?: RiwayatKelasSiswaListRelationFilter
  }

  export type SiswaOrderByWithRelationInput = {
    id?: SortOrder
    nisn?: SortOrder
    nis?: SortOrder
    jenisKelamin?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    riwayatKelas?: RiwayatKelasSiswaOrderByRelationAggregateInput
    _relevance?: SiswaOrderByRelevanceInput
  }

  export type SiswaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nisn?: string
    nis?: string
    userId?: string
    AND?: SiswaWhereInput | SiswaWhereInput[]
    OR?: SiswaWhereInput[]
    NOT?: SiswaWhereInput | SiswaWhereInput[]
    jenisKelamin?: StringFilter<"Siswa"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    riwayatKelas?: RiwayatKelasSiswaListRelationFilter
  }, "id" | "nisn" | "nis" | "userId">

  export type SiswaOrderByWithAggregationInput = {
    id?: SortOrder
    nisn?: SortOrder
    nis?: SortOrder
    jenisKelamin?: SortOrder
    userId?: SortOrder
    _count?: SiswaCountOrderByAggregateInput
    _max?: SiswaMaxOrderByAggregateInput
    _min?: SiswaMinOrderByAggregateInput
  }

  export type SiswaScalarWhereWithAggregatesInput = {
    AND?: SiswaScalarWhereWithAggregatesInput | SiswaScalarWhereWithAggregatesInput[]
    OR?: SiswaScalarWhereWithAggregatesInput[]
    NOT?: SiswaScalarWhereWithAggregatesInput | SiswaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Siswa"> | string
    nisn?: StringWithAggregatesFilter<"Siswa"> | string
    nis?: StringWithAggregatesFilter<"Siswa"> | string
    jenisKelamin?: StringWithAggregatesFilter<"Siswa"> | string
    userId?: StringWithAggregatesFilter<"Siswa"> | string
  }

  export type RiwayatKelasSiswaWhereInput = {
    AND?: RiwayatKelasSiswaWhereInput | RiwayatKelasSiswaWhereInput[]
    OR?: RiwayatKelasSiswaWhereInput[]
    NOT?: RiwayatKelasSiswaWhereInput | RiwayatKelasSiswaWhereInput[]
    id?: StringFilter<"RiwayatKelasSiswa"> | string
    siswaId?: StringFilter<"RiwayatKelasSiswa"> | string
    kelasId?: StringFilter<"RiwayatKelasSiswa"> | string
    tahunAjaranId?: StringFilter<"RiwayatKelasSiswa"> | string
    siswa?: XOR<SiswaScalarRelationFilter, SiswaWhereInput>
    kelas?: XOR<KelasScalarRelationFilter, KelasWhereInput>
    tahunAjaran?: XOR<TahunAjaranScalarRelationFilter, TahunAjaranWhereInput>
  }

  export type RiwayatKelasSiswaOrderByWithRelationInput = {
    id?: SortOrder
    siswaId?: SortOrder
    kelasId?: SortOrder
    tahunAjaranId?: SortOrder
    siswa?: SiswaOrderByWithRelationInput
    kelas?: KelasOrderByWithRelationInput
    tahunAjaran?: TahunAjaranOrderByWithRelationInput
    _relevance?: RiwayatKelasSiswaOrderByRelevanceInput
  }

  export type RiwayatKelasSiswaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    siswaId_tahunAjaranId?: RiwayatKelasSiswaSiswaIdTahunAjaranIdCompoundUniqueInput
    AND?: RiwayatKelasSiswaWhereInput | RiwayatKelasSiswaWhereInput[]
    OR?: RiwayatKelasSiswaWhereInput[]
    NOT?: RiwayatKelasSiswaWhereInput | RiwayatKelasSiswaWhereInput[]
    siswaId?: StringFilter<"RiwayatKelasSiswa"> | string
    kelasId?: StringFilter<"RiwayatKelasSiswa"> | string
    tahunAjaranId?: StringFilter<"RiwayatKelasSiswa"> | string
    siswa?: XOR<SiswaScalarRelationFilter, SiswaWhereInput>
    kelas?: XOR<KelasScalarRelationFilter, KelasWhereInput>
    tahunAjaran?: XOR<TahunAjaranScalarRelationFilter, TahunAjaranWhereInput>
  }, "id" | "siswaId_tahunAjaranId">

  export type RiwayatKelasSiswaOrderByWithAggregationInput = {
    id?: SortOrder
    siswaId?: SortOrder
    kelasId?: SortOrder
    tahunAjaranId?: SortOrder
    _count?: RiwayatKelasSiswaCountOrderByAggregateInput
    _max?: RiwayatKelasSiswaMaxOrderByAggregateInput
    _min?: RiwayatKelasSiswaMinOrderByAggregateInput
  }

  export type RiwayatKelasSiswaScalarWhereWithAggregatesInput = {
    AND?: RiwayatKelasSiswaScalarWhereWithAggregatesInput | RiwayatKelasSiswaScalarWhereWithAggregatesInput[]
    OR?: RiwayatKelasSiswaScalarWhereWithAggregatesInput[]
    NOT?: RiwayatKelasSiswaScalarWhereWithAggregatesInput | RiwayatKelasSiswaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RiwayatKelasSiswa"> | string
    siswaId?: StringWithAggregatesFilter<"RiwayatKelasSiswa"> | string
    kelasId?: StringWithAggregatesFilter<"RiwayatKelasSiswa"> | string
    tahunAjaranId?: StringWithAggregatesFilter<"RiwayatKelasSiswa"> | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    password: string
    nama: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    guru?: GuruCreateNestedOneWithoutUserInput
    siswa?: SiswaCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    password: string
    nama: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    guru?: GuruUncheckedCreateNestedOneWithoutUserInput
    siswa?: SiswaUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guru?: GuruUpdateOneWithoutUserNestedInput
    siswa?: SiswaUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guru?: GuruUncheckedUpdateOneWithoutUserNestedInput
    siswa?: SiswaUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    password: string
    nama: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TahunAjaranCreateInput = {
    id?: string
    nama: string
    isActive?: boolean
    riwayatSiswa?: RiwayatKelasSiswaCreateNestedManyWithoutTahunAjaranInput
  }

  export type TahunAjaranUncheckedCreateInput = {
    id?: string
    nama: string
    isActive?: boolean
    riwayatSiswa?: RiwayatKelasSiswaUncheckedCreateNestedManyWithoutTahunAjaranInput
  }

  export type TahunAjaranUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    riwayatSiswa?: RiwayatKelasSiswaUpdateManyWithoutTahunAjaranNestedInput
  }

  export type TahunAjaranUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    riwayatSiswa?: RiwayatKelasSiswaUncheckedUpdateManyWithoutTahunAjaranNestedInput
  }

  export type TahunAjaranCreateManyInput = {
    id?: string
    nama: string
    isActive?: boolean
  }

  export type TahunAjaranUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TahunAjaranUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type KelasCreateInput = {
    id?: string
    nama: string
    riwayatSiswa?: RiwayatKelasSiswaCreateNestedManyWithoutKelasInput
    waliKelas?: KelasWaliCreateNestedManyWithoutKelasInput
  }

  export type KelasUncheckedCreateInput = {
    id?: string
    nama: string
    riwayatSiswa?: RiwayatKelasSiswaUncheckedCreateNestedManyWithoutKelasInput
    waliKelas?: KelasWaliUncheckedCreateNestedManyWithoutKelasInput
  }

  export type KelasUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    riwayatSiswa?: RiwayatKelasSiswaUpdateManyWithoutKelasNestedInput
    waliKelas?: KelasWaliUpdateManyWithoutKelasNestedInput
  }

  export type KelasUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    riwayatSiswa?: RiwayatKelasSiswaUncheckedUpdateManyWithoutKelasNestedInput
    waliKelas?: KelasWaliUncheckedUpdateManyWithoutKelasNestedInput
  }

  export type KelasCreateManyInput = {
    id?: string
    nama: string
  }

  export type KelasUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type KelasUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type GuruCreateInput = {
    id?: string
    npp: string
    jenisKelamin: string
    status?: boolean
    user: UserCreateNestedOneWithoutGuruInput
    waliKelasDi?: KelasWaliCreateNestedManyWithoutGuruInput
  }

  export type GuruUncheckedCreateInput = {
    id?: string
    npp: string
    jenisKelamin: string
    status?: boolean
    userId: string
    waliKelasDi?: KelasWaliUncheckedCreateNestedManyWithoutGuruInput
  }

  export type GuruUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    npp?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutGuruNestedInput
    waliKelasDi?: KelasWaliUpdateManyWithoutGuruNestedInput
  }

  export type GuruUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    npp?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
    waliKelasDi?: KelasWaliUncheckedUpdateManyWithoutGuruNestedInput
  }

  export type GuruCreateManyInput = {
    id?: string
    npp: string
    jenisKelamin: string
    status?: boolean
    userId: string
  }

  export type GuruUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    npp?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GuruUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    npp?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type KelasWaliCreateInput = {
    id?: string
    createdAt?: Date | string
    guru: GuruCreateNestedOneWithoutWaliKelasDiInput
    kelas: KelasCreateNestedOneWithoutWaliKelasInput
  }

  export type KelasWaliUncheckedCreateInput = {
    id?: string
    guruId: string
    kelasId: string
    createdAt?: Date | string
  }

  export type KelasWaliUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guru?: GuruUpdateOneRequiredWithoutWaliKelasDiNestedInput
    kelas?: KelasUpdateOneRequiredWithoutWaliKelasNestedInput
  }

  export type KelasWaliUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    guruId?: StringFieldUpdateOperationsInput | string
    kelasId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KelasWaliCreateManyInput = {
    id?: string
    guruId: string
    kelasId: string
    createdAt?: Date | string
  }

  export type KelasWaliUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KelasWaliUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    guruId?: StringFieldUpdateOperationsInput | string
    kelasId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiswaCreateInput = {
    id?: string
    nisn: string
    nis: string
    jenisKelamin: string
    user: UserCreateNestedOneWithoutSiswaInput
    riwayatKelas?: RiwayatKelasSiswaCreateNestedManyWithoutSiswaInput
  }

  export type SiswaUncheckedCreateInput = {
    id?: string
    nisn: string
    nis: string
    jenisKelamin: string
    userId: string
    riwayatKelas?: RiwayatKelasSiswaUncheckedCreateNestedManyWithoutSiswaInput
  }

  export type SiswaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nis?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutSiswaNestedInput
    riwayatKelas?: RiwayatKelasSiswaUpdateManyWithoutSiswaNestedInput
  }

  export type SiswaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nis?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    riwayatKelas?: RiwayatKelasSiswaUncheckedUpdateManyWithoutSiswaNestedInput
  }

  export type SiswaCreateManyInput = {
    id?: string
    nisn: string
    nis: string
    jenisKelamin: string
    userId: string
  }

  export type SiswaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nis?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
  }

  export type SiswaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nis?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type RiwayatKelasSiswaCreateInput = {
    id?: string
    siswa: SiswaCreateNestedOneWithoutRiwayatKelasInput
    kelas: KelasCreateNestedOneWithoutRiwayatSiswaInput
    tahunAjaran: TahunAjaranCreateNestedOneWithoutRiwayatSiswaInput
  }

  export type RiwayatKelasSiswaUncheckedCreateInput = {
    id?: string
    siswaId: string
    kelasId: string
    tahunAjaranId: string
  }

  export type RiwayatKelasSiswaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswa?: SiswaUpdateOneRequiredWithoutRiwayatKelasNestedInput
    kelas?: KelasUpdateOneRequiredWithoutRiwayatSiswaNestedInput
    tahunAjaran?: TahunAjaranUpdateOneRequiredWithoutRiwayatSiswaNestedInput
  }

  export type RiwayatKelasSiswaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    kelasId?: StringFieldUpdateOperationsInput | string
    tahunAjaranId?: StringFieldUpdateOperationsInput | string
  }

  export type RiwayatKelasSiswaCreateManyInput = {
    id?: string
    siswaId: string
    kelasId: string
    tahunAjaranId: string
  }

  export type RiwayatKelasSiswaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type RiwayatKelasSiswaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    kelasId?: StringFieldUpdateOperationsInput | string
    tahunAjaranId?: StringFieldUpdateOperationsInput | string
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type GuruNullableScalarRelationFilter = {
    is?: GuruWhereInput | null
    isNot?: GuruWhereInput | null
  }

  export type SiswaNullableScalarRelationFilter = {
    is?: SiswaWhereInput | null
    isNot?: SiswaWhereInput | null
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password?: SortOrder
    nama?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RiwayatKelasSiswaListRelationFilter = {
    every?: RiwayatKelasSiswaWhereInput
    some?: RiwayatKelasSiswaWhereInput
    none?: RiwayatKelasSiswaWhereInput
  }

  export type RiwayatKelasSiswaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TahunAjaranOrderByRelevanceInput = {
    fields: TahunAjaranOrderByRelevanceFieldEnum | TahunAjaranOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TahunAjaranCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    isActive?: SortOrder
  }

  export type TahunAjaranMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    isActive?: SortOrder
  }

  export type TahunAjaranMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    isActive?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type KelasWaliListRelationFilter = {
    every?: KelasWaliWhereInput
    some?: KelasWaliWhereInput
    none?: KelasWaliWhereInput
  }

  export type KelasWaliOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KelasOrderByRelevanceInput = {
    fields: KelasOrderByRelevanceFieldEnum | KelasOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type KelasCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
  }

  export type KelasMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
  }

  export type KelasMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type GuruOrderByRelevanceInput = {
    fields: GuruOrderByRelevanceFieldEnum | GuruOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type GuruCountOrderByAggregateInput = {
    id?: SortOrder
    npp?: SortOrder
    jenisKelamin?: SortOrder
    status?: SortOrder
    userId?: SortOrder
  }

  export type GuruMaxOrderByAggregateInput = {
    id?: SortOrder
    npp?: SortOrder
    jenisKelamin?: SortOrder
    status?: SortOrder
    userId?: SortOrder
  }

  export type GuruMinOrderByAggregateInput = {
    id?: SortOrder
    npp?: SortOrder
    jenisKelamin?: SortOrder
    status?: SortOrder
    userId?: SortOrder
  }

  export type GuruScalarRelationFilter = {
    is?: GuruWhereInput
    isNot?: GuruWhereInput
  }

  export type KelasScalarRelationFilter = {
    is?: KelasWhereInput
    isNot?: KelasWhereInput
  }

  export type KelasWaliOrderByRelevanceInput = {
    fields: KelasWaliOrderByRelevanceFieldEnum | KelasWaliOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type KelasWaliGuruIdKelasIdCompoundUniqueInput = {
    guruId: string
    kelasId: string
  }

  export type KelasWaliCountOrderByAggregateInput = {
    id?: SortOrder
    guruId?: SortOrder
    kelasId?: SortOrder
    createdAt?: SortOrder
  }

  export type KelasWaliMaxOrderByAggregateInput = {
    id?: SortOrder
    guruId?: SortOrder
    kelasId?: SortOrder
    createdAt?: SortOrder
  }

  export type KelasWaliMinOrderByAggregateInput = {
    id?: SortOrder
    guruId?: SortOrder
    kelasId?: SortOrder
    createdAt?: SortOrder
  }

  export type SiswaOrderByRelevanceInput = {
    fields: SiswaOrderByRelevanceFieldEnum | SiswaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SiswaCountOrderByAggregateInput = {
    id?: SortOrder
    nisn?: SortOrder
    nis?: SortOrder
    jenisKelamin?: SortOrder
    userId?: SortOrder
  }

  export type SiswaMaxOrderByAggregateInput = {
    id?: SortOrder
    nisn?: SortOrder
    nis?: SortOrder
    jenisKelamin?: SortOrder
    userId?: SortOrder
  }

  export type SiswaMinOrderByAggregateInput = {
    id?: SortOrder
    nisn?: SortOrder
    nis?: SortOrder
    jenisKelamin?: SortOrder
    userId?: SortOrder
  }

  export type SiswaScalarRelationFilter = {
    is?: SiswaWhereInput
    isNot?: SiswaWhereInput
  }

  export type TahunAjaranScalarRelationFilter = {
    is?: TahunAjaranWhereInput
    isNot?: TahunAjaranWhereInput
  }

  export type RiwayatKelasSiswaOrderByRelevanceInput = {
    fields: RiwayatKelasSiswaOrderByRelevanceFieldEnum | RiwayatKelasSiswaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type RiwayatKelasSiswaSiswaIdTahunAjaranIdCompoundUniqueInput = {
    siswaId: string
    tahunAjaranId: string
  }

  export type RiwayatKelasSiswaCountOrderByAggregateInput = {
    id?: SortOrder
    siswaId?: SortOrder
    kelasId?: SortOrder
    tahunAjaranId?: SortOrder
  }

  export type RiwayatKelasSiswaMaxOrderByAggregateInput = {
    id?: SortOrder
    siswaId?: SortOrder
    kelasId?: SortOrder
    tahunAjaranId?: SortOrder
  }

  export type RiwayatKelasSiswaMinOrderByAggregateInput = {
    id?: SortOrder
    siswaId?: SortOrder
    kelasId?: SortOrder
    tahunAjaranId?: SortOrder
  }

  export type GuruCreateNestedOneWithoutUserInput = {
    create?: XOR<GuruCreateWithoutUserInput, GuruUncheckedCreateWithoutUserInput>
    connectOrCreate?: GuruCreateOrConnectWithoutUserInput
    connect?: GuruWhereUniqueInput
  }

  export type SiswaCreateNestedOneWithoutUserInput = {
    create?: XOR<SiswaCreateWithoutUserInput, SiswaUncheckedCreateWithoutUserInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutUserInput
    connect?: SiswaWhereUniqueInput
  }

  export type GuruUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<GuruCreateWithoutUserInput, GuruUncheckedCreateWithoutUserInput>
    connectOrCreate?: GuruCreateOrConnectWithoutUserInput
    connect?: GuruWhereUniqueInput
  }

  export type SiswaUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<SiswaCreateWithoutUserInput, SiswaUncheckedCreateWithoutUserInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutUserInput
    connect?: SiswaWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GuruUpdateOneWithoutUserNestedInput = {
    create?: XOR<GuruCreateWithoutUserInput, GuruUncheckedCreateWithoutUserInput>
    connectOrCreate?: GuruCreateOrConnectWithoutUserInput
    upsert?: GuruUpsertWithoutUserInput
    disconnect?: GuruWhereInput | boolean
    delete?: GuruWhereInput | boolean
    connect?: GuruWhereUniqueInput
    update?: XOR<XOR<GuruUpdateToOneWithWhereWithoutUserInput, GuruUpdateWithoutUserInput>, GuruUncheckedUpdateWithoutUserInput>
  }

  export type SiswaUpdateOneWithoutUserNestedInput = {
    create?: XOR<SiswaCreateWithoutUserInput, SiswaUncheckedCreateWithoutUserInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutUserInput
    upsert?: SiswaUpsertWithoutUserInput
    disconnect?: SiswaWhereInput | boolean
    delete?: SiswaWhereInput | boolean
    connect?: SiswaWhereUniqueInput
    update?: XOR<XOR<SiswaUpdateToOneWithWhereWithoutUserInput, SiswaUpdateWithoutUserInput>, SiswaUncheckedUpdateWithoutUserInput>
  }

  export type GuruUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<GuruCreateWithoutUserInput, GuruUncheckedCreateWithoutUserInput>
    connectOrCreate?: GuruCreateOrConnectWithoutUserInput
    upsert?: GuruUpsertWithoutUserInput
    disconnect?: GuruWhereInput | boolean
    delete?: GuruWhereInput | boolean
    connect?: GuruWhereUniqueInput
    update?: XOR<XOR<GuruUpdateToOneWithWhereWithoutUserInput, GuruUpdateWithoutUserInput>, GuruUncheckedUpdateWithoutUserInput>
  }

  export type SiswaUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<SiswaCreateWithoutUserInput, SiswaUncheckedCreateWithoutUserInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutUserInput
    upsert?: SiswaUpsertWithoutUserInput
    disconnect?: SiswaWhereInput | boolean
    delete?: SiswaWhereInput | boolean
    connect?: SiswaWhereUniqueInput
    update?: XOR<XOR<SiswaUpdateToOneWithWhereWithoutUserInput, SiswaUpdateWithoutUserInput>, SiswaUncheckedUpdateWithoutUserInput>
  }

  export type RiwayatKelasSiswaCreateNestedManyWithoutTahunAjaranInput = {
    create?: XOR<RiwayatKelasSiswaCreateWithoutTahunAjaranInput, RiwayatKelasSiswaUncheckedCreateWithoutTahunAjaranInput> | RiwayatKelasSiswaCreateWithoutTahunAjaranInput[] | RiwayatKelasSiswaUncheckedCreateWithoutTahunAjaranInput[]
    connectOrCreate?: RiwayatKelasSiswaCreateOrConnectWithoutTahunAjaranInput | RiwayatKelasSiswaCreateOrConnectWithoutTahunAjaranInput[]
    createMany?: RiwayatKelasSiswaCreateManyTahunAjaranInputEnvelope
    connect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
  }

  export type RiwayatKelasSiswaUncheckedCreateNestedManyWithoutTahunAjaranInput = {
    create?: XOR<RiwayatKelasSiswaCreateWithoutTahunAjaranInput, RiwayatKelasSiswaUncheckedCreateWithoutTahunAjaranInput> | RiwayatKelasSiswaCreateWithoutTahunAjaranInput[] | RiwayatKelasSiswaUncheckedCreateWithoutTahunAjaranInput[]
    connectOrCreate?: RiwayatKelasSiswaCreateOrConnectWithoutTahunAjaranInput | RiwayatKelasSiswaCreateOrConnectWithoutTahunAjaranInput[]
    createMany?: RiwayatKelasSiswaCreateManyTahunAjaranInputEnvelope
    connect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RiwayatKelasSiswaUpdateManyWithoutTahunAjaranNestedInput = {
    create?: XOR<RiwayatKelasSiswaCreateWithoutTahunAjaranInput, RiwayatKelasSiswaUncheckedCreateWithoutTahunAjaranInput> | RiwayatKelasSiswaCreateWithoutTahunAjaranInput[] | RiwayatKelasSiswaUncheckedCreateWithoutTahunAjaranInput[]
    connectOrCreate?: RiwayatKelasSiswaCreateOrConnectWithoutTahunAjaranInput | RiwayatKelasSiswaCreateOrConnectWithoutTahunAjaranInput[]
    upsert?: RiwayatKelasSiswaUpsertWithWhereUniqueWithoutTahunAjaranInput | RiwayatKelasSiswaUpsertWithWhereUniqueWithoutTahunAjaranInput[]
    createMany?: RiwayatKelasSiswaCreateManyTahunAjaranInputEnvelope
    set?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    disconnect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    delete?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    connect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    update?: RiwayatKelasSiswaUpdateWithWhereUniqueWithoutTahunAjaranInput | RiwayatKelasSiswaUpdateWithWhereUniqueWithoutTahunAjaranInput[]
    updateMany?: RiwayatKelasSiswaUpdateManyWithWhereWithoutTahunAjaranInput | RiwayatKelasSiswaUpdateManyWithWhereWithoutTahunAjaranInput[]
    deleteMany?: RiwayatKelasSiswaScalarWhereInput | RiwayatKelasSiswaScalarWhereInput[]
  }

  export type RiwayatKelasSiswaUncheckedUpdateManyWithoutTahunAjaranNestedInput = {
    create?: XOR<RiwayatKelasSiswaCreateWithoutTahunAjaranInput, RiwayatKelasSiswaUncheckedCreateWithoutTahunAjaranInput> | RiwayatKelasSiswaCreateWithoutTahunAjaranInput[] | RiwayatKelasSiswaUncheckedCreateWithoutTahunAjaranInput[]
    connectOrCreate?: RiwayatKelasSiswaCreateOrConnectWithoutTahunAjaranInput | RiwayatKelasSiswaCreateOrConnectWithoutTahunAjaranInput[]
    upsert?: RiwayatKelasSiswaUpsertWithWhereUniqueWithoutTahunAjaranInput | RiwayatKelasSiswaUpsertWithWhereUniqueWithoutTahunAjaranInput[]
    createMany?: RiwayatKelasSiswaCreateManyTahunAjaranInputEnvelope
    set?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    disconnect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    delete?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    connect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    update?: RiwayatKelasSiswaUpdateWithWhereUniqueWithoutTahunAjaranInput | RiwayatKelasSiswaUpdateWithWhereUniqueWithoutTahunAjaranInput[]
    updateMany?: RiwayatKelasSiswaUpdateManyWithWhereWithoutTahunAjaranInput | RiwayatKelasSiswaUpdateManyWithWhereWithoutTahunAjaranInput[]
    deleteMany?: RiwayatKelasSiswaScalarWhereInput | RiwayatKelasSiswaScalarWhereInput[]
  }

  export type RiwayatKelasSiswaCreateNestedManyWithoutKelasInput = {
    create?: XOR<RiwayatKelasSiswaCreateWithoutKelasInput, RiwayatKelasSiswaUncheckedCreateWithoutKelasInput> | RiwayatKelasSiswaCreateWithoutKelasInput[] | RiwayatKelasSiswaUncheckedCreateWithoutKelasInput[]
    connectOrCreate?: RiwayatKelasSiswaCreateOrConnectWithoutKelasInput | RiwayatKelasSiswaCreateOrConnectWithoutKelasInput[]
    createMany?: RiwayatKelasSiswaCreateManyKelasInputEnvelope
    connect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
  }

  export type KelasWaliCreateNestedManyWithoutKelasInput = {
    create?: XOR<KelasWaliCreateWithoutKelasInput, KelasWaliUncheckedCreateWithoutKelasInput> | KelasWaliCreateWithoutKelasInput[] | KelasWaliUncheckedCreateWithoutKelasInput[]
    connectOrCreate?: KelasWaliCreateOrConnectWithoutKelasInput | KelasWaliCreateOrConnectWithoutKelasInput[]
    createMany?: KelasWaliCreateManyKelasInputEnvelope
    connect?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
  }

  export type RiwayatKelasSiswaUncheckedCreateNestedManyWithoutKelasInput = {
    create?: XOR<RiwayatKelasSiswaCreateWithoutKelasInput, RiwayatKelasSiswaUncheckedCreateWithoutKelasInput> | RiwayatKelasSiswaCreateWithoutKelasInput[] | RiwayatKelasSiswaUncheckedCreateWithoutKelasInput[]
    connectOrCreate?: RiwayatKelasSiswaCreateOrConnectWithoutKelasInput | RiwayatKelasSiswaCreateOrConnectWithoutKelasInput[]
    createMany?: RiwayatKelasSiswaCreateManyKelasInputEnvelope
    connect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
  }

  export type KelasWaliUncheckedCreateNestedManyWithoutKelasInput = {
    create?: XOR<KelasWaliCreateWithoutKelasInput, KelasWaliUncheckedCreateWithoutKelasInput> | KelasWaliCreateWithoutKelasInput[] | KelasWaliUncheckedCreateWithoutKelasInput[]
    connectOrCreate?: KelasWaliCreateOrConnectWithoutKelasInput | KelasWaliCreateOrConnectWithoutKelasInput[]
    createMany?: KelasWaliCreateManyKelasInputEnvelope
    connect?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
  }

  export type RiwayatKelasSiswaUpdateManyWithoutKelasNestedInput = {
    create?: XOR<RiwayatKelasSiswaCreateWithoutKelasInput, RiwayatKelasSiswaUncheckedCreateWithoutKelasInput> | RiwayatKelasSiswaCreateWithoutKelasInput[] | RiwayatKelasSiswaUncheckedCreateWithoutKelasInput[]
    connectOrCreate?: RiwayatKelasSiswaCreateOrConnectWithoutKelasInput | RiwayatKelasSiswaCreateOrConnectWithoutKelasInput[]
    upsert?: RiwayatKelasSiswaUpsertWithWhereUniqueWithoutKelasInput | RiwayatKelasSiswaUpsertWithWhereUniqueWithoutKelasInput[]
    createMany?: RiwayatKelasSiswaCreateManyKelasInputEnvelope
    set?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    disconnect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    delete?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    connect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    update?: RiwayatKelasSiswaUpdateWithWhereUniqueWithoutKelasInput | RiwayatKelasSiswaUpdateWithWhereUniqueWithoutKelasInput[]
    updateMany?: RiwayatKelasSiswaUpdateManyWithWhereWithoutKelasInput | RiwayatKelasSiswaUpdateManyWithWhereWithoutKelasInput[]
    deleteMany?: RiwayatKelasSiswaScalarWhereInput | RiwayatKelasSiswaScalarWhereInput[]
  }

  export type KelasWaliUpdateManyWithoutKelasNestedInput = {
    create?: XOR<KelasWaliCreateWithoutKelasInput, KelasWaliUncheckedCreateWithoutKelasInput> | KelasWaliCreateWithoutKelasInput[] | KelasWaliUncheckedCreateWithoutKelasInput[]
    connectOrCreate?: KelasWaliCreateOrConnectWithoutKelasInput | KelasWaliCreateOrConnectWithoutKelasInput[]
    upsert?: KelasWaliUpsertWithWhereUniqueWithoutKelasInput | KelasWaliUpsertWithWhereUniqueWithoutKelasInput[]
    createMany?: KelasWaliCreateManyKelasInputEnvelope
    set?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    disconnect?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    delete?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    connect?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    update?: KelasWaliUpdateWithWhereUniqueWithoutKelasInput | KelasWaliUpdateWithWhereUniqueWithoutKelasInput[]
    updateMany?: KelasWaliUpdateManyWithWhereWithoutKelasInput | KelasWaliUpdateManyWithWhereWithoutKelasInput[]
    deleteMany?: KelasWaliScalarWhereInput | KelasWaliScalarWhereInput[]
  }

  export type RiwayatKelasSiswaUncheckedUpdateManyWithoutKelasNestedInput = {
    create?: XOR<RiwayatKelasSiswaCreateWithoutKelasInput, RiwayatKelasSiswaUncheckedCreateWithoutKelasInput> | RiwayatKelasSiswaCreateWithoutKelasInput[] | RiwayatKelasSiswaUncheckedCreateWithoutKelasInput[]
    connectOrCreate?: RiwayatKelasSiswaCreateOrConnectWithoutKelasInput | RiwayatKelasSiswaCreateOrConnectWithoutKelasInput[]
    upsert?: RiwayatKelasSiswaUpsertWithWhereUniqueWithoutKelasInput | RiwayatKelasSiswaUpsertWithWhereUniqueWithoutKelasInput[]
    createMany?: RiwayatKelasSiswaCreateManyKelasInputEnvelope
    set?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    disconnect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    delete?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    connect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    update?: RiwayatKelasSiswaUpdateWithWhereUniqueWithoutKelasInput | RiwayatKelasSiswaUpdateWithWhereUniqueWithoutKelasInput[]
    updateMany?: RiwayatKelasSiswaUpdateManyWithWhereWithoutKelasInput | RiwayatKelasSiswaUpdateManyWithWhereWithoutKelasInput[]
    deleteMany?: RiwayatKelasSiswaScalarWhereInput | RiwayatKelasSiswaScalarWhereInput[]
  }

  export type KelasWaliUncheckedUpdateManyWithoutKelasNestedInput = {
    create?: XOR<KelasWaliCreateWithoutKelasInput, KelasWaliUncheckedCreateWithoutKelasInput> | KelasWaliCreateWithoutKelasInput[] | KelasWaliUncheckedCreateWithoutKelasInput[]
    connectOrCreate?: KelasWaliCreateOrConnectWithoutKelasInput | KelasWaliCreateOrConnectWithoutKelasInput[]
    upsert?: KelasWaliUpsertWithWhereUniqueWithoutKelasInput | KelasWaliUpsertWithWhereUniqueWithoutKelasInput[]
    createMany?: KelasWaliCreateManyKelasInputEnvelope
    set?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    disconnect?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    delete?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    connect?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    update?: KelasWaliUpdateWithWhereUniqueWithoutKelasInput | KelasWaliUpdateWithWhereUniqueWithoutKelasInput[]
    updateMany?: KelasWaliUpdateManyWithWhereWithoutKelasInput | KelasWaliUpdateManyWithWhereWithoutKelasInput[]
    deleteMany?: KelasWaliScalarWhereInput | KelasWaliScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGuruInput = {
    create?: XOR<UserCreateWithoutGuruInput, UserUncheckedCreateWithoutGuruInput>
    connectOrCreate?: UserCreateOrConnectWithoutGuruInput
    connect?: UserWhereUniqueInput
  }

  export type KelasWaliCreateNestedManyWithoutGuruInput = {
    create?: XOR<KelasWaliCreateWithoutGuruInput, KelasWaliUncheckedCreateWithoutGuruInput> | KelasWaliCreateWithoutGuruInput[] | KelasWaliUncheckedCreateWithoutGuruInput[]
    connectOrCreate?: KelasWaliCreateOrConnectWithoutGuruInput | KelasWaliCreateOrConnectWithoutGuruInput[]
    createMany?: KelasWaliCreateManyGuruInputEnvelope
    connect?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
  }

  export type KelasWaliUncheckedCreateNestedManyWithoutGuruInput = {
    create?: XOR<KelasWaliCreateWithoutGuruInput, KelasWaliUncheckedCreateWithoutGuruInput> | KelasWaliCreateWithoutGuruInput[] | KelasWaliUncheckedCreateWithoutGuruInput[]
    connectOrCreate?: KelasWaliCreateOrConnectWithoutGuruInput | KelasWaliCreateOrConnectWithoutGuruInput[]
    createMany?: KelasWaliCreateManyGuruInputEnvelope
    connect?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutGuruNestedInput = {
    create?: XOR<UserCreateWithoutGuruInput, UserUncheckedCreateWithoutGuruInput>
    connectOrCreate?: UserCreateOrConnectWithoutGuruInput
    upsert?: UserUpsertWithoutGuruInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGuruInput, UserUpdateWithoutGuruInput>, UserUncheckedUpdateWithoutGuruInput>
  }

  export type KelasWaliUpdateManyWithoutGuruNestedInput = {
    create?: XOR<KelasWaliCreateWithoutGuruInput, KelasWaliUncheckedCreateWithoutGuruInput> | KelasWaliCreateWithoutGuruInput[] | KelasWaliUncheckedCreateWithoutGuruInput[]
    connectOrCreate?: KelasWaliCreateOrConnectWithoutGuruInput | KelasWaliCreateOrConnectWithoutGuruInput[]
    upsert?: KelasWaliUpsertWithWhereUniqueWithoutGuruInput | KelasWaliUpsertWithWhereUniqueWithoutGuruInput[]
    createMany?: KelasWaliCreateManyGuruInputEnvelope
    set?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    disconnect?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    delete?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    connect?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    update?: KelasWaliUpdateWithWhereUniqueWithoutGuruInput | KelasWaliUpdateWithWhereUniqueWithoutGuruInput[]
    updateMany?: KelasWaliUpdateManyWithWhereWithoutGuruInput | KelasWaliUpdateManyWithWhereWithoutGuruInput[]
    deleteMany?: KelasWaliScalarWhereInput | KelasWaliScalarWhereInput[]
  }

  export type KelasWaliUncheckedUpdateManyWithoutGuruNestedInput = {
    create?: XOR<KelasWaliCreateWithoutGuruInput, KelasWaliUncheckedCreateWithoutGuruInput> | KelasWaliCreateWithoutGuruInput[] | KelasWaliUncheckedCreateWithoutGuruInput[]
    connectOrCreate?: KelasWaliCreateOrConnectWithoutGuruInput | KelasWaliCreateOrConnectWithoutGuruInput[]
    upsert?: KelasWaliUpsertWithWhereUniqueWithoutGuruInput | KelasWaliUpsertWithWhereUniqueWithoutGuruInput[]
    createMany?: KelasWaliCreateManyGuruInputEnvelope
    set?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    disconnect?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    delete?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    connect?: KelasWaliWhereUniqueInput | KelasWaliWhereUniqueInput[]
    update?: KelasWaliUpdateWithWhereUniqueWithoutGuruInput | KelasWaliUpdateWithWhereUniqueWithoutGuruInput[]
    updateMany?: KelasWaliUpdateManyWithWhereWithoutGuruInput | KelasWaliUpdateManyWithWhereWithoutGuruInput[]
    deleteMany?: KelasWaliScalarWhereInput | KelasWaliScalarWhereInput[]
  }

  export type GuruCreateNestedOneWithoutWaliKelasDiInput = {
    create?: XOR<GuruCreateWithoutWaliKelasDiInput, GuruUncheckedCreateWithoutWaliKelasDiInput>
    connectOrCreate?: GuruCreateOrConnectWithoutWaliKelasDiInput
    connect?: GuruWhereUniqueInput
  }

  export type KelasCreateNestedOneWithoutWaliKelasInput = {
    create?: XOR<KelasCreateWithoutWaliKelasInput, KelasUncheckedCreateWithoutWaliKelasInput>
    connectOrCreate?: KelasCreateOrConnectWithoutWaliKelasInput
    connect?: KelasWhereUniqueInput
  }

  export type GuruUpdateOneRequiredWithoutWaliKelasDiNestedInput = {
    create?: XOR<GuruCreateWithoutWaliKelasDiInput, GuruUncheckedCreateWithoutWaliKelasDiInput>
    connectOrCreate?: GuruCreateOrConnectWithoutWaliKelasDiInput
    upsert?: GuruUpsertWithoutWaliKelasDiInput
    connect?: GuruWhereUniqueInput
    update?: XOR<XOR<GuruUpdateToOneWithWhereWithoutWaliKelasDiInput, GuruUpdateWithoutWaliKelasDiInput>, GuruUncheckedUpdateWithoutWaliKelasDiInput>
  }

  export type KelasUpdateOneRequiredWithoutWaliKelasNestedInput = {
    create?: XOR<KelasCreateWithoutWaliKelasInput, KelasUncheckedCreateWithoutWaliKelasInput>
    connectOrCreate?: KelasCreateOrConnectWithoutWaliKelasInput
    upsert?: KelasUpsertWithoutWaliKelasInput
    connect?: KelasWhereUniqueInput
    update?: XOR<XOR<KelasUpdateToOneWithWhereWithoutWaliKelasInput, KelasUpdateWithoutWaliKelasInput>, KelasUncheckedUpdateWithoutWaliKelasInput>
  }

  export type UserCreateNestedOneWithoutSiswaInput = {
    create?: XOR<UserCreateWithoutSiswaInput, UserUncheckedCreateWithoutSiswaInput>
    connectOrCreate?: UserCreateOrConnectWithoutSiswaInput
    connect?: UserWhereUniqueInput
  }

  export type RiwayatKelasSiswaCreateNestedManyWithoutSiswaInput = {
    create?: XOR<RiwayatKelasSiswaCreateWithoutSiswaInput, RiwayatKelasSiswaUncheckedCreateWithoutSiswaInput> | RiwayatKelasSiswaCreateWithoutSiswaInput[] | RiwayatKelasSiswaUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: RiwayatKelasSiswaCreateOrConnectWithoutSiswaInput | RiwayatKelasSiswaCreateOrConnectWithoutSiswaInput[]
    createMany?: RiwayatKelasSiswaCreateManySiswaInputEnvelope
    connect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
  }

  export type RiwayatKelasSiswaUncheckedCreateNestedManyWithoutSiswaInput = {
    create?: XOR<RiwayatKelasSiswaCreateWithoutSiswaInput, RiwayatKelasSiswaUncheckedCreateWithoutSiswaInput> | RiwayatKelasSiswaCreateWithoutSiswaInput[] | RiwayatKelasSiswaUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: RiwayatKelasSiswaCreateOrConnectWithoutSiswaInput | RiwayatKelasSiswaCreateOrConnectWithoutSiswaInput[]
    createMany?: RiwayatKelasSiswaCreateManySiswaInputEnvelope
    connect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutSiswaNestedInput = {
    create?: XOR<UserCreateWithoutSiswaInput, UserUncheckedCreateWithoutSiswaInput>
    connectOrCreate?: UserCreateOrConnectWithoutSiswaInput
    upsert?: UserUpsertWithoutSiswaInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSiswaInput, UserUpdateWithoutSiswaInput>, UserUncheckedUpdateWithoutSiswaInput>
  }

  export type RiwayatKelasSiswaUpdateManyWithoutSiswaNestedInput = {
    create?: XOR<RiwayatKelasSiswaCreateWithoutSiswaInput, RiwayatKelasSiswaUncheckedCreateWithoutSiswaInput> | RiwayatKelasSiswaCreateWithoutSiswaInput[] | RiwayatKelasSiswaUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: RiwayatKelasSiswaCreateOrConnectWithoutSiswaInput | RiwayatKelasSiswaCreateOrConnectWithoutSiswaInput[]
    upsert?: RiwayatKelasSiswaUpsertWithWhereUniqueWithoutSiswaInput | RiwayatKelasSiswaUpsertWithWhereUniqueWithoutSiswaInput[]
    createMany?: RiwayatKelasSiswaCreateManySiswaInputEnvelope
    set?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    disconnect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    delete?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    connect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    update?: RiwayatKelasSiswaUpdateWithWhereUniqueWithoutSiswaInput | RiwayatKelasSiswaUpdateWithWhereUniqueWithoutSiswaInput[]
    updateMany?: RiwayatKelasSiswaUpdateManyWithWhereWithoutSiswaInput | RiwayatKelasSiswaUpdateManyWithWhereWithoutSiswaInput[]
    deleteMany?: RiwayatKelasSiswaScalarWhereInput | RiwayatKelasSiswaScalarWhereInput[]
  }

  export type RiwayatKelasSiswaUncheckedUpdateManyWithoutSiswaNestedInput = {
    create?: XOR<RiwayatKelasSiswaCreateWithoutSiswaInput, RiwayatKelasSiswaUncheckedCreateWithoutSiswaInput> | RiwayatKelasSiswaCreateWithoutSiswaInput[] | RiwayatKelasSiswaUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: RiwayatKelasSiswaCreateOrConnectWithoutSiswaInput | RiwayatKelasSiswaCreateOrConnectWithoutSiswaInput[]
    upsert?: RiwayatKelasSiswaUpsertWithWhereUniqueWithoutSiswaInput | RiwayatKelasSiswaUpsertWithWhereUniqueWithoutSiswaInput[]
    createMany?: RiwayatKelasSiswaCreateManySiswaInputEnvelope
    set?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    disconnect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    delete?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    connect?: RiwayatKelasSiswaWhereUniqueInput | RiwayatKelasSiswaWhereUniqueInput[]
    update?: RiwayatKelasSiswaUpdateWithWhereUniqueWithoutSiswaInput | RiwayatKelasSiswaUpdateWithWhereUniqueWithoutSiswaInput[]
    updateMany?: RiwayatKelasSiswaUpdateManyWithWhereWithoutSiswaInput | RiwayatKelasSiswaUpdateManyWithWhereWithoutSiswaInput[]
    deleteMany?: RiwayatKelasSiswaScalarWhereInput | RiwayatKelasSiswaScalarWhereInput[]
  }

  export type SiswaCreateNestedOneWithoutRiwayatKelasInput = {
    create?: XOR<SiswaCreateWithoutRiwayatKelasInput, SiswaUncheckedCreateWithoutRiwayatKelasInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutRiwayatKelasInput
    connect?: SiswaWhereUniqueInput
  }

  export type KelasCreateNestedOneWithoutRiwayatSiswaInput = {
    create?: XOR<KelasCreateWithoutRiwayatSiswaInput, KelasUncheckedCreateWithoutRiwayatSiswaInput>
    connectOrCreate?: KelasCreateOrConnectWithoutRiwayatSiswaInput
    connect?: KelasWhereUniqueInput
  }

  export type TahunAjaranCreateNestedOneWithoutRiwayatSiswaInput = {
    create?: XOR<TahunAjaranCreateWithoutRiwayatSiswaInput, TahunAjaranUncheckedCreateWithoutRiwayatSiswaInput>
    connectOrCreate?: TahunAjaranCreateOrConnectWithoutRiwayatSiswaInput
    connect?: TahunAjaranWhereUniqueInput
  }

  export type SiswaUpdateOneRequiredWithoutRiwayatKelasNestedInput = {
    create?: XOR<SiswaCreateWithoutRiwayatKelasInput, SiswaUncheckedCreateWithoutRiwayatKelasInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutRiwayatKelasInput
    upsert?: SiswaUpsertWithoutRiwayatKelasInput
    connect?: SiswaWhereUniqueInput
    update?: XOR<XOR<SiswaUpdateToOneWithWhereWithoutRiwayatKelasInput, SiswaUpdateWithoutRiwayatKelasInput>, SiswaUncheckedUpdateWithoutRiwayatKelasInput>
  }

  export type KelasUpdateOneRequiredWithoutRiwayatSiswaNestedInput = {
    create?: XOR<KelasCreateWithoutRiwayatSiswaInput, KelasUncheckedCreateWithoutRiwayatSiswaInput>
    connectOrCreate?: KelasCreateOrConnectWithoutRiwayatSiswaInput
    upsert?: KelasUpsertWithoutRiwayatSiswaInput
    connect?: KelasWhereUniqueInput
    update?: XOR<XOR<KelasUpdateToOneWithWhereWithoutRiwayatSiswaInput, KelasUpdateWithoutRiwayatSiswaInput>, KelasUncheckedUpdateWithoutRiwayatSiswaInput>
  }

  export type TahunAjaranUpdateOneRequiredWithoutRiwayatSiswaNestedInput = {
    create?: XOR<TahunAjaranCreateWithoutRiwayatSiswaInput, TahunAjaranUncheckedCreateWithoutRiwayatSiswaInput>
    connectOrCreate?: TahunAjaranCreateOrConnectWithoutRiwayatSiswaInput
    upsert?: TahunAjaranUpsertWithoutRiwayatSiswaInput
    connect?: TahunAjaranWhereUniqueInput
    update?: XOR<XOR<TahunAjaranUpdateToOneWithWhereWithoutRiwayatSiswaInput, TahunAjaranUpdateWithoutRiwayatSiswaInput>, TahunAjaranUncheckedUpdateWithoutRiwayatSiswaInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type GuruCreateWithoutUserInput = {
    id?: string
    npp: string
    jenisKelamin: string
    status?: boolean
    waliKelasDi?: KelasWaliCreateNestedManyWithoutGuruInput
  }

  export type GuruUncheckedCreateWithoutUserInput = {
    id?: string
    npp: string
    jenisKelamin: string
    status?: boolean
    waliKelasDi?: KelasWaliUncheckedCreateNestedManyWithoutGuruInput
  }

  export type GuruCreateOrConnectWithoutUserInput = {
    where: GuruWhereUniqueInput
    create: XOR<GuruCreateWithoutUserInput, GuruUncheckedCreateWithoutUserInput>
  }

  export type SiswaCreateWithoutUserInput = {
    id?: string
    nisn: string
    nis: string
    jenisKelamin: string
    riwayatKelas?: RiwayatKelasSiswaCreateNestedManyWithoutSiswaInput
  }

  export type SiswaUncheckedCreateWithoutUserInput = {
    id?: string
    nisn: string
    nis: string
    jenisKelamin: string
    riwayatKelas?: RiwayatKelasSiswaUncheckedCreateNestedManyWithoutSiswaInput
  }

  export type SiswaCreateOrConnectWithoutUserInput = {
    where: SiswaWhereUniqueInput
    create: XOR<SiswaCreateWithoutUserInput, SiswaUncheckedCreateWithoutUserInput>
  }

  export type GuruUpsertWithoutUserInput = {
    update: XOR<GuruUpdateWithoutUserInput, GuruUncheckedUpdateWithoutUserInput>
    create: XOR<GuruCreateWithoutUserInput, GuruUncheckedCreateWithoutUserInput>
    where?: GuruWhereInput
  }

  export type GuruUpdateToOneWithWhereWithoutUserInput = {
    where?: GuruWhereInput
    data: XOR<GuruUpdateWithoutUserInput, GuruUncheckedUpdateWithoutUserInput>
  }

  export type GuruUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    npp?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    waliKelasDi?: KelasWaliUpdateManyWithoutGuruNestedInput
  }

  export type GuruUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    npp?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    waliKelasDi?: KelasWaliUncheckedUpdateManyWithoutGuruNestedInput
  }

  export type SiswaUpsertWithoutUserInput = {
    update: XOR<SiswaUpdateWithoutUserInput, SiswaUncheckedUpdateWithoutUserInput>
    create: XOR<SiswaCreateWithoutUserInput, SiswaUncheckedCreateWithoutUserInput>
    where?: SiswaWhereInput
  }

  export type SiswaUpdateToOneWithWhereWithoutUserInput = {
    where?: SiswaWhereInput
    data: XOR<SiswaUpdateWithoutUserInput, SiswaUncheckedUpdateWithoutUserInput>
  }

  export type SiswaUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nis?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    riwayatKelas?: RiwayatKelasSiswaUpdateManyWithoutSiswaNestedInput
  }

  export type SiswaUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nis?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    riwayatKelas?: RiwayatKelasSiswaUncheckedUpdateManyWithoutSiswaNestedInput
  }

  export type RiwayatKelasSiswaCreateWithoutTahunAjaranInput = {
    id?: string
    siswa: SiswaCreateNestedOneWithoutRiwayatKelasInput
    kelas: KelasCreateNestedOneWithoutRiwayatSiswaInput
  }

  export type RiwayatKelasSiswaUncheckedCreateWithoutTahunAjaranInput = {
    id?: string
    siswaId: string
    kelasId: string
  }

  export type RiwayatKelasSiswaCreateOrConnectWithoutTahunAjaranInput = {
    where: RiwayatKelasSiswaWhereUniqueInput
    create: XOR<RiwayatKelasSiswaCreateWithoutTahunAjaranInput, RiwayatKelasSiswaUncheckedCreateWithoutTahunAjaranInput>
  }

  export type RiwayatKelasSiswaCreateManyTahunAjaranInputEnvelope = {
    data: RiwayatKelasSiswaCreateManyTahunAjaranInput | RiwayatKelasSiswaCreateManyTahunAjaranInput[]
    skipDuplicates?: boolean
  }

  export type RiwayatKelasSiswaUpsertWithWhereUniqueWithoutTahunAjaranInput = {
    where: RiwayatKelasSiswaWhereUniqueInput
    update: XOR<RiwayatKelasSiswaUpdateWithoutTahunAjaranInput, RiwayatKelasSiswaUncheckedUpdateWithoutTahunAjaranInput>
    create: XOR<RiwayatKelasSiswaCreateWithoutTahunAjaranInput, RiwayatKelasSiswaUncheckedCreateWithoutTahunAjaranInput>
  }

  export type RiwayatKelasSiswaUpdateWithWhereUniqueWithoutTahunAjaranInput = {
    where: RiwayatKelasSiswaWhereUniqueInput
    data: XOR<RiwayatKelasSiswaUpdateWithoutTahunAjaranInput, RiwayatKelasSiswaUncheckedUpdateWithoutTahunAjaranInput>
  }

  export type RiwayatKelasSiswaUpdateManyWithWhereWithoutTahunAjaranInput = {
    where: RiwayatKelasSiswaScalarWhereInput
    data: XOR<RiwayatKelasSiswaUpdateManyMutationInput, RiwayatKelasSiswaUncheckedUpdateManyWithoutTahunAjaranInput>
  }

  export type RiwayatKelasSiswaScalarWhereInput = {
    AND?: RiwayatKelasSiswaScalarWhereInput | RiwayatKelasSiswaScalarWhereInput[]
    OR?: RiwayatKelasSiswaScalarWhereInput[]
    NOT?: RiwayatKelasSiswaScalarWhereInput | RiwayatKelasSiswaScalarWhereInput[]
    id?: StringFilter<"RiwayatKelasSiswa"> | string
    siswaId?: StringFilter<"RiwayatKelasSiswa"> | string
    kelasId?: StringFilter<"RiwayatKelasSiswa"> | string
    tahunAjaranId?: StringFilter<"RiwayatKelasSiswa"> | string
  }

  export type RiwayatKelasSiswaCreateWithoutKelasInput = {
    id?: string
    siswa: SiswaCreateNestedOneWithoutRiwayatKelasInput
    tahunAjaran: TahunAjaranCreateNestedOneWithoutRiwayatSiswaInput
  }

  export type RiwayatKelasSiswaUncheckedCreateWithoutKelasInput = {
    id?: string
    siswaId: string
    tahunAjaranId: string
  }

  export type RiwayatKelasSiswaCreateOrConnectWithoutKelasInput = {
    where: RiwayatKelasSiswaWhereUniqueInput
    create: XOR<RiwayatKelasSiswaCreateWithoutKelasInput, RiwayatKelasSiswaUncheckedCreateWithoutKelasInput>
  }

  export type RiwayatKelasSiswaCreateManyKelasInputEnvelope = {
    data: RiwayatKelasSiswaCreateManyKelasInput | RiwayatKelasSiswaCreateManyKelasInput[]
    skipDuplicates?: boolean
  }

  export type KelasWaliCreateWithoutKelasInput = {
    id?: string
    createdAt?: Date | string
    guru: GuruCreateNestedOneWithoutWaliKelasDiInput
  }

  export type KelasWaliUncheckedCreateWithoutKelasInput = {
    id?: string
    guruId: string
    createdAt?: Date | string
  }

  export type KelasWaliCreateOrConnectWithoutKelasInput = {
    where: KelasWaliWhereUniqueInput
    create: XOR<KelasWaliCreateWithoutKelasInput, KelasWaliUncheckedCreateWithoutKelasInput>
  }

  export type KelasWaliCreateManyKelasInputEnvelope = {
    data: KelasWaliCreateManyKelasInput | KelasWaliCreateManyKelasInput[]
    skipDuplicates?: boolean
  }

  export type RiwayatKelasSiswaUpsertWithWhereUniqueWithoutKelasInput = {
    where: RiwayatKelasSiswaWhereUniqueInput
    update: XOR<RiwayatKelasSiswaUpdateWithoutKelasInput, RiwayatKelasSiswaUncheckedUpdateWithoutKelasInput>
    create: XOR<RiwayatKelasSiswaCreateWithoutKelasInput, RiwayatKelasSiswaUncheckedCreateWithoutKelasInput>
  }

  export type RiwayatKelasSiswaUpdateWithWhereUniqueWithoutKelasInput = {
    where: RiwayatKelasSiswaWhereUniqueInput
    data: XOR<RiwayatKelasSiswaUpdateWithoutKelasInput, RiwayatKelasSiswaUncheckedUpdateWithoutKelasInput>
  }

  export type RiwayatKelasSiswaUpdateManyWithWhereWithoutKelasInput = {
    where: RiwayatKelasSiswaScalarWhereInput
    data: XOR<RiwayatKelasSiswaUpdateManyMutationInput, RiwayatKelasSiswaUncheckedUpdateManyWithoutKelasInput>
  }

  export type KelasWaliUpsertWithWhereUniqueWithoutKelasInput = {
    where: KelasWaliWhereUniqueInput
    update: XOR<KelasWaliUpdateWithoutKelasInput, KelasWaliUncheckedUpdateWithoutKelasInput>
    create: XOR<KelasWaliCreateWithoutKelasInput, KelasWaliUncheckedCreateWithoutKelasInput>
  }

  export type KelasWaliUpdateWithWhereUniqueWithoutKelasInput = {
    where: KelasWaliWhereUniqueInput
    data: XOR<KelasWaliUpdateWithoutKelasInput, KelasWaliUncheckedUpdateWithoutKelasInput>
  }

  export type KelasWaliUpdateManyWithWhereWithoutKelasInput = {
    where: KelasWaliScalarWhereInput
    data: XOR<KelasWaliUpdateManyMutationInput, KelasWaliUncheckedUpdateManyWithoutKelasInput>
  }

  export type KelasWaliScalarWhereInput = {
    AND?: KelasWaliScalarWhereInput | KelasWaliScalarWhereInput[]
    OR?: KelasWaliScalarWhereInput[]
    NOT?: KelasWaliScalarWhereInput | KelasWaliScalarWhereInput[]
    id?: StringFilter<"KelasWali"> | string
    guruId?: StringFilter<"KelasWali"> | string
    kelasId?: StringFilter<"KelasWali"> | string
    createdAt?: DateTimeFilter<"KelasWali"> | Date | string
  }

  export type UserCreateWithoutGuruInput = {
    id?: string
    username: string
    password: string
    nama: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa?: SiswaCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGuruInput = {
    id?: string
    username: string
    password: string
    nama: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa?: SiswaUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGuruInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGuruInput, UserUncheckedCreateWithoutGuruInput>
  }

  export type KelasWaliCreateWithoutGuruInput = {
    id?: string
    createdAt?: Date | string
    kelas: KelasCreateNestedOneWithoutWaliKelasInput
  }

  export type KelasWaliUncheckedCreateWithoutGuruInput = {
    id?: string
    kelasId: string
    createdAt?: Date | string
  }

  export type KelasWaliCreateOrConnectWithoutGuruInput = {
    where: KelasWaliWhereUniqueInput
    create: XOR<KelasWaliCreateWithoutGuruInput, KelasWaliUncheckedCreateWithoutGuruInput>
  }

  export type KelasWaliCreateManyGuruInputEnvelope = {
    data: KelasWaliCreateManyGuruInput | KelasWaliCreateManyGuruInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutGuruInput = {
    update: XOR<UserUpdateWithoutGuruInput, UserUncheckedUpdateWithoutGuruInput>
    create: XOR<UserCreateWithoutGuruInput, UserUncheckedCreateWithoutGuruInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGuruInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGuruInput, UserUncheckedUpdateWithoutGuruInput>
  }

  export type UserUpdateWithoutGuruInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGuruInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUncheckedUpdateOneWithoutUserNestedInput
  }

  export type KelasWaliUpsertWithWhereUniqueWithoutGuruInput = {
    where: KelasWaliWhereUniqueInput
    update: XOR<KelasWaliUpdateWithoutGuruInput, KelasWaliUncheckedUpdateWithoutGuruInput>
    create: XOR<KelasWaliCreateWithoutGuruInput, KelasWaliUncheckedCreateWithoutGuruInput>
  }

  export type KelasWaliUpdateWithWhereUniqueWithoutGuruInput = {
    where: KelasWaliWhereUniqueInput
    data: XOR<KelasWaliUpdateWithoutGuruInput, KelasWaliUncheckedUpdateWithoutGuruInput>
  }

  export type KelasWaliUpdateManyWithWhereWithoutGuruInput = {
    where: KelasWaliScalarWhereInput
    data: XOR<KelasWaliUpdateManyMutationInput, KelasWaliUncheckedUpdateManyWithoutGuruInput>
  }

  export type GuruCreateWithoutWaliKelasDiInput = {
    id?: string
    npp: string
    jenisKelamin: string
    status?: boolean
    user: UserCreateNestedOneWithoutGuruInput
  }

  export type GuruUncheckedCreateWithoutWaliKelasDiInput = {
    id?: string
    npp: string
    jenisKelamin: string
    status?: boolean
    userId: string
  }

  export type GuruCreateOrConnectWithoutWaliKelasDiInput = {
    where: GuruWhereUniqueInput
    create: XOR<GuruCreateWithoutWaliKelasDiInput, GuruUncheckedCreateWithoutWaliKelasDiInput>
  }

  export type KelasCreateWithoutWaliKelasInput = {
    id?: string
    nama: string
    riwayatSiswa?: RiwayatKelasSiswaCreateNestedManyWithoutKelasInput
  }

  export type KelasUncheckedCreateWithoutWaliKelasInput = {
    id?: string
    nama: string
    riwayatSiswa?: RiwayatKelasSiswaUncheckedCreateNestedManyWithoutKelasInput
  }

  export type KelasCreateOrConnectWithoutWaliKelasInput = {
    where: KelasWhereUniqueInput
    create: XOR<KelasCreateWithoutWaliKelasInput, KelasUncheckedCreateWithoutWaliKelasInput>
  }

  export type GuruUpsertWithoutWaliKelasDiInput = {
    update: XOR<GuruUpdateWithoutWaliKelasDiInput, GuruUncheckedUpdateWithoutWaliKelasDiInput>
    create: XOR<GuruCreateWithoutWaliKelasDiInput, GuruUncheckedCreateWithoutWaliKelasDiInput>
    where?: GuruWhereInput
  }

  export type GuruUpdateToOneWithWhereWithoutWaliKelasDiInput = {
    where?: GuruWhereInput
    data: XOR<GuruUpdateWithoutWaliKelasDiInput, GuruUncheckedUpdateWithoutWaliKelasDiInput>
  }

  export type GuruUpdateWithoutWaliKelasDiInput = {
    id?: StringFieldUpdateOperationsInput | string
    npp?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutGuruNestedInput
  }

  export type GuruUncheckedUpdateWithoutWaliKelasDiInput = {
    id?: StringFieldUpdateOperationsInput | string
    npp?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    status?: BoolFieldUpdateOperationsInput | boolean
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type KelasUpsertWithoutWaliKelasInput = {
    update: XOR<KelasUpdateWithoutWaliKelasInput, KelasUncheckedUpdateWithoutWaliKelasInput>
    create: XOR<KelasCreateWithoutWaliKelasInput, KelasUncheckedCreateWithoutWaliKelasInput>
    where?: KelasWhereInput
  }

  export type KelasUpdateToOneWithWhereWithoutWaliKelasInput = {
    where?: KelasWhereInput
    data: XOR<KelasUpdateWithoutWaliKelasInput, KelasUncheckedUpdateWithoutWaliKelasInput>
  }

  export type KelasUpdateWithoutWaliKelasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    riwayatSiswa?: RiwayatKelasSiswaUpdateManyWithoutKelasNestedInput
  }

  export type KelasUncheckedUpdateWithoutWaliKelasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    riwayatSiswa?: RiwayatKelasSiswaUncheckedUpdateManyWithoutKelasNestedInput
  }

  export type UserCreateWithoutSiswaInput = {
    id?: string
    username: string
    password: string
    nama: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    guru?: GuruCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSiswaInput = {
    id?: string
    username: string
    password: string
    nama: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    guru?: GuruUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSiswaInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSiswaInput, UserUncheckedCreateWithoutSiswaInput>
  }

  export type RiwayatKelasSiswaCreateWithoutSiswaInput = {
    id?: string
    kelas: KelasCreateNestedOneWithoutRiwayatSiswaInput
    tahunAjaran: TahunAjaranCreateNestedOneWithoutRiwayatSiswaInput
  }

  export type RiwayatKelasSiswaUncheckedCreateWithoutSiswaInput = {
    id?: string
    kelasId: string
    tahunAjaranId: string
  }

  export type RiwayatKelasSiswaCreateOrConnectWithoutSiswaInput = {
    where: RiwayatKelasSiswaWhereUniqueInput
    create: XOR<RiwayatKelasSiswaCreateWithoutSiswaInput, RiwayatKelasSiswaUncheckedCreateWithoutSiswaInput>
  }

  export type RiwayatKelasSiswaCreateManySiswaInputEnvelope = {
    data: RiwayatKelasSiswaCreateManySiswaInput | RiwayatKelasSiswaCreateManySiswaInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSiswaInput = {
    update: XOR<UserUpdateWithoutSiswaInput, UserUncheckedUpdateWithoutSiswaInput>
    create: XOR<UserCreateWithoutSiswaInput, UserUncheckedCreateWithoutSiswaInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSiswaInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSiswaInput, UserUncheckedUpdateWithoutSiswaInput>
  }

  export type UserUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guru?: GuruUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guru?: GuruUncheckedUpdateOneWithoutUserNestedInput
  }

  export type RiwayatKelasSiswaUpsertWithWhereUniqueWithoutSiswaInput = {
    where: RiwayatKelasSiswaWhereUniqueInput
    update: XOR<RiwayatKelasSiswaUpdateWithoutSiswaInput, RiwayatKelasSiswaUncheckedUpdateWithoutSiswaInput>
    create: XOR<RiwayatKelasSiswaCreateWithoutSiswaInput, RiwayatKelasSiswaUncheckedCreateWithoutSiswaInput>
  }

  export type RiwayatKelasSiswaUpdateWithWhereUniqueWithoutSiswaInput = {
    where: RiwayatKelasSiswaWhereUniqueInput
    data: XOR<RiwayatKelasSiswaUpdateWithoutSiswaInput, RiwayatKelasSiswaUncheckedUpdateWithoutSiswaInput>
  }

  export type RiwayatKelasSiswaUpdateManyWithWhereWithoutSiswaInput = {
    where: RiwayatKelasSiswaScalarWhereInput
    data: XOR<RiwayatKelasSiswaUpdateManyMutationInput, RiwayatKelasSiswaUncheckedUpdateManyWithoutSiswaInput>
  }

  export type SiswaCreateWithoutRiwayatKelasInput = {
    id?: string
    nisn: string
    nis: string
    jenisKelamin: string
    user: UserCreateNestedOneWithoutSiswaInput
  }

  export type SiswaUncheckedCreateWithoutRiwayatKelasInput = {
    id?: string
    nisn: string
    nis: string
    jenisKelamin: string
    userId: string
  }

  export type SiswaCreateOrConnectWithoutRiwayatKelasInput = {
    where: SiswaWhereUniqueInput
    create: XOR<SiswaCreateWithoutRiwayatKelasInput, SiswaUncheckedCreateWithoutRiwayatKelasInput>
  }

  export type KelasCreateWithoutRiwayatSiswaInput = {
    id?: string
    nama: string
    waliKelas?: KelasWaliCreateNestedManyWithoutKelasInput
  }

  export type KelasUncheckedCreateWithoutRiwayatSiswaInput = {
    id?: string
    nama: string
    waliKelas?: KelasWaliUncheckedCreateNestedManyWithoutKelasInput
  }

  export type KelasCreateOrConnectWithoutRiwayatSiswaInput = {
    where: KelasWhereUniqueInput
    create: XOR<KelasCreateWithoutRiwayatSiswaInput, KelasUncheckedCreateWithoutRiwayatSiswaInput>
  }

  export type TahunAjaranCreateWithoutRiwayatSiswaInput = {
    id?: string
    nama: string
    isActive?: boolean
  }

  export type TahunAjaranUncheckedCreateWithoutRiwayatSiswaInput = {
    id?: string
    nama: string
    isActive?: boolean
  }

  export type TahunAjaranCreateOrConnectWithoutRiwayatSiswaInput = {
    where: TahunAjaranWhereUniqueInput
    create: XOR<TahunAjaranCreateWithoutRiwayatSiswaInput, TahunAjaranUncheckedCreateWithoutRiwayatSiswaInput>
  }

  export type SiswaUpsertWithoutRiwayatKelasInput = {
    update: XOR<SiswaUpdateWithoutRiwayatKelasInput, SiswaUncheckedUpdateWithoutRiwayatKelasInput>
    create: XOR<SiswaCreateWithoutRiwayatKelasInput, SiswaUncheckedCreateWithoutRiwayatKelasInput>
    where?: SiswaWhereInput
  }

  export type SiswaUpdateToOneWithWhereWithoutRiwayatKelasInput = {
    where?: SiswaWhereInput
    data: XOR<SiswaUpdateWithoutRiwayatKelasInput, SiswaUncheckedUpdateWithoutRiwayatKelasInput>
  }

  export type SiswaUpdateWithoutRiwayatKelasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nis?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutSiswaNestedInput
  }

  export type SiswaUncheckedUpdateWithoutRiwayatKelasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nis?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type KelasUpsertWithoutRiwayatSiswaInput = {
    update: XOR<KelasUpdateWithoutRiwayatSiswaInput, KelasUncheckedUpdateWithoutRiwayatSiswaInput>
    create: XOR<KelasCreateWithoutRiwayatSiswaInput, KelasUncheckedCreateWithoutRiwayatSiswaInput>
    where?: KelasWhereInput
  }

  export type KelasUpdateToOneWithWhereWithoutRiwayatSiswaInput = {
    where?: KelasWhereInput
    data: XOR<KelasUpdateWithoutRiwayatSiswaInput, KelasUncheckedUpdateWithoutRiwayatSiswaInput>
  }

  export type KelasUpdateWithoutRiwayatSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    waliKelas?: KelasWaliUpdateManyWithoutKelasNestedInput
  }

  export type KelasUncheckedUpdateWithoutRiwayatSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    waliKelas?: KelasWaliUncheckedUpdateManyWithoutKelasNestedInput
  }

  export type TahunAjaranUpsertWithoutRiwayatSiswaInput = {
    update: XOR<TahunAjaranUpdateWithoutRiwayatSiswaInput, TahunAjaranUncheckedUpdateWithoutRiwayatSiswaInput>
    create: XOR<TahunAjaranCreateWithoutRiwayatSiswaInput, TahunAjaranUncheckedCreateWithoutRiwayatSiswaInput>
    where?: TahunAjaranWhereInput
  }

  export type TahunAjaranUpdateToOneWithWhereWithoutRiwayatSiswaInput = {
    where?: TahunAjaranWhereInput
    data: XOR<TahunAjaranUpdateWithoutRiwayatSiswaInput, TahunAjaranUncheckedUpdateWithoutRiwayatSiswaInput>
  }

  export type TahunAjaranUpdateWithoutRiwayatSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TahunAjaranUncheckedUpdateWithoutRiwayatSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RiwayatKelasSiswaCreateManyTahunAjaranInput = {
    id?: string
    siswaId: string
    kelasId: string
  }

  export type RiwayatKelasSiswaUpdateWithoutTahunAjaranInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswa?: SiswaUpdateOneRequiredWithoutRiwayatKelasNestedInput
    kelas?: KelasUpdateOneRequiredWithoutRiwayatSiswaNestedInput
  }

  export type RiwayatKelasSiswaUncheckedUpdateWithoutTahunAjaranInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    kelasId?: StringFieldUpdateOperationsInput | string
  }

  export type RiwayatKelasSiswaUncheckedUpdateManyWithoutTahunAjaranInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    kelasId?: StringFieldUpdateOperationsInput | string
  }

  export type RiwayatKelasSiswaCreateManyKelasInput = {
    id?: string
    siswaId: string
    tahunAjaranId: string
  }

  export type KelasWaliCreateManyKelasInput = {
    id?: string
    guruId: string
    createdAt?: Date | string
  }

  export type RiwayatKelasSiswaUpdateWithoutKelasInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswa?: SiswaUpdateOneRequiredWithoutRiwayatKelasNestedInput
    tahunAjaran?: TahunAjaranUpdateOneRequiredWithoutRiwayatSiswaNestedInput
  }

  export type RiwayatKelasSiswaUncheckedUpdateWithoutKelasInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    tahunAjaranId?: StringFieldUpdateOperationsInput | string
  }

  export type RiwayatKelasSiswaUncheckedUpdateManyWithoutKelasInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaId?: StringFieldUpdateOperationsInput | string
    tahunAjaranId?: StringFieldUpdateOperationsInput | string
  }

  export type KelasWaliUpdateWithoutKelasInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guru?: GuruUpdateOneRequiredWithoutWaliKelasDiNestedInput
  }

  export type KelasWaliUncheckedUpdateWithoutKelasInput = {
    id?: StringFieldUpdateOperationsInput | string
    guruId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KelasWaliUncheckedUpdateManyWithoutKelasInput = {
    id?: StringFieldUpdateOperationsInput | string
    guruId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KelasWaliCreateManyGuruInput = {
    id?: string
    kelasId: string
    createdAt?: Date | string
  }

  export type KelasWaliUpdateWithoutGuruInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kelas?: KelasUpdateOneRequiredWithoutWaliKelasNestedInput
  }

  export type KelasWaliUncheckedUpdateWithoutGuruInput = {
    id?: StringFieldUpdateOperationsInput | string
    kelasId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KelasWaliUncheckedUpdateManyWithoutGuruInput = {
    id?: StringFieldUpdateOperationsInput | string
    kelasId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RiwayatKelasSiswaCreateManySiswaInput = {
    id?: string
    kelasId: string
    tahunAjaranId: string
  }

  export type RiwayatKelasSiswaUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    kelas?: KelasUpdateOneRequiredWithoutRiwayatSiswaNestedInput
    tahunAjaran?: TahunAjaranUpdateOneRequiredWithoutRiwayatSiswaNestedInput
  }

  export type RiwayatKelasSiswaUncheckedUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    kelasId?: StringFieldUpdateOperationsInput | string
    tahunAjaranId?: StringFieldUpdateOperationsInput | string
  }

  export type RiwayatKelasSiswaUncheckedUpdateManyWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    kelasId?: StringFieldUpdateOperationsInput | string
    tahunAjaranId?: StringFieldUpdateOperationsInput | string
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