export interface CustomDialogProps {
  open: boolean;
  setOpen: (newValue: boolean) => void;
  children: ChildrenType;
  title: string;
  onDialogClose?: () => void;
}

export type ChildrenType = React.JSX.Element | React.JSX.Element[];
