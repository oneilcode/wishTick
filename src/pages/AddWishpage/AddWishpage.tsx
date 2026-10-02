import { useActionState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import cls from "./AddWishpage.module.css";
import { Loader } from "@/components/ui/Loader";
import { WishForm } from "@/components/wish/WishForm";
import { createWish } from "@/api/wishes";
import type { WishFormState } from "@/types/wish";

const createCardAction = async (
  _prevState: WishFormState,
  formData: FormData,
): Promise<WishFormState> => {
  try {
    const newWishCard = Object.fromEntries(formData) as {
      wish: string;
      description: string;
      img: string;
    };

    const { data, error } = await createWish({
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
    console.error(error);
    return { error: "Не удалось добавить желание" };
  }
};

export const AddWishpage = () => {
  const navigate = useNavigate();

  const [formState, formAction, isPending] = useActionState(createCardAction, {});

  const isRedirecting = formState.success === true;

  useEffect(() => {
    if (formState.success) {
      toast.success("Желание успешно добавлено!");
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

      <h2 className={cls.formTitle}>Добавить желание</h2>

      <WishForm
        formAction={formAction}
        isPending={isPending}
        formState={formState}
        submitBtnText="Добавить желание"
      />
    </>
  );
};
