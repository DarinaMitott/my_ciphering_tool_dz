const fs = require('fs');
const { Caesar, Atbash } = require('./ciphers');
const { InvalidArgumentError, InvalidConfigError } = require('./errors');


function parse() {
    if (process.argv.length <= 2) {
        throw new InvalidArgumentError('No options specified');
    }

    let options = {};
    for (let argNum = 2; argNum < process.argv.length; argNum += 2) {
        const opName = process.argv[argNum];

        if (argNum >= process.argv.length - 1) {
            throw new InvalidArgumentError(`There is no value specified for "${opName}" option`);
        }
        const opVal = process.argv[argNum + 1];

        if ('-c' === opName || '--config' === opName) {
            if (typeof options.pipeline !== 'undefined') {
                throw new InvalidArgumentError(`You cannot duplicate options ("${opName}")`)
            }

            // parse config
            const items = opVal.trim().split('-');
            let pipeline = [];
            for (let item of items) {
                item = item.trim();
                if (!item) {
                    throw new InvalidConfigError('Invalid config specified (empty section)');
                }
                let cipher = null;
                if (item[0] === 'C' || item[0] === 'R') {
                    if (item.length !== 2) {
                        throw new InvalidConfigError(`No mode specified for cipher "${item}"`);
                    }

                    if (item[1] !== '0' && item[1] !== '1') {
                        throw new InvalidConfigError(`Invalid mode specified for cipher "${item}"`);
                    }
                    const mode = item[1] === '1' ? 'encoding' : 'decoding';
                    cipher = new Caesar(item[0] === 'C', mode);
                } else if (item[0] === 'A') {
                    cipher = new Atbash();
                } else {
                    throw new InvalidConfigError(`Unsupported Cipher specified in the config: "${item[0]}"`)
                }

                pipeline.push(cipher);
            }

            options.pipeline = pipeline;
        } else if ('-i' === opName || '--input' === opName) {
            if (typeof options.input !== 'undefined') {
                throw new InvalidArgumentError(`You cannot duplicate options ("${opName}")`);
            }
            options.input = fs.createReadStream(opVal);
        } else if ('-o' === opName || '--output' === opName) {
            if (typeof options.output !== 'undefined') {
                throw new InvalidArgumentError(`You cannot duplicate options ("${opName}")`);
            }
            options.output = fs.createWriteStream(opVal, {'flags': 'a'});
        } else {
            throw new InvalidArgumentError(`Specified option is not supported: "${opName}"`)
        }
    }

    return options;
}

module.exports = { parse };