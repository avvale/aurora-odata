/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { LibraryAuthorDto, LibraryUpdateAuthorByIdDto } from '../dto';

// @app
import { LibraryUpdateAuthorByIdHandler } from '../handlers/library-update-author-by-id.handler';

@ApiTags('[library] author')
@Controller('library/author/update')
export class LibraryUpdateAuthorByIdController
{
    constructor(
        private readonly handler: LibraryUpdateAuthorByIdHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update author by id' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: LibraryAuthorDto })
    async main(
        @Body() payload: LibraryUpdateAuthorByIdDto,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            constraint,
            timezone,
        );
    }
}