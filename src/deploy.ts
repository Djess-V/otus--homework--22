#!/usr/bin/env node

import { OptionValues } from "commander";
import ghpages from "gh-pages";
import {
  inputValidation,
  transformInputValue,
  updateConfig,
} from "./processingData.js";
import { showMessageWarning } from "./utils.js";
import { defaults } from "./constants.js";

export const deployAction = (args: OptionValues) => {
  try {
    let options: OptionValues = { ...defaults, ...args };

    if (options.user) {
      if (inputValidation(options.user as string, 1)) {
        const transformValue = transformInputValue(options.user as string, 1);

        options = updateConfig(transformValue, 1, options);
      } else {
        showMessageWarning(
          "Enter the user data in the required format!\nDeployment has been suspended!",
        );
        return;
      }
    }

    ghpages.publish(options.dir, options, (err) => {
      if (err) {
        throw err;
      }
    });
  } catch (e: unknown) {
    console.log((e as unknown as Error).message);
  }
};
