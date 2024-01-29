import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'my-serverless-api',
  frameworkVersion: '2',
  plugins: ['serverless-aws-documentation'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
  },
  functions: {
    getEndpoint: {
      handler: 'src/handlers/getHandler.handler',
      events: [
        {
          http: {
            path: 'get-data',
            method: 'get',
          },
        },
      ],
    },
    postEndpoint: {
      handler: 'src/handlers/postHandler.handler',
      events: [
        {
          http: {
            path: 'create-data',
            method: 'post',
          },
        },
      ],
    },
  },
  custom: {
    documentation: {
      api: {
        info: {
          title: 'My Serverless API',
          version: '1.0.0',
          description: 'Descripción de tu API aquí',
        },
      },
      models: {},
      tags: [
        {
          name: 'Ejemplo',
          description: 'Descripción del ejemplo',
        },
      ],
      endpoints: [
        {
          path: 'get-data',
          method: 'get',
          summary: 'Obtener datos',
          description: 'Endpoint para obtener datos',
          tags: ['Ejemplo'],
        },
        {
          path: 'create-data',
          method: 'post',
          summary: 'Crear datos',
          description: 'Endpoint para crear datos',
          tags: ['Ejemplo'],
        },
      ],
    },
  },
};

export = serverlessConfiguration;
