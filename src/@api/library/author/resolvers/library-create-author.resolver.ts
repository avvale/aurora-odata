import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';

// @app
import { LibraryCreateAuthorHandler } from '../handlers/library-create-author.handler';
import { LibraryAuthor, LibraryCreateAuthorInput } from '@api/graphql';

@Resolver()
export class LibraryCreateAuthorResolver
{
    constructor(
        private readonly handler: LibraryCreateAuthorHandler,
    ) {}

    @Mutation('libraryCreateAuthor')
    async main(
        @Args('payload') payload: LibraryCreateAuthorInput,
        @Timezone() timezone?: string,
    ): Promise<LibraryAuthor>
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}