type Return<T extends string[]> = Record<T[number], string>;

export function getEnvironmentVariables<T extends string[]>(
  ...variablesNames: T
): Return<T> {
  const initialValue = {} as Return<T>;

  const variables = variablesNames.reduce((previous, variable: T[number]) => {
    const variableName = `EXPO_PUBLIC_${variable}`;
    const value = process.env[variableName] as string;

    previous[variable] = value;

    return previous;
  }, initialValue);

  return variables;
}
