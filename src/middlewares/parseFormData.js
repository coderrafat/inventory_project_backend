const { formidable } = require('formidable');

exports.parseFormData = async (req, res, next) => {
    try {
        const form = formidable({ multiples: true });
        if (Object.keys(req.body).length < 1) {
            form.parse(req, async (err, fields, files) => {

                req.body = { ...files, ...fields }

                next()
            })
        } else {
            next()
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
};
