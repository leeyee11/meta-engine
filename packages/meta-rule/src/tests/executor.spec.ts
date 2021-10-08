import {execute, judge} from '../executor';

describe('Executor', () => {
  it('Judge should get expression response correctly', () => {
    const context = {player: {hp: 100}};
    expect(judge(context, 'player.hp >= 0')).toBeTruthy();
    expect(judge(context, 'player.hp < 0')).toBeFalsy();
  });

  it('Judge should throw error if response is not boolean', () => {
    const context = {player: {hp: 100}};
    expect(() => judge(context, 'player.hp')).toThrowError();
  });

  it('Judge should not modify context data', () => {
    const context = {player: {hp: 100}};
    judge(context, '(player.hp += 100) === 0');
    expect(context.player.hp).toBe(100);
  });

  it('Execute should run expression correctly', () => {
    const context = {player: {hp: 100}};
    execute(context, 'player.hp += 100');
    expect(context.player.hp).toBe(200);
  });
});

console.log();
