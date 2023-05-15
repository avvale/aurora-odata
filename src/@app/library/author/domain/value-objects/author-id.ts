import { DataValueObject, UuidValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuthorId extends UuidValueObject
{
    public readonly type: string = 'AuthorId';

    constructor(value: string, validationRules: ValidationRules = {}, data: DataValueObject = {})
    {
        super(value, Object.assign({
            name       : 'AuthorId',
            nullable   : false,
            undefinable: false,
            length     : 36,
        }, validationRules), data);
    }
}