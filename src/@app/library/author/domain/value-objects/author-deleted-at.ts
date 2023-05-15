import { DataValueObject, TimestampValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuthorDeletedAt extends TimestampValueObject
{
    public readonly type: string = 'AuthorDeletedAt';

    constructor(value: string | DataValueObject, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AuthorDeletedAt',
            nullable   : true,
            undefinable: true,
        }, validationRules), data);
    }
}