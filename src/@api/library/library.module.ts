import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { LibrarySeeder } from './library.seeder';
import { LibraryModels, LibraryHandlers, LibraryServices, LibraryRepositories, LibrarySagas } from '../../@app/library';
import { LibraryAuthorControllers, LibraryAuthorResolvers, LibraryAuthorApiHandlers, LibraryAuthorServices } from './author';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
                ...LibraryModels
            ])
    ],
    controllers: [
        ...LibraryAuthorControllers
    ],
    providers: [
        LibrarySeeder,
        ...LibraryHandlers,
        ...LibraryServices,
        ...LibraryRepositories,
        ...LibrarySagas,
        ...LibraryAuthorResolvers,
        ...LibraryAuthorApiHandlers,
        ...LibraryAuthorServices
    ],
})
export class LibraryModule {}
