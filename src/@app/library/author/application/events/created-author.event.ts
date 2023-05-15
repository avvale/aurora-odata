export class CreatedAuthorEvent
{
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly surname: string,
        public readonly country: string,
        public readonly createdAt: string,
        public readonly updatedAt: string,
        public readonly deletedAt: string,
    ) {}
}