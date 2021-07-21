import fixture, { FixtureHelpers } from "../../fixture";

const increment = click("increment");

describe(
  "misc assign with default",
  fixture("./templates/assign-with-default.marko", [increment, increment])
);

describe(
  "misc assign with computed",
  fixture("./templates/assign-with-computed.marko", [increment, increment])
);

describe(
  "misc assign with default and rest",
  fixture("./templates/assign-with-default-and-rest.marko", [
    increment,
    increment,
  ])
);

describe(
  "misc assign with string-literal",
  fixture("./templates/assign-with-string-literal.marko", [
    increment,
    increment,
  ])
);

describe(
  "misc assign with existing change handler",
  fixture("./templates/assign-with-existing-change-handler.marko", [
    increment,
    increment,
  ])
);

describe(
  "misc error assign-to-rest-element",
  fixture("./templates/error-assign-to-rest-element.marko")
);

describe(
  "misc error assign-to-array-item",
  fixture("./templates/error-assign-to-array-item.marko")
);

function click(text: string) {
  return async ({ fireEvent, screen }: FixtureHelpers) =>
    await fireEvent.click(screen.getByText(text));
}
