import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: null // payload type is used for signing and verifying
    user: {
      sub: string
      role: 'ADMIN' | 'MEMBER'
    } // user type is return type of `request.user` object
  }
}
