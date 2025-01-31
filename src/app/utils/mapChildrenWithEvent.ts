import { DialogHeader } from "@/components/DialogHeader/DialogHeader";
import {
  ChildrenProps,
  ChildrenType,
} from "@/components/BaseDialog/BaseDialog.types";
import { DialogHeaderProps } from "@/components/DialogHeader/DialogHeader.types";
import React, { ReactElement } from "react";

type Element = React.ReactElement<
  ChildrenProps,
  string | React.JSXElementConstructor<any>
>;

export function mapChildrenWithEvent(
  children: ChildrenType,
  callback: () => void,
) {
  const mappedChildren = React.Children.map(children, (element) =>
    mapCallback(element, callback),
  );

  return mappedChildren;
}

function mapCallback(
  element: Element,
  callback: () => void,
): ChildrenType | ChildrenType[] {
  const { props, type } = element;
  const isValidElement = React.isValidElement(element);

  if (type === DialogHeader) {
    const header = DialogHeader(props as DialogHeaderProps);

    const mappedHeader = mapChildrenWithEvent(header, callback) as ChildrenType;

    return mappedHeader;
  }

  if (isValidElement && props.closeDialog) {
    const customOnPress = () => {
      if (props.onPress) props.onPress();
      callback();
    };

    const cloneElement = React.cloneElement(element, {
      onPress: customOnPress,
    });

    return cloneElement;
  }

  if (props?.children) {
    return React.cloneElement(element as ReactElement, {
      children: mapChildrenWithEvent(props.children, callback),
    });
  }

  return element;
}
