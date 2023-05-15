/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation, ApiBody, ApiQuery } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { LibraryAuthorDto } from '../dto';

// @app
import { LibraryGetAuthorsHandler } from '../handlers/library-get-authors.handler';
import { OData } from './o-data.decorator';

@ApiTags('[library] author')
@Controller('library/authors/get')
export class LibraryGetAuthorsController
{
    constructor(
        private readonly handler: LibraryGetAuthorsHandler,
    ) {}

    @Post()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get authors according to query' })
    @ApiOkResponse({ description: 'The records has been found successfully.', type: [LibraryAuthorDto]})
    @ApiBody({ type: QueryStatement })
    @ApiQuery({ name: 'query', type: QueryStatement })
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