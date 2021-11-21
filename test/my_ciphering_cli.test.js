const cp = require('child_process');


describe('testing my functionality', () => {

    const cmdGood = [
        {
            cmdline: ['my_ciphering_cli', '-c', 'C1-C1-R0-A', '-i', './input.txt'],
            expected: 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!'
        },

        {
            cmdline: ['my_ciphering_cli', '-c', 'C1-C0-A-R1-R0-A-R0-R0-C1-A', '-i', './input.txt'],
            expected: 'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!'
        },

        {
            cmdline: ['my_ciphering_cli', '-c', 'A-A-A-R1-R0-R0-R0-C1-C1-A', '-i', './input.txt'],
            expected: 'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!'
        },

        {
            cmdline: ['my_ciphering_cli', '-c', 'C1-R1-C0-C0-A-R0-R1-R1-A-C1', '-i', './input.txt'],
            expected: 'This is secret. Message about "_" symbol!'
        },

    ]

    test('the first example from task', () => {
        cp.execFile('node', cmdGood[0].cmdline, (error, stdout, stderr) => {
            if(error) {
                throw new Error('App 1 failed')
            } else {
                expect(stdout).toEqual(cmdGood[0].expected);
            }
        });
    });

    test('the second example from task', () => {
        cp.execFile('node', cmdGood[1].cmdline, (error, stdout, stderr) => {
            if(error) {
                throw new Error('App 2 failed')
            } else {
                expect(stdout).toEqual(cmdGood[1].expected);
            }
        });
    });

    test('the third example from task', () => {
        cp.execFile('node', cmdGood[2].cmdline, (error, stdout, stderr) => {
            if(error) {
                throw new Error('App 3 failed')
            } else {
                expect(stdout).toEqual(cmdGood[2].expected);
            }
        });
    });

    test('the fourth example from task', () => {
        cp.execFile('node', cmdGood[3].cmdline, (error, stdout, stderr) => {
            if(error) {
                throw new Error('App 4 failed')
            } else {
                expect(stdout).toEqual(cmdGood[3].expected);
            }
        });
    });
})

