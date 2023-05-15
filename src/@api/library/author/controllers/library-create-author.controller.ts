/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { LibraryAuthorDto, LibraryCreateAuthorDto } from '../dto';

// @app
import { LibraryCreateAuthorHandler } from '../handlers/library-create-author.handler';

@ApiTags('[library] author')
@Controller('library/author/create')
export class LibraryCreateAuthorController
{
    constructor(
        private readonly handler: LibraryCreateAuthorHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create author' })
    @ApiCreatedResponse({ description: 'The record has been successfully created.', type: LibraryAuthorDto })
    async main(
        @Body() payload: LibraryCreateAuthorDto,
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}