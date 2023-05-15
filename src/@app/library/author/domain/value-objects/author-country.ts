import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuthorCountry extends StringValueObject
{
    public readonly type: string = 'AuthorCountry';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuthorCountry',
            nullable   : true,
            undefinable: true,
            maxLength  : 255,
        }, validationRules));
    }
}