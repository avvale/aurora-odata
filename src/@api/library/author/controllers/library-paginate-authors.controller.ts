/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Pagination, QueryStatement, Timezone } from '@aurorajs.dev/core';

// @app
import { LibraryPaginateAuthorsHandler } from '../handlers/library-paginate-authors.handler';
import { OData } from './o-data.decorator';

@ApiTags('[library] author')
@Controller('library/authors/paginate')
export class LibraryPaginateAuthorsController
{
    constructor(
        private readonly handler: LibraryPaginateAuthorsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Paginate authors' })
    @ApiOkResponse({ description: 'The records has been paginated successfully.', type: Pagination })
    @ApiQuery({ name: 'queryStatement', type: QueryStatement })
    @ApiQuery({ name: 'constraint', type: QueryStatement })
    async main(
        @OData() oDataQueryStatement?: QueryStatement,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            oDataQueryStatement ? oDataQueryStatement : queryStatement,
            constraint,
            timezone,
        );
    }
}