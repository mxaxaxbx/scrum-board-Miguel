const imageTypes = ["image/png", "image/jpg", "image/jpeg"];

const upload = async (req, res, next) => {
    if( req.files.image.type ) {
        const type = req.files.image.type;
        const imageType = imageTypes.filter( t => t === type );

        if( imageType.length === 0 ) return res.status(400).send({
            code: 200,
            message: `The filetype is not available. The types availables: ${ imageType.toString() }`,
        });
    }

    next();
}

module.exports = upload;
