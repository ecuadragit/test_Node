import { APIGatewayProxyHandler } from 'aws-lambda';
import { dbService } from '../services/dbService';
import { transformMiddleware } from '../middleware/transformMiddleware';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    // Aplica el middleware de transformación antes de procesar la solicitud
    const transformedEvent = transformMiddleware(event);

    // Asegúrate de que transformedEvent tenga la propiedad 'body' y que sea una cadena JSON válida
    if (!transformedEvent.body) {
      throw new Error('El objeto transformado no tiene una propiedad "body"');
    }

    const requestBody = JSON.parse(transformedEvent.body);

    // Resto del código...

    const params = {
      TableName: 'myServerlessTable',
      Item: {
        id: requestBody.id,
        nombre: requestBody.nombre,
        // Agrega otros atributos según tu modelo
      },
    };

    await dbService.put(params);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Datos creados exitosamente' }),
    };
  } catch (error) {
    console.error('Error al crear datos:', error);

    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Error interno al crear datos' }),
    };
  }
};
