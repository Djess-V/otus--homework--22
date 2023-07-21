#!/usr/bin/env node

import { blue, green, yellow } from "colorette";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { OptionValues } from "commander";
import {
  inputValidation,
  transformInputValue,
  updateConfig,
} from "./processingData.js";
import { defaults, queries } from "./constants.js";
import { showMessageWarning, showSuccessMessage } from "./utils.js";

export const configAction = async () => {
  let options: OptionValues = { ...defaults };

  const rl = readline.createInterface({ input, output });

  const menu = queries.reduce(
    (str, item, i) =>
      str +
      `${blue(`(${i + 1})`)} ${yellow(
        `(${item.option.toUpperCase()})`,
      )} ${green(item.title)} ${yellow(`(defult: ${item.default})`)}\n`,
    "",
  );

  console.log(`${green("\nMenu:\n\n")}${menu}`);

  let menuItem: string = "";
  let testPassed = false;
  let resStart = "";

  do {
    if (resStart !== "y" && resStart !== "n") {
      resStart = await rl.question("You want to adjust the parameters? (y/n) ");
    }

    if (resStart === "n") {
      break;
    } else if (resStart === "y") {
      menuItem = await rl.question("\nSelect the menu item: ");

      const index = Number(menuItem);

      if (
        !isNaN(index) &&
        Number.isInteger(index) &&
        index <= 13 &&
        index >= 1
      ) {
        let validationPassed = false;

        do {
          const resParamValue = await rl.question(
            `\n${queries[index - 1].query} `,
          );

          validationPassed = inputValidation(resParamValue, index - 1);

          if (validationPassed) {
            const transformValue = transformInputValue(
              resParamValue,
              index - 1,
            );

            options = updateConfig(transformValue, index - 1, options);

            showSuccessMessage("\nThe entered data has been saved!");

            let resContinue = "";

            do {
              resContinue = await rl.question(
                "\nContinue customization? (y/n): ",
              );

              if (resContinue === "n") {
                testPassed = true;
                break;
              }
            } while (resContinue !== "y");
          } else {
            showMessageWarning(
              "\nThe entered data does not correspond to the format! Try again!",
            );
          }
        } while (!validationPassed);
      } else {
        showMessageWarning(
          "\nYou have entered an invalid menu item! Try again!",
        );
      }
    }
  } while (!testPassed);

  console.log(options);
  rl.close();
};
