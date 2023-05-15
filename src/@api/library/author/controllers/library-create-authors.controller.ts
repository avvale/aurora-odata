/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Auditing, AuditingMeta, Timezone } from '@aurorajs.dev/core';
import { LibraryAuthorDto, LibraryCreateAuthorDto } from '../dto';

// @app
import { LibraryCreateAuthorsHandler } from '../handlers/library-create-authors.handler';

@ApiTags('[library] author')
@Controller('library/authors/create')
export class LibraryCreateAuthorsController
{
    constructor(
        private readonly handler: LibraryCreateAuthorsHandler,
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create authors in batch' })
    @ApiCreatedResponse({ description: 'The records has been created successfully.' , type: [LibraryAuthorDto]})
    @ApiBody({ type: [LibraryCreateAuthorDto]})
    async main(
        @Body() payload: LibraryCreateAuthorDto[],
        @Timezone() timezone?: string,
    )
    {
        return await this.handler.main(
            payload,
            timezone,
        );
    }
}