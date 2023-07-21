#!/usr/bin/env node

import { OptionValues } from "commander";
import ghpages from "gh-pages";

const publish = (options: OptionValues) => {
  ghpages.publish(options.dir, options, (err) => {
    if (err) {
      throw err;
    }
  });
};

export { publish };
