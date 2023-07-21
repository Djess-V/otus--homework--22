#!/usr/bin/env node

import { green, red } from "colorette";

const showSuccessMessage = (message: string) => {
  console.log(green(message));
};

const showMessageWarning = (message: string) => {
  console.log(red(message));
};

export { showSuccessMessage, showMessageWarning };
