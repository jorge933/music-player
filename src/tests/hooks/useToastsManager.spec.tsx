import { renderHook, waitFor } from "@testing-library/react-native";
import { useToastsManager } from "@/hooks/useToastsManager/useToastsManager";
import { act } from "react";
import { Toast } from "@/components/Toast/Toast";

describe("useToastsManager", () => {
  it("should return correctly values", () => {
    const { result } = renderHook(useToastsManager);

    expect(result.current.toasts).toEqual([]);
    expect(result.current.addToast).toEqual(expect.any(Function));
  });

  it("should add toast", async () => {
    jest.spyOn(Date, "now").mockReturnValue(12345);

    const { result } = renderHook(useToastsManager);

    const message = "toast message";
    const type = "success";

    act(() => {
      result.current.addToast(message, type, 3000);
    });

    const toasts = result.current.toasts;
    const expectedToastsList = [
      <Toast message={message} type={type} key="12345" />,
    ];

    console.log({ toasts });

    expect(toasts).toEqual(expectedToastsList);
  });

  it("should remove toast", async () => {
    jest.useFakeTimers();

    const { result } = renderHook(useToastsManager);

    const message = "toast message";
    const type = "success";

    act(() => {
      result.current.addToast(message, type, 3000);
    });

    act(() => {
      jest.runAllTimers();
    });

    const toasts = result.current.toasts;

    await waitFor(() => {
      expect(toasts).toEqual([]);
    });
  });
});
