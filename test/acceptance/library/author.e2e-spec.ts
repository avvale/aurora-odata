/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable key-spacing */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { IAuthorRepository } from '@app/library/author/domain/author.repository';
import { MockAuthorSeeder } from '@app/library/author/infrastructure/mock/mock-author.seeder';
import { authors } from '@app/library/author/infrastructure/mock/mock-author.data';
import { GraphQLConfigModule } from '@aurora/graphql/graphql-config.module';
import { LibraryModule } from '@api/library/library.module';
import * as request from 'supertest';
import * as _ from 'lodash';

// disable import foreign modules, can be micro-services
const importForeignModules = [];

describe('author', () =>
{
    let app: INestApplication;
    let authorRepository: IAuthorRepository;
    let authorSeeder: MockAuthorSeeder;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mockData: any;

    // set timeout to 60s by default are 5s
    jest.setTimeout(60000);

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ...importForeignModules,
                LibraryModule,
                GraphQLConfigModule,
                SequelizeModule.forRootAsync({
                    imports   : [ConfigModule],
                    inject    : [ConfigService],
                    useFactory: (configService: ConfigService) =>
                    {
                        return {
                            dialect       : configService.get('TEST_DATABASE_DIALECT'),
                            storage       : configService.get('TEST_DATABASE_STORAGE'),
                            host          : configService.get('TEST_DATABASE_HOST'),
                            port          : +configService.get('TEST_DATABASE_PORT'),
                            username      : configService.get('TEST_DATABASE_USER'),
                            password      : configService.get('TEST_DATABASE_PASSWORD'),
                            database      : configService.get('TEST_DATABASE_SCHEMA'),
                            synchronize   : configService.get('TEST_DATABASE_SYNCHRONIZE'),
                            logging       : configService.get('TEST_DATABASE_LOGGIN') === 'true' ? console.log : false,
                            autoLoadModels: true,
                            models        : [],
                        };
                    },
                }),
            ],
            providers: [
                MockAuthorSeeder,
            ],
        })
            .compile();

        mockData = authors;
        app = module.createNestApplication();
        authorRepository = module.get<IAuthorRepository>(IAuthorRepository);
        authorSeeder = module.get<MockAuthorSeeder>(MockAuthorSeeder);

        // seed mock data in memory database
        await authorRepository.insert(authorSeeder.collectionSource);

        await app.init();
    });

    test('/REST:POST library/author/create - Got 400 Conflict, AuthorId property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorId must be defined, can not be null');
            });
    });

    test('/REST:POST library/author/create - Got 400 Conflict, AuthorName property can not to be null', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: null,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorName must be defined, can not be null');
            });
    });

    test('/REST:POST library/author/create - Got 400 Conflict, AuthorId property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorId must be defined, can not be undefined');
            });
    });

    test('/REST:POST library/author/create - Got 400 Conflict, AuthorName property can not to be undefined', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: undefined,
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorName must be defined, can not be undefined');
            });
    });

    test('/REST:POST library/author/create - Got 400 Conflict, AuthorId is not allowed, must be a length of 36', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '*************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorId is not allowed, must be a length of 36');
            });
    });

    test('/REST:POST library/author/create - Got 400 Conflict, AuthorName is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                name: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorName is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST library/author/create - Got 400 Conflict, AuthorSurname is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                surname: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorSurname is too large, has a maximum length of 255');
            });
    });

    test('/REST:POST library/author/create - Got 400 Conflict, AuthorCountry is too large, has a maximum length of 255', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                country: '****************************************************************************************************************************************************************************************************************************************************************',
            })
            .expect(400)
            .then(res =>
            {
                expect(res.body.message).toContain('Value for AuthorCountry is too large, has a maximum length of 255');
            });
    });


    test('/REST:POST library/author/create - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/create')
            .set('Accept', 'application/json')
            .send(mockData[0])
            .expect(409);
    });

    test('/REST:POST library/authors/paginate', () =>
    {
        return request(app.getHttpServer())
            .post('/library/authors/paginate')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    offset: 0,
                    limit: 5,
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual({
                    total: authorSeeder.collectionResponse.length,
                    count: authorSeeder.collectionResponse.length,
                    rows : authorSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/REST:POST library/authors/get', () =>
    {
        return request(app.getHttpServer())
            .post('/library/authors/get')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toEqual(
                    authorSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))),
                );
            });
    });

    test('/REST:POST library/author/find - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: 'c8d02868-1882-5f37-993d-9eab2ffd010e',
                    },
                },
            })
            .expect(404);
    });

    test('/REST:POST library/author/create', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/create')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(201);
    });

    test('/REST:POST library/author/find', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/find')
            .set('Accept', 'application/json')
            .send({
                query:
                {
                    where:
                    {
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:POST library/author/find/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/find/72ebeccf-62a6-596e-984c-e61a4ec19334')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:POST library/author/find/{id}', () =>
    {
        return request(app.getHttpServer())
            .post('/library/author/find/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:PUT library/author/update - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .put('/library/author/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: 'd5c8cf2d-d11f-5e3f-a01c-2826c316e10b',
            })
            .expect(404);
    });

    test('/REST:PUT library/author/update', () =>
    {
        return request(app.getHttpServer())
            .put('/library/author/update')
            .set('Accept', 'application/json')
            .send({
                ...mockData[0],
                id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/REST:DELETE library/author/delete/{id} - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .delete('/library/author/delete/8c705044-12da-530f-955b-7e34936f353b')
            .set('Accept', 'application/json')
            .expect(404);
    });

    test('/REST:DELETE library/author/delete/{id}', () =>
    {
        return request(app.getHttpServer())
            .delete('/library/author/delete/5b19d6ac-4081-573b-96b3-56964d5326a8')
            .set('Accept', 'application/json')
            .expect(200);
    });

    test('/GraphQL libraryCreateAuthor - Got 409 Conflict, item already exist in database', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:LibraryCreateAuthorInput!)
                    {
                        libraryCreateAuthor (payload:$payload)
                        {
                            id
                            name
                            surname
                            country
                        }
                    }
                `,
                variables:
                {
                    payload: _.omit(mockData[0], ['createdAt','updatedAt','deletedAt']),
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(409);
                expect(res.body.errors[0].extensions.originalError.message).toContain('already exist in database');
            });
    });

    test('/GraphQL libraryPaginateAuthors', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement $constraint:QueryStatement)
                    {
                        libraryPaginateAuthors (query:$query constraint:$constraint)
                        {
                            total
                            count
                            rows
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        offset: 0,
                        limit: 5,
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.libraryPaginateAuthors).toEqual({
                    total: authorSeeder.collectionResponse.length,
                    count: authorSeeder.collectionResponse.length,
                    rows : authorSeeder.collectionResponse.map(item => expect.objectContaining(_.omit(item, ['createdAt', 'updatedAt', 'deletedAt']))).slice(0, 5),
                });
            });
    });

    test('/GraphQL libraryGetAuthors', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        libraryGetAuthors (query:$query)
                        {
                            id
                            name
                            surname
                            country
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {},
            })
            .expect(200)
            .then(res =>
            {
                for (const [index, value] of res.body.data.libraryGetAuthors.entries())
                {
                    expect(authorSeeder.collectionResponse[index]).toEqual(expect.objectContaining(_.omit(value, ['createdAt', 'updatedAt', 'deletedAt'])));
                }
            });
    });

    test('/GraphQL libraryCreateAuthor', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:LibraryCreateAuthorInput!)
                    {
                        libraryCreateAuthor (payload:$payload)
                        {
                            id
                            name
                            surname
                            country
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.libraryCreateAuthor).toHaveProperty('id', '5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL libraryFindAuthor - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        libraryFindAuthor (query:$query)
                        {
                            id
                            name
                            surname
                            country
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: 'e6a4704b-8cbe-55f6-8e08-bda7995887c6',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL libraryFindAuthor', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($query:QueryStatement)
                    {
                        libraryFindAuthor (query:$query)
                        {
                            id
                            name
                            surname
                            country
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables:
                {
                    query:
                    {
                        where:
                        {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.libraryFindAuthor.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL libraryFindAuthorById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        libraryFindAuthorById (id:$id)
                        {
                            id
                            name
                            surname
                            country
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'e544cd6a-886f-5399-a426-560d75f38911',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL libraryFindAuthorById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    query ($id:ID!)
                    {
                        libraryFindAuthorById (id:$id)
                        {
                            id
                            name
                            surname
                            country
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.libraryFindAuthorById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL libraryUpdateAuthorById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:LibraryUpdateAuthorByIdInput!)
                    {
                        libraryUpdateAuthorById (payload:$payload)
                        {
                            id
                            name
                            surname
                            country
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: 'f69dae20-d1af-5b65-88eb-42989a17199d',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL libraryUpdateAuthorById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:LibraryUpdateAuthorByIdInput!)
                    {
                        libraryUpdateAuthorById (payload:$payload)
                        {
                            id
                            name
                            surname
                            country
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.libraryUpdateAuthorById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL libraryUpdateAuthors', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($payload:LibraryUpdateAuthorsInput! $query: QueryStatement)
                    {
                        libraryUpdateAuthors (payload:$payload query:$query)
                        {
                            id
                            name
                            surname
                            country
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    payload: {
                        ...mockData[0],
                        id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                    },
                    query: {
                        where: {
                            id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                        },
                    },
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.libraryUpdateAuthors[0].id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    test('/GraphQL libraryDeleteAuthorById - Got 404 Not Found', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        libraryDeleteAuthorById (id:$id)
                        {
                            id
                            name
                            surname
                            country
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: 'eb1aeb4b-2aec-5594-9505-6de9689dc297',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body).toHaveProperty('errors');
                expect(res.body.errors[0].extensions.originalError.statusCode).toBe(404);
                expect(res.body.errors[0].extensions.originalError.message).toContain('not found');
            });
    });

    test('/GraphQL libraryDeleteAuthorById', () =>
    {
        return request(app.getHttpServer())
            .post('/graphql')
            .set('Accept', 'application/json')
            .send({
                query: `
                    mutation ($id:ID!)
                    {
                        libraryDeleteAuthorById (id:$id)
                        {
                            id
                            name
                            surname
                            country
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    id: '5b19d6ac-4081-573b-96b3-56964d5326a8',
                },
            })
            .expect(200)
            .then(res =>
            {
                expect(res.body.data.libraryDeleteAuthorById.id).toStrictEqual('5b19d6ac-4081-573b-96b3-56964d5326a8');
            });
    });

    afterAll(async () =>
    {
        await authorRepository.delete({
            queryStatement: {
                where: {},
            },
        });
        await app.close();
    });
});