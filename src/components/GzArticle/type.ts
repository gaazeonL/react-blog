export type FromFatherProps = {
  title?: string;
  cover?: string;
  description?: string;
  time?: string;
  deleteBtn?: boolean;
  editBtn?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
};

export type CoverStyleProps = {
  cover?: string;
};
