export interface CustomDialogProps {
  open: boolean;
  setOpen: (newValue: boolean) => void;
  children: ChildrenType;
  title: string;
}

export type ChildrenType = React.JSX.Element;
