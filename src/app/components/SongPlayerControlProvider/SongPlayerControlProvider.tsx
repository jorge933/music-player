import { SongPlayerControlContext } from "@/contexts/songPlayerControl/songPlayerControlContext";
import { useSongPlayerControl } from "@/hooks/useSongPlayerControl/useSongPlayerControl";
import { ReactNode } from "react";

export function SongPlayerControlProvider({
  children,
}: {
  children: ReactNode;
}) {
  const player = useSongPlayerControl();

  return (
    <SongPlayerControlContext.Provider value={player}>
      {children}
    </SongPlayerControlContext.Provider>
  );
}
