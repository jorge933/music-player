type Return<T extends string[]> = Record<T[number], string>;

export function getEnvironmentVariables<T extends string[]>(
  ...variables: T
): Return<T> {
  return variables.reduce((previous, variable) => {
    previous[variable as T[number]] = process.env[
      `EXPO_PUBLIC_${variable}`
    ] as string;

    return previous;
  }, {} as Return<T>);
}
