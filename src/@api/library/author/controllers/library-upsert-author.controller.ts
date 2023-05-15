/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { LibraryAuthorDto, LibraryUpdateAuthorByIdDto } from '../dto';

// @app
import { LibraryUpsertAuthorHandler } from '../handlers/library-upsert-author.handler';

@ApiTags('[library] author')
@Controller('library/author/upsert')
export class LibraryUpsertAuthorController
{
    constructor(
        private readonly handler: LibraryUpsertAuthorHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Upsert author' })
    @ApiCreatedResponse({ description: 'The record has been successfully upserted.', type: LibraryAuthorDto })
    async main(
        @Body() payload: LibraryUpdateAuthorByIdDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}