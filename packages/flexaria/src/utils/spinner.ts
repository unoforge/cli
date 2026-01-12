import ora from 'ora';

export const spinner = () => {
  const spinner = ora({
    text: 'Loading...',
    color: 'blue'
  });

  return {
    start: (text?: string) => {
      if (text) {
        spinner.text = text;
      }
      spinner.start();
    },
    stop: () => {
      spinner.stop();
    },
    succeed: (text?: string) => {
      spinner.succeed(text);
    },
    fail: (text?: string) => {
      spinner.fail(text);
    }
  };
};
