import { DownloadSongProvider } from "@/components/DownloadSongProvider/DownloadSongProvider";
import { ToastsProvider } from "@/components/ToastsProvider/ToastsProvider";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../../tamagui.config";
import { ReactNode } from "react";
import { render, RenderOptions } from "@testing-library/react-native";

function Providers({ children }: { children: ReactNode }) {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ToastsProvider>
        <DownloadSongProvider>{children}</DownloadSongProvider>
      </ToastsProvider>
    </TamaguiProvider>
  );
}

const customRender = (
  component: React.ReactElement,
  options?: RenderOptions,
) => {
  return render(<Providers>{component}</Providers>, options);
};
export * from "@testing-library/react-native";
export { customRender as render };
