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