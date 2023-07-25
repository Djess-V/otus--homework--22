#!/usr/bin/env node

import { OptionValues } from "commander";
import { queries } from "./constants";

type ITransformValue =
  | string
  | boolean
  | string[]
  | {
      name: string;
      email: string;
    };

const inputValidation = (value: string, index: number): boolean => {
  return queries[index].pattern.test(value);
};

const transformInputValue = (value: string, index: number): ITransformValue => {
  if (index === 6 || index === 7 || index === 12) {
    if (value === "y") {
      return true;
    } else {
      return false;
    }
  }

  if (index === 2) {
    if (value.split(" ").length === 1) {
      return value;
    }

    return value.split(" ");
  }

  if (index === 1) {
    const split = value.split(" ");

    return {
      name: split[0],
      email: split[1],
    };
  }

  return value;
};

const updateConfig = (
  value: ITransformValue,
  index: number,
  options: OptionValues,
) => {
  const newOptions = { ...options };

  newOptions[queries[index].option] = value;

  return newOptions;
};

export { inputValidation, updateConfig, transformInputValue };
