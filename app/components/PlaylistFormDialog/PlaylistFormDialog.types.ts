export interface PlaylistFormDialogProps {
  setOpen: (newValue: boolean) => void;
  editInfos?: {
    id: number;
    defaultValues: DefaultValues;
  };
}

interface DefaultValues {
  name: string;
  description?: string;
  imageSource?: string;
}
