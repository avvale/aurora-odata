// commands
import { CreateAuthorCommandHandler } from './application/create/create-author.command-handler';
import { CreateAuthorsCommandHandler } from './application/create/create-authors.command-handler';
import { UpdateAuthorByIdCommandHandler } from './application/update/update-author-by-id.command-handler';
import { UpdateAuthorsCommandHandler } from './application/update/update-authors.command-handler';
import { UpsertAuthorCommandHandler } from './application/upsert/upsert-author.command-handler';
import { DeleteAuthorByIdCommandHandler } from './application/delete/delete-author-by-id.command-handler';
import { DeleteAuthorsCommandHandler } from './application/delete/delete-authors.command-handler';

// queries
import { PaginateAuthorsQueryHandler } from './application/paginate/paginate-authors.query-handler';
import { GetAuthorsQueryHandler } from './application/get/get-authors.query-handler';
import { FindAuthorQueryHandler } from './application/find/find-author.query-handler';
import { FindAuthorByIdQueryHandler } from './application/find/find-author-by-id.query-handler';
import { RawSQLAuthorsQueryHandler } from './application/raw-sql/raw-sql-authors.query-handler';

// events
import { CreatedAuthorEventHandler } from './application/events/created-author.event-handler';
import { CreatedAuthorsEventHandler } from './application/events/created-authors.event-handler';
import { UpdatedAuthorEventHandler } from './application/events/updated-author.event-handler';
import { UpdatedAuthorsEventHandler } from './application/events/updated-authors.event-handler';
import { DeletedAuthorEventHandler } from './application/events/deleted-author.event-handler';
import { DeletedAuthorsEventHandler } from './application/events/deleted-authors.event-handler';

// services
import { CreateAuthorService } from './application/create/create-author.service';
import { CreateAuthorsService } from './application/create/create-authors.service';
import { PaginateAuthorsService } from './application/paginate/paginate-authors.service';
import { GetAuthorsService } from './application/get/get-authors.service';
import { FindAuthorService } from './application/find/find-author.service';
import { FindAuthorByIdService } from './application/find/find-author-by-id.service';
import { RawSQLAuthorsService } from './application/raw-sql/raw-sql-authors.service';
import { UpdateAuthorByIdService } from './application/update/update-author-by-id.service';
import { UpdateAuthorsService } from './application/update/update-authors.service';
import { UpsertAuthorService } from './application/upsert/upsert-author.service';
import { DeleteAuthorByIdService } from './application/delete/delete-author-by-id.service';
import { DeleteAuthorsService } from './application/delete/delete-authors.service';

// models
export { LibraryAuthorModel } from './infrastructure/sequelize/sequelize-author.model';

// repository
export { IAuthorRepository } from './domain/author.repository';
export { SequelizeAuthorRepository } from './infrastructure/sequelize/sequelize-author.repository';

// sagas
export { AuthorSagas } from './application/sagas/author.sagas';

export const LibraryAuthorHandlers = [
    // commands
    CreateAuthorCommandHandler,
    CreateAuthorsCommandHandler,
    UpdateAuthorByIdCommandHandler,
    UpdateAuthorsCommandHandler,
    UpsertAuthorCommandHandler,
    DeleteAuthorByIdCommandHandler,
    DeleteAuthorsCommandHandler,

    // queries
    PaginateAuthorsQueryHandler,
    GetAuthorsQueryHandler,
    FindAuthorQueryHandler,
    FindAuthorByIdQueryHandler,
    RawSQLAuthorsQueryHandler,

    // events
    CreatedAuthorEventHandler,
    CreatedAuthorsEventHandler,
    UpdatedAuthorEventHandler,
    UpdatedAuthorsEventHandler,
    DeletedAuthorEventHandler,
    DeletedAuthorsEventHandler,
];

export const LibraryAuthorServices = [
    CreateAuthorService,
    CreateAuthorsService,
    PaginateAuthorsService,
    GetAuthorsService,
    FindAuthorService,
    FindAuthorByIdService,
    RawSQLAuthorsService,
    UpdateAuthorByIdService,
    UpdateAuthorsService,
    UpsertAuthorService,
    DeleteAuthorByIdService,
    DeleteAuthorsService,
];