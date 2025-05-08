const AWS = require("aws-sdk");
exports.actualizarTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { titulo, descripcion, estado } = JSON.parse(event.body);

  try {
    await dynamoDB
      .update({
        TableName: "tareasTable",
        Key: {
          id,
        },
        UpdateExpression: "set titulo = :titulo, descripcion = :descripcion, estado = :estado",
        ExpressionAttributeValues: {
          ":titulo": titulo,
          ":descripcion": descripcion,
          ":estado": estado,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Tarea actualizada correctamente",
      }),
    };
  } catch (error) {
    console.error("Error al actualizar:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al actualizar la tarea",
        error: error.message,
      }),
    };
  }
};
