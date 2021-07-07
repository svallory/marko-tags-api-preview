import type { types } from "@marko/compiler";
import { Hub } from "@marko/compiler/babel-types";
import deepFreeze from "../../util/deep-freeze/transform";
const usedTag = new WeakSet<Hub>();

export = (tag: types.NodePath<types.MarkoTag>, t: typeof types) => {
  const tagVar = tag.node.var!;
  const errorMessage = usedTag.has(tag.hub)
    ? "can only be used once within a template"
    : !tagVar
    ? "requires a tag variable to be assigned to"
    : !tag.parentPath.parentPath.isProgram()
    ? "can only used at the root of the template"
    : tag.node.attributes.length > 0
    ? "does not support attributes"
    : tag.node.body.body.length
    ? "does not support body content"
    : tag.node.body.params.length
    ? "does not support tag body parameters"
    : tag.node.arguments?.length
    ? "does not support arguments"
    : undefined;

  if (errorMessage) {
    throw tag
      .get("name")
      .buildCodeFrameError(`The <props> tag ${errorMessage}.`);
  }

  usedTag.add(tag.hub);

  tag.replaceWith(
    t.variableDeclaration("const", [
      t.variableDeclarator(
        tagVar,
        deepFreeze(tag.hub.file, t.identifier("input"))
      ),
    ])
  );
};