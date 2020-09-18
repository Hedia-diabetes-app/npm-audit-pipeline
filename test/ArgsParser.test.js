const { expect } = require('chai');
const ArgsParser = require('../ArgsParser');

describe('ArgsParser', () => {
  describe('parseCommandLineArgs', () => {
    it('if no arguments are present a default config is returned', () => {
      const argsParser = ArgsParser();
      const result = argsParser.parseCommandLineArgs([]);
      expect(result).to.eql({
        shouldWarn: false,
        retry: 3
      });
    });

    it('if arg is an invalid format, error is thrown', () => {
      const argsParser = ArgsParser();
      expect(() => argsParser.parseCommandLineArgs(['-low=3'])).to.throw(
        Error,
        'one of the arguments is invalid'
      );
    });

    it('if arg is present, then it overrides default config value', () => {
      const argsParser = ArgsParser();
      const result = argsParser.parseCommandLineArgs(['--low=3']);
      expect(result).to.eql({
        shouldWarn: false,
        low: 3,
        retry: 3
      });
    });

    it('if arg is has --warn, then shouldWarn should be true', () => {
      const argsParser = ArgsParser();
      const result = argsParser.parseCommandLineArgs(['--warn']);
      expect(result).to.eql({
        shouldWarn: true,
        retry: 3
      });
    });

    it('if arg is has --retry=5, then retry should be 5', () => {
      const argsParser = ArgsParser();
      const result = argsParser.parseCommandLineArgs(['--retry=5']);
      expect(result).to.eql({
        shouldWarn: false,
        retry: 5
      });
    });

    it('if arg has no count value passed, it should by default be 0', () => {
      const argsParser = ArgsParser();
      const result = argsParser.parseCommandLineArgs(['--low']);
      expect(result).to.eql({
        shouldWarn: false,
        low: 0,
        retry: 3
      });
    });
  });
});
