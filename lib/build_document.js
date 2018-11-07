const config = require('./config');
const build_file = require('./build_file');
const concat_files = require('./concat-files');

module.exports = async (type, targets) => {
    const info = {
        document_path: [],
        concat_path: [],
        tex_path: []
    };

    if(config.args.concat){
        const concat_filename = typeof config.args.concat === "string" ? config.args.concat : ".build.md";

        concat_files(targets.sort(), concat_filename);
        info.concat_path.push(concat_filename);

        const document_path = await build_file(concat_filename, type);
        info.document_path.push(document_path);

        if(config.args['keep-sources']){
            const tex_path = await build_file(concat_filename, 'tex');
            info.tex_path.push(tex_path);
        }
    }
    else{
        await Promise.all(targets.map((file) =>
            info.document_path.push(build_file(file, type))
        ));

        if(config.args['keep-sources'])
            await Promise.all(targets.map((file) =>
                info.tex_path.push(build_file(file, 'tex'))
            ));
    }

    return info;
};