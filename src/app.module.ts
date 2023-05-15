import { Module } from '@nestjs/common';
import { CoreModule } from './@aurora/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LibraryModule } from './@api/library/library.module';

@Module({
    imports: [
        CoreModule,
        LibraryModule
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule {}
