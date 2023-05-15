import { StringValueObject, ValidationRules } from '@aurorajs.dev/core';

export class AuthorSurname extends StringValueObject
{
    public readonly type: string = 'AuthorSurname';

    constructor(value: string, validationRules: ValidationRules = {})
    {
        super(value, Object.assign({
            name       : 'AuthorSurname',
            nullable   : true,
            undefinable: true,
            maxLength  : 255,
        }, validationRules));
    }
}