import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const dynamoDB = new DocumentClient();

export const dbService = {
  scan: async (params: DocumentClient.ScanInput) => {
    try {
      return await dynamoDB.scan(params).promise();
    } catch (error) {
      console.error('Error en la operación de escaneo:', error);
      throw error; // Propagar el error para manejo superior si es necesario
    }
  },
  put: async (params: DocumentClient.PutItemInput) => {
    try {
      await dynamoDB.put(params).promise();
    } catch (error) {
      console.error('Error en la operación de escritura:', error);
      throw error; // Propagar el error para manejo superior si es necesario
    }
  },
  cerrarConexion: () => {
  },
};
