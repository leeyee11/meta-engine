import chalk from 'chalk';

export const keypress = async () => {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  return new Promise<void>(
      (resolve) => process.stdin.once(
          'data',
          () => {
            process.stdin.setRawMode(false);
            resolve();
          },
      ),
  );
};

export const sleep = (ms: number) => {
  return new Promise<void>(
      (resolve) => setTimeout(resolve, ms),
  );
};

const clearLastLine = () => {
  process.stdout.moveCursor(0, -1);
  process.stdout.clearScreenDown();
};
const isCommunication = (text: string) => /^\".*?\"$/.test(text);
const isNotification = (text: string) => /^\(.*?\)$/.test(text);


interface PlaySubtitleOption {
  blocker?: (() => Promise<void>) | null,
  interval?: number,
  hint?: string,
}
export const playSubtitle = async (
    textList: string[],
    option?: PlaySubtitleOption,
) => {
  const {
    blocker = keypress,
    interval = 60,
    hint = 'Press any key to continue.',
  } = option || {};
  for (const text of textList) {
    const chalkWrite =
      isCommunication(text) ?
      chalk.blue :
      isNotification(text) ?
        chalk.yellow :
        chalk.white;
    const chalkHint = chalk.green;
    let acc = '';
    if (interval === 0) {
      acc = text;
    } else {
      const chars = text.split('');
      for (const char of chars) {
        acc += char;
        console.log(chalkWrite(acc));
        await sleep(interval);
        clearLastLine();
      }
    }
    console.log(chalkWrite(acc));
    console.log(chalkHint(hint));
    if (blocker) {
      await blocker();
    }
    clearLastLine();
  }
};
