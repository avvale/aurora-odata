import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';

// @app
import { LibraryCreateAuthorsHandler } from '../handlers/library-create-authors.handler';
import { LibraryCreateAuthorInput } from '@api/graphql';

@Resolver()
export class LibraryCreateAuthorsResolver
{
    constructor(
        private readonly handler: LibraryCreateAuthorsHandler,
    ) {}

    @Mutation('libraryCreateAuthors')
    async main(
        @Args('payload') payload: LibraryCreateAuthorInput[],
        @Timezone() timezone?: string,
    ): Promise<boolean>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}