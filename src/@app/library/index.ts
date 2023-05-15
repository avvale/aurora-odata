import { LibraryAuthorHandlers, LibraryAuthorServices, LibraryAuthorModel, IAuthorRepository, SequelizeAuthorRepository, AuthorSagas } from './author';

export const LibraryHandlers = [
    ...LibraryAuthorHandlers
];
export const LibraryServices = [
    ...LibraryAuthorServices
];
export const LibraryModels = [
    LibraryAuthorModel
];
export const LibraryRepositories = [
    {
        provide : IAuthorRepository,
        useClass: SequelizeAuthorRepository
    }
];
export const LibrarySagas = [
    AuthorSagas
];
