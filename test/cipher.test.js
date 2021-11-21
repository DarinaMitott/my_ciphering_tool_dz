// const {exports} = require ('../src/errors');
const {Atbash,Caesar} = require("../src/ciphers");


describe( 'ciphers', () => {
    test('Atbash',()=> {
        const cipher = new Atbash();

        cipher._transform('Abcяя', 'utf8', (err, data) => {
            expect(err).toBeFalsy();
            expect(data).toStrictEqual(Buffer.from('Zyxяя'))
        });
    });
    test('Ceasar-1 encode', () => {
        const cipher = new Caesar(true, 'encoding');
        cipher._transform('Abc1', 'utf8', (err, data) => {
            expect(err).toBeFalsy();
            expect(data).toStrictEqual(Buffer.from('Bcd1'))
        });
    });

    test('Ceasar-1 decode', () => {
        const cipher = new Caesar(true, 'decoding');
        cipher._transform('Bcd2', 'utf8', (err, data) => {
            expect(err).toBeFalsy();
            expect(data).toStrictEqual(Buffer.from('Abc2'))
        });
    });

    test('Root-8 encode', () => {
        const cipher = new Caesar(false, 'encoding');
        cipher._transform('Abc', 'utf8', (err, data) => {
            expect(err).toBeFalsy();
            expect(data).toStrictEqual(Buffer.from('Ijk'))
        });
    });

    test('Root-8 decode', () => {
        const cipher = new Caesar(false, 'decoding');
        cipher._transform('Jkl', 'utf8', (err, data) => {
            expect(err).toBeFalsy();
            expect(data).toStrictEqual(Buffer.from('Bcd'))
        });
    });
})