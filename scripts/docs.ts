import swaggerAutogen from 'swagger-autogen'

const OUTPUT = '../swagger.json'

const ENDPOINTS = ['./../src/ports/express/modules/*.ts']

const doc = {
  info: {
    title: 'Autozapi',
    description: 'Serviço para comunicação com o WhatsApp',
  },
  host: 'localhost:3333',
  schemes: ['http'],
}

swaggerAutogen(OUTPUT, ENDPOINTS, doc)
