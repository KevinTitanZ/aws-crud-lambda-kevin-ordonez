const { DynamoDB } = require('aws-sdk');

exports.obtenerTareas = async (event) => {
    const dynamoDB = new DynamoDB.DocumentClient();
    
    try {
        const result = await dynamoDB.scan({
            TableName: 'tareasTable'
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Tareas obtenidas con éxito',
                data: result.Items  // Los datos de las tareas
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error al obtener tareas',
                error: error.message
            })
        };
    }
};
