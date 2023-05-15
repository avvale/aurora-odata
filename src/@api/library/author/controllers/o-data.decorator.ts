/* eslint-disable @typescript-eslint/no-var-requires */
import { Operator, Utils } from '@aurorajs.dev/core';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import * as url from 'url';
const parseOData = require('odata-sequelize');

export const OData = createParamDecorator(
    (data: unknown, context: ExecutionContext) =>
    {
        let request;

        if (context['contextType'] === 'http')
        {
            request = context.switchToHttp().getRequest();

            if (request.header('X-OData') == 'v2')
            {
                // TODO: Implement OData v2
            }

            if (request.header('X-OData') == 'v4')
            {
                const parseUrl = url.parse(request.originalUrl);
                const parserSequelizeStatement = parseOData(
                    decodeURIComponent(parseUrl.query),
                    Sequelize,
                );

                return Utils.deepMapKeys(
                    parserSequelizeStatement,
                    key =>
                        typeof key === 'symbol' &&
                        Operator[Symbol.keyFor(key)]
                            ? Operator[Symbol.keyFor(key)]
                            : key,
                );
            }
        }
    },
);