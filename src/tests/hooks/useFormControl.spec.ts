/* eslint-disable react-hooks/rules-of-hooks */
import { VALIDATION_ERRORS_MESSAGE } from "@/constants/ValidationErrorsMessage";
import { isInitialValue } from "@/validators/isInitialValue";
import { required } from "@/validators/required";
import { act, renderHook } from "testUtils";
import { useFormControl } from "@/hooks/useFormControl/useFormControl";

describe("useFormControl", () => {
  it("should initialize with empty value and valid state when no parameters are provided", () => {
    const {
      result: { current },
    } = renderHook(() => useFormControl(null));

    expect(current.value).toBe("");
    expect(current.errors).toBeNull();
    expect(current.isValid).toBe(true);
    expect(current.isDirty).toBe(false);
  });

  it("should initialize with provided initial value and apply validation", () => {
    const initialValue = "initial value";
    const {
      result: { current },
    } = renderHook(() => useFormControl(initialValue, [required]));

    expect(current.value).toBe(initialValue);
    expect(current.errors).toBeNull();
    expect(current.isValid).toBe(false);
    expect(current.isDirty).toBe(false);
  });

  it("should update value and set isDirty to true on handleOnChange call", () => {
    const { result } = renderHook(() => useFormControl(null));

    expect(result.current.isDirty).toBe(false);

    const newValue = "test";
    act(() => {
      result.current.handleOnChange(newValue);
    });

    expect(result.current.value).toBe(newValue);
    expect(result.current.isDirty).toBe(true);
  });

  it("should set validation errors when handleOnChange is called with invalid value", () => {
    const { result } = renderHook(() => useFormControl(null, [required]));

    act(() => {
      result.current.handleOnChange("");
    });

    expect(result.current.errors).toEqual({
      required: VALIDATION_ERRORS_MESSAGE.required(),
    });
  });

  it("should update isValid to true when a valid value is provided", () => {
    const { result } = renderHook(() => useFormControl(null, [required]));

    expect(result.current.isValid).toBe(false);

    act(() => {
      result.current.handleOnChange("valid text");
    });

    expect(result.current.isValid).toBe(true);
  });

  it("should reset value to an empty string when resetValue is called", () => {
    const { result } = renderHook(() => useFormControl(null, []));

    act(() => {
      result.current.resetControl();
    });

    expect(result.current.value).toBe("");
  });

  it("should correctly handle multiple validators and prioritize first error found", () => {
    const initialValue = "";
    const props = {
      initialProps: {
        validators: [required, isInitialValue(initialValue)],
        initialValue,
      },
    };
    const hook = ({ validators, initialValue }: any) =>
      useFormControl(initialValue, validators);

    const { result, rerender } = renderHook(hook, props);

    act(() => {
      result.current.handleOnChange("");
    });

    expect(result.current.errors).toEqual({
      required: VALIDATION_ERRORS_MESSAGE.required(),
    });

    rerender({
      validators: [isInitialValue(initialValue), required],
      initialValue,
    });

    act(() => {
      result.current.handleOnChange(initialValue);
    });

    expect(result.current.errors).toEqual({
      isInitialValue: VALIDATION_ERRORS_MESSAGE.isInitialValue(),
    });
  });

  it("should remove errors on change to valid text", () => {
    const { result } = renderHook(() => useFormControl(null, [required]));

    act(() => {
      result.current.handleOnChange("");
    });

    expect(result.current.errors).toEqual({
      required: VALIDATION_ERRORS_MESSAGE.required(),
    });

    act(() => {
      result.current.handleOnChange("valid text");
    });

    expect(result.current.errors).toBeNull();
  });
});
