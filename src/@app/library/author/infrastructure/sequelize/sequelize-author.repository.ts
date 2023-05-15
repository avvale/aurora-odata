import { Injectable, LiteralObject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { IAuthorRepository } from '../../domain/author.repository';
import { LibraryAuthor } from '../../domain/author.aggregate';
import { AuthorMapper } from '../../domain/author.mapper';
import { LibraryAuthorModel } from './sequelize-author.model';

@Injectable()
export class SequelizeAuthorRepository extends SequelizeRepository<LibraryAuthor, LibraryAuthorModel> implements IAuthorRepository
{
    public readonly aggregateName: string = 'LibraryAuthor';
    public readonly mapper: AuthorMapper = new AuthorMapper();

    constructor(
        @InjectModel(LibraryAuthorModel)
        public readonly repository: typeof LibraryAuthorModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}