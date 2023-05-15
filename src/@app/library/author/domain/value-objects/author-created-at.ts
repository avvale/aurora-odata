import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuthorCreatedAt extends TimestampValueObject
{
    public readonly type: string = 'AuthorCreatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AuthorCreatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}