import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuthorUpdatedAt extends TimestampValueObject
{
    public readonly type: string = 'AuthorUpdatedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AuthorUpdatedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}