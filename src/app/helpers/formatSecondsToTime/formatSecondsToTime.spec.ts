import { formatSecondsToTime } from "./formatSecondsToTime";

describe("formatSecondsToTime", () => {
  it("should format time correctly when less than 1 hour", () => {
    const seconds = 85;

    const result = formatSecondsToTime(seconds);
    const expected = "01:25";

    expect(result).toBe(expected);
  });

  it("should format time correctly for 1 hour", () => {
    const seconds = 3600;

    const result = formatSecondsToTime(seconds);
    const expected = "01:00:00";

    expect(result).toBe(expected);
  });

  it("should format time correctly for more than 1 hour", () => {
    const seconds = 3665;

    const result = formatSecondsToTime(seconds);
    const expected = "01:01:05";

    expect(result).toBe(expected);
  });

  it("should format time correctly with minutes and seconds, without hours", () => {
    const seconds = 125;

    const result = formatSecondsToTime(seconds);
    const expected = "02:05";

    expect(result).toBe(expected);
  });

  it("should format time correctly with seconds only", () => {
    const seconds = 45;

    const result = formatSecondsToTime(seconds);
    const expected = "00:45";

    expect(result).toBe(expected);
  });

  it("should format time correctly for zero seconds", () => {
    const seconds = 0;

    const result = formatSecondsToTime(seconds);
    const expected = "00:00";

    expect(result).toBe(expected);
  });

  it("should format time correctly for multiple hours", () => {
    const seconds = 10000;

    const result = formatSecondsToTime(seconds);
    const expected = "02:46:40";

    expect(result).toBe(expected);
  });
});
