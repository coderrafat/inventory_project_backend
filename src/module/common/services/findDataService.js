const { Types } = require("mongoose");
/**
 * Finds and retrieves data from the data model based on the provided parameters.
 *
 * @param {object} dataModel - The data model to search in.
 * @param {object} data - The parameters for the search, including page, limit, search, and userId.
 * @param {number} data.page - The page number to retrieve data from.
 * @param {number} data.limit - The number of items to retrieve per page.
 * @param {string} data.search - The search term to filter the data.
 * @param {string} data.userId - The ID of the user who owns the data.
 * @return {object} An object containing the result of the search operation, including success status, operation type, and the retrieved data.
 */

// exports.findDataService = async (dataModel, data) => {

//     let objectData = {};
//     let allData;
//     let dataCount;

//     const startIndex = (data.page - 1) * data.limit;
//     const endIndex = data.page * data.limit;

//     if (data.searchArray) {
//         if (data.join) {
//             if (data.join2) {
//                 const jsRgx = new RegExp(data.searchArray, "i");
//                 const searchRgx = { $regex: data.searchArray, "$options": "i" }

//                 allData = await dataModel.find(
//                     {
//                         userId: data.userId
//                     })
//                     .skip(startIndex)
//                     .limit(data.limit)
//                     .populate(data.join)
//                     .populate(data.join2)
//                     .populate('userId', 'firstName lastName -_id')

//                 allData = allData.filter(filterData =>
//                     jsRgx.test(filterData.name + filterData.details + filterData.categoryId.name + filterData.brandId.name)
//                 );

//                 dataCount = await dataModel.find({
//                     userId: data.userId,
//                 })
//                     .populate(data.join)
//                     .populate(data.join2)





//             } else {
//                 dataCount = await dataModel.countDocuments({
//                     userId: data.userId,
//                     $or: data.searchArray
//                 });

//                 allData = await dataModel.find(
//                     {
//                         userId: data.userId,
//                         $or: data.searchArray
//                     })
//                     .skip(startIndex)
//                     .limit(data.limit)
//                     .populate('userId', 'firstName lastName -_id')
//                     .populate(data.join)
//             }

//         } else {
//             dataCount = await dataModel.countDocuments(
//                 { userId: data.userId, $or: data.searchArray })

//             allData = await dataModel.find(
//                 { userId: data.userId, $or: data.searchArray })
//                 .skip(startIndex)
//                 .limit(data.limit)
//                 .populate('userId', 'firstName lastName -_id')
//         }

//     } else {
//         if (data.join) {
//             if (data.join2) {
//                 dataCount = await dataModel.countDocuments({ userId: data.userId });

//                 allData = await dataModel.find({ userId: data.userId })
//                     .skip(startIndex)
//                     .limit(data.limit)
//                     .populate('userId', 'firstName lastName -_id')
//                     .populate(data.join)
//                     .populate(data.join2)
//             } else {
//                 dataCount = await dataModel.countDocuments({ userId: data.userId });

//                 allData = await dataModel.find({ userId: data.userId })
//                     .skip(startIndex)
//                     .limit(data.limit)
//                     .populate('userId', 'firstName lastName -_id')
//                     .populate(data.join)
//             }

//         } else {
//             dataCount = await dataModel.countDocuments({ userId: data.userId });

//             allData = await dataModel.find({ userId: data.userId })
//                 .skip(startIndex)
//                 .limit(data.limit)
//                 .populate('userId', 'firstName lastName -_id')
//         }
//     }

//     objectData.totalData = dataCount;
//     objectData.pageCount = Math.ceil(dataCount / data.limit);

//     if (endIndex < dataCount) {
//         data.next = {
//             page: data.page + 1,
//             limit: data.limit
//         }
//     }
//     if (startIndex > 0) {
//         data.prev = {
//             page: data.page - 1,
//             limit: data.limit
//         }
//     }

//     objectData.resultData = allData;

//     return {
//         success: true,
//         operation: 'read',
//         data: objectData
//     }

// };


// exports.findDataService = async (dataModel, data) => {

//     let objectData = {};
//     let allData;
//     let dataCount;

//     const startIndex = (data.page - 1) * data.limit;
//     const endIndex = data.page * data.limit;

//     if (data.searchArray) {
//         if (data.join) {
//             if (data.join2) {
//                 const jsRgx = new RegExp(data.searchArray, "i");
//                 const searchRgx = { $regex: data.searchArray, "$options": "i" }

//                 allData = await dataModel.find(
//                     {
//                         userId: data.userId
//                     })
//                     .skip(startIndex)
//                     .limit(data.limit)
//                     .populate(data.join)
//                     .populate(data.join2)
//                     .populate('userId', 'firstName lastName -_id')

//                 allData = allData.filter(filterData =>
//                     jsRgx.test(filterData.name + filterData.details + filterData.categoryId.name + filterData.brandId.name)
//                 );

//                 dataCount = await dataModel.find({
//                     userId: data.userId,
//                 })
//                     .populate(data.join)
//                     .populate(data.join2)





//             } else {
//                 dataCount = await dataModel.countDocuments({
//                     userId: data.userId,
//                     $or: data.searchArray
//                 });

//                 allData = await dataModel.find(
//                     {
//                         userId: data.userId,
//                         $or: data.searchArray
//                     })
//                     .skip(startIndex)
//                     .limit(data.limit)
//                     .populate('userId', 'firstName lastName -_id')
//                     .populate(data.join)
//             }

