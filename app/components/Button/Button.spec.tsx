import { render, fireEvent } from "testUtils";
import { Button } from "./Button";
import { Text } from "react-native";
import { COLORS } from "@/constants/Colors";

describe("Button", () => {
  it("should render the button with the given title", () => {
    const title = "Click Me";
    const { getByText } = render(<Button title={title} />);

    const buttonText = getByText(title);
    expect(buttonText).toBeTruthy();
  });

  it("should call onPress when the button is pressed", () => {
    const onPressMock = jest.fn();

    const title = "Press Me";
    const { getByText } = render(
      <Button title={title} onPress={onPressMock} />,
    );

    const button = getByText(title);
    fireEvent(button, "press");

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("should not call onPress when the button is disabled", () => {
    const onPressMock = jest.fn();

    const title = "Disabled Button";
    const { getByText } = render(
      <Button title={title} onPress={onPressMock} disabled={true} />,
    );

    const button = getByText(title);
    fireEvent(button, "press");

    expect(onPressMock).not.toHaveBeenCalled();
  });

  it("should apply custom button styles", () => {
    const customStyles = { backgroundColor: "red" };
    const { getByTestId } = render(
      <Button
        title="Styled Button"
        buttonStyles={customStyles}
        testID="styled-button"
      />,
    );

    const button = getByTestId("styled-button");
    expect(button.props.style.backgroundColor).toBe("red");
  });

  it("should render an icon if provided", () => {
    const icon = <Text testID="button-icon">Icon</Text>;
    const { getByTestId } = render(<Button title="Icon Button" icon={icon} />);

    const renderedIcon = getByTestId("button-icon");
    expect(renderedIcon).toBeTruthy();
  });

  it("should apply disabled styles when the button is disabled", () => {
    const { getByTestId } = render(
      <Button title="Disabled" disabled={true} testID="disabled-button" />,
    );

    const button = getByTestId("disabled-button");
    expect(button.props.style.opacity).toBe(0.7);
    expect(button.props.style.backgroundColor).toBe(COLORS.grey);
  });

  it("should override default disabled styles with custom disabled styles", () => {
    const customDisabledStyles = { backgroundColor: "blue", opacity: 0.5 };
    const { getByTestId } = render(
      <Button
        title="Custom Disabled"
        disabled={true}
        disabledStyles={customDisabledStyles}
        testID="custom-disabled-button"
      />,
    );

    const button = getByTestId("custom-disabled-button");
    expect(button.props.style.backgroundColor).toBe("blue");
    expect(button.props.style.opacity).toBe(0.5);
  });
});
