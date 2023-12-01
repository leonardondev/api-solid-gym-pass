import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Check-in Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, 'MEMBER')

    const { id } = await prisma.gym.create({
      data: {
        title: 'Javascript Gym',
        description: 'Some Description',
        phone: '123456789',
        latitude: -21.156981,
        longitude: -47.969802,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -21.156981,
        longitude: -47.969802,
      })

    expect(response.statusCode).toEqual(201)
  })
})
