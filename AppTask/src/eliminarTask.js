const AWS = require("aws-sdk");

exports.eliminarTask = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  try {
    await dynamoDB
      .delete({
        TableName: "tareasTable",
        Key: {
          id,
        },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Tarea eliminada correctamente",
      }),
    };
  } catch (error) {
    console.error("Error al eliminar:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al eliminar la tarea",
        error: error.message,
      }),
    };
  }
};
