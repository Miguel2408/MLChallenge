const options = {
    swaggerDefinition: {
        info: {
            description: 'Mutants Challenge',
            title: 'Mutant DNA',
            version: '1.0.0',
        },
        host: process.env.SWAGGER_HOST || "localhost:5000",
        basePath: '/',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['https', 'http'],

    },
    basedir: __dirname, //app absolute path
    files: ['./../api/controllers/*.js','./../api/swagger/entities.js'] //Path to the API handle folder
};

module.exports = options;
