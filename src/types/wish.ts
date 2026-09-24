export interface Wish {
  id: string;
  wish: string;
  description: string;
  img?: string;
  completed: boolean;
  editDate: string;
}

export type WishFormState = Partial<Wish> & {
  clearForm?: boolean;
  success?: boolean;
  error?: string;
};
