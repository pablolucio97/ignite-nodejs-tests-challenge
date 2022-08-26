import request from 'supertest'
import { Connection, createConnection } from 'typeorm'
import { app } from '../../../../app'

let connection: Connection

describe('Create user', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close()
  })

  it('should be able to create a new user', async () => {
    const response = await (await request(app).post('/api/v1/users')
      .send({
        name: 'test',
        email: 'test@example.com',
        password: 'test'
      }))

    expect(response.status).toBe(201)

  })

  it('should not be able to create a new user with an existing email', async () => {

    await request(app).post('/api/v1/users')
      .send({
        name: 'test',
        email: 'test@example.com',
        password: 'test'
      })

    const response = await request(app).post('/api/v1/users')
      .send({
        name: 'test2',
        email: 'test@example.com',
        password: 'test'
      })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'User already exists' })

  })

})
