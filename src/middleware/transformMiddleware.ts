import { APIGatewayProxyEvent } from 'aws-lambda';

export const transformMiddleware = (
  handler: (event: APIGatewayProxyEvent) => any
) => {
  return async (event: APIGatewayProxyEvent) => {
    try {
      // Realiza la traducción del cuerpo de la solicitud si es un método POST o PUT
      if ((event.httpMethod === 'POST' || event.httpMethod === 'PUT') && event.body) {
        const requestBody = JSON.parse(event.body);
        const cuerpoTraducido = traducirObjeto(requestBody);
        event.body = JSON.stringify(cuerpoTraducido);
      }

      // Continúa con la ejecución del siguiente middleware o del controlador principal
      return await handler(event);
    } catch (error) {
      console.error('Error en el middleware de transformación:', error);

      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Error interno en el middleware de transformación' }),
      };
    }
  };
};

export function traducirObjeto(swapiObjeto: any): any {
  const mapeoClaves: { [key: string]: string } = {
    name: 'nombre',
    height: 'altura',
    mass: 'masa',
    hair_color: 'color_cabello',
    skin_color: 'color_piel',
    eye_color: 'color_ojos',
    birth_year: 'anio_nacimiento',
    gender: 'genero',
    homeworld: 'planeta_natal',
    films: 'peliculas',
    species: 'especies',
    vehicles: 'vehiculos',
    starships: 'naves_estelares',
    created: 'creado',
    edited: 'editado',
    url: 'url',
  };

  const objetoTraducido: any = {};

  for (const clave in swapiObjeto) {
    if (mapeoClaves.hasOwnProperty(clave)) {
      objetoTraducido[mapeoClaves[clave]] = swapiObjeto[clave];
    } else {
      objetoTraducido[clave] = swapiObjeto[clave];
    }
  }

  return objetoTraducido;
}
