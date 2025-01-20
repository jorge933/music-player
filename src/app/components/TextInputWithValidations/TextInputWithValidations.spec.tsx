import { useFormControl } from "@/hooks/useFormControl/useFormControl";
import { TextInputWithValidations } from "./TextInputWithValidations";
import { fireEvent, render } from "testUtils";
import { TextInputWithValidationsProps } from "./TextInputWithValidations.types";
import { Validator } from "@/hooks/useFormControl/useFormControl.types";
import { required } from "@/validators/required";
import { VALIDATION_ERRORS_MESSAGE } from "@/constants/ValidationErrorsMessage";

type UseFormControlParams = {
  value: string;
  validators: Validator[];
};

function MockControl(
  props: Partial<TextInputWithValidationsProps & UseFormControlParams>,
) {
  const control = useFormControl(props.value || null, props.validators);

  return <TextInputWithValidations control={control} {...props} />;
}

describe("TextInputWithValidations", () => {
  it("should render input and reset button", () => {
    const value = "initialValue";
    const { getByDisplayValue, getByTestId } = render(
      <MockControl value={value} resetButton />,
    );

    const input = getByDisplayValue(value);
    const resetButton = getByTestId("reset-button");

    expect(input).toBeVisible();
    expect(resetButton).toBeVisible();
  });

  it("should reset value on press reset button and focus input", () => {
    const value = "initialValue";
    const { getByDisplayValue, getByTestId } = render(
      <MockControl value={value} resetButton />,
    );

    const input = getByDisplayValue(value);
    const resetButton = getByTestId("reset-button");

    fireEvent(resetButton, "press");

    expect(input.props.value).toBe("");
  });

  it("should change input value on change text", () => {
    const value = "initialValue";
    const { getByDisplayValue } = render(
      <MockControl value={value} resetButton />,
    );

    const input = getByDisplayValue(value);

    const newValue = "new value";
    fireEvent(input, "changeText", newValue);

    expect(input.props.value).toBe(newValue);
  });

  it("should show validation error message when input is invalid", () => {
    const value = "initialValue";
    const { getByDisplayValue, getByText } = render(
      <MockControl value={value} validators={[required]} />,
    );

    const input = getByDisplayValue(value);

    fireEvent(input, "changeText", "");

    const errorMessage = getByText(VALIDATION_ERRORS_MESSAGE.required());

    expect(errorMessage).toBeVisible();
  });

  it("should not display the validation error message when the input not is dirty", () => {
    const value = "";
    const { queryByText } = render(
      <MockControl value={value} validators={[required]} />,
    );

    const errorMessage = queryByText(VALIDATION_ERRORS_MESSAGE.required());

    expect(errorMessage).not.toBeVisible();
  });

  it("should apply custom styles to input and container", () => {
    const customInputStyles = { color: "red" };
    const customContainerStyles = { backgroundColor: "blue" };

    const { getByDisplayValue } = render(
      <MockControl
        value="initialValue"
        inputStyles={customInputStyles}
        inputContainerStyles={customContainerStyles}
      />,
    );

    const input = getByDisplayValue("initialValue");
    expect(input.props.style).toMatchObject(customInputStyles);
  });
});
