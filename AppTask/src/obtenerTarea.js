const AWS = require("aws-sdk");

exports.obtenerTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  try {
    const result = await dynamoDB
      .get({
        TableName: "tareasTable",
        Key: { id },
      })
      .promise();

    const tarea = result.Item;

    if (!tarea) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Tarea no encontrada" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(tarea), // ← body debe ser un string
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al obtener la tarea", error }),
    };
  }
};
