import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';

// @app
import { LibraryUpsertAuthorHandler } from '../handlers/library-upsert-author.handler';
import { LibraryAuthor, LibraryUpdateAuthorByIdInput } from '@api/graphql';

@Resolver()
export class LibraryUpsertAuthorResolver
{
    constructor(
        private readonly handler: LibraryUpsertAuthorHandler,
    ) {}

    @Mutation('libraryUpsertAuthor')
    async main(
        @Args('payload') payload: LibraryUpdateAuthorByIdInput,
        @Timezone() timezone?: string,
    ): Promise<LibraryAuthor>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}