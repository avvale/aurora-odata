/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { LibraryAuthorDto } from '../dto';

// @app
import { LibraryDeleteAuthorByIdHandler } from '../handlers/library-delete-author-by-id.handler';

@ApiTags('[library] author')
@Controller('library/author/delete')
export class LibraryDeleteAuthorByIdController
{
    constructor(
        private readonly handler: LibraryDeleteAuthorByIdHandler,
    ) {}

    @Delete(':id')
    @ApiOperation({ summary: 'Delete author by id' })
    @ApiOkResponse({ description: 'The record has been deleted successfully.', type: LibraryAuthorDto })
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