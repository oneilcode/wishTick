import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import cls from "./IdeasPage.module.css";
import { Button } from "@/components/ui/Button";
import { Loader } from "@/components/ui/Loader";
import type { UnsplashPicture } from "@/types/unsplash";

const COUNT = 24;

export const IdeasPage = () => {
  const navigate = useNavigate();

  const [pictures, setPictures] = useState<UnsplashPicture[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  const getPictures = useCallback(async () => {
    try {
      setLoading(true);
      setLoadedImages(new Set());

      const response = await fetch(`https://api.unsplash.com/photos/random?count=${COUNT}`, {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка загрузки: ${response.status}`);
      }

      const data: UnsplashPicture[] = await response.json();
      setPictures(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Не удалось загрузить идеи";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPictures();
  }, [getPictures]);

  const onRefresh = () => {
    getPictures();
  };

  const onPictureClick = (picture: UnsplashPicture) => {
    navigate("/addwish", {
      state: { prefillImg: picture.urls.regular },
    });
  };

  return (
    <div className={cls.page}>
      <div className={cls.header}>
        <h1 className={cls.title}>Вдохновись идеями</h1>
        <Button onClick={onRefresh} isDisabled={isLoading}>
          {isLoading ? "Загрузка..." : "Обновить"}
        </Button>
      </div>

      {isLoading && pictures.length === 0 && <Loader />}

      {!isLoading && pictures.length === 0 && (
        <p className={cls.empty}>Не удалось загрузить идеи. Попробуйте ещё раз.</p>
      )}

      <div className={cls.picturesWrapper}>
        {pictures.map((picture) => (
          <button
            key={picture.id}
            type="button"
            className={cls.pictureCard}
            onClick={() => onPictureClick(picture)}
            aria-label="Добавить в желания"
          >
            <div className={cls.imageContainer}>
              {!loadedImages.has(picture.id) && <div className={cls.skeleton} />}
              <img
                src={picture.urls?.small}
                alt={picture.alt_description || "Идея"}
                className={cls.pictureImage}
                style={{ opacity: loadedImages.has(picture.id) ? 1 : 0 }}
                loading="lazy"
                onLoad={() => setLoadedImages((prev) => new Set(prev).add(picture.id))}
                onError={() => setLoadedImages((prev) => new Set(prev).add(picture.id))}
              />

              <div className={cls.overlay}>
                <span className={cls.overlayIcon}>+</span>
                <span className={cls.overlayText}>Добавить в желания</span>
              </div>

              <span className={cls.mobilePlus} aria-hidden="true">
                +
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
