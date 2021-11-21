const Stream = require('stream');


const
    CAESAR_SHIFT = 1,
    ROT8_SHIFT = 8,
    LO_A = 'a'.charCodeAt(0),
    LO_Z = 'z'.charCodeAt(0),
    HI_A = 'A'.charCodeAt(0),
    HI_Z = 'Z'.charCodeAt(0);

class Caesar extends Stream.Transform {
    constructor(isCaesar, mode) {
        super();
        const shift = isCaesar ? CAESAR_SHIFT : ROT8_SHIFT;
        this.shift = shift * (mode === 'encoding' ? 1 : -1);
    }
    _transform(chunk, encoding, callback) {
        const chu = encoding === 'buffer' ? chunk : Buffer.from(chunk);
        let out = [];
        for (let i = 0; i < chu.length; i++) {
            if (LO_A <= chu[i] && chu[i] <= LO_Z) {
                out.push( (((chu[i] - LO_A) + this.shift + 26) % 26) + LO_A );

            } else if (HI_A <= chu[i] && chu[i] <= HI_Z) {
                out.push( (((chu[i] - HI_A) + this.shift + 26) % 26) + HI_A );

            } else {
                out.push(chu[i]);
            }
        }
        callback(null, Buffer.from(out));
    }
    _flush(callback) {
        callback();
    }
}


class Atbash extends Stream.Transform {
    _transform(chunk, encoding, callback) {
        const chu = encoding === 'buffer' ? chunk : Buffer.from(chunk);
        let out = [];
        for (let i = 0; i < chu.length; i++) {
            if (LO_A <= chu[i] && chu[i] <= LO_Z) {
                out.push( LO_Z - (chu[i] - LO_A) );

            } else if (HI_A <= chu[i] && chu[i] <= HI_Z) {
                out.push( HI_Z - (chu[i] - HI_A) );

            } else {
                out.push(chu[i]);
            }
        }
        callback(null, Buffer.from(out));
    }
    _flush(callback) {
        callback();
    }
}


module.exports = {
    Caesar,
    Atbash,
}