import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";
import { DownloadManagerPage } from "@/pages/DownloadManager/DownloadManagerPage";

export default function DownloadManager() {
  const screen = useCleanPageOnInactive(
    <DownloadManagerPage />,
    "/download-manager",
  );

  return screen;
}
