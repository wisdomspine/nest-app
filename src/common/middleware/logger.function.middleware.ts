import * as chalk from "chalk";
export function logger(req: any, res: any, next: () => void) {
  console.log(chalk.red("logging..."));
  next();
}

