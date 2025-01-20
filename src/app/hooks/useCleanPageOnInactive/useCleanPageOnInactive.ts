/* eslint-disable react-hooks/exhaustive-deps */
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";

export function useCleanPageOnInactive(page: React.JSX.Element, path: string) {
  const [screen, setScreen] = useState<React.JSX.Element | null>(page);
  const currentPath = usePathname();

  useEffect(() => {
    const screen = currentPath === path ? page : null;

    setScreen(screen);
  }, [currentPath]);

  return screen;
}
