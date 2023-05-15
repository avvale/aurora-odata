// controllers
import { LibraryCreateAuthorController } from './controllers/library-create-author.controller';
import { LibraryCreateAuthorsController } from './controllers/library-create-authors.controller';
import { LibraryPaginateAuthorsController } from './controllers/library-paginate-authors.controller';
import { LibraryGetAuthorsController } from './controllers/library-get-authors.controller';
import { LibraryFindAuthorByIdController } from './controllers/library-find-author-by-id.controller';
import { LibraryFindAuthorController } from './controllers/library-find-author.controller';
import { LibraryUpdateAuthorByIdController } from './controllers/library-update-author-by-id.controller';
import { LibraryUpdateAuthorsController } from './controllers/library-update-authors.controller';
import { LibraryUpsertAuthorController } from './controllers/library-upsert-author.controller';
import { LibraryDeleteAuthorByIdController } from './controllers/library-delete-author-by-id.controller';
import { LibraryDeleteAuthorsController } from './controllers/library-delete-authors.controller';

// resolvers
import { LibraryCreateAuthorResolver } from './resolvers/library-create-author.resolver';
import { LibraryCreateAuthorsResolver } from './resolvers/library-create-authors.resolver';
import { LibraryPaginateAuthorsResolver } from './resolvers/library-paginate-authors.resolver';
import { LibraryGetAuthorsResolver } from './resolvers/library-get-authors.resolver';
import { LibraryFindAuthorByIdResolver } from './resolvers/library-find-author-by-id.resolver';
import { LibraryFindAuthorResolver } from './resolvers/library-find-author.resolver';
import { LibraryUpdateAuthorByIdResolver } from './resolvers/library-update-author-by-id.resolver';
import { LibraryUpdateAuthorsResolver } from './resolvers/library-update-authors.resolver';
import { LibraryUpsertAuthorResolver } from './resolvers/library-upsert-author.resolver';
import { LibraryDeleteAuthorByIdResolver } from './resolvers/library-delete-author-by-id.resolver';
import { LibraryDeleteAuthorsResolver } from './resolvers/library-delete-authors.resolver';

// handlers
import { LibraryCreateAuthorHandler } from './handlers/library-create-author.handler';
import { LibraryCreateAuthorsHandler } from './handlers/library-create-authors.handler';
import { LibraryPaginateAuthorsHandler } from './handlers/library-paginate-authors.handler';
import { LibraryGetAuthorsHandler } from './handlers/library-get-authors.handler';
import { LibraryFindAuthorByIdHandler } from './handlers/library-find-author-by-id.handler';
import { LibraryFindAuthorHandler } from './handlers/library-find-author.handler';
import { LibraryUpdateAuthorByIdHandler } from './handlers/library-update-author-by-id.handler';
import { LibraryUpdateAuthorsHandler } from './handlers/library-update-authors.handler';
import { LibraryUpsertAuthorHandler } from './handlers/library-upsert-author.handler';
import { LibraryDeleteAuthorByIdHandler } from './handlers/library-delete-author-by-id.handler';
import { LibraryDeleteAuthorsHandler } from './handlers/library-delete-authors.handler';

// seeder
import { LibraryAuthorSeeder } from './seeder/library-author.seeder';

export const LibraryAuthorControllers = [
    LibraryCreateAuthorController,
    LibraryCreateAuthorsController,
    LibraryPaginateAuthorsController,
    LibraryGetAuthorsController,
    LibraryFindAuthorByIdController,
    LibraryFindAuthorController,
    LibraryUpdateAuthorByIdController,
    LibraryUpdateAuthorsController,
    LibraryUpsertAuthorController,
    LibraryDeleteAuthorByIdController,
    LibraryDeleteAuthorsController,
];

export const LibraryAuthorResolvers = [
    LibraryCreateAuthorResolver,
    LibraryCreateAuthorsResolver,
    LibraryPaginateAuthorsResolver,
    LibraryGetAuthorsResolver,
    LibraryFindAuthorByIdResolver,
    LibraryFindAuthorResolver,
    LibraryUpdateAuthorByIdResolver,
    LibraryUpdateAuthorsResolver,
    LibraryUpsertAuthorResolver,
    LibraryDeleteAuthorByIdResolver,
    LibraryDeleteAuthorsResolver,
];

export const LibraryAuthorApiHandlers = [
    LibraryCreateAuthorHandler,
    LibraryCreateAuthorsHandler,
    LibraryPaginateAuthorsHandler,
    LibraryGetAuthorsHandler,
    LibraryFindAuthorByIdHandler,
    LibraryFindAuthorHandler,
    LibraryUpdateAuthorByIdHandler,
    LibraryUpdateAuthorsHandler,
    LibraryUpsertAuthorHandler,
    LibraryDeleteAuthorByIdHandler,
    LibraryDeleteAuthorsHandler,
];

export const LibraryAuthorServices = [
    LibraryAuthorSeeder,
];