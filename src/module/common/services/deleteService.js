exports.deleteService = async (dataModel, data) => {

    const deleteData = await dataModel.deleteMany({
        _id: data.id,
        userId: data.userId
    });

    return {
        success: true,
        operation: 'delete',
        message: data.message,
        data: deleteData
    }
}