const { parse } = require('../src/arg_parser');
const { InvalidArgumentError, InvalidConfigError } = require('../src/errors');


describe('argument parser', () => {
  test('kek', () => {
    process.argv = ['node', 'my_ciphering']
    expect(() => parse()).toThrow(InvalidArgumentError);
  });

  test('ok args', () => {
    process.argv = ['node', 'my_ciphering', '-c', 'C1-C0-A-R1-R0-A-R0-R0-C1-A', '-i', './input.txt', '-o', './output.txt']
    const output = parse();
    expect(output).toHaveProperty('input');
    expect(output).toHaveProperty('output');
    expect(output).toHaveProperty('pipeline');
  });

  test('config without arg value', () => {
    process.argv = ['node', 'my_ciphering', '-c']
    expect(() => parse()).toThrow(InvalidArgumentError);
  });

  test('-c duplicate', () => {
    process.argv = ['node', 'my_ciphering', '-c', 'C1-C0-A-R1', '--config', 'C1']
    expect(() => parse()).toThrow(InvalidArgumentError);
  });

  test('-i duplicate', () => {
    process.argv = ['node', 'my_ciphering', '-i', 'input.txt', '--input', 'input.txt']
    expect(() => parse()).toThrow(InvalidArgumentError);
  });

  test('-o duplicate', () => {
    process.argv = ['node', 'my_ciphering', '-o', 'output.txt', '--output', 'output.txt']
    expect(() => parse()).toThrow(InvalidArgumentError);
  });

  test('output not exist', () => {
    process.argv = ['node', 'my_ciphering', '-o', 'pop.txt']
    expect(() => parse()).toThrow(InvalidConfigError);
  });

  test('wrong argument', () => {
    process.argv = ['node', 'my_ciphering', '-a', 'pop.txt']
    expect(() => parse()).toThrow(InvalidArgumentError);
  });
});

describe('config parsing', () => {
  test('empty config', () => {
    process.argv = ['node', 'my_ciphering', '-c', 'A-']
    expect(() => parse()).toThrow(InvalidConfigError);
  });

  test('No mode specified for cipher', () => {
    process.argv = ['node', 'my_ciphering', '-c', 'R12']
    expect(() => parse()).toThrow(InvalidConfigError);
  });

  test('invalid mode specified for cipher', () => {
    process.argv = ['node', 'my_ciphering', '-c', 'C2']
    expect(() => parse()).toThrow(InvalidConfigError);
  });

  test('A doesnt support mode option', () => {
    process.argv = ['node', 'my_ciphering', '-c', 'A1']
    expect(() => parse()).toThrow(InvalidConfigError);
  });

  test('AUnsupported Cipher', () => {
    process.argv = ['node', 'my_ciphering', '-c', 'Q']
    expect(() => parse()).toThrow(InvalidConfigError);
  });
});
