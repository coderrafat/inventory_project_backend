const mongoose = require('mongoose');

exports.createParentChidService = async (dataModel, data) => {
    const session = await mongoose.startSession();

    try {
        await session.startTransaction();

        data.parent.userId = data.userId;

        const parentModel = dataModel.parentModel;

        const parent = data.parent;

        const createParent = await parentModel.create([parent], { session });

        data.child.forEach((element) => {
            element[data.joinPropertyName] = createParent[0]['_id'];
            element.userId = data.userId;
        });


        const createChild = await dataModel['childModel'].insertMany(data.child, { session });

        await session.commitTransaction();

        session.endSession();

        return {
            success: true,
            operation: 'create',
            data: {
                parent: createParent,
                child: createChild
            }
        }

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error)
        return { success: "false", error: error.message }
    }

}