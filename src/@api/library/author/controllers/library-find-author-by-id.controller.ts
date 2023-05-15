/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { QueryStatement, Timezone } from '@aurorajs.dev/core';
import { LibraryAuthorDto } from '../dto';

// @app
import { LibraryFindAuthorByIdHandler } from '../handlers/library-find-author-by-id.handler';

@ApiTags('[library] author')
@Controller('library/author/find')
export class LibraryFindAuthorByIdController
{
    constructor(
        private readonly handler: LibraryFindAuthorByIdHandler,
    ) {}

    @Post(':id')
    @HttpCode(200)
    @ApiOperation({ summary: 'Find author by id' })
    @ApiOkResponse({ description: 'The record has been successfully requested.', type: LibraryAuthorDto })
    async main(
        @Param('id') id: string,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            id,
            constraint,
            timezone,
        );
    }
}