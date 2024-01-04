const mongoose = require('mongoose');

exports.deleteParentChildService = async (dataModel, data) => {
    const session = await mongoose.startSession();

    try {
        await session.startTransaction();

        let child = {};

        child[data.joinPropertyName] = data.id,
            child.userId = data.userId

        let parent = {
            _id: data.id,
            userId: data.userId
        };

        const deleteChild = await dataModel.childModel.deleteMany(
            child, { session }
        );

        const deleteParent = await dataModel.parentModel.deleteMany(
            parent, { session }
        );

        await session.commitTransaction();
        session.endSession();

        return {
            success: true,
            operation: 'delete',
            data: {
                child: deleteChild,
                parent: deleteParent
            }
        }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error)
        return { success: "false", error: error.message }
    }
}