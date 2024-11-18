export interface CustomDialogProps {
  open: boolean;
  children: ChildrenType;
  title: string;
  setOpen: (newValue: boolean) => void;
  onDialogClose?: () => void;
}

export type ChildrenType = React.JSX.Element | React.JSX.Element[];
