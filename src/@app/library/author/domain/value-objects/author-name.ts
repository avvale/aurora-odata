import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuthorName extends StringValueObject
{
    public readonly type: string = 'AuthorName';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuthorName',
            nullable   : false,
            undefinable: false,
            maxLength  : 255,
        }, validationRules));
    }
}