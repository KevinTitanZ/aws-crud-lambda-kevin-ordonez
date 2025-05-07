const AWS = require("aws-sdk");
exports.actualizarTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  const { completada, titulo, descripcion, estado } = JSON.parse(event.body);
  await dynamoDB
    .update({
      TableName: "tareasTable",
      Key: {
        id,
      },
      UpdateExpression: "set completada = :completada, titulo = :titulo, descripcion = :descripcion, estado = : estado",
      ExpressionAttributeValues: {
        ":completada": completada,
        ":titulo": titulo,
        ":descripcion": descripcion,
        ":estado": estado,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();
  return {
    status: 200,
    body: JSON.stringify({
    massage: "Tarea actualizada correctamente",
    }),
  };
};
