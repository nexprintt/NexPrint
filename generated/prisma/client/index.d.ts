
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model BadgeTemplate
 * 
 */
export type BadgeTemplate = $Result.DefaultSelection<Prisma.$BadgeTemplatePayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model BadgeItem
 * 
 */
export type BadgeItem = $Result.DefaultSelection<Prisma.$BadgeItemPayload>
/**
 * Model TemplateItem
 * 
 */
export type TemplateItem = $Result.DefaultSelection<Prisma.$TemplateItemPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model PrintJob
 * 
 */
export type PrintJob = $Result.DefaultSelection<Prisma.$PrintJobPayload>
/**
 * Model PrinterTelemetry
 * 
 */
export type PrinterTelemetry = $Result.DefaultSelection<Prisma.$PrinterTelemetryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Events
 * const events = await prisma.event.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
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
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Events
   * const events = await prisma.event.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.badgeTemplate`: Exposes CRUD operations for the **BadgeTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BadgeTemplates
    * const badgeTemplates = await prisma.badgeTemplate.findMany()
    * ```
    */
  get badgeTemplate(): Prisma.BadgeTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.badgeItem`: Exposes CRUD operations for the **BadgeItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BadgeItems
    * const badgeItems = await prisma.badgeItem.findMany()
    * ```
    */
  get badgeItem(): Prisma.BadgeItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.templateItem`: Exposes CRUD operations for the **TemplateItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TemplateItems
    * const templateItems = await prisma.templateItem.findMany()
    * ```
    */
  get templateItem(): Prisma.TemplateItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.printJob`: Exposes CRUD operations for the **PrintJob** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PrintJobs
    * const printJobs = await prisma.printJob.findMany()
    * ```
    */
  get printJob(): Prisma.PrintJobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.printerTelemetry`: Exposes CRUD operations for the **PrinterTelemetry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PrinterTelemetries
    * const printerTelemetries = await prisma.printerTelemetry.findMany()
    * ```
    */
  get printerTelemetry(): Prisma.PrinterTelemetryDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
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
    Event: 'Event',
    BadgeTemplate: 'BadgeTemplate',
    Order: 'Order',
    BadgeItem: 'BadgeItem',
    TemplateItem: 'TemplateItem',
    OrderItem: 'OrderItem',
    PrintJob: 'PrintJob',
    PrinterTelemetry: 'PrinterTelemetry'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "event" | "badgeTemplate" | "order" | "badgeItem" | "templateItem" | "orderItem" | "printJob" | "printerTelemetry"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      BadgeTemplate: {
        payload: Prisma.$BadgeTemplatePayload<ExtArgs>
        fields: Prisma.BadgeTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BadgeTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BadgeTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeTemplatePayload>
          }
          findFirst: {
            args: Prisma.BadgeTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BadgeTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeTemplatePayload>
          }
          findMany: {
            args: Prisma.BadgeTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeTemplatePayload>[]
          }
          create: {
            args: Prisma.BadgeTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeTemplatePayload>
          }
          createMany: {
            args: Prisma.BadgeTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BadgeTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeTemplatePayload>[]
          }
          delete: {
            args: Prisma.BadgeTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeTemplatePayload>
          }
          update: {
            args: Prisma.BadgeTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeTemplatePayload>
          }
          deleteMany: {
            args: Prisma.BadgeTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BadgeTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BadgeTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeTemplatePayload>[]
          }
          upsert: {
            args: Prisma.BadgeTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeTemplatePayload>
          }
          aggregate: {
            args: Prisma.BadgeTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBadgeTemplate>
          }
          groupBy: {
            args: Prisma.BadgeTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<BadgeTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.BadgeTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<BadgeTemplateCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      BadgeItem: {
        payload: Prisma.$BadgeItemPayload<ExtArgs>
        fields: Prisma.BadgeItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BadgeItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BadgeItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeItemPayload>
          }
          findFirst: {
            args: Prisma.BadgeItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BadgeItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeItemPayload>
          }
          findMany: {
            args: Prisma.BadgeItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeItemPayload>[]
          }
          create: {
            args: Prisma.BadgeItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeItemPayload>
          }
          createMany: {
            args: Prisma.BadgeItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BadgeItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeItemPayload>[]
          }
          delete: {
            args: Prisma.BadgeItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeItemPayload>
          }
          update: {
            args: Prisma.BadgeItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeItemPayload>
          }
          deleteMany: {
            args: Prisma.BadgeItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BadgeItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BadgeItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeItemPayload>[]
          }
          upsert: {
            args: Prisma.BadgeItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BadgeItemPayload>
          }
          aggregate: {
            args: Prisma.BadgeItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBadgeItem>
          }
          groupBy: {
            args: Prisma.BadgeItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<BadgeItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.BadgeItemCountArgs<ExtArgs>
            result: $Utils.Optional<BadgeItemCountAggregateOutputType> | number
          }
        }
      }
      TemplateItem: {
        payload: Prisma.$TemplateItemPayload<ExtArgs>
        fields: Prisma.TemplateItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplateItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplateItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateItemPayload>
          }
          findFirst: {
            args: Prisma.TemplateItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplateItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateItemPayload>
          }
          findMany: {
            args: Prisma.TemplateItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateItemPayload>[]
          }
          create: {
            args: Prisma.TemplateItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateItemPayload>
          }
          createMany: {
            args: Prisma.TemplateItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TemplateItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateItemPayload>[]
          }
          delete: {
            args: Prisma.TemplateItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateItemPayload>
          }
          update: {
            args: Prisma.TemplateItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateItemPayload>
          }
          deleteMany: {
            args: Prisma.TemplateItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplateItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TemplateItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateItemPayload>[]
          }
          upsert: {
            args: Prisma.TemplateItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateItemPayload>
          }
          aggregate: {
            args: Prisma.TemplateItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplateItem>
          }
          groupBy: {
            args: Prisma.TemplateItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplateItemCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateItemCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      PrintJob: {
        payload: Prisma.$PrintJobPayload<ExtArgs>
        fields: Prisma.PrintJobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrintJobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrintJobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>
          }
          findFirst: {
            args: Prisma.PrintJobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrintJobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>
          }
          findMany: {
            args: Prisma.PrintJobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>[]
          }
          create: {
            args: Prisma.PrintJobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>
          }
          createMany: {
            args: Prisma.PrintJobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrintJobCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>[]
          }
          delete: {
            args: Prisma.PrintJobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>
          }
          update: {
            args: Prisma.PrintJobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>
          }
          deleteMany: {
            args: Prisma.PrintJobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrintJobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrintJobUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>[]
          }
          upsert: {
            args: Prisma.PrintJobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrintJobPayload>
          }
          aggregate: {
            args: Prisma.PrintJobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrintJob>
          }
          groupBy: {
            args: Prisma.PrintJobGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrintJobGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrintJobCountArgs<ExtArgs>
            result: $Utils.Optional<PrintJobCountAggregateOutputType> | number
          }
        }
      }
      PrinterTelemetry: {
        payload: Prisma.$PrinterTelemetryPayload<ExtArgs>
        fields: Prisma.PrinterTelemetryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrinterTelemetryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterTelemetryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrinterTelemetryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterTelemetryPayload>
          }
          findFirst: {
            args: Prisma.PrinterTelemetryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterTelemetryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrinterTelemetryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterTelemetryPayload>
          }
          findMany: {
            args: Prisma.PrinterTelemetryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterTelemetryPayload>[]
          }
          create: {
            args: Prisma.PrinterTelemetryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterTelemetryPayload>
          }
          createMany: {
            args: Prisma.PrinterTelemetryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrinterTelemetryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterTelemetryPayload>[]
          }
          delete: {
            args: Prisma.PrinterTelemetryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterTelemetryPayload>
          }
          update: {
            args: Prisma.PrinterTelemetryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterTelemetryPayload>
          }
          deleteMany: {
            args: Prisma.PrinterTelemetryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrinterTelemetryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrinterTelemetryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterTelemetryPayload>[]
          }
          upsert: {
            args: Prisma.PrinterTelemetryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrinterTelemetryPayload>
          }
          aggregate: {
            args: Prisma.PrinterTelemetryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrinterTelemetry>
          }
          groupBy: {
            args: Prisma.PrinterTelemetryGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrinterTelemetryGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrinterTelemetryCountArgs<ExtArgs>
            result: $Utils.Optional<PrinterTelemetryCountAggregateOutputType> | number
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
     * Read more in our [docs](https://pris.ly/d/logging).
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
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    event?: EventOmit
    badgeTemplate?: BadgeTemplateOmit
    order?: OrderOmit
    badgeItem?: BadgeItemOmit
    templateItem?: TemplateItemOmit
    orderItem?: OrderItemOmit
    printJob?: PrintJobOmit
    printerTelemetry?: PrinterTelemetryOmit
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
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    templates: number
    orders: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    templates?: boolean | EventCountOutputTypeCountTemplatesArgs
    orders?: boolean | EventCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BadgeTemplateWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type BadgeTemplateCountOutputType
   */

  export type BadgeTemplateCountOutputType = {
    orders: number
    items: number
  }

  export type BadgeTemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | BadgeTemplateCountOutputTypeCountOrdersArgs
    items?: boolean | BadgeTemplateCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * BadgeTemplateCountOutputType without action
   */
  export type BadgeTemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplateCountOutputType
     */
    select?: BadgeTemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BadgeTemplateCountOutputType without action
   */
  export type BadgeTemplateCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * BadgeTemplateCountOutputType without action
   */
  export type BadgeTemplateCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateItemWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type BadgeItemCountOutputType
   */

  export type BadgeItemCountOutputType = {
    orderItems: number
    templates: number
  }

  export type BadgeItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderItems?: boolean | BadgeItemCountOutputTypeCountOrderItemsArgs
    templates?: boolean | BadgeItemCountOutputTypeCountTemplatesArgs
  }

  // Custom InputTypes
  /**
   * BadgeItemCountOutputType without action
   */
  export type BadgeItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItemCountOutputType
     */
    select?: BadgeItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BadgeItemCountOutputType without action
   */
  export type BadgeItemCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * BadgeItemCountOutputType without action
   */
  export type BadgeItemCountOutputTypeCountTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    active: boolean | null
    createdAt: Date | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    active: boolean | null
    createdAt: Date | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    active: number
    createdAt: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    active?: true
    createdAt?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    active?: true
    createdAt?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    active?: true
    createdAt?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    id: string
    name: string
    slug: string
    active: boolean
    createdAt: Date
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    active?: boolean
    createdAt?: boolean
    templates?: boolean | Event$templatesArgs<ExtArgs>
    orders?: boolean | Event$ordersArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    active?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    active?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    active?: boolean
    createdAt?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "active" | "createdAt", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    templates?: boolean | Event$templatesArgs<ExtArgs>
    orders?: boolean | Event$ordersArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      templates: Prisma.$BadgeTemplatePayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      active: boolean
      createdAt: Date
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `id`
     * const eventWithIdOnly = await prisma.event.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
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
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    templates<T extends Event$templatesArgs<ExtArgs> = {}>(args?: Subset<T, Event$templatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Event$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Event$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Event model
   */
  interface EventFieldRefs {
    readonly id: FieldRef<"Event", 'String'>
    readonly name: FieldRef<"Event", 'String'>
    readonly slug: FieldRef<"Event", 'String'>
    readonly active: FieldRef<"Event", 'Boolean'>
    readonly createdAt: FieldRef<"Event", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to update.
     */
    limit?: number
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
    /**
     * Limit how many Events to delete.
     */
    limit?: number
  }

  /**
   * Event.templates
   */
  export type Event$templatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateInclude<ExtArgs> | null
    where?: BadgeTemplateWhereInput
    orderBy?: BadgeTemplateOrderByWithRelationInput | BadgeTemplateOrderByWithRelationInput[]
    cursor?: BadgeTemplateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BadgeTemplateScalarFieldEnum | BadgeTemplateScalarFieldEnum[]
  }

  /**
   * Event.orders
   */
  export type Event$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model BadgeTemplate
   */

  export type AggregateBadgeTemplate = {
    _count: BadgeTemplateCountAggregateOutputType | null
    _avg: BadgeTemplateAvgAggregateOutputType | null
    _sum: BadgeTemplateSumAggregateOutputType | null
    _min: BadgeTemplateMinAggregateOutputType | null
    _max: BadgeTemplateMaxAggregateOutputType | null
  }

  export type BadgeTemplateAvgAggregateOutputType = {
    basePrice: number | null
  }

  export type BadgeTemplateSumAggregateOutputType = {
    basePrice: number | null
  }

  export type BadgeTemplateMinAggregateOutputType = {
    id: string | null
    eventId: string | null
    name: string | null
    bgImageUrl: string | null
    configJson: string | null
    basePrice: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type BadgeTemplateMaxAggregateOutputType = {
    id: string | null
    eventId: string | null
    name: string | null
    bgImageUrl: string | null
    configJson: string | null
    basePrice: number | null
    isActive: boolean | null
    createdAt: Date | null
  }

  export type BadgeTemplateCountAggregateOutputType = {
    id: number
    eventId: number
    name: number
    bgImageUrl: number
    configJson: number
    basePrice: number
    isActive: number
    createdAt: number
    _all: number
  }


  export type BadgeTemplateAvgAggregateInputType = {
    basePrice?: true
  }

  export type BadgeTemplateSumAggregateInputType = {
    basePrice?: true
  }

  export type BadgeTemplateMinAggregateInputType = {
    id?: true
    eventId?: true
    name?: true
    bgImageUrl?: true
    configJson?: true
    basePrice?: true
    isActive?: true
    createdAt?: true
  }

  export type BadgeTemplateMaxAggregateInputType = {
    id?: true
    eventId?: true
    name?: true
    bgImageUrl?: true
    configJson?: true
    basePrice?: true
    isActive?: true
    createdAt?: true
  }

  export type BadgeTemplateCountAggregateInputType = {
    id?: true
    eventId?: true
    name?: true
    bgImageUrl?: true
    configJson?: true
    basePrice?: true
    isActive?: true
    createdAt?: true
    _all?: true
  }

  export type BadgeTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BadgeTemplate to aggregate.
     */
    where?: BadgeTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BadgeTemplates to fetch.
     */
    orderBy?: BadgeTemplateOrderByWithRelationInput | BadgeTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BadgeTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BadgeTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BadgeTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BadgeTemplates
    **/
    _count?: true | BadgeTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BadgeTemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BadgeTemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BadgeTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BadgeTemplateMaxAggregateInputType
  }

  export type GetBadgeTemplateAggregateType<T extends BadgeTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateBadgeTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBadgeTemplate[P]>
      : GetScalarType<T[P], AggregateBadgeTemplate[P]>
  }




  export type BadgeTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BadgeTemplateWhereInput
    orderBy?: BadgeTemplateOrderByWithAggregationInput | BadgeTemplateOrderByWithAggregationInput[]
    by: BadgeTemplateScalarFieldEnum[] | BadgeTemplateScalarFieldEnum
    having?: BadgeTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BadgeTemplateCountAggregateInputType | true
    _avg?: BadgeTemplateAvgAggregateInputType
    _sum?: BadgeTemplateSumAggregateInputType
    _min?: BadgeTemplateMinAggregateInputType
    _max?: BadgeTemplateMaxAggregateInputType
  }

  export type BadgeTemplateGroupByOutputType = {
    id: string
    eventId: string
    name: string
    bgImageUrl: string
    configJson: string
    basePrice: number
    isActive: boolean
    createdAt: Date
    _count: BadgeTemplateCountAggregateOutputType | null
    _avg: BadgeTemplateAvgAggregateOutputType | null
    _sum: BadgeTemplateSumAggregateOutputType | null
    _min: BadgeTemplateMinAggregateOutputType | null
    _max: BadgeTemplateMaxAggregateOutputType | null
  }

  type GetBadgeTemplateGroupByPayload<T extends BadgeTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BadgeTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BadgeTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BadgeTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], BadgeTemplateGroupByOutputType[P]>
        }
      >
    >


  export type BadgeTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    name?: boolean
    bgImageUrl?: boolean
    configJson?: boolean
    basePrice?: boolean
    isActive?: boolean
    createdAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
    orders?: boolean | BadgeTemplate$ordersArgs<ExtArgs>
    items?: boolean | BadgeTemplate$itemsArgs<ExtArgs>
    _count?: boolean | BadgeTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["badgeTemplate"]>

  export type BadgeTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    name?: boolean
    bgImageUrl?: boolean
    configJson?: boolean
    basePrice?: boolean
    isActive?: boolean
    createdAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["badgeTemplate"]>

  export type BadgeTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    name?: boolean
    bgImageUrl?: boolean
    configJson?: boolean
    basePrice?: boolean
    isActive?: boolean
    createdAt?: boolean
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["badgeTemplate"]>

  export type BadgeTemplateSelectScalar = {
    id?: boolean
    eventId?: boolean
    name?: boolean
    bgImageUrl?: boolean
    configJson?: boolean
    basePrice?: boolean
    isActive?: boolean
    createdAt?: boolean
  }

  export type BadgeTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "name" | "bgImageUrl" | "configJson" | "basePrice" | "isActive" | "createdAt", ExtArgs["result"]["badgeTemplate"]>
  export type BadgeTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
    orders?: boolean | BadgeTemplate$ordersArgs<ExtArgs>
    items?: boolean | BadgeTemplate$itemsArgs<ExtArgs>
    _count?: boolean | BadgeTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BadgeTemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type BadgeTemplateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $BadgeTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BadgeTemplate"
    objects: {
      event: Prisma.$EventPayload<ExtArgs>
      orders: Prisma.$OrderPayload<ExtArgs>[]
      items: Prisma.$TemplateItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventId: string
      name: string
      bgImageUrl: string
      configJson: string
      basePrice: number
      isActive: boolean
      createdAt: Date
    }, ExtArgs["result"]["badgeTemplate"]>
    composites: {}
  }

  type BadgeTemplateGetPayload<S extends boolean | null | undefined | BadgeTemplateDefaultArgs> = $Result.GetResult<Prisma.$BadgeTemplatePayload, S>

  type BadgeTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BadgeTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BadgeTemplateCountAggregateInputType | true
    }

  export interface BadgeTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BadgeTemplate'], meta: { name: 'BadgeTemplate' } }
    /**
     * Find zero or one BadgeTemplate that matches the filter.
     * @param {BadgeTemplateFindUniqueArgs} args - Arguments to find a BadgeTemplate
     * @example
     * // Get one BadgeTemplate
     * const badgeTemplate = await prisma.badgeTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BadgeTemplateFindUniqueArgs>(args: SelectSubset<T, BadgeTemplateFindUniqueArgs<ExtArgs>>): Prisma__BadgeTemplateClient<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BadgeTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BadgeTemplateFindUniqueOrThrowArgs} args - Arguments to find a BadgeTemplate
     * @example
     * // Get one BadgeTemplate
     * const badgeTemplate = await prisma.badgeTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BadgeTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, BadgeTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BadgeTemplateClient<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BadgeTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeTemplateFindFirstArgs} args - Arguments to find a BadgeTemplate
     * @example
     * // Get one BadgeTemplate
     * const badgeTemplate = await prisma.badgeTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BadgeTemplateFindFirstArgs>(args?: SelectSubset<T, BadgeTemplateFindFirstArgs<ExtArgs>>): Prisma__BadgeTemplateClient<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BadgeTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeTemplateFindFirstOrThrowArgs} args - Arguments to find a BadgeTemplate
     * @example
     * // Get one BadgeTemplate
     * const badgeTemplate = await prisma.badgeTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BadgeTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, BadgeTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__BadgeTemplateClient<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BadgeTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BadgeTemplates
     * const badgeTemplates = await prisma.badgeTemplate.findMany()
     * 
     * // Get first 10 BadgeTemplates
     * const badgeTemplates = await prisma.badgeTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const badgeTemplateWithIdOnly = await prisma.badgeTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BadgeTemplateFindManyArgs>(args?: SelectSubset<T, BadgeTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BadgeTemplate.
     * @param {BadgeTemplateCreateArgs} args - Arguments to create a BadgeTemplate.
     * @example
     * // Create one BadgeTemplate
     * const BadgeTemplate = await prisma.badgeTemplate.create({
     *   data: {
     *     // ... data to create a BadgeTemplate
     *   }
     * })
     * 
     */
    create<T extends BadgeTemplateCreateArgs>(args: SelectSubset<T, BadgeTemplateCreateArgs<ExtArgs>>): Prisma__BadgeTemplateClient<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BadgeTemplates.
     * @param {BadgeTemplateCreateManyArgs} args - Arguments to create many BadgeTemplates.
     * @example
     * // Create many BadgeTemplates
     * const badgeTemplate = await prisma.badgeTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BadgeTemplateCreateManyArgs>(args?: SelectSubset<T, BadgeTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BadgeTemplates and returns the data saved in the database.
     * @param {BadgeTemplateCreateManyAndReturnArgs} args - Arguments to create many BadgeTemplates.
     * @example
     * // Create many BadgeTemplates
     * const badgeTemplate = await prisma.badgeTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BadgeTemplates and only return the `id`
     * const badgeTemplateWithIdOnly = await prisma.badgeTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BadgeTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, BadgeTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BadgeTemplate.
     * @param {BadgeTemplateDeleteArgs} args - Arguments to delete one BadgeTemplate.
     * @example
     * // Delete one BadgeTemplate
     * const BadgeTemplate = await prisma.badgeTemplate.delete({
     *   where: {
     *     // ... filter to delete one BadgeTemplate
     *   }
     * })
     * 
     */
    delete<T extends BadgeTemplateDeleteArgs>(args: SelectSubset<T, BadgeTemplateDeleteArgs<ExtArgs>>): Prisma__BadgeTemplateClient<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BadgeTemplate.
     * @param {BadgeTemplateUpdateArgs} args - Arguments to update one BadgeTemplate.
     * @example
     * // Update one BadgeTemplate
     * const badgeTemplate = await prisma.badgeTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BadgeTemplateUpdateArgs>(args: SelectSubset<T, BadgeTemplateUpdateArgs<ExtArgs>>): Prisma__BadgeTemplateClient<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BadgeTemplates.
     * @param {BadgeTemplateDeleteManyArgs} args - Arguments to filter BadgeTemplates to delete.
     * @example
     * // Delete a few BadgeTemplates
     * const { count } = await prisma.badgeTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BadgeTemplateDeleteManyArgs>(args?: SelectSubset<T, BadgeTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BadgeTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BadgeTemplates
     * const badgeTemplate = await prisma.badgeTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BadgeTemplateUpdateManyArgs>(args: SelectSubset<T, BadgeTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BadgeTemplates and returns the data updated in the database.
     * @param {BadgeTemplateUpdateManyAndReturnArgs} args - Arguments to update many BadgeTemplates.
     * @example
     * // Update many BadgeTemplates
     * const badgeTemplate = await prisma.badgeTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BadgeTemplates and only return the `id`
     * const badgeTemplateWithIdOnly = await prisma.badgeTemplate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BadgeTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, BadgeTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BadgeTemplate.
     * @param {BadgeTemplateUpsertArgs} args - Arguments to update or create a BadgeTemplate.
     * @example
     * // Update or create a BadgeTemplate
     * const badgeTemplate = await prisma.badgeTemplate.upsert({
     *   create: {
     *     // ... data to create a BadgeTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BadgeTemplate we want to update
     *   }
     * })
     */
    upsert<T extends BadgeTemplateUpsertArgs>(args: SelectSubset<T, BadgeTemplateUpsertArgs<ExtArgs>>): Prisma__BadgeTemplateClient<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BadgeTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeTemplateCountArgs} args - Arguments to filter BadgeTemplates to count.
     * @example
     * // Count the number of BadgeTemplates
     * const count = await prisma.badgeTemplate.count({
     *   where: {
     *     // ... the filter for the BadgeTemplates we want to count
     *   }
     * })
    **/
    count<T extends BadgeTemplateCountArgs>(
      args?: Subset<T, BadgeTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BadgeTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BadgeTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BadgeTemplateAggregateArgs>(args: Subset<T, BadgeTemplateAggregateArgs>): Prisma.PrismaPromise<GetBadgeTemplateAggregateType<T>>

    /**
     * Group by BadgeTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeTemplateGroupByArgs} args - Group by arguments.
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
      T extends BadgeTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BadgeTemplateGroupByArgs['orderBy'] }
        : { orderBy?: BadgeTemplateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BadgeTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBadgeTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BadgeTemplate model
   */
  readonly fields: BadgeTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BadgeTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BadgeTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orders<T extends BadgeTemplate$ordersArgs<ExtArgs> = {}>(args?: Subset<T, BadgeTemplate$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    items<T extends BadgeTemplate$itemsArgs<ExtArgs> = {}>(args?: Subset<T, BadgeTemplate$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the BadgeTemplate model
   */
  interface BadgeTemplateFieldRefs {
    readonly id: FieldRef<"BadgeTemplate", 'String'>
    readonly eventId: FieldRef<"BadgeTemplate", 'String'>
    readonly name: FieldRef<"BadgeTemplate", 'String'>
    readonly bgImageUrl: FieldRef<"BadgeTemplate", 'String'>
    readonly configJson: FieldRef<"BadgeTemplate", 'String'>
    readonly basePrice: FieldRef<"BadgeTemplate", 'Float'>
    readonly isActive: FieldRef<"BadgeTemplate", 'Boolean'>
    readonly createdAt: FieldRef<"BadgeTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BadgeTemplate findUnique
   */
  export type BadgeTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BadgeTemplate to fetch.
     */
    where: BadgeTemplateWhereUniqueInput
  }

  /**
   * BadgeTemplate findUniqueOrThrow
   */
  export type BadgeTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BadgeTemplate to fetch.
     */
    where: BadgeTemplateWhereUniqueInput
  }

  /**
   * BadgeTemplate findFirst
   */
  export type BadgeTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BadgeTemplate to fetch.
     */
    where?: BadgeTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BadgeTemplates to fetch.
     */
    orderBy?: BadgeTemplateOrderByWithRelationInput | BadgeTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BadgeTemplates.
     */
    cursor?: BadgeTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BadgeTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BadgeTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BadgeTemplates.
     */
    distinct?: BadgeTemplateScalarFieldEnum | BadgeTemplateScalarFieldEnum[]
  }

  /**
   * BadgeTemplate findFirstOrThrow
   */
  export type BadgeTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BadgeTemplate to fetch.
     */
    where?: BadgeTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BadgeTemplates to fetch.
     */
    orderBy?: BadgeTemplateOrderByWithRelationInput | BadgeTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BadgeTemplates.
     */
    cursor?: BadgeTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BadgeTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BadgeTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BadgeTemplates.
     */
    distinct?: BadgeTemplateScalarFieldEnum | BadgeTemplateScalarFieldEnum[]
  }

  /**
   * BadgeTemplate findMany
   */
  export type BadgeTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateInclude<ExtArgs> | null
    /**
     * Filter, which BadgeTemplates to fetch.
     */
    where?: BadgeTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BadgeTemplates to fetch.
     */
    orderBy?: BadgeTemplateOrderByWithRelationInput | BadgeTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BadgeTemplates.
     */
    cursor?: BadgeTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BadgeTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BadgeTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BadgeTemplates.
     */
    distinct?: BadgeTemplateScalarFieldEnum | BadgeTemplateScalarFieldEnum[]
  }

  /**
   * BadgeTemplate create
   */
  export type BadgeTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a BadgeTemplate.
     */
    data: XOR<BadgeTemplateCreateInput, BadgeTemplateUncheckedCreateInput>
  }

  /**
   * BadgeTemplate createMany
   */
  export type BadgeTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BadgeTemplates.
     */
    data: BadgeTemplateCreateManyInput | BadgeTemplateCreateManyInput[]
  }

  /**
   * BadgeTemplate createManyAndReturn
   */
  export type BadgeTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many BadgeTemplates.
     */
    data: BadgeTemplateCreateManyInput | BadgeTemplateCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BadgeTemplate update
   */
  export type BadgeTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a BadgeTemplate.
     */
    data: XOR<BadgeTemplateUpdateInput, BadgeTemplateUncheckedUpdateInput>
    /**
     * Choose, which BadgeTemplate to update.
     */
    where: BadgeTemplateWhereUniqueInput
  }

  /**
   * BadgeTemplate updateMany
   */
  export type BadgeTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BadgeTemplates.
     */
    data: XOR<BadgeTemplateUpdateManyMutationInput, BadgeTemplateUncheckedUpdateManyInput>
    /**
     * Filter which BadgeTemplates to update
     */
    where?: BadgeTemplateWhereInput
    /**
     * Limit how many BadgeTemplates to update.
     */
    limit?: number
  }

  /**
   * BadgeTemplate updateManyAndReturn
   */
  export type BadgeTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * The data used to update BadgeTemplates.
     */
    data: XOR<BadgeTemplateUpdateManyMutationInput, BadgeTemplateUncheckedUpdateManyInput>
    /**
     * Filter which BadgeTemplates to update
     */
    where?: BadgeTemplateWhereInput
    /**
     * Limit how many BadgeTemplates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BadgeTemplate upsert
   */
  export type BadgeTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the BadgeTemplate to update in case it exists.
     */
    where: BadgeTemplateWhereUniqueInput
    /**
     * In case the BadgeTemplate found by the `where` argument doesn't exist, create a new BadgeTemplate with this data.
     */
    create: XOR<BadgeTemplateCreateInput, BadgeTemplateUncheckedCreateInput>
    /**
     * In case the BadgeTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BadgeTemplateUpdateInput, BadgeTemplateUncheckedUpdateInput>
  }

  /**
   * BadgeTemplate delete
   */
  export type BadgeTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateInclude<ExtArgs> | null
    /**
     * Filter which BadgeTemplate to delete.
     */
    where: BadgeTemplateWhereUniqueInput
  }

  /**
   * BadgeTemplate deleteMany
   */
  export type BadgeTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BadgeTemplates to delete
     */
    where?: BadgeTemplateWhereInput
    /**
     * Limit how many BadgeTemplates to delete.
     */
    limit?: number
  }

  /**
   * BadgeTemplate.orders
   */
  export type BadgeTemplate$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * BadgeTemplate.items
   */
  export type BadgeTemplate$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemInclude<ExtArgs> | null
    where?: TemplateItemWhereInput
    orderBy?: TemplateItemOrderByWithRelationInput | TemplateItemOrderByWithRelationInput[]
    cursor?: TemplateItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TemplateItemScalarFieldEnum | TemplateItemScalarFieldEnum[]
  }

  /**
   * BadgeTemplate without action
   */
  export type BadgeTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeTemplate
     */
    select?: BadgeTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeTemplate
     */
    omit?: BadgeTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeTemplateInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    totalAmount: number | null
    shippingCost: number | null
  }

  export type OrderSumAggregateOutputType = {
    totalAmount: number | null
    shippingCost: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    eventId: string | null
    badgeTemplateId: string | null
    clientName: string | null
    phone: string | null
    congregation: string | null
    photoUrl: string | null
    customConfigJson: string | null
    status: string | null
    totalAmount: number | null
    isFromItabira: boolean | null
    zipCode: string | null
    address: string | null
    number: string | null
    complement: string | null
    neighborhood: string | null
    city: string | null
    state: string | null
    shippingCost: number | null
    shippingService: string | null
    paymentMethod: string | null
    paymentStatus: string | null
    groupId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    eventId: string | null
    badgeTemplateId: string | null
    clientName: string | null
    phone: string | null
    congregation: string | null
    photoUrl: string | null
    customConfigJson: string | null
    status: string | null
    totalAmount: number | null
    isFromItabira: boolean | null
    zipCode: string | null
    address: string | null
    number: string | null
    complement: string | null
    neighborhood: string | null
    city: string | null
    state: string | null
    shippingCost: number | null
    shippingService: string | null
    paymentMethod: string | null
    paymentStatus: string | null
    groupId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    eventId: number
    badgeTemplateId: number
    clientName: number
    phone: number
    congregation: number
    photoUrl: number
    customConfigJson: number
    status: number
    totalAmount: number
    isFromItabira: number
    zipCode: number
    address: number
    number: number
    complement: number
    neighborhood: number
    city: number
    state: number
    shippingCost: number
    shippingService: number
    paymentMethod: number
    paymentStatus: number
    groupId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    totalAmount?: true
    shippingCost?: true
  }

  export type OrderSumAggregateInputType = {
    totalAmount?: true
    shippingCost?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    eventId?: true
    badgeTemplateId?: true
    clientName?: true
    phone?: true
    congregation?: true
    photoUrl?: true
    customConfigJson?: true
    status?: true
    totalAmount?: true
    isFromItabira?: true
    zipCode?: true
    address?: true
    number?: true
    complement?: true
    neighborhood?: true
    city?: true
    state?: true
    shippingCost?: true
    shippingService?: true
    paymentMethod?: true
    paymentStatus?: true
    groupId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    eventId?: true
    badgeTemplateId?: true
    clientName?: true
    phone?: true
    congregation?: true
    photoUrl?: true
    customConfigJson?: true
    status?: true
    totalAmount?: true
    isFromItabira?: true
    zipCode?: true
    address?: true
    number?: true
    complement?: true
    neighborhood?: true
    city?: true
    state?: true
    shippingCost?: true
    shippingService?: true
    paymentMethod?: true
    paymentStatus?: true
    groupId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    eventId?: true
    badgeTemplateId?: true
    clientName?: true
    phone?: true
    congregation?: true
    photoUrl?: true
    customConfigJson?: true
    status?: true
    totalAmount?: true
    isFromItabira?: true
    zipCode?: true
    address?: true
    number?: true
    complement?: true
    neighborhood?: true
    city?: true
    state?: true
    shippingCost?: true
    shippingService?: true
    paymentMethod?: true
    paymentStatus?: true
    groupId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    eventId: string
    badgeTemplateId: string
    clientName: string
    phone: string
    congregation: string | null
    photoUrl: string | null
    customConfigJson: string | null
    status: string
    totalAmount: number
    isFromItabira: boolean
    zipCode: string | null
    address: string | null
    number: string | null
    complement: string | null
    neighborhood: string | null
    city: string | null
    state: string | null
    shippingCost: number
    shippingService: string | null
    paymentMethod: string
    paymentStatus: string
    groupId: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    badgeTemplateId?: boolean
    clientName?: boolean
    phone?: boolean
    congregation?: boolean
    photoUrl?: boolean
    customConfigJson?: boolean
    status?: boolean
    totalAmount?: boolean
    isFromItabira?: boolean
    zipCode?: boolean
    address?: boolean
    number?: boolean
    complement?: boolean
    neighborhood?: boolean
    city?: boolean
    state?: boolean
    shippingCost?: boolean
    shippingService?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    groupId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | BadgeTemplateDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    badgeTemplateId?: boolean
    clientName?: boolean
    phone?: boolean
    congregation?: boolean
    photoUrl?: boolean
    customConfigJson?: boolean
    status?: boolean
    totalAmount?: boolean
    isFromItabira?: boolean
    zipCode?: boolean
    address?: boolean
    number?: boolean
    complement?: boolean
    neighborhood?: boolean
    city?: boolean
    state?: boolean
    shippingCost?: boolean
    shippingService?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    groupId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | BadgeTemplateDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eventId?: boolean
    badgeTemplateId?: boolean
    clientName?: boolean
    phone?: boolean
    congregation?: boolean
    photoUrl?: boolean
    customConfigJson?: boolean
    status?: boolean
    totalAmount?: boolean
    isFromItabira?: boolean
    zipCode?: boolean
    address?: boolean
    number?: boolean
    complement?: boolean
    neighborhood?: boolean
    city?: boolean
    state?: boolean
    shippingCost?: boolean
    shippingService?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    groupId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | BadgeTemplateDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    eventId?: boolean
    badgeTemplateId?: boolean
    clientName?: boolean
    phone?: boolean
    congregation?: boolean
    photoUrl?: boolean
    customConfigJson?: boolean
    status?: boolean
    totalAmount?: boolean
    isFromItabira?: boolean
    zipCode?: boolean
    address?: boolean
    number?: boolean
    complement?: boolean
    neighborhood?: boolean
    city?: boolean
    state?: boolean
    shippingCost?: boolean
    shippingService?: boolean
    paymentMethod?: boolean
    paymentStatus?: boolean
    groupId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eventId" | "badgeTemplateId" | "clientName" | "phone" | "congregation" | "photoUrl" | "customConfigJson" | "status" | "totalAmount" | "isFromItabira" | "zipCode" | "address" | "number" | "complement" | "neighborhood" | "city" | "state" | "shippingCost" | "shippingService" | "paymentMethod" | "paymentStatus" | "groupId" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | BadgeTemplateDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | BadgeTemplateDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }
  export type OrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | BadgeTemplateDefaultArgs<ExtArgs>
    event?: boolean | EventDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      template: Prisma.$BadgeTemplatePayload<ExtArgs>
      event: Prisma.$EventPayload<ExtArgs>
      items: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eventId: string
      badgeTemplateId: string
      clientName: string
      phone: string
      congregation: string | null
      photoUrl: string | null
      customConfigJson: string | null
      status: string
      totalAmount: number
      isFromItabira: boolean
      zipCode: string | null
      address: string | null
      number: string | null
      complement: string | null
      neighborhood: string | null
      city: string | null
      state: string | null
      shippingCost: number
      shippingService: string | null
      paymentMethod: string
      paymentStatus: string
      groupId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders and returns the data updated in the database.
     * @param {OrderUpdateManyAndReturnArgs} args - Arguments to update many Orders.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
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
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    template<T extends BadgeTemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BadgeTemplateDefaultArgs<ExtArgs>>): Prisma__BadgeTemplateClient<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly eventId: FieldRef<"Order", 'String'>
    readonly badgeTemplateId: FieldRef<"Order", 'String'>
    readonly clientName: FieldRef<"Order", 'String'>
    readonly phone: FieldRef<"Order", 'String'>
    readonly congregation: FieldRef<"Order", 'String'>
    readonly photoUrl: FieldRef<"Order", 'String'>
    readonly customConfigJson: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'String'>
    readonly totalAmount: FieldRef<"Order", 'Float'>
    readonly isFromItabira: FieldRef<"Order", 'Boolean'>
    readonly zipCode: FieldRef<"Order", 'String'>
    readonly address: FieldRef<"Order", 'String'>
    readonly number: FieldRef<"Order", 'String'>
    readonly complement: FieldRef<"Order", 'String'>
    readonly neighborhood: FieldRef<"Order", 'String'>
    readonly city: FieldRef<"Order", 'String'>
    readonly state: FieldRef<"Order", 'String'>
    readonly shippingCost: FieldRef<"Order", 'Float'>
    readonly shippingService: FieldRef<"Order", 'String'>
    readonly paymentMethod: FieldRef<"Order", 'String'>
    readonly paymentStatus: FieldRef<"Order", 'String'>
    readonly groupId: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order updateManyAndReturn
   */
  export type OrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model BadgeItem
   */

  export type AggregateBadgeItem = {
    _count: BadgeItemCountAggregateOutputType | null
    _avg: BadgeItemAvgAggregateOutputType | null
    _sum: BadgeItemSumAggregateOutputType | null
    _min: BadgeItemMinAggregateOutputType | null
    _max: BadgeItemMaxAggregateOutputType | null
  }

  export type BadgeItemAvgAggregateOutputType = {
    price: number | null
    stock: number | null
  }

  export type BadgeItemSumAggregateOutputType = {
    price: number | null
    stock: number | null
  }

  export type BadgeItemMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: number | null
    stock: number | null
    imageUrl: string | null
  }

  export type BadgeItemMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: number | null
    stock: number | null
    imageUrl: string | null
  }

  export type BadgeItemCountAggregateOutputType = {
    id: number
    name: number
    description: number
    price: number
    stock: number
    imageUrl: number
    _all: number
  }


  export type BadgeItemAvgAggregateInputType = {
    price?: true
    stock?: true
  }

  export type BadgeItemSumAggregateInputType = {
    price?: true
    stock?: true
  }

  export type BadgeItemMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    stock?: true
    imageUrl?: true
  }

  export type BadgeItemMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    stock?: true
    imageUrl?: true
  }

  export type BadgeItemCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    stock?: true
    imageUrl?: true
    _all?: true
  }

  export type BadgeItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BadgeItem to aggregate.
     */
    where?: BadgeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BadgeItems to fetch.
     */
    orderBy?: BadgeItemOrderByWithRelationInput | BadgeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BadgeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BadgeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BadgeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BadgeItems
    **/
    _count?: true | BadgeItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BadgeItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BadgeItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BadgeItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BadgeItemMaxAggregateInputType
  }

  export type GetBadgeItemAggregateType<T extends BadgeItemAggregateArgs> = {
        [P in keyof T & keyof AggregateBadgeItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBadgeItem[P]>
      : GetScalarType<T[P], AggregateBadgeItem[P]>
  }




  export type BadgeItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BadgeItemWhereInput
    orderBy?: BadgeItemOrderByWithAggregationInput | BadgeItemOrderByWithAggregationInput[]
    by: BadgeItemScalarFieldEnum[] | BadgeItemScalarFieldEnum
    having?: BadgeItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BadgeItemCountAggregateInputType | true
    _avg?: BadgeItemAvgAggregateInputType
    _sum?: BadgeItemSumAggregateInputType
    _min?: BadgeItemMinAggregateInputType
    _max?: BadgeItemMaxAggregateInputType
  }

  export type BadgeItemGroupByOutputType = {
    id: string
    name: string
    description: string | null
    price: number
    stock: number
    imageUrl: string | null
    _count: BadgeItemCountAggregateOutputType | null
    _avg: BadgeItemAvgAggregateOutputType | null
    _sum: BadgeItemSumAggregateOutputType | null
    _min: BadgeItemMinAggregateOutputType | null
    _max: BadgeItemMaxAggregateOutputType | null
  }

  type GetBadgeItemGroupByPayload<T extends BadgeItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BadgeItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BadgeItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BadgeItemGroupByOutputType[P]>
            : GetScalarType<T[P], BadgeItemGroupByOutputType[P]>
        }
      >
    >


  export type BadgeItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    stock?: boolean
    imageUrl?: boolean
    orderItems?: boolean | BadgeItem$orderItemsArgs<ExtArgs>
    templates?: boolean | BadgeItem$templatesArgs<ExtArgs>
    _count?: boolean | BadgeItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["badgeItem"]>

  export type BadgeItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    stock?: boolean
    imageUrl?: boolean
  }, ExtArgs["result"]["badgeItem"]>

  export type BadgeItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    stock?: boolean
    imageUrl?: boolean
  }, ExtArgs["result"]["badgeItem"]>

  export type BadgeItemSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    stock?: boolean
    imageUrl?: boolean
  }

  export type BadgeItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "price" | "stock" | "imageUrl", ExtArgs["result"]["badgeItem"]>
  export type BadgeItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderItems?: boolean | BadgeItem$orderItemsArgs<ExtArgs>
    templates?: boolean | BadgeItem$templatesArgs<ExtArgs>
    _count?: boolean | BadgeItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BadgeItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BadgeItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BadgeItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BadgeItem"
    objects: {
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
      templates: Prisma.$TemplateItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      price: number
      stock: number
      imageUrl: string | null
    }, ExtArgs["result"]["badgeItem"]>
    composites: {}
  }

  type BadgeItemGetPayload<S extends boolean | null | undefined | BadgeItemDefaultArgs> = $Result.GetResult<Prisma.$BadgeItemPayload, S>

  type BadgeItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BadgeItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BadgeItemCountAggregateInputType | true
    }

  export interface BadgeItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BadgeItem'], meta: { name: 'BadgeItem' } }
    /**
     * Find zero or one BadgeItem that matches the filter.
     * @param {BadgeItemFindUniqueArgs} args - Arguments to find a BadgeItem
     * @example
     * // Get one BadgeItem
     * const badgeItem = await prisma.badgeItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BadgeItemFindUniqueArgs>(args: SelectSubset<T, BadgeItemFindUniqueArgs<ExtArgs>>): Prisma__BadgeItemClient<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BadgeItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BadgeItemFindUniqueOrThrowArgs} args - Arguments to find a BadgeItem
     * @example
     * // Get one BadgeItem
     * const badgeItem = await prisma.badgeItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BadgeItemFindUniqueOrThrowArgs>(args: SelectSubset<T, BadgeItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BadgeItemClient<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BadgeItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeItemFindFirstArgs} args - Arguments to find a BadgeItem
     * @example
     * // Get one BadgeItem
     * const badgeItem = await prisma.badgeItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BadgeItemFindFirstArgs>(args?: SelectSubset<T, BadgeItemFindFirstArgs<ExtArgs>>): Prisma__BadgeItemClient<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BadgeItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeItemFindFirstOrThrowArgs} args - Arguments to find a BadgeItem
     * @example
     * // Get one BadgeItem
     * const badgeItem = await prisma.badgeItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BadgeItemFindFirstOrThrowArgs>(args?: SelectSubset<T, BadgeItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__BadgeItemClient<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BadgeItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BadgeItems
     * const badgeItems = await prisma.badgeItem.findMany()
     * 
     * // Get first 10 BadgeItems
     * const badgeItems = await prisma.badgeItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const badgeItemWithIdOnly = await prisma.badgeItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BadgeItemFindManyArgs>(args?: SelectSubset<T, BadgeItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BadgeItem.
     * @param {BadgeItemCreateArgs} args - Arguments to create a BadgeItem.
     * @example
     * // Create one BadgeItem
     * const BadgeItem = await prisma.badgeItem.create({
     *   data: {
     *     // ... data to create a BadgeItem
     *   }
     * })
     * 
     */
    create<T extends BadgeItemCreateArgs>(args: SelectSubset<T, BadgeItemCreateArgs<ExtArgs>>): Prisma__BadgeItemClient<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BadgeItems.
     * @param {BadgeItemCreateManyArgs} args - Arguments to create many BadgeItems.
     * @example
     * // Create many BadgeItems
     * const badgeItem = await prisma.badgeItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BadgeItemCreateManyArgs>(args?: SelectSubset<T, BadgeItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BadgeItems and returns the data saved in the database.
     * @param {BadgeItemCreateManyAndReturnArgs} args - Arguments to create many BadgeItems.
     * @example
     * // Create many BadgeItems
     * const badgeItem = await prisma.badgeItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BadgeItems and only return the `id`
     * const badgeItemWithIdOnly = await prisma.badgeItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BadgeItemCreateManyAndReturnArgs>(args?: SelectSubset<T, BadgeItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BadgeItem.
     * @param {BadgeItemDeleteArgs} args - Arguments to delete one BadgeItem.
     * @example
     * // Delete one BadgeItem
     * const BadgeItem = await prisma.badgeItem.delete({
     *   where: {
     *     // ... filter to delete one BadgeItem
     *   }
     * })
     * 
     */
    delete<T extends BadgeItemDeleteArgs>(args: SelectSubset<T, BadgeItemDeleteArgs<ExtArgs>>): Prisma__BadgeItemClient<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BadgeItem.
     * @param {BadgeItemUpdateArgs} args - Arguments to update one BadgeItem.
     * @example
     * // Update one BadgeItem
     * const badgeItem = await prisma.badgeItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BadgeItemUpdateArgs>(args: SelectSubset<T, BadgeItemUpdateArgs<ExtArgs>>): Prisma__BadgeItemClient<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BadgeItems.
     * @param {BadgeItemDeleteManyArgs} args - Arguments to filter BadgeItems to delete.
     * @example
     * // Delete a few BadgeItems
     * const { count } = await prisma.badgeItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BadgeItemDeleteManyArgs>(args?: SelectSubset<T, BadgeItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BadgeItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BadgeItems
     * const badgeItem = await prisma.badgeItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BadgeItemUpdateManyArgs>(args: SelectSubset<T, BadgeItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BadgeItems and returns the data updated in the database.
     * @param {BadgeItemUpdateManyAndReturnArgs} args - Arguments to update many BadgeItems.
     * @example
     * // Update many BadgeItems
     * const badgeItem = await prisma.badgeItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BadgeItems and only return the `id`
     * const badgeItemWithIdOnly = await prisma.badgeItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BadgeItemUpdateManyAndReturnArgs>(args: SelectSubset<T, BadgeItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BadgeItem.
     * @param {BadgeItemUpsertArgs} args - Arguments to update or create a BadgeItem.
     * @example
     * // Update or create a BadgeItem
     * const badgeItem = await prisma.badgeItem.upsert({
     *   create: {
     *     // ... data to create a BadgeItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BadgeItem we want to update
     *   }
     * })
     */
    upsert<T extends BadgeItemUpsertArgs>(args: SelectSubset<T, BadgeItemUpsertArgs<ExtArgs>>): Prisma__BadgeItemClient<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BadgeItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeItemCountArgs} args - Arguments to filter BadgeItems to count.
     * @example
     * // Count the number of BadgeItems
     * const count = await prisma.badgeItem.count({
     *   where: {
     *     // ... the filter for the BadgeItems we want to count
     *   }
     * })
    **/
    count<T extends BadgeItemCountArgs>(
      args?: Subset<T, BadgeItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BadgeItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BadgeItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BadgeItemAggregateArgs>(args: Subset<T, BadgeItemAggregateArgs>): Prisma.PrismaPromise<GetBadgeItemAggregateType<T>>

    /**
     * Group by BadgeItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BadgeItemGroupByArgs} args - Group by arguments.
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
      T extends BadgeItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BadgeItemGroupByArgs['orderBy'] }
        : { orderBy?: BadgeItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BadgeItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBadgeItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BadgeItem model
   */
  readonly fields: BadgeItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BadgeItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BadgeItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orderItems<T extends BadgeItem$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, BadgeItem$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    templates<T extends BadgeItem$templatesArgs<ExtArgs> = {}>(args?: Subset<T, BadgeItem$templatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the BadgeItem model
   */
  interface BadgeItemFieldRefs {
    readonly id: FieldRef<"BadgeItem", 'String'>
    readonly name: FieldRef<"BadgeItem", 'String'>
    readonly description: FieldRef<"BadgeItem", 'String'>
    readonly price: FieldRef<"BadgeItem", 'Float'>
    readonly stock: FieldRef<"BadgeItem", 'Int'>
    readonly imageUrl: FieldRef<"BadgeItem", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BadgeItem findUnique
   */
  export type BadgeItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItem
     */
    select?: BadgeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeItem
     */
    omit?: BadgeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeItemInclude<ExtArgs> | null
    /**
     * Filter, which BadgeItem to fetch.
     */
    where: BadgeItemWhereUniqueInput
  }

  /**
   * BadgeItem findUniqueOrThrow
   */
  export type BadgeItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItem
     */
    select?: BadgeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeItem
     */
    omit?: BadgeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeItemInclude<ExtArgs> | null
    /**
     * Filter, which BadgeItem to fetch.
     */
    where: BadgeItemWhereUniqueInput
  }

  /**
   * BadgeItem findFirst
   */
  export type BadgeItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItem
     */
    select?: BadgeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeItem
     */
    omit?: BadgeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeItemInclude<ExtArgs> | null
    /**
     * Filter, which BadgeItem to fetch.
     */
    where?: BadgeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BadgeItems to fetch.
     */
    orderBy?: BadgeItemOrderByWithRelationInput | BadgeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BadgeItems.
     */
    cursor?: BadgeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BadgeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BadgeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BadgeItems.
     */
    distinct?: BadgeItemScalarFieldEnum | BadgeItemScalarFieldEnum[]
  }

  /**
   * BadgeItem findFirstOrThrow
   */
  export type BadgeItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItem
     */
    select?: BadgeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeItem
     */
    omit?: BadgeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeItemInclude<ExtArgs> | null
    /**
     * Filter, which BadgeItem to fetch.
     */
    where?: BadgeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BadgeItems to fetch.
     */
    orderBy?: BadgeItemOrderByWithRelationInput | BadgeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BadgeItems.
     */
    cursor?: BadgeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BadgeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BadgeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BadgeItems.
     */
    distinct?: BadgeItemScalarFieldEnum | BadgeItemScalarFieldEnum[]
  }

  /**
   * BadgeItem findMany
   */
  export type BadgeItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItem
     */
    select?: BadgeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeItem
     */
    omit?: BadgeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeItemInclude<ExtArgs> | null
    /**
     * Filter, which BadgeItems to fetch.
     */
    where?: BadgeItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BadgeItems to fetch.
     */
    orderBy?: BadgeItemOrderByWithRelationInput | BadgeItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BadgeItems.
     */
    cursor?: BadgeItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BadgeItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BadgeItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BadgeItems.
     */
    distinct?: BadgeItemScalarFieldEnum | BadgeItemScalarFieldEnum[]
  }

  /**
   * BadgeItem create
   */
  export type BadgeItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItem
     */
    select?: BadgeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeItem
     */
    omit?: BadgeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeItemInclude<ExtArgs> | null
    /**
     * The data needed to create a BadgeItem.
     */
    data: XOR<BadgeItemCreateInput, BadgeItemUncheckedCreateInput>
  }

  /**
   * BadgeItem createMany
   */
  export type BadgeItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BadgeItems.
     */
    data: BadgeItemCreateManyInput | BadgeItemCreateManyInput[]
  }

  /**
   * BadgeItem createManyAndReturn
   */
  export type BadgeItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItem
     */
    select?: BadgeItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeItem
     */
    omit?: BadgeItemOmit<ExtArgs> | null
    /**
     * The data used to create many BadgeItems.
     */
    data: BadgeItemCreateManyInput | BadgeItemCreateManyInput[]
  }

  /**
   * BadgeItem update
   */
  export type BadgeItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItem
     */
    select?: BadgeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeItem
     */
    omit?: BadgeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeItemInclude<ExtArgs> | null
    /**
     * The data needed to update a BadgeItem.
     */
    data: XOR<BadgeItemUpdateInput, BadgeItemUncheckedUpdateInput>
    /**
     * Choose, which BadgeItem to update.
     */
    where: BadgeItemWhereUniqueInput
  }

  /**
   * BadgeItem updateMany
   */
  export type BadgeItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BadgeItems.
     */
    data: XOR<BadgeItemUpdateManyMutationInput, BadgeItemUncheckedUpdateManyInput>
    /**
     * Filter which BadgeItems to update
     */
    where?: BadgeItemWhereInput
    /**
     * Limit how many BadgeItems to update.
     */
    limit?: number
  }

  /**
   * BadgeItem updateManyAndReturn
   */
  export type BadgeItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItem
     */
    select?: BadgeItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeItem
     */
    omit?: BadgeItemOmit<ExtArgs> | null
    /**
     * The data used to update BadgeItems.
     */
    data: XOR<BadgeItemUpdateManyMutationInput, BadgeItemUncheckedUpdateManyInput>
    /**
     * Filter which BadgeItems to update
     */
    where?: BadgeItemWhereInput
    /**
     * Limit how many BadgeItems to update.
     */
    limit?: number
  }

  /**
   * BadgeItem upsert
   */
  export type BadgeItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItem
     */
    select?: BadgeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeItem
     */
    omit?: BadgeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeItemInclude<ExtArgs> | null
    /**
     * The filter to search for the BadgeItem to update in case it exists.
     */
    where: BadgeItemWhereUniqueInput
    /**
     * In case the BadgeItem found by the `where` argument doesn't exist, create a new BadgeItem with this data.
     */
    create: XOR<BadgeItemCreateInput, BadgeItemUncheckedCreateInput>
    /**
     * In case the BadgeItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BadgeItemUpdateInput, BadgeItemUncheckedUpdateInput>
  }

  /**
   * BadgeItem delete
   */
  export type BadgeItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItem
     */
    select?: BadgeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeItem
     */
    omit?: BadgeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeItemInclude<ExtArgs> | null
    /**
     * Filter which BadgeItem to delete.
     */
    where: BadgeItemWhereUniqueInput
  }

  /**
   * BadgeItem deleteMany
   */
  export type BadgeItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BadgeItems to delete
     */
    where?: BadgeItemWhereInput
    /**
     * Limit how many BadgeItems to delete.
     */
    limit?: number
  }

  /**
   * BadgeItem.orderItems
   */
  export type BadgeItem$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * BadgeItem.templates
   */
  export type BadgeItem$templatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemInclude<ExtArgs> | null
    where?: TemplateItemWhereInput
    orderBy?: TemplateItemOrderByWithRelationInput | TemplateItemOrderByWithRelationInput[]
    cursor?: TemplateItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TemplateItemScalarFieldEnum | TemplateItemScalarFieldEnum[]
  }

  /**
   * BadgeItem without action
   */
  export type BadgeItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BadgeItem
     */
    select?: BadgeItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BadgeItem
     */
    omit?: BadgeItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BadgeItemInclude<ExtArgs> | null
  }


  /**
   * Model TemplateItem
   */

  export type AggregateTemplateItem = {
    _count: TemplateItemCountAggregateOutputType | null
    _min: TemplateItemMinAggregateOutputType | null
    _max: TemplateItemMaxAggregateOutputType | null
  }

  export type TemplateItemMinAggregateOutputType = {
    templateId: string | null
    itemId: string | null
    isRequired: boolean | null
  }

  export type TemplateItemMaxAggregateOutputType = {
    templateId: string | null
    itemId: string | null
    isRequired: boolean | null
  }

  export type TemplateItemCountAggregateOutputType = {
    templateId: number
    itemId: number
    isRequired: number
    _all: number
  }


  export type TemplateItemMinAggregateInputType = {
    templateId?: true
    itemId?: true
    isRequired?: true
  }

  export type TemplateItemMaxAggregateInputType = {
    templateId?: true
    itemId?: true
    isRequired?: true
  }

  export type TemplateItemCountAggregateInputType = {
    templateId?: true
    itemId?: true
    isRequired?: true
    _all?: true
  }

  export type TemplateItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplateItem to aggregate.
     */
    where?: TemplateItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateItems to fetch.
     */
    orderBy?: TemplateItemOrderByWithRelationInput | TemplateItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TemplateItems
    **/
    _count?: true | TemplateItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateItemMaxAggregateInputType
  }

  export type GetTemplateItemAggregateType<T extends TemplateItemAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplateItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplateItem[P]>
      : GetScalarType<T[P], AggregateTemplateItem[P]>
  }




  export type TemplateItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateItemWhereInput
    orderBy?: TemplateItemOrderByWithAggregationInput | TemplateItemOrderByWithAggregationInput[]
    by: TemplateItemScalarFieldEnum[] | TemplateItemScalarFieldEnum
    having?: TemplateItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateItemCountAggregateInputType | true
    _min?: TemplateItemMinAggregateInputType
    _max?: TemplateItemMaxAggregateInputType
  }

  export type TemplateItemGroupByOutputType = {
    templateId: string
    itemId: string
    isRequired: boolean
    _count: TemplateItemCountAggregateOutputType | null
    _min: TemplateItemMinAggregateOutputType | null
    _max: TemplateItemMaxAggregateOutputType | null
  }

  type GetTemplateItemGroupByPayload<T extends TemplateItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateItemGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateItemGroupByOutputType[P]>
        }
      >
    >


  export type TemplateItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    templateId?: boolean
    itemId?: boolean
    isRequired?: boolean
    template?: boolean | BadgeTemplateDefaultArgs<ExtArgs>
    item?: boolean | BadgeItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateItem"]>

  export type TemplateItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    templateId?: boolean
    itemId?: boolean
    isRequired?: boolean
    template?: boolean | BadgeTemplateDefaultArgs<ExtArgs>
    item?: boolean | BadgeItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateItem"]>

  export type TemplateItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    templateId?: boolean
    itemId?: boolean
    isRequired?: boolean
    template?: boolean | BadgeTemplateDefaultArgs<ExtArgs>
    item?: boolean | BadgeItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateItem"]>

  export type TemplateItemSelectScalar = {
    templateId?: boolean
    itemId?: boolean
    isRequired?: boolean
  }

  export type TemplateItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"templateId" | "itemId" | "isRequired", ExtArgs["result"]["templateItem"]>
  export type TemplateItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | BadgeTemplateDefaultArgs<ExtArgs>
    item?: boolean | BadgeItemDefaultArgs<ExtArgs>
  }
  export type TemplateItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | BadgeTemplateDefaultArgs<ExtArgs>
    item?: boolean | BadgeItemDefaultArgs<ExtArgs>
  }
  export type TemplateItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | BadgeTemplateDefaultArgs<ExtArgs>
    item?: boolean | BadgeItemDefaultArgs<ExtArgs>
  }

  export type $TemplateItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TemplateItem"
    objects: {
      template: Prisma.$BadgeTemplatePayload<ExtArgs>
      item: Prisma.$BadgeItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      templateId: string
      itemId: string
      isRequired: boolean
    }, ExtArgs["result"]["templateItem"]>
    composites: {}
  }

  type TemplateItemGetPayload<S extends boolean | null | undefined | TemplateItemDefaultArgs> = $Result.GetResult<Prisma.$TemplateItemPayload, S>

  type TemplateItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemplateItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemplateItemCountAggregateInputType | true
    }

  export interface TemplateItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TemplateItem'], meta: { name: 'TemplateItem' } }
    /**
     * Find zero or one TemplateItem that matches the filter.
     * @param {TemplateItemFindUniqueArgs} args - Arguments to find a TemplateItem
     * @example
     * // Get one TemplateItem
     * const templateItem = await prisma.templateItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplateItemFindUniqueArgs>(args: SelectSubset<T, TemplateItemFindUniqueArgs<ExtArgs>>): Prisma__TemplateItemClient<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TemplateItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemplateItemFindUniqueOrThrowArgs} args - Arguments to find a TemplateItem
     * @example
     * // Get one TemplateItem
     * const templateItem = await prisma.templateItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplateItemFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplateItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplateItemClient<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplateItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateItemFindFirstArgs} args - Arguments to find a TemplateItem
     * @example
     * // Get one TemplateItem
     * const templateItem = await prisma.templateItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplateItemFindFirstArgs>(args?: SelectSubset<T, TemplateItemFindFirstArgs<ExtArgs>>): Prisma__TemplateItemClient<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplateItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateItemFindFirstOrThrowArgs} args - Arguments to find a TemplateItem
     * @example
     * // Get one TemplateItem
     * const templateItem = await prisma.templateItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplateItemFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplateItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplateItemClient<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TemplateItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TemplateItems
     * const templateItems = await prisma.templateItem.findMany()
     * 
     * // Get first 10 TemplateItems
     * const templateItems = await prisma.templateItem.findMany({ take: 10 })
     * 
     * // Only select the `templateId`
     * const templateItemWithTemplateIdOnly = await prisma.templateItem.findMany({ select: { templateId: true } })
     * 
     */
    findMany<T extends TemplateItemFindManyArgs>(args?: SelectSubset<T, TemplateItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TemplateItem.
     * @param {TemplateItemCreateArgs} args - Arguments to create a TemplateItem.
     * @example
     * // Create one TemplateItem
     * const TemplateItem = await prisma.templateItem.create({
     *   data: {
     *     // ... data to create a TemplateItem
     *   }
     * })
     * 
     */
    create<T extends TemplateItemCreateArgs>(args: SelectSubset<T, TemplateItemCreateArgs<ExtArgs>>): Prisma__TemplateItemClient<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TemplateItems.
     * @param {TemplateItemCreateManyArgs} args - Arguments to create many TemplateItems.
     * @example
     * // Create many TemplateItems
     * const templateItem = await prisma.templateItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplateItemCreateManyArgs>(args?: SelectSubset<T, TemplateItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TemplateItems and returns the data saved in the database.
     * @param {TemplateItemCreateManyAndReturnArgs} args - Arguments to create many TemplateItems.
     * @example
     * // Create many TemplateItems
     * const templateItem = await prisma.templateItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TemplateItems and only return the `templateId`
     * const templateItemWithTemplateIdOnly = await prisma.templateItem.createManyAndReturn({
     *   select: { templateId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TemplateItemCreateManyAndReturnArgs>(args?: SelectSubset<T, TemplateItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TemplateItem.
     * @param {TemplateItemDeleteArgs} args - Arguments to delete one TemplateItem.
     * @example
     * // Delete one TemplateItem
     * const TemplateItem = await prisma.templateItem.delete({
     *   where: {
     *     // ... filter to delete one TemplateItem
     *   }
     * })
     * 
     */
    delete<T extends TemplateItemDeleteArgs>(args: SelectSubset<T, TemplateItemDeleteArgs<ExtArgs>>): Prisma__TemplateItemClient<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TemplateItem.
     * @param {TemplateItemUpdateArgs} args - Arguments to update one TemplateItem.
     * @example
     * // Update one TemplateItem
     * const templateItem = await prisma.templateItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplateItemUpdateArgs>(args: SelectSubset<T, TemplateItemUpdateArgs<ExtArgs>>): Prisma__TemplateItemClient<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TemplateItems.
     * @param {TemplateItemDeleteManyArgs} args - Arguments to filter TemplateItems to delete.
     * @example
     * // Delete a few TemplateItems
     * const { count } = await prisma.templateItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplateItemDeleteManyArgs>(args?: SelectSubset<T, TemplateItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplateItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TemplateItems
     * const templateItem = await prisma.templateItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplateItemUpdateManyArgs>(args: SelectSubset<T, TemplateItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplateItems and returns the data updated in the database.
     * @param {TemplateItemUpdateManyAndReturnArgs} args - Arguments to update many TemplateItems.
     * @example
     * // Update many TemplateItems
     * const templateItem = await prisma.templateItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TemplateItems and only return the `templateId`
     * const templateItemWithTemplateIdOnly = await prisma.templateItem.updateManyAndReturn({
     *   select: { templateId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TemplateItemUpdateManyAndReturnArgs>(args: SelectSubset<T, TemplateItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TemplateItem.
     * @param {TemplateItemUpsertArgs} args - Arguments to update or create a TemplateItem.
     * @example
     * // Update or create a TemplateItem
     * const templateItem = await prisma.templateItem.upsert({
     *   create: {
     *     // ... data to create a TemplateItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TemplateItem we want to update
     *   }
     * })
     */
    upsert<T extends TemplateItemUpsertArgs>(args: SelectSubset<T, TemplateItemUpsertArgs<ExtArgs>>): Prisma__TemplateItemClient<$Result.GetResult<Prisma.$TemplateItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TemplateItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateItemCountArgs} args - Arguments to filter TemplateItems to count.
     * @example
     * // Count the number of TemplateItems
     * const count = await prisma.templateItem.count({
     *   where: {
     *     // ... the filter for the TemplateItems we want to count
     *   }
     * })
    **/
    count<T extends TemplateItemCountArgs>(
      args?: Subset<T, TemplateItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TemplateItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TemplateItemAggregateArgs>(args: Subset<T, TemplateItemAggregateArgs>): Prisma.PrismaPromise<GetTemplateItemAggregateType<T>>

    /**
     * Group by TemplateItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateItemGroupByArgs} args - Group by arguments.
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
      T extends TemplateItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateItemGroupByArgs['orderBy'] }
        : { orderBy?: TemplateItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TemplateItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TemplateItem model
   */
  readonly fields: TemplateItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TemplateItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplateItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    template<T extends BadgeTemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BadgeTemplateDefaultArgs<ExtArgs>>): Prisma__BadgeTemplateClient<$Result.GetResult<Prisma.$BadgeTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    item<T extends BadgeItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BadgeItemDefaultArgs<ExtArgs>>): Prisma__BadgeItemClient<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TemplateItem model
   */
  interface TemplateItemFieldRefs {
    readonly templateId: FieldRef<"TemplateItem", 'String'>
    readonly itemId: FieldRef<"TemplateItem", 'String'>
    readonly isRequired: FieldRef<"TemplateItem", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * TemplateItem findUnique
   */
  export type TemplateItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemInclude<ExtArgs> | null
    /**
     * Filter, which TemplateItem to fetch.
     */
    where: TemplateItemWhereUniqueInput
  }

  /**
   * TemplateItem findUniqueOrThrow
   */
  export type TemplateItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemInclude<ExtArgs> | null
    /**
     * Filter, which TemplateItem to fetch.
     */
    where: TemplateItemWhereUniqueInput
  }

  /**
   * TemplateItem findFirst
   */
  export type TemplateItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemInclude<ExtArgs> | null
    /**
     * Filter, which TemplateItem to fetch.
     */
    where?: TemplateItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateItems to fetch.
     */
    orderBy?: TemplateItemOrderByWithRelationInput | TemplateItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplateItems.
     */
    cursor?: TemplateItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateItems.
     */
    distinct?: TemplateItemScalarFieldEnum | TemplateItemScalarFieldEnum[]
  }

  /**
   * TemplateItem findFirstOrThrow
   */
  export type TemplateItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemInclude<ExtArgs> | null
    /**
     * Filter, which TemplateItem to fetch.
     */
    where?: TemplateItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateItems to fetch.
     */
    orderBy?: TemplateItemOrderByWithRelationInput | TemplateItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplateItems.
     */
    cursor?: TemplateItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateItems.
     */
    distinct?: TemplateItemScalarFieldEnum | TemplateItemScalarFieldEnum[]
  }

  /**
   * TemplateItem findMany
   */
  export type TemplateItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemInclude<ExtArgs> | null
    /**
     * Filter, which TemplateItems to fetch.
     */
    where?: TemplateItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateItems to fetch.
     */
    orderBy?: TemplateItemOrderByWithRelationInput | TemplateItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TemplateItems.
     */
    cursor?: TemplateItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateItems.
     */
    distinct?: TemplateItemScalarFieldEnum | TemplateItemScalarFieldEnum[]
  }

  /**
   * TemplateItem create
   */
  export type TemplateItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemInclude<ExtArgs> | null
    /**
     * The data needed to create a TemplateItem.
     */
    data: XOR<TemplateItemCreateInput, TemplateItemUncheckedCreateInput>
  }

  /**
   * TemplateItem createMany
   */
  export type TemplateItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TemplateItems.
     */
    data: TemplateItemCreateManyInput | TemplateItemCreateManyInput[]
  }

  /**
   * TemplateItem createManyAndReturn
   */
  export type TemplateItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * The data used to create many TemplateItems.
     */
    data: TemplateItemCreateManyInput | TemplateItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TemplateItem update
   */
  export type TemplateItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemInclude<ExtArgs> | null
    /**
     * The data needed to update a TemplateItem.
     */
    data: XOR<TemplateItemUpdateInput, TemplateItemUncheckedUpdateInput>
    /**
     * Choose, which TemplateItem to update.
     */
    where: TemplateItemWhereUniqueInput
  }

  /**
   * TemplateItem updateMany
   */
  export type TemplateItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TemplateItems.
     */
    data: XOR<TemplateItemUpdateManyMutationInput, TemplateItemUncheckedUpdateManyInput>
    /**
     * Filter which TemplateItems to update
     */
    where?: TemplateItemWhereInput
    /**
     * Limit how many TemplateItems to update.
     */
    limit?: number
  }

  /**
   * TemplateItem updateManyAndReturn
   */
  export type TemplateItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * The data used to update TemplateItems.
     */
    data: XOR<TemplateItemUpdateManyMutationInput, TemplateItemUncheckedUpdateManyInput>
    /**
     * Filter which TemplateItems to update
     */
    where?: TemplateItemWhereInput
    /**
     * Limit how many TemplateItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TemplateItem upsert
   */
  export type TemplateItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemInclude<ExtArgs> | null
    /**
     * The filter to search for the TemplateItem to update in case it exists.
     */
    where: TemplateItemWhereUniqueInput
    /**
     * In case the TemplateItem found by the `where` argument doesn't exist, create a new TemplateItem with this data.
     */
    create: XOR<TemplateItemCreateInput, TemplateItemUncheckedCreateInput>
    /**
     * In case the TemplateItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateItemUpdateInput, TemplateItemUncheckedUpdateInput>
  }

  /**
   * TemplateItem delete
   */
  export type TemplateItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemInclude<ExtArgs> | null
    /**
     * Filter which TemplateItem to delete.
     */
    where: TemplateItemWhereUniqueInput
  }

  /**
   * TemplateItem deleteMany
   */
  export type TemplateItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplateItems to delete
     */
    where?: TemplateItemWhereInput
    /**
     * Limit how many TemplateItems to delete.
     */
    limit?: number
  }

  /**
   * TemplateItem without action
   */
  export type TemplateItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateItem
     */
    select?: TemplateItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateItem
     */
    omit?: TemplateItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateItemInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null
    priceAtTime: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null
    priceAtTime: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    itemId: string | null
    quantity: number | null
    priceAtTime: number | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    itemId: string | null
    quantity: number | null
    priceAtTime: number | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    itemId: number
    quantity: number
    priceAtTime: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    quantity?: true
    priceAtTime?: true
  }

  export type OrderItemSumAggregateInputType = {
    quantity?: true
    priceAtTime?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    itemId?: true
    quantity?: true
    priceAtTime?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    itemId?: true
    quantity?: true
    priceAtTime?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    itemId?: true
    quantity?: true
    priceAtTime?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    orderId: string
    itemId: string
    quantity: number
    priceAtTime: number
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    itemId?: boolean
    quantity?: boolean
    priceAtTime?: boolean
    item?: boolean | BadgeItemDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    itemId?: boolean
    quantity?: boolean
    priceAtTime?: boolean
    item?: boolean | BadgeItemDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    itemId?: boolean
    quantity?: boolean
    priceAtTime?: boolean
    item?: boolean | BadgeItemDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    itemId?: boolean
    quantity?: boolean
    priceAtTime?: boolean
  }

  export type OrderItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "itemId" | "quantity" | "priceAtTime", ExtArgs["result"]["orderItem"]>
  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | BadgeItemDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | BadgeItemDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    item?: boolean | BadgeItemDefaultArgs<ExtArgs>
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      item: Prisma.$BadgeItemPayload<ExtArgs>
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      itemId: string
      quantity: number
      priceAtTime: number
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems and returns the data updated in the database.
     * @param {OrderItemUpdateManyAndReturnArgs} args - Arguments to update many OrderItems.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderItemUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
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
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    item<T extends BadgeItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BadgeItemDefaultArgs<ExtArgs>>): Prisma__BadgeItemClient<$Result.GetResult<Prisma.$BadgeItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the OrderItem model
   */
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly orderId: FieldRef<"OrderItem", 'String'>
    readonly itemId: FieldRef<"OrderItem", 'String'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly priceAtTime: FieldRef<"OrderItem", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
  }

  /**
   * OrderItem updateManyAndReturn
   */
  export type OrderItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
    /**
     * Limit how many OrderItems to delete.
     */
    limit?: number
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderItem
     */
    omit?: OrderItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model PrintJob
   */

  export type AggregatePrintJob = {
    _count: PrintJobCountAggregateOutputType | null
    _avg: PrintJobAvgAggregateOutputType | null
    _sum: PrintJobSumAggregateOutputType | null
    _min: PrintJobMinAggregateOutputType | null
    _max: PrintJobMaxAggregateOutputType | null
  }

  export type PrintJobAvgAggregateOutputType = {
    errorCode: number | null
    copies: number | null
    retryCount: number | null
  }

  export type PrintJobSumAggregateOutputType = {
    errorCode: number | null
    copies: number | null
    retryCount: number | null
  }

  export type PrintJobMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    status: string | null
    imageUrl: string | null
    errorCode: number | null
    errorMsg: string | null
    copies: number | null
    duplex: boolean | null
    colorMode: string | null
    dpi: string | null
    retryCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrintJobMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    status: string | null
    imageUrl: string | null
    errorCode: number | null
    errorMsg: string | null
    copies: number | null
    duplex: boolean | null
    colorMode: string | null
    dpi: string | null
    retryCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrintJobCountAggregateOutputType = {
    id: number
    orderId: number
    status: number
    imageUrl: number
    errorCode: number
    errorMsg: number
    copies: number
    duplex: number
    colorMode: number
    dpi: number
    retryCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PrintJobAvgAggregateInputType = {
    errorCode?: true
    copies?: true
    retryCount?: true
  }

  export type PrintJobSumAggregateInputType = {
    errorCode?: true
    copies?: true
    retryCount?: true
  }

  export type PrintJobMinAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    imageUrl?: true
    errorCode?: true
    errorMsg?: true
    copies?: true
    duplex?: true
    colorMode?: true
    dpi?: true
    retryCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrintJobMaxAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    imageUrl?: true
    errorCode?: true
    errorMsg?: true
    copies?: true
    duplex?: true
    colorMode?: true
    dpi?: true
    retryCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrintJobCountAggregateInputType = {
    id?: true
    orderId?: true
    status?: true
    imageUrl?: true
    errorCode?: true
    errorMsg?: true
    copies?: true
    duplex?: true
    colorMode?: true
    dpi?: true
    retryCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PrintJobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrintJob to aggregate.
     */
    where?: PrintJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrintJobs to fetch.
     */
    orderBy?: PrintJobOrderByWithRelationInput | PrintJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrintJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrintJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrintJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PrintJobs
    **/
    _count?: true | PrintJobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrintJobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrintJobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrintJobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrintJobMaxAggregateInputType
  }

  export type GetPrintJobAggregateType<T extends PrintJobAggregateArgs> = {
        [P in keyof T & keyof AggregatePrintJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrintJob[P]>
      : GetScalarType<T[P], AggregatePrintJob[P]>
  }




  export type PrintJobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrintJobWhereInput
    orderBy?: PrintJobOrderByWithAggregationInput | PrintJobOrderByWithAggregationInput[]
    by: PrintJobScalarFieldEnum[] | PrintJobScalarFieldEnum
    having?: PrintJobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrintJobCountAggregateInputType | true
    _avg?: PrintJobAvgAggregateInputType
    _sum?: PrintJobSumAggregateInputType
    _min?: PrintJobMinAggregateInputType
    _max?: PrintJobMaxAggregateInputType
  }

  export type PrintJobGroupByOutputType = {
    id: string
    orderId: string
    status: string
    imageUrl: string | null
    errorCode: number | null
    errorMsg: string | null
    copies: number
    duplex: boolean
    colorMode: string
    dpi: string
    retryCount: number
    createdAt: Date
    updatedAt: Date
    _count: PrintJobCountAggregateOutputType | null
    _avg: PrintJobAvgAggregateOutputType | null
    _sum: PrintJobSumAggregateOutputType | null
    _min: PrintJobMinAggregateOutputType | null
    _max: PrintJobMaxAggregateOutputType | null
  }

  type GetPrintJobGroupByPayload<T extends PrintJobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrintJobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrintJobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrintJobGroupByOutputType[P]>
            : GetScalarType<T[P], PrintJobGroupByOutputType[P]>
        }
      >
    >


  export type PrintJobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    imageUrl?: boolean
    errorCode?: boolean
    errorMsg?: boolean
    copies?: boolean
    duplex?: boolean
    colorMode?: boolean
    dpi?: boolean
    retryCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["printJob"]>

  export type PrintJobSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    imageUrl?: boolean
    errorCode?: boolean
    errorMsg?: boolean
    copies?: boolean
    duplex?: boolean
    colorMode?: boolean
    dpi?: boolean
    retryCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["printJob"]>

  export type PrintJobSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    status?: boolean
    imageUrl?: boolean
    errorCode?: boolean
    errorMsg?: boolean
    copies?: boolean
    duplex?: boolean
    colorMode?: boolean
    dpi?: boolean
    retryCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["printJob"]>

  export type PrintJobSelectScalar = {
    id?: boolean
    orderId?: boolean
    status?: boolean
    imageUrl?: boolean
    errorCode?: boolean
    errorMsg?: boolean
    copies?: boolean
    duplex?: boolean
    colorMode?: boolean
    dpi?: boolean
    retryCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PrintJobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "status" | "imageUrl" | "errorCode" | "errorMsg" | "copies" | "duplex" | "colorMode" | "dpi" | "retryCount" | "createdAt" | "updatedAt", ExtArgs["result"]["printJob"]>

  export type $PrintJobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PrintJob"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      status: string
      imageUrl: string | null
      errorCode: number | null
      errorMsg: string | null
      copies: number
      duplex: boolean
      colorMode: string
      dpi: string
      retryCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["printJob"]>
    composites: {}
  }

  type PrintJobGetPayload<S extends boolean | null | undefined | PrintJobDefaultArgs> = $Result.GetResult<Prisma.$PrintJobPayload, S>

  type PrintJobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrintJobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrintJobCountAggregateInputType | true
    }

  export interface PrintJobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PrintJob'], meta: { name: 'PrintJob' } }
    /**
     * Find zero or one PrintJob that matches the filter.
     * @param {PrintJobFindUniqueArgs} args - Arguments to find a PrintJob
     * @example
     * // Get one PrintJob
     * const printJob = await prisma.printJob.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrintJobFindUniqueArgs>(args: SelectSubset<T, PrintJobFindUniqueArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PrintJob that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrintJobFindUniqueOrThrowArgs} args - Arguments to find a PrintJob
     * @example
     * // Get one PrintJob
     * const printJob = await prisma.printJob.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrintJobFindUniqueOrThrowArgs>(args: SelectSubset<T, PrintJobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PrintJob that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobFindFirstArgs} args - Arguments to find a PrintJob
     * @example
     * // Get one PrintJob
     * const printJob = await prisma.printJob.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrintJobFindFirstArgs>(args?: SelectSubset<T, PrintJobFindFirstArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PrintJob that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobFindFirstOrThrowArgs} args - Arguments to find a PrintJob
     * @example
     * // Get one PrintJob
     * const printJob = await prisma.printJob.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrintJobFindFirstOrThrowArgs>(args?: SelectSubset<T, PrintJobFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PrintJobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PrintJobs
     * const printJobs = await prisma.printJob.findMany()
     * 
     * // Get first 10 PrintJobs
     * const printJobs = await prisma.printJob.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const printJobWithIdOnly = await prisma.printJob.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrintJobFindManyArgs>(args?: SelectSubset<T, PrintJobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PrintJob.
     * @param {PrintJobCreateArgs} args - Arguments to create a PrintJob.
     * @example
     * // Create one PrintJob
     * const PrintJob = await prisma.printJob.create({
     *   data: {
     *     // ... data to create a PrintJob
     *   }
     * })
     * 
     */
    create<T extends PrintJobCreateArgs>(args: SelectSubset<T, PrintJobCreateArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PrintJobs.
     * @param {PrintJobCreateManyArgs} args - Arguments to create many PrintJobs.
     * @example
     * // Create many PrintJobs
     * const printJob = await prisma.printJob.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrintJobCreateManyArgs>(args?: SelectSubset<T, PrintJobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PrintJobs and returns the data saved in the database.
     * @param {PrintJobCreateManyAndReturnArgs} args - Arguments to create many PrintJobs.
     * @example
     * // Create many PrintJobs
     * const printJob = await prisma.printJob.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PrintJobs and only return the `id`
     * const printJobWithIdOnly = await prisma.printJob.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrintJobCreateManyAndReturnArgs>(args?: SelectSubset<T, PrintJobCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PrintJob.
     * @param {PrintJobDeleteArgs} args - Arguments to delete one PrintJob.
     * @example
     * // Delete one PrintJob
     * const PrintJob = await prisma.printJob.delete({
     *   where: {
     *     // ... filter to delete one PrintJob
     *   }
     * })
     * 
     */
    delete<T extends PrintJobDeleteArgs>(args: SelectSubset<T, PrintJobDeleteArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PrintJob.
     * @param {PrintJobUpdateArgs} args - Arguments to update one PrintJob.
     * @example
     * // Update one PrintJob
     * const printJob = await prisma.printJob.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrintJobUpdateArgs>(args: SelectSubset<T, PrintJobUpdateArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PrintJobs.
     * @param {PrintJobDeleteManyArgs} args - Arguments to filter PrintJobs to delete.
     * @example
     * // Delete a few PrintJobs
     * const { count } = await prisma.printJob.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrintJobDeleteManyArgs>(args?: SelectSubset<T, PrintJobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PrintJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PrintJobs
     * const printJob = await prisma.printJob.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrintJobUpdateManyArgs>(args: SelectSubset<T, PrintJobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PrintJobs and returns the data updated in the database.
     * @param {PrintJobUpdateManyAndReturnArgs} args - Arguments to update many PrintJobs.
     * @example
     * // Update many PrintJobs
     * const printJob = await prisma.printJob.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PrintJobs and only return the `id`
     * const printJobWithIdOnly = await prisma.printJob.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PrintJobUpdateManyAndReturnArgs>(args: SelectSubset<T, PrintJobUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PrintJob.
     * @param {PrintJobUpsertArgs} args - Arguments to update or create a PrintJob.
     * @example
     * // Update or create a PrintJob
     * const printJob = await prisma.printJob.upsert({
     *   create: {
     *     // ... data to create a PrintJob
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PrintJob we want to update
     *   }
     * })
     */
    upsert<T extends PrintJobUpsertArgs>(args: SelectSubset<T, PrintJobUpsertArgs<ExtArgs>>): Prisma__PrintJobClient<$Result.GetResult<Prisma.$PrintJobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PrintJobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobCountArgs} args - Arguments to filter PrintJobs to count.
     * @example
     * // Count the number of PrintJobs
     * const count = await prisma.printJob.count({
     *   where: {
     *     // ... the filter for the PrintJobs we want to count
     *   }
     * })
    **/
    count<T extends PrintJobCountArgs>(
      args?: Subset<T, PrintJobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrintJobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PrintJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PrintJobAggregateArgs>(args: Subset<T, PrintJobAggregateArgs>): Prisma.PrismaPromise<GetPrintJobAggregateType<T>>

    /**
     * Group by PrintJob.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrintJobGroupByArgs} args - Group by arguments.
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
      T extends PrintJobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrintJobGroupByArgs['orderBy'] }
        : { orderBy?: PrintJobGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PrintJobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrintJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PrintJob model
   */
  readonly fields: PrintJobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PrintJob.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrintJobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PrintJob model
   */
  interface PrintJobFieldRefs {
    readonly id: FieldRef<"PrintJob", 'String'>
    readonly orderId: FieldRef<"PrintJob", 'String'>
    readonly status: FieldRef<"PrintJob", 'String'>
    readonly imageUrl: FieldRef<"PrintJob", 'String'>
    readonly errorCode: FieldRef<"PrintJob", 'Int'>
    readonly errorMsg: FieldRef<"PrintJob", 'String'>
    readonly copies: FieldRef<"PrintJob", 'Int'>
    readonly duplex: FieldRef<"PrintJob", 'Boolean'>
    readonly colorMode: FieldRef<"PrintJob", 'String'>
    readonly dpi: FieldRef<"PrintJob", 'String'>
    readonly retryCount: FieldRef<"PrintJob", 'Int'>
    readonly createdAt: FieldRef<"PrintJob", 'DateTime'>
    readonly updatedAt: FieldRef<"PrintJob", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PrintJob findUnique
   */
  export type PrintJobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Filter, which PrintJob to fetch.
     */
    where: PrintJobWhereUniqueInput
  }

  /**
   * PrintJob findUniqueOrThrow
   */
  export type PrintJobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Filter, which PrintJob to fetch.
     */
    where: PrintJobWhereUniqueInput
  }

  /**
   * PrintJob findFirst
   */
  export type PrintJobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Filter, which PrintJob to fetch.
     */
    where?: PrintJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrintJobs to fetch.
     */
    orderBy?: PrintJobOrderByWithRelationInput | PrintJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrintJobs.
     */
    cursor?: PrintJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrintJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrintJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrintJobs.
     */
    distinct?: PrintJobScalarFieldEnum | PrintJobScalarFieldEnum[]
  }

  /**
   * PrintJob findFirstOrThrow
   */
  export type PrintJobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Filter, which PrintJob to fetch.
     */
    where?: PrintJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrintJobs to fetch.
     */
    orderBy?: PrintJobOrderByWithRelationInput | PrintJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrintJobs.
     */
    cursor?: PrintJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrintJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrintJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrintJobs.
     */
    distinct?: PrintJobScalarFieldEnum | PrintJobScalarFieldEnum[]
  }

  /**
   * PrintJob findMany
   */
  export type PrintJobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Filter, which PrintJobs to fetch.
     */
    where?: PrintJobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrintJobs to fetch.
     */
    orderBy?: PrintJobOrderByWithRelationInput | PrintJobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PrintJobs.
     */
    cursor?: PrintJobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrintJobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrintJobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrintJobs.
     */
    distinct?: PrintJobScalarFieldEnum | PrintJobScalarFieldEnum[]
  }

  /**
   * PrintJob create
   */
  export type PrintJobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * The data needed to create a PrintJob.
     */
    data: XOR<PrintJobCreateInput, PrintJobUncheckedCreateInput>
  }

  /**
   * PrintJob createMany
   */
  export type PrintJobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PrintJobs.
     */
    data: PrintJobCreateManyInput | PrintJobCreateManyInput[]
  }

  /**
   * PrintJob createManyAndReturn
   */
  export type PrintJobCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * The data used to create many PrintJobs.
     */
    data: PrintJobCreateManyInput | PrintJobCreateManyInput[]
  }

  /**
   * PrintJob update
   */
  export type PrintJobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * The data needed to update a PrintJob.
     */
    data: XOR<PrintJobUpdateInput, PrintJobUncheckedUpdateInput>
    /**
     * Choose, which PrintJob to update.
     */
    where: PrintJobWhereUniqueInput
  }

  /**
   * PrintJob updateMany
   */
  export type PrintJobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PrintJobs.
     */
    data: XOR<PrintJobUpdateManyMutationInput, PrintJobUncheckedUpdateManyInput>
    /**
     * Filter which PrintJobs to update
     */
    where?: PrintJobWhereInput
    /**
     * Limit how many PrintJobs to update.
     */
    limit?: number
  }

  /**
   * PrintJob updateManyAndReturn
   */
  export type PrintJobUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * The data used to update PrintJobs.
     */
    data: XOR<PrintJobUpdateManyMutationInput, PrintJobUncheckedUpdateManyInput>
    /**
     * Filter which PrintJobs to update
     */
    where?: PrintJobWhereInput
    /**
     * Limit how many PrintJobs to update.
     */
    limit?: number
  }

  /**
   * PrintJob upsert
   */
  export type PrintJobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * The filter to search for the PrintJob to update in case it exists.
     */
    where: PrintJobWhereUniqueInput
    /**
     * In case the PrintJob found by the `where` argument doesn't exist, create a new PrintJob with this data.
     */
    create: XOR<PrintJobCreateInput, PrintJobUncheckedCreateInput>
    /**
     * In case the PrintJob was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrintJobUpdateInput, PrintJobUncheckedUpdateInput>
  }

  /**
   * PrintJob delete
   */
  export type PrintJobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
    /**
     * Filter which PrintJob to delete.
     */
    where: PrintJobWhereUniqueInput
  }

  /**
   * PrintJob deleteMany
   */
  export type PrintJobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrintJobs to delete
     */
    where?: PrintJobWhereInput
    /**
     * Limit how many PrintJobs to delete.
     */
    limit?: number
  }

  /**
   * PrintJob without action
   */
  export type PrintJobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrintJob
     */
    select?: PrintJobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrintJob
     */
    omit?: PrintJobOmit<ExtArgs> | null
  }


  /**
   * Model PrinterTelemetry
   */

  export type AggregatePrinterTelemetry = {
    _count: PrinterTelemetryCountAggregateOutputType | null
    _avg: PrinterTelemetryAvgAggregateOutputType | null
    _sum: PrinterTelemetrySumAggregateOutputType | null
    _min: PrinterTelemetryMinAggregateOutputType | null
    _max: PrinterTelemetryMaxAggregateOutputType | null
  }

  export type PrinterTelemetryAvgAggregateOutputType = {
    ribbonRemaining: number | null
    totalCompleted: number | null
    totalPicked: number | null
    totalRejected: number | null
    totalLost: number | null
    currentCompleted: number | null
    currentPicked: number | null
    currentRejected: number | null
    cardsSinceClean: number | null
    cleaningsRun: number | null
    cardsVirtualStock: number | null
    cardsPrintedSite: number | null
  }

  export type PrinterTelemetrySumAggregateOutputType = {
    ribbonRemaining: number | null
    totalCompleted: number | null
    totalPicked: number | null
    totalRejected: number | null
    totalLost: number | null
    currentCompleted: number | null
    currentPicked: number | null
    currentRejected: number | null
    cardsSinceClean: number | null
    cleaningsRun: number | null
    cardsVirtualStock: number | null
    cardsPrintedSite: number | null
  }

  export type PrinterTelemetryMinAggregateOutputType = {
    id: string | null
    printerModel: string | null
    serialNumber: string | null
    firmwareVersion: string | null
    printerStatus: string | null
    connectionType: string | null
    ribbonType: string | null
    ribbonRemaining: number | null
    ribbonPartNumber: string | null
    ribbonSerialNumber: string | null
    totalCompleted: number | null
    totalPicked: number | null
    totalRejected: number | null
    totalLost: number | null
    currentCompleted: number | null
    currentPicked: number | null
    currentRejected: number | null
    cardsSinceClean: number | null
    cleaningsRun: number | null
    hopper1Status: string | null
    exceptionStatus: string | null
    colorMode: string | null
    cardsVirtualStock: number | null
    cardsPrintedSite: number | null
    lastUpdated: Date | null
  }

  export type PrinterTelemetryMaxAggregateOutputType = {
    id: string | null
    printerModel: string | null
    serialNumber: string | null
    firmwareVersion: string | null
    printerStatus: string | null
    connectionType: string | null
    ribbonType: string | null
    ribbonRemaining: number | null
    ribbonPartNumber: string | null
    ribbonSerialNumber: string | null
    totalCompleted: number | null
    totalPicked: number | null
    totalRejected: number | null
    totalLost: number | null
    currentCompleted: number | null
    currentPicked: number | null
    currentRejected: number | null
    cardsSinceClean: number | null
    cleaningsRun: number | null
    hopper1Status: string | null
    exceptionStatus: string | null
    colorMode: string | null
    cardsVirtualStock: number | null
    cardsPrintedSite: number | null
    lastUpdated: Date | null
  }

  export type PrinterTelemetryCountAggregateOutputType = {
    id: number
    printerModel: number
    serialNumber: number
    firmwareVersion: number
    printerStatus: number
    connectionType: number
    ribbonType: number
    ribbonRemaining: number
    ribbonPartNumber: number
    ribbonSerialNumber: number
    totalCompleted: number
    totalPicked: number
    totalRejected: number
    totalLost: number
    currentCompleted: number
    currentPicked: number
    currentRejected: number
    cardsSinceClean: number
    cleaningsRun: number
    hopper1Status: number
    exceptionStatus: number
    colorMode: number
    cardsVirtualStock: number
    cardsPrintedSite: number
    lastUpdated: number
    _all: number
  }


  export type PrinterTelemetryAvgAggregateInputType = {
    ribbonRemaining?: true
    totalCompleted?: true
    totalPicked?: true
    totalRejected?: true
    totalLost?: true
    currentCompleted?: true
    currentPicked?: true
    currentRejected?: true
    cardsSinceClean?: true
    cleaningsRun?: true
    cardsVirtualStock?: true
    cardsPrintedSite?: true
  }

  export type PrinterTelemetrySumAggregateInputType = {
    ribbonRemaining?: true
    totalCompleted?: true
    totalPicked?: true
    totalRejected?: true
    totalLost?: true
    currentCompleted?: true
    currentPicked?: true
    currentRejected?: true
    cardsSinceClean?: true
    cleaningsRun?: true
    cardsVirtualStock?: true
    cardsPrintedSite?: true
  }

  export type PrinterTelemetryMinAggregateInputType = {
    id?: true
    printerModel?: true
    serialNumber?: true
    firmwareVersion?: true
    printerStatus?: true
    connectionType?: true
    ribbonType?: true
    ribbonRemaining?: true
    ribbonPartNumber?: true
    ribbonSerialNumber?: true
    totalCompleted?: true
    totalPicked?: true
    totalRejected?: true
    totalLost?: true
    currentCompleted?: true
    currentPicked?: true
    currentRejected?: true
    cardsSinceClean?: true
    cleaningsRun?: true
    hopper1Status?: true
    exceptionStatus?: true
    colorMode?: true
    cardsVirtualStock?: true
    cardsPrintedSite?: true
    lastUpdated?: true
  }

  export type PrinterTelemetryMaxAggregateInputType = {
    id?: true
    printerModel?: true
    serialNumber?: true
    firmwareVersion?: true
    printerStatus?: true
    connectionType?: true
    ribbonType?: true
    ribbonRemaining?: true
    ribbonPartNumber?: true
    ribbonSerialNumber?: true
    totalCompleted?: true
    totalPicked?: true
    totalRejected?: true
    totalLost?: true
    currentCompleted?: true
    currentPicked?: true
    currentRejected?: true
    cardsSinceClean?: true
    cleaningsRun?: true
    hopper1Status?: true
    exceptionStatus?: true
    colorMode?: true
    cardsVirtualStock?: true
    cardsPrintedSite?: true
    lastUpdated?: true
  }

  export type PrinterTelemetryCountAggregateInputType = {
    id?: true
    printerModel?: true
    serialNumber?: true
    firmwareVersion?: true
    printerStatus?: true
    connectionType?: true
    ribbonType?: true
    ribbonRemaining?: true
    ribbonPartNumber?: true
    ribbonSerialNumber?: true
    totalCompleted?: true
    totalPicked?: true
    totalRejected?: true
    totalLost?: true
    currentCompleted?: true
    currentPicked?: true
    currentRejected?: true
    cardsSinceClean?: true
    cleaningsRun?: true
    hopper1Status?: true
    exceptionStatus?: true
    colorMode?: true
    cardsVirtualStock?: true
    cardsPrintedSite?: true
    lastUpdated?: true
    _all?: true
  }

  export type PrinterTelemetryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrinterTelemetry to aggregate.
     */
    where?: PrinterTelemetryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrinterTelemetries to fetch.
     */
    orderBy?: PrinterTelemetryOrderByWithRelationInput | PrinterTelemetryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrinterTelemetryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrinterTelemetries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrinterTelemetries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PrinterTelemetries
    **/
    _count?: true | PrinterTelemetryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrinterTelemetryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrinterTelemetrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrinterTelemetryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrinterTelemetryMaxAggregateInputType
  }

  export type GetPrinterTelemetryAggregateType<T extends PrinterTelemetryAggregateArgs> = {
        [P in keyof T & keyof AggregatePrinterTelemetry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrinterTelemetry[P]>
      : GetScalarType<T[P], AggregatePrinterTelemetry[P]>
  }




  export type PrinterTelemetryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrinterTelemetryWhereInput
    orderBy?: PrinterTelemetryOrderByWithAggregationInput | PrinterTelemetryOrderByWithAggregationInput[]
    by: PrinterTelemetryScalarFieldEnum[] | PrinterTelemetryScalarFieldEnum
    having?: PrinterTelemetryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrinterTelemetryCountAggregateInputType | true
    _avg?: PrinterTelemetryAvgAggregateInputType
    _sum?: PrinterTelemetrySumAggregateInputType
    _min?: PrinterTelemetryMinAggregateInputType
    _max?: PrinterTelemetryMaxAggregateInputType
  }

  export type PrinterTelemetryGroupByOutputType = {
    id: string
    printerModel: string
    serialNumber: string
    firmwareVersion: string
    printerStatus: string
    connectionType: string
    ribbonType: string
    ribbonRemaining: number
    ribbonPartNumber: string
    ribbonSerialNumber: string
    totalCompleted: number
    totalPicked: number
    totalRejected: number
    totalLost: number
    currentCompleted: number
    currentPicked: number
    currentRejected: number
    cardsSinceClean: number
    cleaningsRun: number
    hopper1Status: string
    exceptionStatus: string
    colorMode: string
    cardsVirtualStock: number
    cardsPrintedSite: number
    lastUpdated: Date
    _count: PrinterTelemetryCountAggregateOutputType | null
    _avg: PrinterTelemetryAvgAggregateOutputType | null
    _sum: PrinterTelemetrySumAggregateOutputType | null
    _min: PrinterTelemetryMinAggregateOutputType | null
    _max: PrinterTelemetryMaxAggregateOutputType | null
  }

  type GetPrinterTelemetryGroupByPayload<T extends PrinterTelemetryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrinterTelemetryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrinterTelemetryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrinterTelemetryGroupByOutputType[P]>
            : GetScalarType<T[P], PrinterTelemetryGroupByOutputType[P]>
        }
      >
    >


  export type PrinterTelemetrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    printerModel?: boolean
    serialNumber?: boolean
    firmwareVersion?: boolean
    printerStatus?: boolean
    connectionType?: boolean
    ribbonType?: boolean
    ribbonRemaining?: boolean
    ribbonPartNumber?: boolean
    ribbonSerialNumber?: boolean
    totalCompleted?: boolean
    totalPicked?: boolean
    totalRejected?: boolean
    totalLost?: boolean
    currentCompleted?: boolean
    currentPicked?: boolean
    currentRejected?: boolean
    cardsSinceClean?: boolean
    cleaningsRun?: boolean
    hopper1Status?: boolean
    exceptionStatus?: boolean
    colorMode?: boolean
    cardsVirtualStock?: boolean
    cardsPrintedSite?: boolean
    lastUpdated?: boolean
  }, ExtArgs["result"]["printerTelemetry"]>

  export type PrinterTelemetrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    printerModel?: boolean
    serialNumber?: boolean
    firmwareVersion?: boolean
    printerStatus?: boolean
    connectionType?: boolean
    ribbonType?: boolean
    ribbonRemaining?: boolean
    ribbonPartNumber?: boolean
    ribbonSerialNumber?: boolean
    totalCompleted?: boolean
    totalPicked?: boolean
    totalRejected?: boolean
    totalLost?: boolean
    currentCompleted?: boolean
    currentPicked?: boolean
    currentRejected?: boolean
    cardsSinceClean?: boolean
    cleaningsRun?: boolean
    hopper1Status?: boolean
    exceptionStatus?: boolean
    colorMode?: boolean
    cardsVirtualStock?: boolean
    cardsPrintedSite?: boolean
    lastUpdated?: boolean
  }, ExtArgs["result"]["printerTelemetry"]>

  export type PrinterTelemetrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    printerModel?: boolean
    serialNumber?: boolean
    firmwareVersion?: boolean
    printerStatus?: boolean
    connectionType?: boolean
    ribbonType?: boolean
    ribbonRemaining?: boolean
    ribbonPartNumber?: boolean
    ribbonSerialNumber?: boolean
    totalCompleted?: boolean
    totalPicked?: boolean
    totalRejected?: boolean
    totalLost?: boolean
    currentCompleted?: boolean
    currentPicked?: boolean
    currentRejected?: boolean
    cardsSinceClean?: boolean
    cleaningsRun?: boolean
    hopper1Status?: boolean
    exceptionStatus?: boolean
    colorMode?: boolean
    cardsVirtualStock?: boolean
    cardsPrintedSite?: boolean
    lastUpdated?: boolean
  }, ExtArgs["result"]["printerTelemetry"]>

  export type PrinterTelemetrySelectScalar = {
    id?: boolean
    printerModel?: boolean
    serialNumber?: boolean
    firmwareVersion?: boolean
    printerStatus?: boolean
    connectionType?: boolean
    ribbonType?: boolean
    ribbonRemaining?: boolean
    ribbonPartNumber?: boolean
    ribbonSerialNumber?: boolean
    totalCompleted?: boolean
    totalPicked?: boolean
    totalRejected?: boolean
    totalLost?: boolean
    currentCompleted?: boolean
    currentPicked?: boolean
    currentRejected?: boolean
    cardsSinceClean?: boolean
    cleaningsRun?: boolean
    hopper1Status?: boolean
    exceptionStatus?: boolean
    colorMode?: boolean
    cardsVirtualStock?: boolean
    cardsPrintedSite?: boolean
    lastUpdated?: boolean
  }

  export type PrinterTelemetryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "printerModel" | "serialNumber" | "firmwareVersion" | "printerStatus" | "connectionType" | "ribbonType" | "ribbonRemaining" | "ribbonPartNumber" | "ribbonSerialNumber" | "totalCompleted" | "totalPicked" | "totalRejected" | "totalLost" | "currentCompleted" | "currentPicked" | "currentRejected" | "cardsSinceClean" | "cleaningsRun" | "hopper1Status" | "exceptionStatus" | "colorMode" | "cardsVirtualStock" | "cardsPrintedSite" | "lastUpdated", ExtArgs["result"]["printerTelemetry"]>

  export type $PrinterTelemetryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PrinterTelemetry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      printerModel: string
      serialNumber: string
      firmwareVersion: string
      printerStatus: string
      connectionType: string
      ribbonType: string
      ribbonRemaining: number
      ribbonPartNumber: string
      ribbonSerialNumber: string
      totalCompleted: number
      totalPicked: number
      totalRejected: number
      totalLost: number
      currentCompleted: number
      currentPicked: number
      currentRejected: number
      cardsSinceClean: number
      cleaningsRun: number
      hopper1Status: string
      exceptionStatus: string
      colorMode: string
      cardsVirtualStock: number
      cardsPrintedSite: number
      lastUpdated: Date
    }, ExtArgs["result"]["printerTelemetry"]>
    composites: {}
  }

  type PrinterTelemetryGetPayload<S extends boolean | null | undefined | PrinterTelemetryDefaultArgs> = $Result.GetResult<Prisma.$PrinterTelemetryPayload, S>

  type PrinterTelemetryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrinterTelemetryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrinterTelemetryCountAggregateInputType | true
    }

  export interface PrinterTelemetryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PrinterTelemetry'], meta: { name: 'PrinterTelemetry' } }
    /**
     * Find zero or one PrinterTelemetry that matches the filter.
     * @param {PrinterTelemetryFindUniqueArgs} args - Arguments to find a PrinterTelemetry
     * @example
     * // Get one PrinterTelemetry
     * const printerTelemetry = await prisma.printerTelemetry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrinterTelemetryFindUniqueArgs>(args: SelectSubset<T, PrinterTelemetryFindUniqueArgs<ExtArgs>>): Prisma__PrinterTelemetryClient<$Result.GetResult<Prisma.$PrinterTelemetryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PrinterTelemetry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrinterTelemetryFindUniqueOrThrowArgs} args - Arguments to find a PrinterTelemetry
     * @example
     * // Get one PrinterTelemetry
     * const printerTelemetry = await prisma.printerTelemetry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrinterTelemetryFindUniqueOrThrowArgs>(args: SelectSubset<T, PrinterTelemetryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrinterTelemetryClient<$Result.GetResult<Prisma.$PrinterTelemetryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PrinterTelemetry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterTelemetryFindFirstArgs} args - Arguments to find a PrinterTelemetry
     * @example
     * // Get one PrinterTelemetry
     * const printerTelemetry = await prisma.printerTelemetry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrinterTelemetryFindFirstArgs>(args?: SelectSubset<T, PrinterTelemetryFindFirstArgs<ExtArgs>>): Prisma__PrinterTelemetryClient<$Result.GetResult<Prisma.$PrinterTelemetryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PrinterTelemetry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterTelemetryFindFirstOrThrowArgs} args - Arguments to find a PrinterTelemetry
     * @example
     * // Get one PrinterTelemetry
     * const printerTelemetry = await prisma.printerTelemetry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrinterTelemetryFindFirstOrThrowArgs>(args?: SelectSubset<T, PrinterTelemetryFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrinterTelemetryClient<$Result.GetResult<Prisma.$PrinterTelemetryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PrinterTelemetries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterTelemetryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PrinterTelemetries
     * const printerTelemetries = await prisma.printerTelemetry.findMany()
     * 
     * // Get first 10 PrinterTelemetries
     * const printerTelemetries = await prisma.printerTelemetry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const printerTelemetryWithIdOnly = await prisma.printerTelemetry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrinterTelemetryFindManyArgs>(args?: SelectSubset<T, PrinterTelemetryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrinterTelemetryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PrinterTelemetry.
     * @param {PrinterTelemetryCreateArgs} args - Arguments to create a PrinterTelemetry.
     * @example
     * // Create one PrinterTelemetry
     * const PrinterTelemetry = await prisma.printerTelemetry.create({
     *   data: {
     *     // ... data to create a PrinterTelemetry
     *   }
     * })
     * 
     */
    create<T extends PrinterTelemetryCreateArgs>(args: SelectSubset<T, PrinterTelemetryCreateArgs<ExtArgs>>): Prisma__PrinterTelemetryClient<$Result.GetResult<Prisma.$PrinterTelemetryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PrinterTelemetries.
     * @param {PrinterTelemetryCreateManyArgs} args - Arguments to create many PrinterTelemetries.
     * @example
     * // Create many PrinterTelemetries
     * const printerTelemetry = await prisma.printerTelemetry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrinterTelemetryCreateManyArgs>(args?: SelectSubset<T, PrinterTelemetryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PrinterTelemetries and returns the data saved in the database.
     * @param {PrinterTelemetryCreateManyAndReturnArgs} args - Arguments to create many PrinterTelemetries.
     * @example
     * // Create many PrinterTelemetries
     * const printerTelemetry = await prisma.printerTelemetry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PrinterTelemetries and only return the `id`
     * const printerTelemetryWithIdOnly = await prisma.printerTelemetry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrinterTelemetryCreateManyAndReturnArgs>(args?: SelectSubset<T, PrinterTelemetryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrinterTelemetryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PrinterTelemetry.
     * @param {PrinterTelemetryDeleteArgs} args - Arguments to delete one PrinterTelemetry.
     * @example
     * // Delete one PrinterTelemetry
     * const PrinterTelemetry = await prisma.printerTelemetry.delete({
     *   where: {
     *     // ... filter to delete one PrinterTelemetry
     *   }
     * })
     * 
     */
    delete<T extends PrinterTelemetryDeleteArgs>(args: SelectSubset<T, PrinterTelemetryDeleteArgs<ExtArgs>>): Prisma__PrinterTelemetryClient<$Result.GetResult<Prisma.$PrinterTelemetryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PrinterTelemetry.
     * @param {PrinterTelemetryUpdateArgs} args - Arguments to update one PrinterTelemetry.
     * @example
     * // Update one PrinterTelemetry
     * const printerTelemetry = await prisma.printerTelemetry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrinterTelemetryUpdateArgs>(args: SelectSubset<T, PrinterTelemetryUpdateArgs<ExtArgs>>): Prisma__PrinterTelemetryClient<$Result.GetResult<Prisma.$PrinterTelemetryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PrinterTelemetries.
     * @param {PrinterTelemetryDeleteManyArgs} args - Arguments to filter PrinterTelemetries to delete.
     * @example
     * // Delete a few PrinterTelemetries
     * const { count } = await prisma.printerTelemetry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrinterTelemetryDeleteManyArgs>(args?: SelectSubset<T, PrinterTelemetryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PrinterTelemetries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterTelemetryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PrinterTelemetries
     * const printerTelemetry = await prisma.printerTelemetry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrinterTelemetryUpdateManyArgs>(args: SelectSubset<T, PrinterTelemetryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PrinterTelemetries and returns the data updated in the database.
     * @param {PrinterTelemetryUpdateManyAndReturnArgs} args - Arguments to update many PrinterTelemetries.
     * @example
     * // Update many PrinterTelemetries
     * const printerTelemetry = await prisma.printerTelemetry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PrinterTelemetries and only return the `id`
     * const printerTelemetryWithIdOnly = await prisma.printerTelemetry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PrinterTelemetryUpdateManyAndReturnArgs>(args: SelectSubset<T, PrinterTelemetryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrinterTelemetryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PrinterTelemetry.
     * @param {PrinterTelemetryUpsertArgs} args - Arguments to update or create a PrinterTelemetry.
     * @example
     * // Update or create a PrinterTelemetry
     * const printerTelemetry = await prisma.printerTelemetry.upsert({
     *   create: {
     *     // ... data to create a PrinterTelemetry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PrinterTelemetry we want to update
     *   }
     * })
     */
    upsert<T extends PrinterTelemetryUpsertArgs>(args: SelectSubset<T, PrinterTelemetryUpsertArgs<ExtArgs>>): Prisma__PrinterTelemetryClient<$Result.GetResult<Prisma.$PrinterTelemetryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PrinterTelemetries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterTelemetryCountArgs} args - Arguments to filter PrinterTelemetries to count.
     * @example
     * // Count the number of PrinterTelemetries
     * const count = await prisma.printerTelemetry.count({
     *   where: {
     *     // ... the filter for the PrinterTelemetries we want to count
     *   }
     * })
    **/
    count<T extends PrinterTelemetryCountArgs>(
      args?: Subset<T, PrinterTelemetryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrinterTelemetryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PrinterTelemetry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterTelemetryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PrinterTelemetryAggregateArgs>(args: Subset<T, PrinterTelemetryAggregateArgs>): Prisma.PrismaPromise<GetPrinterTelemetryAggregateType<T>>

    /**
     * Group by PrinterTelemetry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrinterTelemetryGroupByArgs} args - Group by arguments.
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
      T extends PrinterTelemetryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrinterTelemetryGroupByArgs['orderBy'] }
        : { orderBy?: PrinterTelemetryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PrinterTelemetryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrinterTelemetryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PrinterTelemetry model
   */
  readonly fields: PrinterTelemetryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PrinterTelemetry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrinterTelemetryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the PrinterTelemetry model
   */
  interface PrinterTelemetryFieldRefs {
    readonly id: FieldRef<"PrinterTelemetry", 'String'>
    readonly printerModel: FieldRef<"PrinterTelemetry", 'String'>
    readonly serialNumber: FieldRef<"PrinterTelemetry", 'String'>
    readonly firmwareVersion: FieldRef<"PrinterTelemetry", 'String'>
    readonly printerStatus: FieldRef<"PrinterTelemetry", 'String'>
    readonly connectionType: FieldRef<"PrinterTelemetry", 'String'>
    readonly ribbonType: FieldRef<"PrinterTelemetry", 'String'>
    readonly ribbonRemaining: FieldRef<"PrinterTelemetry", 'Int'>
    readonly ribbonPartNumber: FieldRef<"PrinterTelemetry", 'String'>
    readonly ribbonSerialNumber: FieldRef<"PrinterTelemetry", 'String'>
    readonly totalCompleted: FieldRef<"PrinterTelemetry", 'Int'>
    readonly totalPicked: FieldRef<"PrinterTelemetry", 'Int'>
    readonly totalRejected: FieldRef<"PrinterTelemetry", 'Int'>
    readonly totalLost: FieldRef<"PrinterTelemetry", 'Int'>
    readonly currentCompleted: FieldRef<"PrinterTelemetry", 'Int'>
    readonly currentPicked: FieldRef<"PrinterTelemetry", 'Int'>
    readonly currentRejected: FieldRef<"PrinterTelemetry", 'Int'>
    readonly cardsSinceClean: FieldRef<"PrinterTelemetry", 'Int'>
    readonly cleaningsRun: FieldRef<"PrinterTelemetry", 'Int'>
    readonly hopper1Status: FieldRef<"PrinterTelemetry", 'String'>
    readonly exceptionStatus: FieldRef<"PrinterTelemetry", 'String'>
    readonly colorMode: FieldRef<"PrinterTelemetry", 'String'>
    readonly cardsVirtualStock: FieldRef<"PrinterTelemetry", 'Int'>
    readonly cardsPrintedSite: FieldRef<"PrinterTelemetry", 'Int'>
    readonly lastUpdated: FieldRef<"PrinterTelemetry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PrinterTelemetry findUnique
   */
  export type PrinterTelemetryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterTelemetry
     */
    select?: PrinterTelemetrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrinterTelemetry
     */
    omit?: PrinterTelemetryOmit<ExtArgs> | null
    /**
     * Filter, which PrinterTelemetry to fetch.
     */
    where: PrinterTelemetryWhereUniqueInput
  }

  /**
   * PrinterTelemetry findUniqueOrThrow
   */
  export type PrinterTelemetryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterTelemetry
     */
    select?: PrinterTelemetrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrinterTelemetry
     */
    omit?: PrinterTelemetryOmit<ExtArgs> | null
    /**
     * Filter, which PrinterTelemetry to fetch.
     */
    where: PrinterTelemetryWhereUniqueInput
  }

  /**
   * PrinterTelemetry findFirst
   */
  export type PrinterTelemetryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterTelemetry
     */
    select?: PrinterTelemetrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrinterTelemetry
     */
    omit?: PrinterTelemetryOmit<ExtArgs> | null
    /**
     * Filter, which PrinterTelemetry to fetch.
     */
    where?: PrinterTelemetryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrinterTelemetries to fetch.
     */
    orderBy?: PrinterTelemetryOrderByWithRelationInput | PrinterTelemetryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrinterTelemetries.
     */
    cursor?: PrinterTelemetryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrinterTelemetries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrinterTelemetries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrinterTelemetries.
     */
    distinct?: PrinterTelemetryScalarFieldEnum | PrinterTelemetryScalarFieldEnum[]
  }

  /**
   * PrinterTelemetry findFirstOrThrow
   */
  export type PrinterTelemetryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterTelemetry
     */
    select?: PrinterTelemetrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrinterTelemetry
     */
    omit?: PrinterTelemetryOmit<ExtArgs> | null
    /**
     * Filter, which PrinterTelemetry to fetch.
     */
    where?: PrinterTelemetryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrinterTelemetries to fetch.
     */
    orderBy?: PrinterTelemetryOrderByWithRelationInput | PrinterTelemetryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PrinterTelemetries.
     */
    cursor?: PrinterTelemetryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrinterTelemetries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrinterTelemetries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrinterTelemetries.
     */
    distinct?: PrinterTelemetryScalarFieldEnum | PrinterTelemetryScalarFieldEnum[]
  }

  /**
   * PrinterTelemetry findMany
   */
  export type PrinterTelemetryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterTelemetry
     */
    select?: PrinterTelemetrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrinterTelemetry
     */
    omit?: PrinterTelemetryOmit<ExtArgs> | null
    /**
     * Filter, which PrinterTelemetries to fetch.
     */
    where?: PrinterTelemetryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PrinterTelemetries to fetch.
     */
    orderBy?: PrinterTelemetryOrderByWithRelationInput | PrinterTelemetryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PrinterTelemetries.
     */
    cursor?: PrinterTelemetryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PrinterTelemetries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PrinterTelemetries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PrinterTelemetries.
     */
    distinct?: PrinterTelemetryScalarFieldEnum | PrinterTelemetryScalarFieldEnum[]
  }

  /**
   * PrinterTelemetry create
   */
  export type PrinterTelemetryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterTelemetry
     */
    select?: PrinterTelemetrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrinterTelemetry
     */
    omit?: PrinterTelemetryOmit<ExtArgs> | null
    /**
     * The data needed to create a PrinterTelemetry.
     */
    data: XOR<PrinterTelemetryCreateInput, PrinterTelemetryUncheckedCreateInput>
  }

  /**
   * PrinterTelemetry createMany
   */
  export type PrinterTelemetryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PrinterTelemetries.
     */
    data: PrinterTelemetryCreateManyInput | PrinterTelemetryCreateManyInput[]
  }

  /**
   * PrinterTelemetry createManyAndReturn
   */
  export type PrinterTelemetryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterTelemetry
     */
    select?: PrinterTelemetrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PrinterTelemetry
     */
    omit?: PrinterTelemetryOmit<ExtArgs> | null
    /**
     * The data used to create many PrinterTelemetries.
     */
    data: PrinterTelemetryCreateManyInput | PrinterTelemetryCreateManyInput[]
  }

  /**
   * PrinterTelemetry update
   */
  export type PrinterTelemetryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterTelemetry
     */
    select?: PrinterTelemetrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrinterTelemetry
     */
    omit?: PrinterTelemetryOmit<ExtArgs> | null
    /**
     * The data needed to update a PrinterTelemetry.
     */
    data: XOR<PrinterTelemetryUpdateInput, PrinterTelemetryUncheckedUpdateInput>
    /**
     * Choose, which PrinterTelemetry to update.
     */
    where: PrinterTelemetryWhereUniqueInput
  }

  /**
   * PrinterTelemetry updateMany
   */
  export type PrinterTelemetryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PrinterTelemetries.
     */
    data: XOR<PrinterTelemetryUpdateManyMutationInput, PrinterTelemetryUncheckedUpdateManyInput>
    /**
     * Filter which PrinterTelemetries to update
     */
    where?: PrinterTelemetryWhereInput
    /**
     * Limit how many PrinterTelemetries to update.
     */
    limit?: number
  }

  /**
   * PrinterTelemetry updateManyAndReturn
   */
  export type PrinterTelemetryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterTelemetry
     */
    select?: PrinterTelemetrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PrinterTelemetry
     */
    omit?: PrinterTelemetryOmit<ExtArgs> | null
    /**
     * The data used to update PrinterTelemetries.
     */
    data: XOR<PrinterTelemetryUpdateManyMutationInput, PrinterTelemetryUncheckedUpdateManyInput>
    /**
     * Filter which PrinterTelemetries to update
     */
    where?: PrinterTelemetryWhereInput
    /**
     * Limit how many PrinterTelemetries to update.
     */
    limit?: number
  }

  /**
   * PrinterTelemetry upsert
   */
  export type PrinterTelemetryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterTelemetry
     */
    select?: PrinterTelemetrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrinterTelemetry
     */
    omit?: PrinterTelemetryOmit<ExtArgs> | null
    /**
     * The filter to search for the PrinterTelemetry to update in case it exists.
     */
    where: PrinterTelemetryWhereUniqueInput
    /**
     * In case the PrinterTelemetry found by the `where` argument doesn't exist, create a new PrinterTelemetry with this data.
     */
    create: XOR<PrinterTelemetryCreateInput, PrinterTelemetryUncheckedCreateInput>
    /**
     * In case the PrinterTelemetry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrinterTelemetryUpdateInput, PrinterTelemetryUncheckedUpdateInput>
  }

  /**
   * PrinterTelemetry delete
   */
  export type PrinterTelemetryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterTelemetry
     */
    select?: PrinterTelemetrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrinterTelemetry
     */
    omit?: PrinterTelemetryOmit<ExtArgs> | null
    /**
     * Filter which PrinterTelemetry to delete.
     */
    where: PrinterTelemetryWhereUniqueInput
  }

  /**
   * PrinterTelemetry deleteMany
   */
  export type PrinterTelemetryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PrinterTelemetries to delete
     */
    where?: PrinterTelemetryWhereInput
    /**
     * Limit how many PrinterTelemetries to delete.
     */
    limit?: number
  }

  /**
   * PrinterTelemetry without action
   */
  export type PrinterTelemetryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PrinterTelemetry
     */
    select?: PrinterTelemetrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the PrinterTelemetry
     */
    omit?: PrinterTelemetryOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EventScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    active: 'active',
    createdAt: 'createdAt'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const BadgeTemplateScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    name: 'name',
    bgImageUrl: 'bgImageUrl',
    configJson: 'configJson',
    basePrice: 'basePrice',
    isActive: 'isActive',
    createdAt: 'createdAt'
  };

  export type BadgeTemplateScalarFieldEnum = (typeof BadgeTemplateScalarFieldEnum)[keyof typeof BadgeTemplateScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    eventId: 'eventId',
    badgeTemplateId: 'badgeTemplateId',
    clientName: 'clientName',
    phone: 'phone',
    congregation: 'congregation',
    photoUrl: 'photoUrl',
    customConfigJson: 'customConfigJson',
    status: 'status',
    totalAmount: 'totalAmount',
    isFromItabira: 'isFromItabira',
    zipCode: 'zipCode',
    address: 'address',
    number: 'number',
    complement: 'complement',
    neighborhood: 'neighborhood',
    city: 'city',
    state: 'state',
    shippingCost: 'shippingCost',
    shippingService: 'shippingService',
    paymentMethod: 'paymentMethod',
    paymentStatus: 'paymentStatus',
    groupId: 'groupId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const BadgeItemScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    stock: 'stock',
    imageUrl: 'imageUrl'
  };

  export type BadgeItemScalarFieldEnum = (typeof BadgeItemScalarFieldEnum)[keyof typeof BadgeItemScalarFieldEnum]


  export const TemplateItemScalarFieldEnum: {
    templateId: 'templateId',
    itemId: 'itemId',
    isRequired: 'isRequired'
  };

  export type TemplateItemScalarFieldEnum = (typeof TemplateItemScalarFieldEnum)[keyof typeof TemplateItemScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    itemId: 'itemId',
    quantity: 'quantity',
    priceAtTime: 'priceAtTime'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const PrintJobScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    status: 'status',
    imageUrl: 'imageUrl',
    errorCode: 'errorCode',
    errorMsg: 'errorMsg',
    copies: 'copies',
    duplex: 'duplex',
    colorMode: 'colorMode',
    dpi: 'dpi',
    retryCount: 'retryCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PrintJobScalarFieldEnum = (typeof PrintJobScalarFieldEnum)[keyof typeof PrintJobScalarFieldEnum]


  export const PrinterTelemetryScalarFieldEnum: {
    id: 'id',
    printerModel: 'printerModel',
    serialNumber: 'serialNumber',
    firmwareVersion: 'firmwareVersion',
    printerStatus: 'printerStatus',
    connectionType: 'connectionType',
    ribbonType: 'ribbonType',
    ribbonRemaining: 'ribbonRemaining',
    ribbonPartNumber: 'ribbonPartNumber',
    ribbonSerialNumber: 'ribbonSerialNumber',
    totalCompleted: 'totalCompleted',
    totalPicked: 'totalPicked',
    totalRejected: 'totalRejected',
    totalLost: 'totalLost',
    currentCompleted: 'currentCompleted',
    currentPicked: 'currentPicked',
    currentRejected: 'currentRejected',
    cardsSinceClean: 'cardsSinceClean',
    cleaningsRun: 'cleaningsRun',
    hopper1Status: 'hopper1Status',
    exceptionStatus: 'exceptionStatus',
    colorMode: 'colorMode',
    cardsVirtualStock: 'cardsVirtualStock',
    cardsPrintedSite: 'cardsPrintedSite',
    lastUpdated: 'lastUpdated'
  };

  export type PrinterTelemetryScalarFieldEnum = (typeof PrinterTelemetryScalarFieldEnum)[keyof typeof PrinterTelemetryScalarFieldEnum]


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


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    id?: StringFilter<"Event"> | string
    name?: StringFilter<"Event"> | string
    slug?: StringFilter<"Event"> | string
    active?: BoolFilter<"Event"> | boolean
    createdAt?: DateTimeFilter<"Event"> | Date | string
    templates?: BadgeTemplateListRelationFilter
    orders?: OrderListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    templates?: BadgeTemplateOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    name?: StringFilter<"Event"> | string
    active?: BoolFilter<"Event"> | boolean
    createdAt?: DateTimeFilter<"Event"> | Date | string
    templates?: BadgeTemplateListRelationFilter
    orders?: OrderListRelationFilter
  }, "id" | "slug">

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Event"> | string
    name?: StringWithAggregatesFilter<"Event"> | string
    slug?: StringWithAggregatesFilter<"Event"> | string
    active?: BoolWithAggregatesFilter<"Event"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Event"> | Date | string
  }

  export type BadgeTemplateWhereInput = {
    AND?: BadgeTemplateWhereInput | BadgeTemplateWhereInput[]
    OR?: BadgeTemplateWhereInput[]
    NOT?: BadgeTemplateWhereInput | BadgeTemplateWhereInput[]
    id?: StringFilter<"BadgeTemplate"> | string
    eventId?: StringFilter<"BadgeTemplate"> | string
    name?: StringFilter<"BadgeTemplate"> | string
    bgImageUrl?: StringFilter<"BadgeTemplate"> | string
    configJson?: StringFilter<"BadgeTemplate"> | string
    basePrice?: FloatFilter<"BadgeTemplate"> | number
    isActive?: BoolFilter<"BadgeTemplate"> | boolean
    createdAt?: DateTimeFilter<"BadgeTemplate"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    orders?: OrderListRelationFilter
    items?: TemplateItemListRelationFilter
  }

  export type BadgeTemplateOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    bgImageUrl?: SortOrder
    configJson?: SortOrder
    basePrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    event?: EventOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
    items?: TemplateItemOrderByRelationAggregateInput
  }

  export type BadgeTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BadgeTemplateWhereInput | BadgeTemplateWhereInput[]
    OR?: BadgeTemplateWhereInput[]
    NOT?: BadgeTemplateWhereInput | BadgeTemplateWhereInput[]
    eventId?: StringFilter<"BadgeTemplate"> | string
    name?: StringFilter<"BadgeTemplate"> | string
    bgImageUrl?: StringFilter<"BadgeTemplate"> | string
    configJson?: StringFilter<"BadgeTemplate"> | string
    basePrice?: FloatFilter<"BadgeTemplate"> | number
    isActive?: BoolFilter<"BadgeTemplate"> | boolean
    createdAt?: DateTimeFilter<"BadgeTemplate"> | Date | string
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    orders?: OrderListRelationFilter
    items?: TemplateItemListRelationFilter
  }, "id">

  export type BadgeTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    bgImageUrl?: SortOrder
    configJson?: SortOrder
    basePrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    _count?: BadgeTemplateCountOrderByAggregateInput
    _avg?: BadgeTemplateAvgOrderByAggregateInput
    _max?: BadgeTemplateMaxOrderByAggregateInput
    _min?: BadgeTemplateMinOrderByAggregateInput
    _sum?: BadgeTemplateSumOrderByAggregateInput
  }

  export type BadgeTemplateScalarWhereWithAggregatesInput = {
    AND?: BadgeTemplateScalarWhereWithAggregatesInput | BadgeTemplateScalarWhereWithAggregatesInput[]
    OR?: BadgeTemplateScalarWhereWithAggregatesInput[]
    NOT?: BadgeTemplateScalarWhereWithAggregatesInput | BadgeTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BadgeTemplate"> | string
    eventId?: StringWithAggregatesFilter<"BadgeTemplate"> | string
    name?: StringWithAggregatesFilter<"BadgeTemplate"> | string
    bgImageUrl?: StringWithAggregatesFilter<"BadgeTemplate"> | string
    configJson?: StringWithAggregatesFilter<"BadgeTemplate"> | string
    basePrice?: FloatWithAggregatesFilter<"BadgeTemplate"> | number
    isActive?: BoolWithAggregatesFilter<"BadgeTemplate"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"BadgeTemplate"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    eventId?: StringFilter<"Order"> | string
    badgeTemplateId?: StringFilter<"Order"> | string
    clientName?: StringFilter<"Order"> | string
    phone?: StringFilter<"Order"> | string
    congregation?: StringNullableFilter<"Order"> | string | null
    photoUrl?: StringNullableFilter<"Order"> | string | null
    customConfigJson?: StringNullableFilter<"Order"> | string | null
    status?: StringFilter<"Order"> | string
    totalAmount?: FloatFilter<"Order"> | number
    isFromItabira?: BoolFilter<"Order"> | boolean
    zipCode?: StringNullableFilter<"Order"> | string | null
    address?: StringNullableFilter<"Order"> | string | null
    number?: StringNullableFilter<"Order"> | string | null
    complement?: StringNullableFilter<"Order"> | string | null
    neighborhood?: StringNullableFilter<"Order"> | string | null
    city?: StringNullableFilter<"Order"> | string | null
    state?: StringNullableFilter<"Order"> | string | null
    shippingCost?: FloatFilter<"Order"> | number
    shippingService?: StringNullableFilter<"Order"> | string | null
    paymentMethod?: StringFilter<"Order"> | string
    paymentStatus?: StringFilter<"Order"> | string
    groupId?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    template?: XOR<BadgeTemplateScalarRelationFilter, BadgeTemplateWhereInput>
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    items?: OrderItemListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    eventId?: SortOrder
    badgeTemplateId?: SortOrder
    clientName?: SortOrder
    phone?: SortOrder
    congregation?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    customConfigJson?: SortOrderInput | SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    isFromItabira?: SortOrder
    zipCode?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    number?: SortOrderInput | SortOrder
    complement?: SortOrderInput | SortOrder
    neighborhood?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    shippingCost?: SortOrder
    shippingService?: SortOrderInput | SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    groupId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    template?: BadgeTemplateOrderByWithRelationInput
    event?: EventOrderByWithRelationInput
    items?: OrderItemOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    eventId?: StringFilter<"Order"> | string
    badgeTemplateId?: StringFilter<"Order"> | string
    clientName?: StringFilter<"Order"> | string
    phone?: StringFilter<"Order"> | string
    congregation?: StringNullableFilter<"Order"> | string | null
    photoUrl?: StringNullableFilter<"Order"> | string | null
    customConfigJson?: StringNullableFilter<"Order"> | string | null
    status?: StringFilter<"Order"> | string
    totalAmount?: FloatFilter<"Order"> | number
    isFromItabira?: BoolFilter<"Order"> | boolean
    zipCode?: StringNullableFilter<"Order"> | string | null
    address?: StringNullableFilter<"Order"> | string | null
    number?: StringNullableFilter<"Order"> | string | null
    complement?: StringNullableFilter<"Order"> | string | null
    neighborhood?: StringNullableFilter<"Order"> | string | null
    city?: StringNullableFilter<"Order"> | string | null
    state?: StringNullableFilter<"Order"> | string | null
    shippingCost?: FloatFilter<"Order"> | number
    shippingService?: StringNullableFilter<"Order"> | string | null
    paymentMethod?: StringFilter<"Order"> | string
    paymentStatus?: StringFilter<"Order"> | string
    groupId?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    template?: XOR<BadgeTemplateScalarRelationFilter, BadgeTemplateWhereInput>
    event?: XOR<EventScalarRelationFilter, EventWhereInput>
    items?: OrderItemListRelationFilter
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    eventId?: SortOrder
    badgeTemplateId?: SortOrder
    clientName?: SortOrder
    phone?: SortOrder
    congregation?: SortOrderInput | SortOrder
    photoUrl?: SortOrderInput | SortOrder
    customConfigJson?: SortOrderInput | SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    isFromItabira?: SortOrder
    zipCode?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    number?: SortOrderInput | SortOrder
    complement?: SortOrderInput | SortOrder
    neighborhood?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    shippingCost?: SortOrder
    shippingService?: SortOrderInput | SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    groupId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    eventId?: StringWithAggregatesFilter<"Order"> | string
    badgeTemplateId?: StringWithAggregatesFilter<"Order"> | string
    clientName?: StringWithAggregatesFilter<"Order"> | string
    phone?: StringWithAggregatesFilter<"Order"> | string
    congregation?: StringNullableWithAggregatesFilter<"Order"> | string | null
    photoUrl?: StringNullableWithAggregatesFilter<"Order"> | string | null
    customConfigJson?: StringNullableWithAggregatesFilter<"Order"> | string | null
    status?: StringWithAggregatesFilter<"Order"> | string
    totalAmount?: FloatWithAggregatesFilter<"Order"> | number
    isFromItabira?: BoolWithAggregatesFilter<"Order"> | boolean
    zipCode?: StringNullableWithAggregatesFilter<"Order"> | string | null
    address?: StringNullableWithAggregatesFilter<"Order"> | string | null
    number?: StringNullableWithAggregatesFilter<"Order"> | string | null
    complement?: StringNullableWithAggregatesFilter<"Order"> | string | null
    neighborhood?: StringNullableWithAggregatesFilter<"Order"> | string | null
    city?: StringNullableWithAggregatesFilter<"Order"> | string | null
    state?: StringNullableWithAggregatesFilter<"Order"> | string | null
    shippingCost?: FloatWithAggregatesFilter<"Order"> | number
    shippingService?: StringNullableWithAggregatesFilter<"Order"> | string | null
    paymentMethod?: StringWithAggregatesFilter<"Order"> | string
    paymentStatus?: StringWithAggregatesFilter<"Order"> | string
    groupId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type BadgeItemWhereInput = {
    AND?: BadgeItemWhereInput | BadgeItemWhereInput[]
    OR?: BadgeItemWhereInput[]
    NOT?: BadgeItemWhereInput | BadgeItemWhereInput[]
    id?: StringFilter<"BadgeItem"> | string
    name?: StringFilter<"BadgeItem"> | string
    description?: StringNullableFilter<"BadgeItem"> | string | null
    price?: FloatFilter<"BadgeItem"> | number
    stock?: IntFilter<"BadgeItem"> | number
    imageUrl?: StringNullableFilter<"BadgeItem"> | string | null
    orderItems?: OrderItemListRelationFilter
    templates?: TemplateItemListRelationFilter
  }

  export type BadgeItemOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    stock?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    orderItems?: OrderItemOrderByRelationAggregateInput
    templates?: TemplateItemOrderByRelationAggregateInput
  }

  export type BadgeItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BadgeItemWhereInput | BadgeItemWhereInput[]
    OR?: BadgeItemWhereInput[]
    NOT?: BadgeItemWhereInput | BadgeItemWhereInput[]
    name?: StringFilter<"BadgeItem"> | string
    description?: StringNullableFilter<"BadgeItem"> | string | null
    price?: FloatFilter<"BadgeItem"> | number
    stock?: IntFilter<"BadgeItem"> | number
    imageUrl?: StringNullableFilter<"BadgeItem"> | string | null
    orderItems?: OrderItemListRelationFilter
    templates?: TemplateItemListRelationFilter
  }, "id">

  export type BadgeItemOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    stock?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    _count?: BadgeItemCountOrderByAggregateInput
    _avg?: BadgeItemAvgOrderByAggregateInput
    _max?: BadgeItemMaxOrderByAggregateInput
    _min?: BadgeItemMinOrderByAggregateInput
    _sum?: BadgeItemSumOrderByAggregateInput
  }

  export type BadgeItemScalarWhereWithAggregatesInput = {
    AND?: BadgeItemScalarWhereWithAggregatesInput | BadgeItemScalarWhereWithAggregatesInput[]
    OR?: BadgeItemScalarWhereWithAggregatesInput[]
    NOT?: BadgeItemScalarWhereWithAggregatesInput | BadgeItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BadgeItem"> | string
    name?: StringWithAggregatesFilter<"BadgeItem"> | string
    description?: StringNullableWithAggregatesFilter<"BadgeItem"> | string | null
    price?: FloatWithAggregatesFilter<"BadgeItem"> | number
    stock?: IntWithAggregatesFilter<"BadgeItem"> | number
    imageUrl?: StringNullableWithAggregatesFilter<"BadgeItem"> | string | null
  }

  export type TemplateItemWhereInput = {
    AND?: TemplateItemWhereInput | TemplateItemWhereInput[]
    OR?: TemplateItemWhereInput[]
    NOT?: TemplateItemWhereInput | TemplateItemWhereInput[]
    templateId?: StringFilter<"TemplateItem"> | string
    itemId?: StringFilter<"TemplateItem"> | string
    isRequired?: BoolFilter<"TemplateItem"> | boolean
    template?: XOR<BadgeTemplateScalarRelationFilter, BadgeTemplateWhereInput>
    item?: XOR<BadgeItemScalarRelationFilter, BadgeItemWhereInput>
  }

  export type TemplateItemOrderByWithRelationInput = {
    templateId?: SortOrder
    itemId?: SortOrder
    isRequired?: SortOrder
    template?: BadgeTemplateOrderByWithRelationInput
    item?: BadgeItemOrderByWithRelationInput
  }

  export type TemplateItemWhereUniqueInput = Prisma.AtLeast<{
    templateId_itemId?: TemplateItemTemplateIdItemIdCompoundUniqueInput
    AND?: TemplateItemWhereInput | TemplateItemWhereInput[]
    OR?: TemplateItemWhereInput[]
    NOT?: TemplateItemWhereInput | TemplateItemWhereInput[]
    templateId?: StringFilter<"TemplateItem"> | string
    itemId?: StringFilter<"TemplateItem"> | string
    isRequired?: BoolFilter<"TemplateItem"> | boolean
    template?: XOR<BadgeTemplateScalarRelationFilter, BadgeTemplateWhereInput>
    item?: XOR<BadgeItemScalarRelationFilter, BadgeItemWhereInput>
  }, "templateId_itemId">

  export type TemplateItemOrderByWithAggregationInput = {
    templateId?: SortOrder
    itemId?: SortOrder
    isRequired?: SortOrder
    _count?: TemplateItemCountOrderByAggregateInput
    _max?: TemplateItemMaxOrderByAggregateInput
    _min?: TemplateItemMinOrderByAggregateInput
  }

  export type TemplateItemScalarWhereWithAggregatesInput = {
    AND?: TemplateItemScalarWhereWithAggregatesInput | TemplateItemScalarWhereWithAggregatesInput[]
    OR?: TemplateItemScalarWhereWithAggregatesInput[]
    NOT?: TemplateItemScalarWhereWithAggregatesInput | TemplateItemScalarWhereWithAggregatesInput[]
    templateId?: StringWithAggregatesFilter<"TemplateItem"> | string
    itemId?: StringWithAggregatesFilter<"TemplateItem"> | string
    isRequired?: BoolWithAggregatesFilter<"TemplateItem"> | boolean
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    itemId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    priceAtTime?: FloatFilter<"OrderItem"> | number
    item?: XOR<BadgeItemScalarRelationFilter, BadgeItemWhereInput>
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    priceAtTime?: SortOrder
    item?: BadgeItemOrderByWithRelationInput
    order?: OrderOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: StringFilter<"OrderItem"> | string
    itemId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    priceAtTime?: FloatFilter<"OrderItem"> | number
    item?: XOR<BadgeItemScalarRelationFilter, BadgeItemWhereInput>
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    priceAtTime?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string
    itemId?: StringWithAggregatesFilter<"OrderItem"> | string
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    priceAtTime?: FloatWithAggregatesFilter<"OrderItem"> | number
  }

  export type PrintJobWhereInput = {
    AND?: PrintJobWhereInput | PrintJobWhereInput[]
    OR?: PrintJobWhereInput[]
    NOT?: PrintJobWhereInput | PrintJobWhereInput[]
    id?: StringFilter<"PrintJob"> | string
    orderId?: StringFilter<"PrintJob"> | string
    status?: StringFilter<"PrintJob"> | string
    imageUrl?: StringNullableFilter<"PrintJob"> | string | null
    errorCode?: IntNullableFilter<"PrintJob"> | number | null
    errorMsg?: StringNullableFilter<"PrintJob"> | string | null
    copies?: IntFilter<"PrintJob"> | number
    duplex?: BoolFilter<"PrintJob"> | boolean
    colorMode?: StringFilter<"PrintJob"> | string
    dpi?: StringFilter<"PrintJob"> | string
    retryCount?: IntFilter<"PrintJob"> | number
    createdAt?: DateTimeFilter<"PrintJob"> | Date | string
    updatedAt?: DateTimeFilter<"PrintJob"> | Date | string
  }

  export type PrintJobOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    errorCode?: SortOrderInput | SortOrder
    errorMsg?: SortOrderInput | SortOrder
    copies?: SortOrder
    duplex?: SortOrder
    colorMode?: SortOrder
    dpi?: SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrintJobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PrintJobWhereInput | PrintJobWhereInput[]
    OR?: PrintJobWhereInput[]
    NOT?: PrintJobWhereInput | PrintJobWhereInput[]
    orderId?: StringFilter<"PrintJob"> | string
    status?: StringFilter<"PrintJob"> | string
    imageUrl?: StringNullableFilter<"PrintJob"> | string | null
    errorCode?: IntNullableFilter<"PrintJob"> | number | null
    errorMsg?: StringNullableFilter<"PrintJob"> | string | null
    copies?: IntFilter<"PrintJob"> | number
    duplex?: BoolFilter<"PrintJob"> | boolean
    colorMode?: StringFilter<"PrintJob"> | string
    dpi?: StringFilter<"PrintJob"> | string
    retryCount?: IntFilter<"PrintJob"> | number
    createdAt?: DateTimeFilter<"PrintJob"> | Date | string
    updatedAt?: DateTimeFilter<"PrintJob"> | Date | string
  }, "id">

  export type PrintJobOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    errorCode?: SortOrderInput | SortOrder
    errorMsg?: SortOrderInput | SortOrder
    copies?: SortOrder
    duplex?: SortOrder
    colorMode?: SortOrder
    dpi?: SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PrintJobCountOrderByAggregateInput
    _avg?: PrintJobAvgOrderByAggregateInput
    _max?: PrintJobMaxOrderByAggregateInput
    _min?: PrintJobMinOrderByAggregateInput
    _sum?: PrintJobSumOrderByAggregateInput
  }

  export type PrintJobScalarWhereWithAggregatesInput = {
    AND?: PrintJobScalarWhereWithAggregatesInput | PrintJobScalarWhereWithAggregatesInput[]
    OR?: PrintJobScalarWhereWithAggregatesInput[]
    NOT?: PrintJobScalarWhereWithAggregatesInput | PrintJobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PrintJob"> | string
    orderId?: StringWithAggregatesFilter<"PrintJob"> | string
    status?: StringWithAggregatesFilter<"PrintJob"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"PrintJob"> | string | null
    errorCode?: IntNullableWithAggregatesFilter<"PrintJob"> | number | null
    errorMsg?: StringNullableWithAggregatesFilter<"PrintJob"> | string | null
    copies?: IntWithAggregatesFilter<"PrintJob"> | number
    duplex?: BoolWithAggregatesFilter<"PrintJob"> | boolean
    colorMode?: StringWithAggregatesFilter<"PrintJob"> | string
    dpi?: StringWithAggregatesFilter<"PrintJob"> | string
    retryCount?: IntWithAggregatesFilter<"PrintJob"> | number
    createdAt?: DateTimeWithAggregatesFilter<"PrintJob"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PrintJob"> | Date | string
  }

  export type PrinterTelemetryWhereInput = {
    AND?: PrinterTelemetryWhereInput | PrinterTelemetryWhereInput[]
    OR?: PrinterTelemetryWhereInput[]
    NOT?: PrinterTelemetryWhereInput | PrinterTelemetryWhereInput[]
    id?: StringFilter<"PrinterTelemetry"> | string
    printerModel?: StringFilter<"PrinterTelemetry"> | string
    serialNumber?: StringFilter<"PrinterTelemetry"> | string
    firmwareVersion?: StringFilter<"PrinterTelemetry"> | string
    printerStatus?: StringFilter<"PrinterTelemetry"> | string
    connectionType?: StringFilter<"PrinterTelemetry"> | string
    ribbonType?: StringFilter<"PrinterTelemetry"> | string
    ribbonRemaining?: IntFilter<"PrinterTelemetry"> | number
    ribbonPartNumber?: StringFilter<"PrinterTelemetry"> | string
    ribbonSerialNumber?: StringFilter<"PrinterTelemetry"> | string
    totalCompleted?: IntFilter<"PrinterTelemetry"> | number
    totalPicked?: IntFilter<"PrinterTelemetry"> | number
    totalRejected?: IntFilter<"PrinterTelemetry"> | number
    totalLost?: IntFilter<"PrinterTelemetry"> | number
    currentCompleted?: IntFilter<"PrinterTelemetry"> | number
    currentPicked?: IntFilter<"PrinterTelemetry"> | number
    currentRejected?: IntFilter<"PrinterTelemetry"> | number
    cardsSinceClean?: IntFilter<"PrinterTelemetry"> | number
    cleaningsRun?: IntFilter<"PrinterTelemetry"> | number
    hopper1Status?: StringFilter<"PrinterTelemetry"> | string
    exceptionStatus?: StringFilter<"PrinterTelemetry"> | string
    colorMode?: StringFilter<"PrinterTelemetry"> | string
    cardsVirtualStock?: IntFilter<"PrinterTelemetry"> | number
    cardsPrintedSite?: IntFilter<"PrinterTelemetry"> | number
    lastUpdated?: DateTimeFilter<"PrinterTelemetry"> | Date | string
  }

  export type PrinterTelemetryOrderByWithRelationInput = {
    id?: SortOrder
    printerModel?: SortOrder
    serialNumber?: SortOrder
    firmwareVersion?: SortOrder
    printerStatus?: SortOrder
    connectionType?: SortOrder
    ribbonType?: SortOrder
    ribbonRemaining?: SortOrder
    ribbonPartNumber?: SortOrder
    ribbonSerialNumber?: SortOrder
    totalCompleted?: SortOrder
    totalPicked?: SortOrder
    totalRejected?: SortOrder
    totalLost?: SortOrder
    currentCompleted?: SortOrder
    currentPicked?: SortOrder
    currentRejected?: SortOrder
    cardsSinceClean?: SortOrder
    cleaningsRun?: SortOrder
    hopper1Status?: SortOrder
    exceptionStatus?: SortOrder
    colorMode?: SortOrder
    cardsVirtualStock?: SortOrder
    cardsPrintedSite?: SortOrder
    lastUpdated?: SortOrder
  }

  export type PrinterTelemetryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PrinterTelemetryWhereInput | PrinterTelemetryWhereInput[]
    OR?: PrinterTelemetryWhereInput[]
    NOT?: PrinterTelemetryWhereInput | PrinterTelemetryWhereInput[]
    printerModel?: StringFilter<"PrinterTelemetry"> | string
    serialNumber?: StringFilter<"PrinterTelemetry"> | string
    firmwareVersion?: StringFilter<"PrinterTelemetry"> | string
    printerStatus?: StringFilter<"PrinterTelemetry"> | string
    connectionType?: StringFilter<"PrinterTelemetry"> | string
    ribbonType?: StringFilter<"PrinterTelemetry"> | string
    ribbonRemaining?: IntFilter<"PrinterTelemetry"> | number
    ribbonPartNumber?: StringFilter<"PrinterTelemetry"> | string
    ribbonSerialNumber?: StringFilter<"PrinterTelemetry"> | string
    totalCompleted?: IntFilter<"PrinterTelemetry"> | number
    totalPicked?: IntFilter<"PrinterTelemetry"> | number
    totalRejected?: IntFilter<"PrinterTelemetry"> | number
    totalLost?: IntFilter<"PrinterTelemetry"> | number
    currentCompleted?: IntFilter<"PrinterTelemetry"> | number
    currentPicked?: IntFilter<"PrinterTelemetry"> | number
    currentRejected?: IntFilter<"PrinterTelemetry"> | number
    cardsSinceClean?: IntFilter<"PrinterTelemetry"> | number
    cleaningsRun?: IntFilter<"PrinterTelemetry"> | number
    hopper1Status?: StringFilter<"PrinterTelemetry"> | string
    exceptionStatus?: StringFilter<"PrinterTelemetry"> | string
    colorMode?: StringFilter<"PrinterTelemetry"> | string
    cardsVirtualStock?: IntFilter<"PrinterTelemetry"> | number
    cardsPrintedSite?: IntFilter<"PrinterTelemetry"> | number
    lastUpdated?: DateTimeFilter<"PrinterTelemetry"> | Date | string
  }, "id">

  export type PrinterTelemetryOrderByWithAggregationInput = {
    id?: SortOrder
    printerModel?: SortOrder
    serialNumber?: SortOrder
    firmwareVersion?: SortOrder
    printerStatus?: SortOrder
    connectionType?: SortOrder
    ribbonType?: SortOrder
    ribbonRemaining?: SortOrder
    ribbonPartNumber?: SortOrder
    ribbonSerialNumber?: SortOrder
    totalCompleted?: SortOrder
    totalPicked?: SortOrder
    totalRejected?: SortOrder
    totalLost?: SortOrder
    currentCompleted?: SortOrder
    currentPicked?: SortOrder
    currentRejected?: SortOrder
    cardsSinceClean?: SortOrder
    cleaningsRun?: SortOrder
    hopper1Status?: SortOrder
    exceptionStatus?: SortOrder
    colorMode?: SortOrder
    cardsVirtualStock?: SortOrder
    cardsPrintedSite?: SortOrder
    lastUpdated?: SortOrder
    _count?: PrinterTelemetryCountOrderByAggregateInput
    _avg?: PrinterTelemetryAvgOrderByAggregateInput
    _max?: PrinterTelemetryMaxOrderByAggregateInput
    _min?: PrinterTelemetryMinOrderByAggregateInput
    _sum?: PrinterTelemetrySumOrderByAggregateInput
  }

  export type PrinterTelemetryScalarWhereWithAggregatesInput = {
    AND?: PrinterTelemetryScalarWhereWithAggregatesInput | PrinterTelemetryScalarWhereWithAggregatesInput[]
    OR?: PrinterTelemetryScalarWhereWithAggregatesInput[]
    NOT?: PrinterTelemetryScalarWhereWithAggregatesInput | PrinterTelemetryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PrinterTelemetry"> | string
    printerModel?: StringWithAggregatesFilter<"PrinterTelemetry"> | string
    serialNumber?: StringWithAggregatesFilter<"PrinterTelemetry"> | string
    firmwareVersion?: StringWithAggregatesFilter<"PrinterTelemetry"> | string
    printerStatus?: StringWithAggregatesFilter<"PrinterTelemetry"> | string
    connectionType?: StringWithAggregatesFilter<"PrinterTelemetry"> | string
    ribbonType?: StringWithAggregatesFilter<"PrinterTelemetry"> | string
    ribbonRemaining?: IntWithAggregatesFilter<"PrinterTelemetry"> | number
    ribbonPartNumber?: StringWithAggregatesFilter<"PrinterTelemetry"> | string
    ribbonSerialNumber?: StringWithAggregatesFilter<"PrinterTelemetry"> | string
    totalCompleted?: IntWithAggregatesFilter<"PrinterTelemetry"> | number
    totalPicked?: IntWithAggregatesFilter<"PrinterTelemetry"> | number
    totalRejected?: IntWithAggregatesFilter<"PrinterTelemetry"> | number
    totalLost?: IntWithAggregatesFilter<"PrinterTelemetry"> | number
    currentCompleted?: IntWithAggregatesFilter<"PrinterTelemetry"> | number
    currentPicked?: IntWithAggregatesFilter<"PrinterTelemetry"> | number
    currentRejected?: IntWithAggregatesFilter<"PrinterTelemetry"> | number
    cardsSinceClean?: IntWithAggregatesFilter<"PrinterTelemetry"> | number
    cleaningsRun?: IntWithAggregatesFilter<"PrinterTelemetry"> | number
    hopper1Status?: StringWithAggregatesFilter<"PrinterTelemetry"> | string
    exceptionStatus?: StringWithAggregatesFilter<"PrinterTelemetry"> | string
    colorMode?: StringWithAggregatesFilter<"PrinterTelemetry"> | string
    cardsVirtualStock?: IntWithAggregatesFilter<"PrinterTelemetry"> | number
    cardsPrintedSite?: IntWithAggregatesFilter<"PrinterTelemetry"> | number
    lastUpdated?: DateTimeWithAggregatesFilter<"PrinterTelemetry"> | Date | string
  }

  export type EventCreateInput = {
    id?: string
    name: string
    slug: string
    active?: boolean
    createdAt?: Date | string
    templates?: BadgeTemplateCreateNestedManyWithoutEventInput
    orders?: OrderCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    active?: boolean
    createdAt?: Date | string
    templates?: BadgeTemplateUncheckedCreateNestedManyWithoutEventInput
    orders?: OrderUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    templates?: BadgeTemplateUpdateManyWithoutEventNestedInput
    orders?: OrderUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    templates?: BadgeTemplateUncheckedUpdateManyWithoutEventNestedInput
    orders?: OrderUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    id?: string
    name: string
    slug: string
    active?: boolean
    createdAt?: Date | string
  }

  export type EventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BadgeTemplateCreateInput = {
    id?: string
    name: string
    bgImageUrl: string
    configJson: string
    basePrice?: number
    isActive?: boolean
    createdAt?: Date | string
    event: EventCreateNestedOneWithoutTemplatesInput
    orders?: OrderCreateNestedManyWithoutTemplateInput
    items?: TemplateItemCreateNestedManyWithoutTemplateInput
  }

  export type BadgeTemplateUncheckedCreateInput = {
    id?: string
    eventId: string
    name: string
    bgImageUrl: string
    configJson: string
    basePrice?: number
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutTemplateInput
    items?: TemplateItemUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type BadgeTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bgImageUrl?: StringFieldUpdateOperationsInput | string
    configJson?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutTemplatesNestedInput
    orders?: OrderUpdateManyWithoutTemplateNestedInput
    items?: TemplateItemUpdateManyWithoutTemplateNestedInput
  }

  export type BadgeTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bgImageUrl?: StringFieldUpdateOperationsInput | string
    configJson?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutTemplateNestedInput
    items?: TemplateItemUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type BadgeTemplateCreateManyInput = {
    id?: string
    eventId: string
    name: string
    bgImageUrl: string
    configJson: string
    basePrice?: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type BadgeTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bgImageUrl?: StringFieldUpdateOperationsInput | string
    configJson?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BadgeTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bgImageUrl?: StringFieldUpdateOperationsInput | string
    configJson?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    clientName: string
    phone?: string
    congregation?: string | null
    photoUrl?: string | null
    customConfigJson?: string | null
    status?: string
    totalAmount?: number
    isFromItabira?: boolean
    zipCode?: string | null
    address?: string | null
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city?: string | null
    state?: string | null
    shippingCost?: number
    shippingService?: string | null
    paymentMethod?: string
    paymentStatus?: string
    groupId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    template: BadgeTemplateCreateNestedOneWithoutOrdersInput
    event: EventCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    eventId: string
    badgeTemplateId: string
    clientName: string
    phone?: string
    congregation?: string | null
    photoUrl?: string | null
    customConfigJson?: string | null
    status?: string
    totalAmount?: number
    isFromItabira?: boolean
    zipCode?: string | null
    address?: string | null
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city?: string | null
    state?: string | null
    shippingCost?: number
    shippingService?: string | null
    paymentMethod?: string
    paymentStatus?: string
    groupId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    congregation?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    customConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    isFromItabira?: BoolFieldUpdateOperationsInput | boolean
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: FloatFieldUpdateOperationsInput | number
    shippingService?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: BadgeTemplateUpdateOneRequiredWithoutOrdersNestedInput
    event?: EventUpdateOneRequiredWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    badgeTemplateId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    congregation?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    customConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    isFromItabira?: BoolFieldUpdateOperationsInput | boolean
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: FloatFieldUpdateOperationsInput | number
    shippingService?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    eventId: string
    badgeTemplateId: string
    clientName: string
    phone?: string
    congregation?: string | null
    photoUrl?: string | null
    customConfigJson?: string | null
    status?: string
    totalAmount?: number
    isFromItabira?: boolean
    zipCode?: string | null
    address?: string | null
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city?: string | null
    state?: string | null
    shippingCost?: number
    shippingService?: string | null
    paymentMethod?: string
    paymentStatus?: string
    groupId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    congregation?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    customConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    isFromItabira?: BoolFieldUpdateOperationsInput | boolean
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: FloatFieldUpdateOperationsInput | number
    shippingService?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    badgeTemplateId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    congregation?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    customConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    isFromItabira?: BoolFieldUpdateOperationsInput | boolean
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: FloatFieldUpdateOperationsInput | number
    shippingService?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BadgeItemCreateInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    stock?: number
    imageUrl?: string | null
    orderItems?: OrderItemCreateNestedManyWithoutItemInput
    templates?: TemplateItemCreateNestedManyWithoutItemInput
  }

  export type BadgeItemUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    stock?: number
    imageUrl?: string | null
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutItemInput
    templates?: TemplateItemUncheckedCreateNestedManyWithoutItemInput
  }

  export type BadgeItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderItems?: OrderItemUpdateManyWithoutItemNestedInput
    templates?: TemplateItemUpdateManyWithoutItemNestedInput
  }

  export type BadgeItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderItems?: OrderItemUncheckedUpdateManyWithoutItemNestedInput
    templates?: TemplateItemUncheckedUpdateManyWithoutItemNestedInput
  }

  export type BadgeItemCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    stock?: number
    imageUrl?: string | null
  }

  export type BadgeItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BadgeItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TemplateItemCreateInput = {
    isRequired?: boolean
    template: BadgeTemplateCreateNestedOneWithoutItemsInput
    item: BadgeItemCreateNestedOneWithoutTemplatesInput
  }

  export type TemplateItemUncheckedCreateInput = {
    templateId: string
    itemId: string
    isRequired?: boolean
  }

  export type TemplateItemUpdateInput = {
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    template?: BadgeTemplateUpdateOneRequiredWithoutItemsNestedInput
    item?: BadgeItemUpdateOneRequiredWithoutTemplatesNestedInput
  }

  export type TemplateItemUncheckedUpdateInput = {
    templateId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TemplateItemCreateManyInput = {
    templateId: string
    itemId: string
    isRequired?: boolean
  }

  export type TemplateItemUpdateManyMutationInput = {
    isRequired?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TemplateItemUncheckedUpdateManyInput = {
    templateId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderItemCreateInput = {
    id?: string
    quantity?: number
    priceAtTime: number
    item: BadgeItemCreateNestedOneWithoutOrderItemsInput
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: string
    orderId: string
    itemId: string
    quantity?: number
    priceAtTime: number
  }

  export type OrderItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
    item?: BadgeItemUpdateOneRequiredWithoutOrderItemsNestedInput
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemCreateManyInput = {
    id?: string
    orderId: string
    itemId: string
    quantity?: number
    priceAtTime: number
  }

  export type OrderItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type PrintJobCreateInput = {
    id?: string
    orderId: string
    status?: string
    imageUrl?: string | null
    errorCode?: number | null
    errorMsg?: string | null
    copies?: number
    duplex?: boolean
    colorMode?: string
    dpi?: string
    retryCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrintJobUncheckedCreateInput = {
    id?: string
    orderId: string
    status?: string
    imageUrl?: string | null
    errorCode?: number | null
    errorMsg?: string | null
    copies?: number
    duplex?: boolean
    colorMode?: string
    dpi?: string
    retryCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrintJobUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    copies?: IntFieldUpdateOperationsInput | number
    duplex?: BoolFieldUpdateOperationsInput | boolean
    colorMode?: StringFieldUpdateOperationsInput | string
    dpi?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrintJobUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    copies?: IntFieldUpdateOperationsInput | number
    duplex?: BoolFieldUpdateOperationsInput | boolean
    colorMode?: StringFieldUpdateOperationsInput | string
    dpi?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrintJobCreateManyInput = {
    id?: string
    orderId: string
    status?: string
    imageUrl?: string | null
    errorCode?: number | null
    errorMsg?: string | null
    copies?: number
    duplex?: boolean
    colorMode?: string
    dpi?: string
    retryCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrintJobUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    copies?: IntFieldUpdateOperationsInput | number
    duplex?: BoolFieldUpdateOperationsInput | boolean
    colorMode?: StringFieldUpdateOperationsInput | string
    dpi?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrintJobUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    errorCode?: NullableIntFieldUpdateOperationsInput | number | null
    errorMsg?: NullableStringFieldUpdateOperationsInput | string | null
    copies?: IntFieldUpdateOperationsInput | number
    duplex?: BoolFieldUpdateOperationsInput | boolean
    colorMode?: StringFieldUpdateOperationsInput | string
    dpi?: StringFieldUpdateOperationsInput | string
    retryCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrinterTelemetryCreateInput = {
    id?: string
    printerModel?: string
    serialNumber?: string
    firmwareVersion?: string
    printerStatus?: string
    connectionType?: string
    ribbonType?: string
    ribbonRemaining?: number
    ribbonPartNumber?: string
    ribbonSerialNumber?: string
    totalCompleted?: number
    totalPicked?: number
    totalRejected?: number
    totalLost?: number
    currentCompleted?: number
    currentPicked?: number
    currentRejected?: number
    cardsSinceClean?: number
    cleaningsRun?: number
    hopper1Status?: string
    exceptionStatus?: string
    colorMode?: string
    cardsVirtualStock?: number
    cardsPrintedSite?: number
    lastUpdated?: Date | string
  }

  export type PrinterTelemetryUncheckedCreateInput = {
    id?: string
    printerModel?: string
    serialNumber?: string
    firmwareVersion?: string
    printerStatus?: string
    connectionType?: string
    ribbonType?: string
    ribbonRemaining?: number
    ribbonPartNumber?: string
    ribbonSerialNumber?: string
    totalCompleted?: number
    totalPicked?: number
    totalRejected?: number
    totalLost?: number
    currentCompleted?: number
    currentPicked?: number
    currentRejected?: number
    cardsSinceClean?: number
    cleaningsRun?: number
    hopper1Status?: string
    exceptionStatus?: string
    colorMode?: string
    cardsVirtualStock?: number
    cardsPrintedSite?: number
    lastUpdated?: Date | string
  }

  export type PrinterTelemetryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: StringFieldUpdateOperationsInput | string
    printerStatus?: StringFieldUpdateOperationsInput | string
    connectionType?: StringFieldUpdateOperationsInput | string
    ribbonType?: StringFieldUpdateOperationsInput | string
    ribbonRemaining?: IntFieldUpdateOperationsInput | number
    ribbonPartNumber?: StringFieldUpdateOperationsInput | string
    ribbonSerialNumber?: StringFieldUpdateOperationsInput | string
    totalCompleted?: IntFieldUpdateOperationsInput | number
    totalPicked?: IntFieldUpdateOperationsInput | number
    totalRejected?: IntFieldUpdateOperationsInput | number
    totalLost?: IntFieldUpdateOperationsInput | number
    currentCompleted?: IntFieldUpdateOperationsInput | number
    currentPicked?: IntFieldUpdateOperationsInput | number
    currentRejected?: IntFieldUpdateOperationsInput | number
    cardsSinceClean?: IntFieldUpdateOperationsInput | number
    cleaningsRun?: IntFieldUpdateOperationsInput | number
    hopper1Status?: StringFieldUpdateOperationsInput | string
    exceptionStatus?: StringFieldUpdateOperationsInput | string
    colorMode?: StringFieldUpdateOperationsInput | string
    cardsVirtualStock?: IntFieldUpdateOperationsInput | number
    cardsPrintedSite?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrinterTelemetryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: StringFieldUpdateOperationsInput | string
    printerStatus?: StringFieldUpdateOperationsInput | string
    connectionType?: StringFieldUpdateOperationsInput | string
    ribbonType?: StringFieldUpdateOperationsInput | string
    ribbonRemaining?: IntFieldUpdateOperationsInput | number
    ribbonPartNumber?: StringFieldUpdateOperationsInput | string
    ribbonSerialNumber?: StringFieldUpdateOperationsInput | string
    totalCompleted?: IntFieldUpdateOperationsInput | number
    totalPicked?: IntFieldUpdateOperationsInput | number
    totalRejected?: IntFieldUpdateOperationsInput | number
    totalLost?: IntFieldUpdateOperationsInput | number
    currentCompleted?: IntFieldUpdateOperationsInput | number
    currentPicked?: IntFieldUpdateOperationsInput | number
    currentRejected?: IntFieldUpdateOperationsInput | number
    cardsSinceClean?: IntFieldUpdateOperationsInput | number
    cleaningsRun?: IntFieldUpdateOperationsInput | number
    hopper1Status?: StringFieldUpdateOperationsInput | string
    exceptionStatus?: StringFieldUpdateOperationsInput | string
    colorMode?: StringFieldUpdateOperationsInput | string
    cardsVirtualStock?: IntFieldUpdateOperationsInput | number
    cardsPrintedSite?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrinterTelemetryCreateManyInput = {
    id?: string
    printerModel?: string
    serialNumber?: string
    firmwareVersion?: string
    printerStatus?: string
    connectionType?: string
    ribbonType?: string
    ribbonRemaining?: number
    ribbonPartNumber?: string
    ribbonSerialNumber?: string
    totalCompleted?: number
    totalPicked?: number
    totalRejected?: number
    totalLost?: number
    currentCompleted?: number
    currentPicked?: number
    currentRejected?: number
    cardsSinceClean?: number
    cleaningsRun?: number
    hopper1Status?: string
    exceptionStatus?: string
    colorMode?: string
    cardsVirtualStock?: number
    cardsPrintedSite?: number
    lastUpdated?: Date | string
  }

  export type PrinterTelemetryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: StringFieldUpdateOperationsInput | string
    printerStatus?: StringFieldUpdateOperationsInput | string
    connectionType?: StringFieldUpdateOperationsInput | string
    ribbonType?: StringFieldUpdateOperationsInput | string
    ribbonRemaining?: IntFieldUpdateOperationsInput | number
    ribbonPartNumber?: StringFieldUpdateOperationsInput | string
    ribbonSerialNumber?: StringFieldUpdateOperationsInput | string
    totalCompleted?: IntFieldUpdateOperationsInput | number
    totalPicked?: IntFieldUpdateOperationsInput | number
    totalRejected?: IntFieldUpdateOperationsInput | number
    totalLost?: IntFieldUpdateOperationsInput | number
    currentCompleted?: IntFieldUpdateOperationsInput | number
    currentPicked?: IntFieldUpdateOperationsInput | number
    currentRejected?: IntFieldUpdateOperationsInput | number
    cardsSinceClean?: IntFieldUpdateOperationsInput | number
    cleaningsRun?: IntFieldUpdateOperationsInput | number
    hopper1Status?: StringFieldUpdateOperationsInput | string
    exceptionStatus?: StringFieldUpdateOperationsInput | string
    colorMode?: StringFieldUpdateOperationsInput | string
    cardsVirtualStock?: IntFieldUpdateOperationsInput | number
    cardsPrintedSite?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrinterTelemetryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    printerModel?: StringFieldUpdateOperationsInput | string
    serialNumber?: StringFieldUpdateOperationsInput | string
    firmwareVersion?: StringFieldUpdateOperationsInput | string
    printerStatus?: StringFieldUpdateOperationsInput | string
    connectionType?: StringFieldUpdateOperationsInput | string
    ribbonType?: StringFieldUpdateOperationsInput | string
    ribbonRemaining?: IntFieldUpdateOperationsInput | number
    ribbonPartNumber?: StringFieldUpdateOperationsInput | string
    ribbonSerialNumber?: StringFieldUpdateOperationsInput | string
    totalCompleted?: IntFieldUpdateOperationsInput | number
    totalPicked?: IntFieldUpdateOperationsInput | number
    totalRejected?: IntFieldUpdateOperationsInput | number
    totalLost?: IntFieldUpdateOperationsInput | number
    currentCompleted?: IntFieldUpdateOperationsInput | number
    currentPicked?: IntFieldUpdateOperationsInput | number
    currentRejected?: IntFieldUpdateOperationsInput | number
    cardsSinceClean?: IntFieldUpdateOperationsInput | number
    cleaningsRun?: IntFieldUpdateOperationsInput | number
    hopper1Status?: StringFieldUpdateOperationsInput | string
    exceptionStatus?: StringFieldUpdateOperationsInput | string
    colorMode?: StringFieldUpdateOperationsInput | string
    cardsVirtualStock?: IntFieldUpdateOperationsInput | number
    cardsPrintedSite?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
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
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type BadgeTemplateListRelationFilter = {
    every?: BadgeTemplateWhereInput
    some?: BadgeTemplateWhereInput
    none?: BadgeTemplateWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type BadgeTemplateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
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
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type TemplateItemListRelationFilter = {
    every?: TemplateItemWhereInput
    some?: TemplateItemWhereInput
    none?: TemplateItemWhereInput
  }

  export type TemplateItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BadgeTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    bgImageUrl?: SortOrder
    configJson?: SortOrder
    basePrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type BadgeTemplateAvgOrderByAggregateInput = {
    basePrice?: SortOrder
  }

  export type BadgeTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    bgImageUrl?: SortOrder
    configJson?: SortOrder
    basePrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type BadgeTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    name?: SortOrder
    bgImageUrl?: SortOrder
    configJson?: SortOrder
    basePrice?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
  }

  export type BadgeTemplateSumOrderByAggregateInput = {
    basePrice?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BadgeTemplateScalarRelationFilter = {
    is?: BadgeTemplateWhereInput
    isNot?: BadgeTemplateWhereInput
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    badgeTemplateId?: SortOrder
    clientName?: SortOrder
    phone?: SortOrder
    congregation?: SortOrder
    photoUrl?: SortOrder
    customConfigJson?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    isFromItabira?: SortOrder
    zipCode?: SortOrder
    address?: SortOrder
    number?: SortOrder
    complement?: SortOrder
    neighborhood?: SortOrder
    city?: SortOrder
    state?: SortOrder
    shippingCost?: SortOrder
    shippingService?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    totalAmount?: SortOrder
    shippingCost?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    badgeTemplateId?: SortOrder
    clientName?: SortOrder
    phone?: SortOrder
    congregation?: SortOrder
    photoUrl?: SortOrder
    customConfigJson?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    isFromItabira?: SortOrder
    zipCode?: SortOrder
    address?: SortOrder
    number?: SortOrder
    complement?: SortOrder
    neighborhood?: SortOrder
    city?: SortOrder
    state?: SortOrder
    shippingCost?: SortOrder
    shippingService?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    eventId?: SortOrder
    badgeTemplateId?: SortOrder
    clientName?: SortOrder
    phone?: SortOrder
    congregation?: SortOrder
    photoUrl?: SortOrder
    customConfigJson?: SortOrder
    status?: SortOrder
    totalAmount?: SortOrder
    isFromItabira?: SortOrder
    zipCode?: SortOrder
    address?: SortOrder
    number?: SortOrder
    complement?: SortOrder
    neighborhood?: SortOrder
    city?: SortOrder
    state?: SortOrder
    shippingCost?: SortOrder
    shippingService?: SortOrder
    paymentMethod?: SortOrder
    paymentStatus?: SortOrder
    groupId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    totalAmount?: SortOrder
    shippingCost?: SortOrder
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
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type BadgeItemCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    imageUrl?: SortOrder
  }

  export type BadgeItemAvgOrderByAggregateInput = {
    price?: SortOrder
    stock?: SortOrder
  }

  export type BadgeItemMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    imageUrl?: SortOrder
  }

  export type BadgeItemMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    imageUrl?: SortOrder
  }

  export type BadgeItemSumOrderByAggregateInput = {
    price?: SortOrder
    stock?: SortOrder
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

  export type BadgeItemScalarRelationFilter = {
    is?: BadgeItemWhereInput
    isNot?: BadgeItemWhereInput
  }

  export type TemplateItemTemplateIdItemIdCompoundUniqueInput = {
    templateId: string
    itemId: string
  }

  export type TemplateItemCountOrderByAggregateInput = {
    templateId?: SortOrder
    itemId?: SortOrder
    isRequired?: SortOrder
  }

  export type TemplateItemMaxOrderByAggregateInput = {
    templateId?: SortOrder
    itemId?: SortOrder
    isRequired?: SortOrder
  }

  export type TemplateItemMinOrderByAggregateInput = {
    templateId?: SortOrder
    itemId?: SortOrder
    isRequired?: SortOrder
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    priceAtTime?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    priceAtTime?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    priceAtTime?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    itemId?: SortOrder
    quantity?: SortOrder
    priceAtTime?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    priceAtTime?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PrintJobCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrder
    errorCode?: SortOrder
    errorMsg?: SortOrder
    copies?: SortOrder
    duplex?: SortOrder
    colorMode?: SortOrder
    dpi?: SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrintJobAvgOrderByAggregateInput = {
    errorCode?: SortOrder
    copies?: SortOrder
    retryCount?: SortOrder
  }

  export type PrintJobMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrder
    errorCode?: SortOrder
    errorMsg?: SortOrder
    copies?: SortOrder
    duplex?: SortOrder
    colorMode?: SortOrder
    dpi?: SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrintJobMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    status?: SortOrder
    imageUrl?: SortOrder
    errorCode?: SortOrder
    errorMsg?: SortOrder
    copies?: SortOrder
    duplex?: SortOrder
    colorMode?: SortOrder
    dpi?: SortOrder
    retryCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrintJobSumOrderByAggregateInput = {
    errorCode?: SortOrder
    copies?: SortOrder
    retryCount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PrinterTelemetryCountOrderByAggregateInput = {
    id?: SortOrder
    printerModel?: SortOrder
    serialNumber?: SortOrder
    firmwareVersion?: SortOrder
    printerStatus?: SortOrder
    connectionType?: SortOrder
    ribbonType?: SortOrder
    ribbonRemaining?: SortOrder
    ribbonPartNumber?: SortOrder
    ribbonSerialNumber?: SortOrder
    totalCompleted?: SortOrder
    totalPicked?: SortOrder
    totalRejected?: SortOrder
    totalLost?: SortOrder
    currentCompleted?: SortOrder
    currentPicked?: SortOrder
    currentRejected?: SortOrder
    cardsSinceClean?: SortOrder
    cleaningsRun?: SortOrder
    hopper1Status?: SortOrder
    exceptionStatus?: SortOrder
    colorMode?: SortOrder
    cardsVirtualStock?: SortOrder
    cardsPrintedSite?: SortOrder
    lastUpdated?: SortOrder
  }

  export type PrinterTelemetryAvgOrderByAggregateInput = {
    ribbonRemaining?: SortOrder
    totalCompleted?: SortOrder
    totalPicked?: SortOrder
    totalRejected?: SortOrder
    totalLost?: SortOrder
    currentCompleted?: SortOrder
    currentPicked?: SortOrder
    currentRejected?: SortOrder
    cardsSinceClean?: SortOrder
    cleaningsRun?: SortOrder
    cardsVirtualStock?: SortOrder
    cardsPrintedSite?: SortOrder
  }

  export type PrinterTelemetryMaxOrderByAggregateInput = {
    id?: SortOrder
    printerModel?: SortOrder
    serialNumber?: SortOrder
    firmwareVersion?: SortOrder
    printerStatus?: SortOrder
    connectionType?: SortOrder
    ribbonType?: SortOrder
    ribbonRemaining?: SortOrder
    ribbonPartNumber?: SortOrder
    ribbonSerialNumber?: SortOrder
    totalCompleted?: SortOrder
    totalPicked?: SortOrder
    totalRejected?: SortOrder
    totalLost?: SortOrder
    currentCompleted?: SortOrder
    currentPicked?: SortOrder
    currentRejected?: SortOrder
    cardsSinceClean?: SortOrder
    cleaningsRun?: SortOrder
    hopper1Status?: SortOrder
    exceptionStatus?: SortOrder
    colorMode?: SortOrder
    cardsVirtualStock?: SortOrder
    cardsPrintedSite?: SortOrder
    lastUpdated?: SortOrder
  }

  export type PrinterTelemetryMinOrderByAggregateInput = {
    id?: SortOrder
    printerModel?: SortOrder
    serialNumber?: SortOrder
    firmwareVersion?: SortOrder
    printerStatus?: SortOrder
    connectionType?: SortOrder
    ribbonType?: SortOrder
    ribbonRemaining?: SortOrder
    ribbonPartNumber?: SortOrder
    ribbonSerialNumber?: SortOrder
    totalCompleted?: SortOrder
    totalPicked?: SortOrder
    totalRejected?: SortOrder
    totalLost?: SortOrder
    currentCompleted?: SortOrder
    currentPicked?: SortOrder
    currentRejected?: SortOrder
    cardsSinceClean?: SortOrder
    cleaningsRun?: SortOrder
    hopper1Status?: SortOrder
    exceptionStatus?: SortOrder
    colorMode?: SortOrder
    cardsVirtualStock?: SortOrder
    cardsPrintedSite?: SortOrder
    lastUpdated?: SortOrder
  }

  export type PrinterTelemetrySumOrderByAggregateInput = {
    ribbonRemaining?: SortOrder
    totalCompleted?: SortOrder
    totalPicked?: SortOrder
    totalRejected?: SortOrder
    totalLost?: SortOrder
    currentCompleted?: SortOrder
    currentPicked?: SortOrder
    currentRejected?: SortOrder
    cardsSinceClean?: SortOrder
    cleaningsRun?: SortOrder
    cardsVirtualStock?: SortOrder
    cardsPrintedSite?: SortOrder
  }

  export type BadgeTemplateCreateNestedManyWithoutEventInput = {
    create?: XOR<BadgeTemplateCreateWithoutEventInput, BadgeTemplateUncheckedCreateWithoutEventInput> | BadgeTemplateCreateWithoutEventInput[] | BadgeTemplateUncheckedCreateWithoutEventInput[]
    connectOrCreate?: BadgeTemplateCreateOrConnectWithoutEventInput | BadgeTemplateCreateOrConnectWithoutEventInput[]
    createMany?: BadgeTemplateCreateManyEventInputEnvelope
    connect?: BadgeTemplateWhereUniqueInput | BadgeTemplateWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutEventInput = {
    create?: XOR<OrderCreateWithoutEventInput, OrderUncheckedCreateWithoutEventInput> | OrderCreateWithoutEventInput[] | OrderUncheckedCreateWithoutEventInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutEventInput | OrderCreateOrConnectWithoutEventInput[]
    createMany?: OrderCreateManyEventInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type BadgeTemplateUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<BadgeTemplateCreateWithoutEventInput, BadgeTemplateUncheckedCreateWithoutEventInput> | BadgeTemplateCreateWithoutEventInput[] | BadgeTemplateUncheckedCreateWithoutEventInput[]
    connectOrCreate?: BadgeTemplateCreateOrConnectWithoutEventInput | BadgeTemplateCreateOrConnectWithoutEventInput[]
    createMany?: BadgeTemplateCreateManyEventInputEnvelope
    connect?: BadgeTemplateWhereUniqueInput | BadgeTemplateWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<OrderCreateWithoutEventInput, OrderUncheckedCreateWithoutEventInput> | OrderCreateWithoutEventInput[] | OrderUncheckedCreateWithoutEventInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutEventInput | OrderCreateOrConnectWithoutEventInput[]
    createMany?: OrderCreateManyEventInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BadgeTemplateUpdateManyWithoutEventNestedInput = {
    create?: XOR<BadgeTemplateCreateWithoutEventInput, BadgeTemplateUncheckedCreateWithoutEventInput> | BadgeTemplateCreateWithoutEventInput[] | BadgeTemplateUncheckedCreateWithoutEventInput[]
    connectOrCreate?: BadgeTemplateCreateOrConnectWithoutEventInput | BadgeTemplateCreateOrConnectWithoutEventInput[]
    upsert?: BadgeTemplateUpsertWithWhereUniqueWithoutEventInput | BadgeTemplateUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: BadgeTemplateCreateManyEventInputEnvelope
    set?: BadgeTemplateWhereUniqueInput | BadgeTemplateWhereUniqueInput[]
    disconnect?: BadgeTemplateWhereUniqueInput | BadgeTemplateWhereUniqueInput[]
    delete?: BadgeTemplateWhereUniqueInput | BadgeTemplateWhereUniqueInput[]
    connect?: BadgeTemplateWhereUniqueInput | BadgeTemplateWhereUniqueInput[]
    update?: BadgeTemplateUpdateWithWhereUniqueWithoutEventInput | BadgeTemplateUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: BadgeTemplateUpdateManyWithWhereWithoutEventInput | BadgeTemplateUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: BadgeTemplateScalarWhereInput | BadgeTemplateScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutEventNestedInput = {
    create?: XOR<OrderCreateWithoutEventInput, OrderUncheckedCreateWithoutEventInput> | OrderCreateWithoutEventInput[] | OrderUncheckedCreateWithoutEventInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutEventInput | OrderCreateOrConnectWithoutEventInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutEventInput | OrderUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: OrderCreateManyEventInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutEventInput | OrderUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutEventInput | OrderUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type BadgeTemplateUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<BadgeTemplateCreateWithoutEventInput, BadgeTemplateUncheckedCreateWithoutEventInput> | BadgeTemplateCreateWithoutEventInput[] | BadgeTemplateUncheckedCreateWithoutEventInput[]
    connectOrCreate?: BadgeTemplateCreateOrConnectWithoutEventInput | BadgeTemplateCreateOrConnectWithoutEventInput[]
    upsert?: BadgeTemplateUpsertWithWhereUniqueWithoutEventInput | BadgeTemplateUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: BadgeTemplateCreateManyEventInputEnvelope
    set?: BadgeTemplateWhereUniqueInput | BadgeTemplateWhereUniqueInput[]
    disconnect?: BadgeTemplateWhereUniqueInput | BadgeTemplateWhereUniqueInput[]
    delete?: BadgeTemplateWhereUniqueInput | BadgeTemplateWhereUniqueInput[]
    connect?: BadgeTemplateWhereUniqueInput | BadgeTemplateWhereUniqueInput[]
    update?: BadgeTemplateUpdateWithWhereUniqueWithoutEventInput | BadgeTemplateUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: BadgeTemplateUpdateManyWithWhereWithoutEventInput | BadgeTemplateUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: BadgeTemplateScalarWhereInput | BadgeTemplateScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<OrderCreateWithoutEventInput, OrderUncheckedCreateWithoutEventInput> | OrderCreateWithoutEventInput[] | OrderUncheckedCreateWithoutEventInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutEventInput | OrderCreateOrConnectWithoutEventInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutEventInput | OrderUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: OrderCreateManyEventInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutEventInput | OrderUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutEventInput | OrderUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type EventCreateNestedOneWithoutTemplatesInput = {
    create?: XOR<EventCreateWithoutTemplatesInput, EventUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: EventCreateOrConnectWithoutTemplatesInput
    connect?: EventWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutTemplateInput = {
    create?: XOR<OrderCreateWithoutTemplateInput, OrderUncheckedCreateWithoutTemplateInput> | OrderCreateWithoutTemplateInput[] | OrderUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTemplateInput | OrderCreateOrConnectWithoutTemplateInput[]
    createMany?: OrderCreateManyTemplateInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type TemplateItemCreateNestedManyWithoutTemplateInput = {
    create?: XOR<TemplateItemCreateWithoutTemplateInput, TemplateItemUncheckedCreateWithoutTemplateInput> | TemplateItemCreateWithoutTemplateInput[] | TemplateItemUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateItemCreateOrConnectWithoutTemplateInput | TemplateItemCreateOrConnectWithoutTemplateInput[]
    createMany?: TemplateItemCreateManyTemplateInputEnvelope
    connect?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<OrderCreateWithoutTemplateInput, OrderUncheckedCreateWithoutTemplateInput> | OrderCreateWithoutTemplateInput[] | OrderUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTemplateInput | OrderCreateOrConnectWithoutTemplateInput[]
    createMany?: OrderCreateManyTemplateInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type TemplateItemUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<TemplateItemCreateWithoutTemplateInput, TemplateItemUncheckedCreateWithoutTemplateInput> | TemplateItemCreateWithoutTemplateInput[] | TemplateItemUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateItemCreateOrConnectWithoutTemplateInput | TemplateItemCreateOrConnectWithoutTemplateInput[]
    createMany?: TemplateItemCreateManyTemplateInputEnvelope
    connect?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EventUpdateOneRequiredWithoutTemplatesNestedInput = {
    create?: XOR<EventCreateWithoutTemplatesInput, EventUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: EventCreateOrConnectWithoutTemplatesInput
    upsert?: EventUpsertWithoutTemplatesInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutTemplatesInput, EventUpdateWithoutTemplatesInput>, EventUncheckedUpdateWithoutTemplatesInput>
  }

  export type OrderUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<OrderCreateWithoutTemplateInput, OrderUncheckedCreateWithoutTemplateInput> | OrderCreateWithoutTemplateInput[] | OrderUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTemplateInput | OrderCreateOrConnectWithoutTemplateInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutTemplateInput | OrderUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: OrderCreateManyTemplateInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutTemplateInput | OrderUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutTemplateInput | OrderUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type TemplateItemUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<TemplateItemCreateWithoutTemplateInput, TemplateItemUncheckedCreateWithoutTemplateInput> | TemplateItemCreateWithoutTemplateInput[] | TemplateItemUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateItemCreateOrConnectWithoutTemplateInput | TemplateItemCreateOrConnectWithoutTemplateInput[]
    upsert?: TemplateItemUpsertWithWhereUniqueWithoutTemplateInput | TemplateItemUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: TemplateItemCreateManyTemplateInputEnvelope
    set?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    disconnect?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    delete?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    connect?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    update?: TemplateItemUpdateWithWhereUniqueWithoutTemplateInput | TemplateItemUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: TemplateItemUpdateManyWithWhereWithoutTemplateInput | TemplateItemUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: TemplateItemScalarWhereInput | TemplateItemScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<OrderCreateWithoutTemplateInput, OrderUncheckedCreateWithoutTemplateInput> | OrderCreateWithoutTemplateInput[] | OrderUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutTemplateInput | OrderCreateOrConnectWithoutTemplateInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutTemplateInput | OrderUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: OrderCreateManyTemplateInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutTemplateInput | OrderUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutTemplateInput | OrderUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type TemplateItemUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<TemplateItemCreateWithoutTemplateInput, TemplateItemUncheckedCreateWithoutTemplateInput> | TemplateItemCreateWithoutTemplateInput[] | TemplateItemUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateItemCreateOrConnectWithoutTemplateInput | TemplateItemCreateOrConnectWithoutTemplateInput[]
    upsert?: TemplateItemUpsertWithWhereUniqueWithoutTemplateInput | TemplateItemUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: TemplateItemCreateManyTemplateInputEnvelope
    set?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    disconnect?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    delete?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    connect?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    update?: TemplateItemUpdateWithWhereUniqueWithoutTemplateInput | TemplateItemUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: TemplateItemUpdateManyWithWhereWithoutTemplateInput | TemplateItemUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: TemplateItemScalarWhereInput | TemplateItemScalarWhereInput[]
  }

  export type BadgeTemplateCreateNestedOneWithoutOrdersInput = {
    create?: XOR<BadgeTemplateCreateWithoutOrdersInput, BadgeTemplateUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: BadgeTemplateCreateOrConnectWithoutOrdersInput
    connect?: BadgeTemplateWhereUniqueInput
  }

  export type EventCreateNestedOneWithoutOrdersInput = {
    create?: XOR<EventCreateWithoutOrdersInput, EventUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: EventCreateOrConnectWithoutOrdersInput
    connect?: EventWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BadgeTemplateUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<BadgeTemplateCreateWithoutOrdersInput, BadgeTemplateUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: BadgeTemplateCreateOrConnectWithoutOrdersInput
    upsert?: BadgeTemplateUpsertWithoutOrdersInput
    connect?: BadgeTemplateWhereUniqueInput
    update?: XOR<XOR<BadgeTemplateUpdateToOneWithWhereWithoutOrdersInput, BadgeTemplateUpdateWithoutOrdersInput>, BadgeTemplateUncheckedUpdateWithoutOrdersInput>
  }

  export type EventUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<EventCreateWithoutOrdersInput, EventUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: EventCreateOrConnectWithoutOrdersInput
    upsert?: EventUpsertWithoutOrdersInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutOrdersInput, EventUpdateWithoutOrdersInput>, EventUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemCreateNestedManyWithoutItemInput = {
    create?: XOR<OrderItemCreateWithoutItemInput, OrderItemUncheckedCreateWithoutItemInput> | OrderItemCreateWithoutItemInput[] | OrderItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutItemInput | OrderItemCreateOrConnectWithoutItemInput[]
    createMany?: OrderItemCreateManyItemInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type TemplateItemCreateNestedManyWithoutItemInput = {
    create?: XOR<TemplateItemCreateWithoutItemInput, TemplateItemUncheckedCreateWithoutItemInput> | TemplateItemCreateWithoutItemInput[] | TemplateItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: TemplateItemCreateOrConnectWithoutItemInput | TemplateItemCreateOrConnectWithoutItemInput[]
    createMany?: TemplateItemCreateManyItemInputEnvelope
    connect?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<OrderItemCreateWithoutItemInput, OrderItemUncheckedCreateWithoutItemInput> | OrderItemCreateWithoutItemInput[] | OrderItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutItemInput | OrderItemCreateOrConnectWithoutItemInput[]
    createMany?: OrderItemCreateManyItemInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type TemplateItemUncheckedCreateNestedManyWithoutItemInput = {
    create?: XOR<TemplateItemCreateWithoutItemInput, TemplateItemUncheckedCreateWithoutItemInput> | TemplateItemCreateWithoutItemInput[] | TemplateItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: TemplateItemCreateOrConnectWithoutItemInput | TemplateItemCreateOrConnectWithoutItemInput[]
    createMany?: TemplateItemCreateManyItemInputEnvelope
    connect?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderItemUpdateManyWithoutItemNestedInput = {
    create?: XOR<OrderItemCreateWithoutItemInput, OrderItemUncheckedCreateWithoutItemInput> | OrderItemCreateWithoutItemInput[] | OrderItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutItemInput | OrderItemCreateOrConnectWithoutItemInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutItemInput | OrderItemUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: OrderItemCreateManyItemInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutItemInput | OrderItemUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutItemInput | OrderItemUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type TemplateItemUpdateManyWithoutItemNestedInput = {
    create?: XOR<TemplateItemCreateWithoutItemInput, TemplateItemUncheckedCreateWithoutItemInput> | TemplateItemCreateWithoutItemInput[] | TemplateItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: TemplateItemCreateOrConnectWithoutItemInput | TemplateItemCreateOrConnectWithoutItemInput[]
    upsert?: TemplateItemUpsertWithWhereUniqueWithoutItemInput | TemplateItemUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: TemplateItemCreateManyItemInputEnvelope
    set?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    disconnect?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    delete?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    connect?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    update?: TemplateItemUpdateWithWhereUniqueWithoutItemInput | TemplateItemUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: TemplateItemUpdateManyWithWhereWithoutItemInput | TemplateItemUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: TemplateItemScalarWhereInput | TemplateItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<OrderItemCreateWithoutItemInput, OrderItemUncheckedCreateWithoutItemInput> | OrderItemCreateWithoutItemInput[] | OrderItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutItemInput | OrderItemCreateOrConnectWithoutItemInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutItemInput | OrderItemUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: OrderItemCreateManyItemInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutItemInput | OrderItemUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutItemInput | OrderItemUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type TemplateItemUncheckedUpdateManyWithoutItemNestedInput = {
    create?: XOR<TemplateItemCreateWithoutItemInput, TemplateItemUncheckedCreateWithoutItemInput> | TemplateItemCreateWithoutItemInput[] | TemplateItemUncheckedCreateWithoutItemInput[]
    connectOrCreate?: TemplateItemCreateOrConnectWithoutItemInput | TemplateItemCreateOrConnectWithoutItemInput[]
    upsert?: TemplateItemUpsertWithWhereUniqueWithoutItemInput | TemplateItemUpsertWithWhereUniqueWithoutItemInput[]
    createMany?: TemplateItemCreateManyItemInputEnvelope
    set?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    disconnect?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    delete?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    connect?: TemplateItemWhereUniqueInput | TemplateItemWhereUniqueInput[]
    update?: TemplateItemUpdateWithWhereUniqueWithoutItemInput | TemplateItemUpdateWithWhereUniqueWithoutItemInput[]
    updateMany?: TemplateItemUpdateManyWithWhereWithoutItemInput | TemplateItemUpdateManyWithWhereWithoutItemInput[]
    deleteMany?: TemplateItemScalarWhereInput | TemplateItemScalarWhereInput[]
  }

  export type BadgeTemplateCreateNestedOneWithoutItemsInput = {
    create?: XOR<BadgeTemplateCreateWithoutItemsInput, BadgeTemplateUncheckedCreateWithoutItemsInput>
    connectOrCreate?: BadgeTemplateCreateOrConnectWithoutItemsInput
    connect?: BadgeTemplateWhereUniqueInput
  }

  export type BadgeItemCreateNestedOneWithoutTemplatesInput = {
    create?: XOR<BadgeItemCreateWithoutTemplatesInput, BadgeItemUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: BadgeItemCreateOrConnectWithoutTemplatesInput
    connect?: BadgeItemWhereUniqueInput
  }

  export type BadgeTemplateUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<BadgeTemplateCreateWithoutItemsInput, BadgeTemplateUncheckedCreateWithoutItemsInput>
    connectOrCreate?: BadgeTemplateCreateOrConnectWithoutItemsInput
    upsert?: BadgeTemplateUpsertWithoutItemsInput
    connect?: BadgeTemplateWhereUniqueInput
    update?: XOR<XOR<BadgeTemplateUpdateToOneWithWhereWithoutItemsInput, BadgeTemplateUpdateWithoutItemsInput>, BadgeTemplateUncheckedUpdateWithoutItemsInput>
  }

  export type BadgeItemUpdateOneRequiredWithoutTemplatesNestedInput = {
    create?: XOR<BadgeItemCreateWithoutTemplatesInput, BadgeItemUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: BadgeItemCreateOrConnectWithoutTemplatesInput
    upsert?: BadgeItemUpsertWithoutTemplatesInput
    connect?: BadgeItemWhereUniqueInput
    update?: XOR<XOR<BadgeItemUpdateToOneWithWhereWithoutTemplatesInput, BadgeItemUpdateWithoutTemplatesInput>, BadgeItemUncheckedUpdateWithoutTemplatesInput>
  }

  export type BadgeItemCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<BadgeItemCreateWithoutOrderItemsInput, BadgeItemUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: BadgeItemCreateOrConnectWithoutOrderItemsInput
    connect?: BadgeItemWhereUniqueInput
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type BadgeItemUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<BadgeItemCreateWithoutOrderItemsInput, BadgeItemUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: BadgeItemCreateOrConnectWithoutOrderItemsInput
    upsert?: BadgeItemUpsertWithoutOrderItemsInput
    connect?: BadgeItemWhereUniqueInput
    update?: XOR<XOR<BadgeItemUpdateToOneWithWhereWithoutOrderItemsInput, BadgeItemUpdateWithoutOrderItemsInput>, BadgeItemUncheckedUpdateWithoutOrderItemsInput>
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
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
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type BadgeTemplateCreateWithoutEventInput = {
    id?: string
    name: string
    bgImageUrl: string
    configJson: string
    basePrice?: number
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutTemplateInput
    items?: TemplateItemCreateNestedManyWithoutTemplateInput
  }

  export type BadgeTemplateUncheckedCreateWithoutEventInput = {
    id?: string
    name: string
    bgImageUrl: string
    configJson: string
    basePrice?: number
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutTemplateInput
    items?: TemplateItemUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type BadgeTemplateCreateOrConnectWithoutEventInput = {
    where: BadgeTemplateWhereUniqueInput
    create: XOR<BadgeTemplateCreateWithoutEventInput, BadgeTemplateUncheckedCreateWithoutEventInput>
  }

  export type BadgeTemplateCreateManyEventInputEnvelope = {
    data: BadgeTemplateCreateManyEventInput | BadgeTemplateCreateManyEventInput[]
  }

  export type OrderCreateWithoutEventInput = {
    id?: string
    clientName: string
    phone?: string
    congregation?: string | null
    photoUrl?: string | null
    customConfigJson?: string | null
    status?: string
    totalAmount?: number
    isFromItabira?: boolean
    zipCode?: string | null
    address?: string | null
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city?: string | null
    state?: string | null
    shippingCost?: number
    shippingService?: string | null
    paymentMethod?: string
    paymentStatus?: string
    groupId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    template: BadgeTemplateCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutEventInput = {
    id?: string
    badgeTemplateId: string
    clientName: string
    phone?: string
    congregation?: string | null
    photoUrl?: string | null
    customConfigJson?: string | null
    status?: string
    totalAmount?: number
    isFromItabira?: boolean
    zipCode?: string | null
    address?: string | null
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city?: string | null
    state?: string | null
    shippingCost?: number
    shippingService?: string | null
    paymentMethod?: string
    paymentStatus?: string
    groupId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutEventInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutEventInput, OrderUncheckedCreateWithoutEventInput>
  }

  export type OrderCreateManyEventInputEnvelope = {
    data: OrderCreateManyEventInput | OrderCreateManyEventInput[]
  }

  export type BadgeTemplateUpsertWithWhereUniqueWithoutEventInput = {
    where: BadgeTemplateWhereUniqueInput
    update: XOR<BadgeTemplateUpdateWithoutEventInput, BadgeTemplateUncheckedUpdateWithoutEventInput>
    create: XOR<BadgeTemplateCreateWithoutEventInput, BadgeTemplateUncheckedCreateWithoutEventInput>
  }

  export type BadgeTemplateUpdateWithWhereUniqueWithoutEventInput = {
    where: BadgeTemplateWhereUniqueInput
    data: XOR<BadgeTemplateUpdateWithoutEventInput, BadgeTemplateUncheckedUpdateWithoutEventInput>
  }

  export type BadgeTemplateUpdateManyWithWhereWithoutEventInput = {
    where: BadgeTemplateScalarWhereInput
    data: XOR<BadgeTemplateUpdateManyMutationInput, BadgeTemplateUncheckedUpdateManyWithoutEventInput>
  }

  export type BadgeTemplateScalarWhereInput = {
    AND?: BadgeTemplateScalarWhereInput | BadgeTemplateScalarWhereInput[]
    OR?: BadgeTemplateScalarWhereInput[]
    NOT?: BadgeTemplateScalarWhereInput | BadgeTemplateScalarWhereInput[]
    id?: StringFilter<"BadgeTemplate"> | string
    eventId?: StringFilter<"BadgeTemplate"> | string
    name?: StringFilter<"BadgeTemplate"> | string
    bgImageUrl?: StringFilter<"BadgeTemplate"> | string
    configJson?: StringFilter<"BadgeTemplate"> | string
    basePrice?: FloatFilter<"BadgeTemplate"> | number
    isActive?: BoolFilter<"BadgeTemplate"> | boolean
    createdAt?: DateTimeFilter<"BadgeTemplate"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutEventInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutEventInput, OrderUncheckedUpdateWithoutEventInput>
    create: XOR<OrderCreateWithoutEventInput, OrderUncheckedCreateWithoutEventInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutEventInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutEventInput, OrderUncheckedUpdateWithoutEventInput>
  }

  export type OrderUpdateManyWithWhereWithoutEventInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutEventInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    eventId?: StringFilter<"Order"> | string
    badgeTemplateId?: StringFilter<"Order"> | string
    clientName?: StringFilter<"Order"> | string
    phone?: StringFilter<"Order"> | string
    congregation?: StringNullableFilter<"Order"> | string | null
    photoUrl?: StringNullableFilter<"Order"> | string | null
    customConfigJson?: StringNullableFilter<"Order"> | string | null
    status?: StringFilter<"Order"> | string
    totalAmount?: FloatFilter<"Order"> | number
    isFromItabira?: BoolFilter<"Order"> | boolean
    zipCode?: StringNullableFilter<"Order"> | string | null
    address?: StringNullableFilter<"Order"> | string | null
    number?: StringNullableFilter<"Order"> | string | null
    complement?: StringNullableFilter<"Order"> | string | null
    neighborhood?: StringNullableFilter<"Order"> | string | null
    city?: StringNullableFilter<"Order"> | string | null
    state?: StringNullableFilter<"Order"> | string | null
    shippingCost?: FloatFilter<"Order"> | number
    shippingService?: StringNullableFilter<"Order"> | string | null
    paymentMethod?: StringFilter<"Order"> | string
    paymentStatus?: StringFilter<"Order"> | string
    groupId?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type EventCreateWithoutTemplatesInput = {
    id?: string
    name: string
    slug: string
    active?: boolean
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutTemplatesInput = {
    id?: string
    name: string
    slug: string
    active?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutTemplatesInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutTemplatesInput, EventUncheckedCreateWithoutTemplatesInput>
  }

  export type OrderCreateWithoutTemplateInput = {
    id?: string
    clientName: string
    phone?: string
    congregation?: string | null
    photoUrl?: string | null
    customConfigJson?: string | null
    status?: string
    totalAmount?: number
    isFromItabira?: boolean
    zipCode?: string | null
    address?: string | null
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city?: string | null
    state?: string | null
    shippingCost?: number
    shippingService?: string | null
    paymentMethod?: string
    paymentStatus?: string
    groupId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    event: EventCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutTemplateInput = {
    id?: string
    eventId: string
    clientName: string
    phone?: string
    congregation?: string | null
    photoUrl?: string | null
    customConfigJson?: string | null
    status?: string
    totalAmount?: number
    isFromItabira?: boolean
    zipCode?: string | null
    address?: string | null
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city?: string | null
    state?: string | null
    shippingCost?: number
    shippingService?: string | null
    paymentMethod?: string
    paymentStatus?: string
    groupId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutTemplateInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutTemplateInput, OrderUncheckedCreateWithoutTemplateInput>
  }

  export type OrderCreateManyTemplateInputEnvelope = {
    data: OrderCreateManyTemplateInput | OrderCreateManyTemplateInput[]
  }

  export type TemplateItemCreateWithoutTemplateInput = {
    isRequired?: boolean
    item: BadgeItemCreateNestedOneWithoutTemplatesInput
  }

  export type TemplateItemUncheckedCreateWithoutTemplateInput = {
    itemId: string
    isRequired?: boolean
  }

  export type TemplateItemCreateOrConnectWithoutTemplateInput = {
    where: TemplateItemWhereUniqueInput
    create: XOR<TemplateItemCreateWithoutTemplateInput, TemplateItemUncheckedCreateWithoutTemplateInput>
  }

  export type TemplateItemCreateManyTemplateInputEnvelope = {
    data: TemplateItemCreateManyTemplateInput | TemplateItemCreateManyTemplateInput[]
  }

  export type EventUpsertWithoutTemplatesInput = {
    update: XOR<EventUpdateWithoutTemplatesInput, EventUncheckedUpdateWithoutTemplatesInput>
    create: XOR<EventCreateWithoutTemplatesInput, EventUncheckedCreateWithoutTemplatesInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutTemplatesInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutTemplatesInput, EventUncheckedUpdateWithoutTemplatesInput>
  }

  export type EventUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutEventNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutTemplateInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutTemplateInput, OrderUncheckedUpdateWithoutTemplateInput>
    create: XOR<OrderCreateWithoutTemplateInput, OrderUncheckedCreateWithoutTemplateInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutTemplateInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutTemplateInput, OrderUncheckedUpdateWithoutTemplateInput>
  }

  export type OrderUpdateManyWithWhereWithoutTemplateInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutTemplateInput>
  }

  export type TemplateItemUpsertWithWhereUniqueWithoutTemplateInput = {
    where: TemplateItemWhereUniqueInput
    update: XOR<TemplateItemUpdateWithoutTemplateInput, TemplateItemUncheckedUpdateWithoutTemplateInput>
    create: XOR<TemplateItemCreateWithoutTemplateInput, TemplateItemUncheckedCreateWithoutTemplateInput>
  }

  export type TemplateItemUpdateWithWhereUniqueWithoutTemplateInput = {
    where: TemplateItemWhereUniqueInput
    data: XOR<TemplateItemUpdateWithoutTemplateInput, TemplateItemUncheckedUpdateWithoutTemplateInput>
  }

  export type TemplateItemUpdateManyWithWhereWithoutTemplateInput = {
    where: TemplateItemScalarWhereInput
    data: XOR<TemplateItemUpdateManyMutationInput, TemplateItemUncheckedUpdateManyWithoutTemplateInput>
  }

  export type TemplateItemScalarWhereInput = {
    AND?: TemplateItemScalarWhereInput | TemplateItemScalarWhereInput[]
    OR?: TemplateItemScalarWhereInput[]
    NOT?: TemplateItemScalarWhereInput | TemplateItemScalarWhereInput[]
    templateId?: StringFilter<"TemplateItem"> | string
    itemId?: StringFilter<"TemplateItem"> | string
    isRequired?: BoolFilter<"TemplateItem"> | boolean
  }

  export type BadgeTemplateCreateWithoutOrdersInput = {
    id?: string
    name: string
    bgImageUrl: string
    configJson: string
    basePrice?: number
    isActive?: boolean
    createdAt?: Date | string
    event: EventCreateNestedOneWithoutTemplatesInput
    items?: TemplateItemCreateNestedManyWithoutTemplateInput
  }

  export type BadgeTemplateUncheckedCreateWithoutOrdersInput = {
    id?: string
    eventId: string
    name: string
    bgImageUrl: string
    configJson: string
    basePrice?: number
    isActive?: boolean
    createdAt?: Date | string
    items?: TemplateItemUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type BadgeTemplateCreateOrConnectWithoutOrdersInput = {
    where: BadgeTemplateWhereUniqueInput
    create: XOR<BadgeTemplateCreateWithoutOrdersInput, BadgeTemplateUncheckedCreateWithoutOrdersInput>
  }

  export type EventCreateWithoutOrdersInput = {
    id?: string
    name: string
    slug: string
    active?: boolean
    createdAt?: Date | string
    templates?: BadgeTemplateCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    slug: string
    active?: boolean
    createdAt?: Date | string
    templates?: BadgeTemplateUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutOrdersInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutOrdersInput, EventUncheckedCreateWithoutOrdersInput>
  }

  export type OrderItemCreateWithoutOrderInput = {
    id?: string
    quantity?: number
    priceAtTime: number
    item: BadgeItemCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string
    itemId: string
    quantity?: number
    priceAtTime: number
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
  }

  export type BadgeTemplateUpsertWithoutOrdersInput = {
    update: XOR<BadgeTemplateUpdateWithoutOrdersInput, BadgeTemplateUncheckedUpdateWithoutOrdersInput>
    create: XOR<BadgeTemplateCreateWithoutOrdersInput, BadgeTemplateUncheckedCreateWithoutOrdersInput>
    where?: BadgeTemplateWhereInput
  }

  export type BadgeTemplateUpdateToOneWithWhereWithoutOrdersInput = {
    where?: BadgeTemplateWhereInput
    data: XOR<BadgeTemplateUpdateWithoutOrdersInput, BadgeTemplateUncheckedUpdateWithoutOrdersInput>
  }

  export type BadgeTemplateUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bgImageUrl?: StringFieldUpdateOperationsInput | string
    configJson?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutTemplatesNestedInput
    items?: TemplateItemUpdateManyWithoutTemplateNestedInput
  }

  export type BadgeTemplateUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bgImageUrl?: StringFieldUpdateOperationsInput | string
    configJson?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: TemplateItemUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type EventUpsertWithoutOrdersInput = {
    update: XOR<EventUpdateWithoutOrdersInput, EventUncheckedUpdateWithoutOrdersInput>
    create: XOR<EventCreateWithoutOrdersInput, EventUncheckedCreateWithoutOrdersInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutOrdersInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutOrdersInput, EventUncheckedUpdateWithoutOrdersInput>
  }

  export type EventUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    templates?: BadgeTemplateUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    templates?: BadgeTemplateUncheckedUpdateManyWithoutEventNestedInput
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    itemId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    priceAtTime?: FloatFilter<"OrderItem"> | number
  }

  export type OrderItemCreateWithoutItemInput = {
    id?: string
    quantity?: number
    priceAtTime: number
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateWithoutItemInput = {
    id?: string
    orderId: string
    quantity?: number
    priceAtTime: number
  }

  export type OrderItemCreateOrConnectWithoutItemInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutItemInput, OrderItemUncheckedCreateWithoutItemInput>
  }

  export type OrderItemCreateManyItemInputEnvelope = {
    data: OrderItemCreateManyItemInput | OrderItemCreateManyItemInput[]
  }

  export type TemplateItemCreateWithoutItemInput = {
    isRequired?: boolean
    template: BadgeTemplateCreateNestedOneWithoutItemsInput
  }

  export type TemplateItemUncheckedCreateWithoutItemInput = {
    templateId: string
    isRequired?: boolean
  }

  export type TemplateItemCreateOrConnectWithoutItemInput = {
    where: TemplateItemWhereUniqueInput
    create: XOR<TemplateItemCreateWithoutItemInput, TemplateItemUncheckedCreateWithoutItemInput>
  }

  export type TemplateItemCreateManyItemInputEnvelope = {
    data: TemplateItemCreateManyItemInput | TemplateItemCreateManyItemInput[]
  }

  export type OrderItemUpsertWithWhereUniqueWithoutItemInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutItemInput, OrderItemUncheckedUpdateWithoutItemInput>
    create: XOR<OrderItemCreateWithoutItemInput, OrderItemUncheckedCreateWithoutItemInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutItemInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutItemInput, OrderItemUncheckedUpdateWithoutItemInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutItemInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutItemInput>
  }

  export type TemplateItemUpsertWithWhereUniqueWithoutItemInput = {
    where: TemplateItemWhereUniqueInput
    update: XOR<TemplateItemUpdateWithoutItemInput, TemplateItemUncheckedUpdateWithoutItemInput>
    create: XOR<TemplateItemCreateWithoutItemInput, TemplateItemUncheckedCreateWithoutItemInput>
  }

  export type TemplateItemUpdateWithWhereUniqueWithoutItemInput = {
    where: TemplateItemWhereUniqueInput
    data: XOR<TemplateItemUpdateWithoutItemInput, TemplateItemUncheckedUpdateWithoutItemInput>
  }

  export type TemplateItemUpdateManyWithWhereWithoutItemInput = {
    where: TemplateItemScalarWhereInput
    data: XOR<TemplateItemUpdateManyMutationInput, TemplateItemUncheckedUpdateManyWithoutItemInput>
  }

  export type BadgeTemplateCreateWithoutItemsInput = {
    id?: string
    name: string
    bgImageUrl: string
    configJson: string
    basePrice?: number
    isActive?: boolean
    createdAt?: Date | string
    event: EventCreateNestedOneWithoutTemplatesInput
    orders?: OrderCreateNestedManyWithoutTemplateInput
  }

  export type BadgeTemplateUncheckedCreateWithoutItemsInput = {
    id?: string
    eventId: string
    name: string
    bgImageUrl: string
    configJson: string
    basePrice?: number
    isActive?: boolean
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type BadgeTemplateCreateOrConnectWithoutItemsInput = {
    where: BadgeTemplateWhereUniqueInput
    create: XOR<BadgeTemplateCreateWithoutItemsInput, BadgeTemplateUncheckedCreateWithoutItemsInput>
  }

  export type BadgeItemCreateWithoutTemplatesInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    stock?: number
    imageUrl?: string | null
    orderItems?: OrderItemCreateNestedManyWithoutItemInput
  }

  export type BadgeItemUncheckedCreateWithoutTemplatesInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    stock?: number
    imageUrl?: string | null
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutItemInput
  }

  export type BadgeItemCreateOrConnectWithoutTemplatesInput = {
    where: BadgeItemWhereUniqueInput
    create: XOR<BadgeItemCreateWithoutTemplatesInput, BadgeItemUncheckedCreateWithoutTemplatesInput>
  }

  export type BadgeTemplateUpsertWithoutItemsInput = {
    update: XOR<BadgeTemplateUpdateWithoutItemsInput, BadgeTemplateUncheckedUpdateWithoutItemsInput>
    create: XOR<BadgeTemplateCreateWithoutItemsInput, BadgeTemplateUncheckedCreateWithoutItemsInput>
    where?: BadgeTemplateWhereInput
  }

  export type BadgeTemplateUpdateToOneWithWhereWithoutItemsInput = {
    where?: BadgeTemplateWhereInput
    data: XOR<BadgeTemplateUpdateWithoutItemsInput, BadgeTemplateUncheckedUpdateWithoutItemsInput>
  }

  export type BadgeTemplateUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bgImageUrl?: StringFieldUpdateOperationsInput | string
    configJson?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutTemplatesNestedInput
    orders?: OrderUpdateManyWithoutTemplateNestedInput
  }

  export type BadgeTemplateUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bgImageUrl?: StringFieldUpdateOperationsInput | string
    configJson?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type BadgeItemUpsertWithoutTemplatesInput = {
    update: XOR<BadgeItemUpdateWithoutTemplatesInput, BadgeItemUncheckedUpdateWithoutTemplatesInput>
    create: XOR<BadgeItemCreateWithoutTemplatesInput, BadgeItemUncheckedCreateWithoutTemplatesInput>
    where?: BadgeItemWhereInput
  }

  export type BadgeItemUpdateToOneWithWhereWithoutTemplatesInput = {
    where?: BadgeItemWhereInput
    data: XOR<BadgeItemUpdateWithoutTemplatesInput, BadgeItemUncheckedUpdateWithoutTemplatesInput>
  }

  export type BadgeItemUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderItems?: OrderItemUpdateManyWithoutItemNestedInput
  }

  export type BadgeItemUncheckedUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderItems?: OrderItemUncheckedUpdateManyWithoutItemNestedInput
  }

  export type BadgeItemCreateWithoutOrderItemsInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    stock?: number
    imageUrl?: string | null
    templates?: TemplateItemCreateNestedManyWithoutItemInput
  }

  export type BadgeItemUncheckedCreateWithoutOrderItemsInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    stock?: number
    imageUrl?: string | null
    templates?: TemplateItemUncheckedCreateNestedManyWithoutItemInput
  }

  export type BadgeItemCreateOrConnectWithoutOrderItemsInput = {
    where: BadgeItemWhereUniqueInput
    create: XOR<BadgeItemCreateWithoutOrderItemsInput, BadgeItemUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderCreateWithoutItemsInput = {
    id?: string
    clientName: string
    phone?: string
    congregation?: string | null
    photoUrl?: string | null
    customConfigJson?: string | null
    status?: string
    totalAmount?: number
    isFromItabira?: boolean
    zipCode?: string | null
    address?: string | null
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city?: string | null
    state?: string | null
    shippingCost?: number
    shippingService?: string | null
    paymentMethod?: string
    paymentStatus?: string
    groupId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    template: BadgeTemplateCreateNestedOneWithoutOrdersInput
    event: EventCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string
    eventId: string
    badgeTemplateId: string
    clientName: string
    phone?: string
    congregation?: string | null
    photoUrl?: string | null
    customConfigJson?: string | null
    status?: string
    totalAmount?: number
    isFromItabira?: boolean
    zipCode?: string | null
    address?: string | null
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city?: string | null
    state?: string | null
    shippingCost?: number
    shippingService?: string | null
    paymentMethod?: string
    paymentStatus?: string
    groupId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type BadgeItemUpsertWithoutOrderItemsInput = {
    update: XOR<BadgeItemUpdateWithoutOrderItemsInput, BadgeItemUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<BadgeItemCreateWithoutOrderItemsInput, BadgeItemUncheckedCreateWithoutOrderItemsInput>
    where?: BadgeItemWhereInput
  }

  export type BadgeItemUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: BadgeItemWhereInput
    data: XOR<BadgeItemUpdateWithoutOrderItemsInput, BadgeItemUncheckedUpdateWithoutOrderItemsInput>
  }

  export type BadgeItemUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    templates?: TemplateItemUpdateManyWithoutItemNestedInput
  }

  export type BadgeItemUncheckedUpdateWithoutOrderItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    templates?: TemplateItemUncheckedUpdateManyWithoutItemNestedInput
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    congregation?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    customConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    isFromItabira?: BoolFieldUpdateOperationsInput | boolean
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: FloatFieldUpdateOperationsInput | number
    shippingService?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: BadgeTemplateUpdateOneRequiredWithoutOrdersNestedInput
    event?: EventUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    badgeTemplateId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    congregation?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    customConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    isFromItabira?: BoolFieldUpdateOperationsInput | boolean
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: FloatFieldUpdateOperationsInput | number
    shippingService?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BadgeTemplateCreateManyEventInput = {
    id?: string
    name: string
    bgImageUrl: string
    configJson: string
    basePrice?: number
    isActive?: boolean
    createdAt?: Date | string
  }

  export type OrderCreateManyEventInput = {
    id?: string
    badgeTemplateId: string
    clientName: string
    phone?: string
    congregation?: string | null
    photoUrl?: string | null
    customConfigJson?: string | null
    status?: string
    totalAmount?: number
    isFromItabira?: boolean
    zipCode?: string | null
    address?: string | null
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city?: string | null
    state?: string | null
    shippingCost?: number
    shippingService?: string | null
    paymentMethod?: string
    paymentStatus?: string
    groupId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BadgeTemplateUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bgImageUrl?: StringFieldUpdateOperationsInput | string
    configJson?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutTemplateNestedInput
    items?: TemplateItemUpdateManyWithoutTemplateNestedInput
  }

  export type BadgeTemplateUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bgImageUrl?: StringFieldUpdateOperationsInput | string
    configJson?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutTemplateNestedInput
    items?: TemplateItemUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type BadgeTemplateUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bgImageUrl?: StringFieldUpdateOperationsInput | string
    configJson?: StringFieldUpdateOperationsInput | string
    basePrice?: FloatFieldUpdateOperationsInput | number
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    congregation?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    customConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    isFromItabira?: BoolFieldUpdateOperationsInput | boolean
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: FloatFieldUpdateOperationsInput | number
    shippingService?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: BadgeTemplateUpdateOneRequiredWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    badgeTemplateId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    congregation?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    customConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    isFromItabira?: BoolFieldUpdateOperationsInput | boolean
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: FloatFieldUpdateOperationsInput | number
    shippingService?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutEventInput = {
    id?: StringFieldUpdateOperationsInput | string
    badgeTemplateId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    congregation?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    customConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    isFromItabira?: BoolFieldUpdateOperationsInput | boolean
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: FloatFieldUpdateOperationsInput | number
    shippingService?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyTemplateInput = {
    id?: string
    eventId: string
    clientName: string
    phone?: string
    congregation?: string | null
    photoUrl?: string | null
    customConfigJson?: string | null
    status?: string
    totalAmount?: number
    isFromItabira?: boolean
    zipCode?: string | null
    address?: string | null
    number?: string | null
    complement?: string | null
    neighborhood?: string | null
    city?: string | null
    state?: string | null
    shippingCost?: number
    shippingService?: string | null
    paymentMethod?: string
    paymentStatus?: string
    groupId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateItemCreateManyTemplateInput = {
    itemId: string
    isRequired?: boolean
  }

  export type OrderUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    congregation?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    customConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    isFromItabira?: BoolFieldUpdateOperationsInput | boolean
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: FloatFieldUpdateOperationsInput | number
    shippingService?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    event?: EventUpdateOneRequiredWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    congregation?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    customConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    isFromItabira?: BoolFieldUpdateOperationsInput | boolean
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: FloatFieldUpdateOperationsInput | number
    shippingService?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eventId?: StringFieldUpdateOperationsInput | string
    clientName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    congregation?: NullableStringFieldUpdateOperationsInput | string | null
    photoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    customConfigJson?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    totalAmount?: FloatFieldUpdateOperationsInput | number
    isFromItabira?: BoolFieldUpdateOperationsInput | boolean
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    complement?: NullableStringFieldUpdateOperationsInput | string | null
    neighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    shippingCost?: FloatFieldUpdateOperationsInput | number
    shippingService?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    groupId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateItemUpdateWithoutTemplateInput = {
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    item?: BadgeItemUpdateOneRequiredWithoutTemplatesNestedInput
  }

  export type TemplateItemUncheckedUpdateWithoutTemplateInput = {
    itemId?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TemplateItemUncheckedUpdateManyWithoutTemplateInput = {
    itemId?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OrderItemCreateManyOrderInput = {
    id?: string
    itemId: string
    quantity?: number
    priceAtTime: number
  }

  export type OrderItemUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
    item?: BadgeItemUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    itemId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemCreateManyItemInput = {
    id?: string
    orderId: string
    quantity?: number
    priceAtTime: number
  }

  export type TemplateItemCreateManyItemInput = {
    templateId: string
    isRequired?: boolean
  }

  export type OrderItemUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemUncheckedUpdateManyWithoutItemInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    priceAtTime?: FloatFieldUpdateOperationsInput | number
  }

  export type TemplateItemUpdateWithoutItemInput = {
    isRequired?: BoolFieldUpdateOperationsInput | boolean
    template?: BadgeTemplateUpdateOneRequiredWithoutItemsNestedInput
  }

  export type TemplateItemUncheckedUpdateWithoutItemInput = {
    templateId?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TemplateItemUncheckedUpdateManyWithoutItemInput = {
    templateId?: StringFieldUpdateOperationsInput | string
    isRequired?: BoolFieldUpdateOperationsInput | boolean
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