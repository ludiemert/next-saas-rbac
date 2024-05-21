import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifyJwt from '@fastify/jwt'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { fastify } from 'fastify'

import {
 jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
//import { createAccount } from './auth/create-account'
import { createAccount } from './routes/auth/create-account'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
//import { createAccount } from './auth/create-account'


const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Full-stack SaaS app with multi-tenant & RBAC',
      version: '1.0.0',
    },
    servers: [],
  },
  transform: jsonSchemaTransform,

});


app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})


app.register(fastifyJwt, {
  secret: 'my-jwt-secret',
})


app.register(fastifyCors)

app.register(createAccount)
app.register(authenticateWithPassword)

app.listen({ port: 3333 }).then(() => {
  console.log('SAAS  😎 Http server runinng!!!!')
})