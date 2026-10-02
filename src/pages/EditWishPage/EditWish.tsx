import { useActionState, useEffect } from "react";
import cls from "./EditWishPage.module.css";
import { Loader } from "@/components/ui/Loader";
import { WishForm } from "@/components/wish/WishForm";
import { updateWish } from "@/api/wishes";
import type { Wish, WishFormState } from "@/types/wish";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface EditWishProps {
  initialState: Wish;
}

const editCardAction = async (
  _prevState: WishFormState,
  formData: FormData,
): Promise<WishFormState> => {
  try {
    const newWishCard = Object.fromEntries(formData) as {
      wishId: string;
      wish: string;
      description: string;
      img: string;
    };

    const { data, error } = await updateWish(newWishCard.wishId, {
      wish: newWishCard.wish,
      description: newWishCard.description,
      img: newWishCard.img,
      editDate: new Date().toISOString(),
    });

    if (error) {
      return { error: error.message };
    }

    return { ...data, success: true };
  } catch (error) {
    console.log(error);
    return { error: "Не удалось отредактировать желание" };
  }
};

export const EditWish = ({ initialState }: EditWishProps) => {
  const navigate = useNavigate();

  const [formState, formAction, isPending] = useActionState(editCardAction, {
    ...initialState,
  });

  const isRedirecting = formState.success === true;

  useEffect(() => {
    if (formState.success) {
      toast.success("Желание успешно отредактировано!");
      navigate("/mywishes", { replace: true });
    }
  }, [formState.success, navigate]);

  useEffect(() => {
    if (formState.error) {
      toast.error(`Ошибка: ${formState.error}`);
    }
  }, [formState.error]);

  return (
    <>
      {(isPending || isRedirecting) && <Loader />}

      <h2 className={cls.formTitle}>Редактировать желание</h2>

      <WishForm
        formAction={formAction}
        isPending={isPending}
        formState={formState}
        submitBtnText="Сохранить изменения"
      />
    </>
  );
};
