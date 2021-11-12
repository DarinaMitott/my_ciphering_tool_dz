const { pipeline } = require('stream');
const { parse } = require('./src/arg_parser');


try {
    const options = parse();

    const chain = [
        options.input || process.stdin,
        ...options.pipeline,
        options.output || process.stdout
    ];

    pipeline(...chain, (err) => {
        if (err) {
            console.error(`Pipeline error occurred: ${err}`);
            process.exit(1);
        }
    });
} catch (e) {
    console.error(`Error is occurred: ${e}`);
    process.exit(2);
}