//         } else {
//             dataCount = await dataModel.countDocuments(
//                 { userId: data.userId, $or: data.searchArray })

//             allData = await dataModel.find(
//                 { userId: data.userId, $or: data.searchArray })
//                 .skip(startIndex)
//                 .limit(data.limit)
//                 .populate('userId', 'firstName lastName -_id')
//         }

//     } else {
//         if (data.join) {
//             if (data.join2) {
//                 dataCount = await dataModel.countDocuments({ userId: data.userId });

//                 allData = await dataModel.find({ userId: data.userId })
//                     .skip(startIndex)
//                     .limit(data.limit)
//                     .populate('userId', 'firstName lastName -_id')
//                     .populate(data.join)
//                     .populate(data.join2)
//             } else {
//                 dataCount = await dataModel.countDocuments({ userId: data.userId });

//                 allData = await dataModel.find({ userId: data.userId })
//                     .skip(startIndex)
//                     .limit(data.limit)
//                     .populate('userId', 'firstName lastName -_id')
//                     .populate(data.join)
//             }

//         } else {
//             dataCount = await dataModel.countDocuments({ userId: data.userId });

//             allData = await dataModel.find({ userId: data.userId })
//                 .skip(startIndex)
//                 .limit(data.limit)
//                 .populate('userId', 'firstName lastName -_id')
//         }
//     }

//     objectData.totalData = dataCount;
//     objectData.pageCount = Math.ceil(dataCount / data.limit);

//     if (endIndex < dataCount) {
//         data.next = {
//             page: data.page + 1,
//             limit: data.limit
//         }
//     }
//     if (startIndex > 0) {
//         data.prev = {
//             page: data.page - 1,
//             limit: data.limit
//         }
//     }

//     objectData.resultData = allData;

//     return {
//         success: true,
//         operation: 'read',
//         data: objectData
//     }

// };






// exports.findDataService = async (dataModel, data) => {


//     const allData = await dataModel.aggregate([
//         { $match: { userId: new Types.ObjectId(data.userId) } }
//     ]);


//     // const allData = await dataModel.find(
//     //     { userId: data.userId }
//     // );

//     return {
//         success: true,
//         operation: 'read',
//         data: allData
//     }

// }




exports.findDataService = async (dataModel, data) => {

    let objectData = {};
    let allData;
    let dataCount;

    const startIndex = (data.page - 1) * data.limit;
    const endIndex = data.page * data.limit;

    if (data.searchArray) {
        if (data.join) {
            if (data.join2) {
                allData = await dataModel.aggregate([
                    { $match: { userId: new Types.ObjectId(data.userId) } },
                    data.join, data.join2,
                    { $match: { $or: data.searchArray } },
                    {
                        $facet: {
                            countTotal: [{ $count: "total" }],
                            row: [{ $skip: startIndex }, { $limit: data.limit }]
                        }
                    }
                ])

                dataCount = allData[0].countTotal[0].total
                allData = allData[0].row

            } else {
                allData = await dataModel.aggregate([
                    { $match: { userId: new Types.ObjectId(data.userId) } },
                    data.join,
                    { $match: { $or: data.searchArray } },
                    {
                        $facet: {
                            countTotal: [{ $count: "total" }],
                            row: [{ $skip: startIndex }, { $limit: data.limit }]
                        }
                    }
                ])

                dataCount = allData[0].countTotal[0].total
                allData = allData[0].row
            }

        } else {
            allData = await dataModel.aggregate([
                { $match: { userId: new Types.ObjectId(data.userId) } },
                { $match: { $or: data.searchArray } },
                {
                    $facet: {
                        countTotal: [{ $count: "total" }],
                        row: [{ $skip: startIndex }, { $limit: data.limit }]
                    }
                }
            ])

            dataCount = allData[0].countTotal[0].total
            allData = allData[0].row
        }

    } else {
        if (data.join) {
            if (data.join2) {
                allData = await dataModel.aggregate([
                    { $match: { userId: new Types.ObjectId(data.userId) } },
                    data.join, data.join2,
                    {
                        $facet: {
                            countTotal: [{ $count: "total" }],
                            row: [{ $skip: startIndex }, { $limit: data.limit }]
                        }
                    }
                ])

                dataCount = allData[0].countTotal[0].total
                allData = allData[0].row
            } else {
                allData = await dataModel.aggregate([
                    { $match: { userId: new Types.ObjectId(data.userId) } },
                    data.join,
                    {
                        $facet: {
                            countTotal: [{ $count: "total" }],
                            row: [{ $skip: startIndex }, { $limit: data.limit }]
                        }
                    }
                ])

                dataCount = allData[0].countTotal[0].total
                allData = allData[0].row
            }

        } else {
            allData = await dataModel.aggregate([
                { $match: { userId: new Types.ObjectId(data.userId) } },
                {
                    $facet: {
                        countTotal: [{ $count: "total" }],
                        row: [{ $skip: startIndex }, { $limit: data.limit }]
                    }
                }
            ])

            dataCount = allData[0].countTotal[0].total
            allData = allData[0].row
        }
    }

    objectData.totalData = dataCount;
    objectData.pageCount = Math.ceil(dataCount / data.limit);

    if (endIndex < dataCount) {
        data.next = {
            page: data.page + 1,
            limit: data.limit
        }
    }
    if (startIndex > 0) {
        data.prev = {
            page: data.page - 1,
            limit: data.limit
        }
    }

    objectData.resultData = allData;

    return {
        success: true,
        operation: 'read',
        data: objectData
    }

};