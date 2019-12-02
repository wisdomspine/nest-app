import { Module, DynamicModule } from '@nestjs/common';

import { Connection } from "./connection.provider";
import { Database } from "./database.provider";
@Module({
  providers: [Connection]
})
export class DatabaseModule {
    // static forRoot(entities = [], options?): DynamicModule{
    //     const providers = createDatabaseProviders(options, entities);
    //     return {
    //         module: DatabaseModule,
    //         providers: providers,
    //         exports: providers
    //     }
    // }
}
