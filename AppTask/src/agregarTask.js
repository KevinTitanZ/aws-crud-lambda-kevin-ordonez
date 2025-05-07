const { v4: uuidv4 } = require('uuid');
const { DynamoDB } = require('aws-sdk');

exports.agregarTask = async (event) => {
    const { titulo, descripcion } = JSON.parse(event.body);
    const fechaCreacion = new Date().toISOString();
    const id = uuidv4();

    const dynamoDB = new DynamoDB.DocumentClient();

    const item = {
        id,
        titulo,
        descripcion,
        fechaCreacion,
        estado: false
    };

    try {
        await dynamoDB.put({
            TableName: 'tareasTable', // ⚠️ Ajusta el nombre real de tu tabla
            Item: item
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Tarea agregada con éxito',
                data: item,
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error al guardar tarea',
                error: error.message
            })
        };
    }
};
