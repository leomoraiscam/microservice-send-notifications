import { Content } from './content';

describe('Content Entity', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Voce recebeu uma solicitacao de amizade');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('Voce')).toThrow();
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('Voce'.repeat(238))).toThrow();
  });
});
