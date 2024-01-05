exports.checkExitDocumentService = async (dataModel, data) => {

    const existing = await dataModel.aggregate([
        { $match: data }
    ])

    if (existing.length > 0) {
        return true;
    } else {
        return false;
    }
}