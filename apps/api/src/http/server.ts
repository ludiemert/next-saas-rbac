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
import { getProfile } from './routes/auth/get-profile'
import { errorHandler } from './error-handler'
import { requestPasswordRecover } from './routes/auth/request-password-recover'
import { resetPassword } from './routes/auth/reset-password'
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 2ad20ea1129be1f9076a5115def4f6a3884f008a
import { authenticateWithGithub } from './routes/auth/authenticate-with-github'
import { env } from '@saas/env'
import { createOrganization } from './routes/orgs/create-organization'
import { getMembership } from './routes/orgs/get-membership'
<<<<<<< HEAD
import { getOrganization } from './routes/orgs/get-organization'
import { getOrganizations } from './routes/orgs/get-organizations'
=======
=======
<<<<<<< HEAD
import { authenticateWithGithub } from './routes/auth/authenticate-with-github'
import { env } from '@saas/env'
import { createOrganization } from './routes/orgs/create-organization'
=======
>>>>>>> a06437ddcc46baac3e3dadc1cb196657bce30b5a
>>>>>>> 003c467440d634b1fe81803bbbe612de112e4290
>>>>>>> 2ad20ea1129be1f9076a5115def4f6a3884f008a
//import { createAccount } from './auth/create-account'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Full-stack SaaS app with multi-tenant & RBAC',
      version: '1.0.0',
    },
    
    components: {
      securitySchemes: {
     bearerAuth: {
        type: 'http',
         scheme: 'bearer',
         bearerFormat: 'JWT'
      },   },
   }, 
      },

  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(createAccount)
app.register(authenticateWithGithub)
app.register(authenticateWithPassword)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(resetPassword)

app.register(createOrganization)
<<<<<<< HEAD
app.register(getMembership)
app.register(getOrganization)
app.register(getOrganizations)
=======
<<<<<<< HEAD
app.register(getMembership)
=======
>>>>>>> 003c467440d634b1fe81803bbbe612de112e4290
>>>>>>> 2ad20ea1129be1f9076a5115def4f6a3884f008a

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('SAAS  😎 Http server runinng!!!!')
})

