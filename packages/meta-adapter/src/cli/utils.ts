import chalk from 'chalk';

export const keypress = async () => {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  return new Promise<void>(
    resolve => process.stdin.once(
      'data', 
      () => {
        process.stdin.setRawMode(false)
        resolve();
      }
    )
  )
}

export const sleep = (ms: number) => {
  return new Promise<void>(
    resolve => setTimeout(resolve, ms)
  )
}

const clearLastLine = () => {
  process.stdout.moveCursor(0, -1);
  process.stdout.clearScreenDown()
}
const isCommunication = (text: string) => /^\".*?\"$/.test(text);

interface PlaySubtitleOption {
  blocker?: (() => Promise<void>) | null,
  interval?: number,
  hint?: string,
}
export const playSubtitle = async (
  textList: string[], 
  option?: PlaySubtitleOption,
) => {
  const {blocker = keypress, interval = 60, hint = 'Press any key to continue.'} = option || {};
  for (let text of textList) {
    const chalkWrite = isCommunication(text)
      ? chalk.blue
      : chalk.white
    const chalkHint = chalk.green;
    let acc = '';
    const chars = text.split('');
    for (let char of chars) {
      acc += char;
      console.log(chalkWrite(acc));
      await sleep(interval);
      clearLastLine();
    }
    console.log(chalkWrite(acc));
    console.log(chalkHint(hint));
    if (blocker) {
      await blocker();
    }
    clearLastLine();
  }
}