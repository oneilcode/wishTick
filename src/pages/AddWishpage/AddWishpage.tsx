import { useActionState } from "react";
import cls from "./AddWishpage.module.css";
import { Loader } from "../../components/Loader";
import { WishForm } from "../../components/WishForm";
import { createWish } from "../../api/wishes";
import type { WishFormState } from "../../types/wish";

const dateFormat = (date: Date | number): string => {
  return Intl.DateTimeFormat("ru-Ru", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(date);
};

const createCardAction = async (
  _prevState: WishFormState,
  formData: FormData,
): Promise<WishFormState> => {
  try {
    const newWishCard = Object.fromEntries(formData) as {
      wish: string;
      description: string;
      img: string;
      clearForm?: string;
    };

    const isClearForm = newWishCard.clearForm;

    const { data, error } = await createWish({
      wish: newWishCard.wish,
      description: newWishCard.description,
      img: newWishCard.img,
      editDate: dateFormat(new Date()),
    });

    if (error) {
      return { error: error.message };
    }

    return isClearForm ? { success: true } : { ...data, success: true };
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const AddWishpage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, { clearForm: true });

  return (
    <>
      {isPending && <Loader />}

      <h2 className={cls.formTitle}>Добавить желание</h2>

      <WishForm
        formAction={formAction}
        isPending={isPending}
        formState={formState}
        submitBtnText="Добавить желание"
      />

      {formState.success && !isPending && (
        <p className={cls.formMessage}>Желание успешно добавлено!</p>
      )}

      {formState.error && !isPending && (
        <p className={cls.formMessage}>Ошибка: {formState.error}</p>
      )}
    </>
  );
};
