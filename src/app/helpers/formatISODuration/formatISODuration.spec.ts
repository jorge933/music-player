import { formatISODuration } from "./formatISODuration";

const calcTimeInSeconds = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
}: Record<string, number>) => {
  const hoursInSeconds = hours * 3600;
  const minutesInSeconds = minutes * 60;

  return hoursInSeconds + minutesInSeconds + seconds;
};

describe("formatISODuration", () => {
  it("should format hours", () => {
    const hours = 3;
    const minutes = 21;
    const seconds = 10;

    const result = formatISODuration(`PT${hours}H${minutes}M${seconds}S`);

    const expected = calcTimeInSeconds({ hours, minutes, seconds });

    expect(result).toBe(expected);
  });

  it("should format minutes", () => {
    const minutes = 21;
    const seconds = 10;

    const result = formatISODuration(`PT${minutes}M${seconds}S`);

    const expected = calcTimeInSeconds({ minutes, seconds });

    expect(result).toBe(expected);
  });

  it("should format seconds", () => {
    const seconds = 10;

    const result = formatISODuration(`PT${seconds}S`);

    const expected = calcTimeInSeconds({ seconds });

    expect(result).toBe(expected);
  });

  it("should format hours and minutes", () => {
    const hours = 2;
    const minutes = 30;

    const result = formatISODuration(`PT${hours}H${minutes}M`);

    const expected = calcTimeInSeconds({ hours, minutes, seconds: 0 });

    expect(result).toBe(expected);
  });
});
