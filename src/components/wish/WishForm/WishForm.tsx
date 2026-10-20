import type { WishFormState } from "@/types/wish";
import { Button } from "../../ui/Button";
import cls from "./WishForm.module.css";
import { generateWishSuggestion } from "@/api/ai";
import { useState } from "react";
import { toast } from "sonner";

interface WishFormProps {
  formAction: (formData: FormData) => void;
  formState: WishFormState;
  isPending: boolean;
  submitBtnText: string;
}

export const WishForm = ({ formAction, formState, isPending, submitBtnText }: WishFormProps) => {
  const [aiKeywords, setAiKeywords] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const onGenerateIdea = async () => {
    if (!aiKeywords.trim()) {
      toast.error("Введи ключевые слова");
      return;
    }

    setIsGenerating(true);

    try {
      const { title, description } = await generateWishSuggestion(aiKeywords);
      const wishField = document.getElementById("wishField") as HTMLTextAreaElement | null;
      const descField = document.getElementById("descField") as HTMLTextAreaElement | null;

      if (wishField) wishField.value = title;
      if (descField) descField.value = description;

      toast.success("Готово! Проверь поля");
      setAiKeywords("");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Не удалось сгенерировать";
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form className={cls.formContainer} action={formAction}>
      <input type="text" name="wishId" defaultValue={formState.id} hidden />

      <div className={cls.aiBlock}>
        <label htmlFor="aiKeywords" className={cls.aiLabel}>
          ✨ Помоги с идеями
        </label>
        <p className={cls.aiHint}>Введи ключевые слова — AI сформулирует желание за тебя</p>
        <div className={cls.aiRow}>
          <input
            id="aiKeywords"
            type="text"
            value={aiKeywords}
            onChange={(e) => setAiKeywords(e.target.value)}
            placeholder="Например: Япония, путешествия, март 2027"
            className={cls.aiInput}
            disabled={isGenerating}
          />
          <button
            type="button"
            className={cls.aiButton}
            onClick={onGenerateIdea}
            disabled={isGenerating || !aiKeywords.trim()}
          >
            {isGenerating ? "Генерирую..." : "Сформулировать"}
          </button>
        </div>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="wishField">Ваше желание*</label>
        <textarea
          defaultValue={formState.wish}
          name="wish"
          id="wishField"
          cols={30}
          rows={2}
          required
        ></textarea>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="descField">Добавьте подробное описание</label>
        <textarea
          defaultValue={formState.description}
          name="description"
          id="descField"
          cols={30}
          rows={3}
        ></textarea>
      </div>

      <div className={cls.formControl}>
        <label htmlFor="img">Добавьте ссылку на картинку в формате https://...</label>
        <textarea defaultValue={formState.img} name="img" id="img" cols={30} rows={2}></textarea>
      </div>

      <Button isDisabled={isPending}>{submitBtnText}</Button>
    </form>
  );
};
