/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Controller, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, QueryStatement, Timezone } from '@aurorajs.dev/core';
import { LibraryAuthorDto, LibraryUpdateAuthorsDto } from '../dto';

// @app
import { LibraryUpdateAuthorsHandler } from '../handlers/library-update-authors.handler';
import { OData } from './o-data.decorator';

@ApiTags('[library] author')
@Controller('library/authors/update')
export class LibraryUpdateAuthorsController
{
    constructor(
        private readonly handler: LibraryUpdateAuthorsHandler,
    ) {}

    @Put()
    @ApiOperation({ summary: 'Update authors' })
    @ApiOkResponse({ description: 'The record has been successfully updated.', type: LibraryAuthorDto })
    async main(
        @Body() payload: LibraryUpdateAuthorsDto,
        @OData() oDataQueryStatement?: QueryStatement,
        @Body('query') queryStatement?: QueryStatement,
        @Body('constraint') constraint?: QueryStatement,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            oDataQueryStatement ? oDataQueryStatement : queryStatement,
            constraint,
            timezone,
        );
    }
}