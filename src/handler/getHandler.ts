import { APIGatewayProxyHandler } from 'aws-lambda';
import { dbService } from '../services/dbService';

export const handler: APIGatewayProxyHandler = async () => {
  try {
    const params = {
      TableName: 'myServerlessTable',
    };

    const result = await dbService.scan(params);

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error('Error al obtener datos:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno al obtener datos' }),
    };
  }
};
