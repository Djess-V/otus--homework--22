#!/usr/bin/env node

import { OptionValues } from "commander";
import ghpages from "gh-pages";
import { showMessageWarning, showSuccessMessage } from "./utils";

const publish = (options: OptionValues) => {
  ghpages.publish(options.dir, options, (err) => {
    if (err) {
      showMessageWarning(
        "Something has gone wrong! Please contact support via email - e.ageevets@yandex.ru!",
      );
      throw err;
    }

    showSuccessMessage("Deployment successfully completed!");
  });
};

export { publish };
