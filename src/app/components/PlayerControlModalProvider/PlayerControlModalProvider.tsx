import { PlayerControlModalContext } from "@/contexts/playerControlModal/playerControlModalContext";
import { ReactNode, useState } from "react";

export function PlayerControlModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [playerControlModalIsOpen, setPlayerControlModal] = useState(false);
  const contextValue = {
    playerControlModalIsOpen,
    closePlayerControlModal: () => setPlayerControlModal(false),
    openPlayerControlModal: () => setPlayerControlModal(true),
  };

  return (
    <PlayerControlModalContext.Provider
      value={contextValue}
      children={children}
    />
  );
}
