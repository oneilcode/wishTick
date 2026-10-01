import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { useParams } from "react-router-dom";
import { EditWish } from "./EditWish";
import { useFetch } from "@/hooks/useFetch";
import { getWishById } from "@/api/wishes";
import type { Wish } from "@/types/wish";

export const EditWishPage = () => {
  const { id } = useParams();
  const [wish, setWish] = useState<Wish | null>(null);

  const [fetchWish, isWishLoading] = useFetch<void, void>(async (): Promise<void> => {
    if (!id) return;

    const { data, error } = await getWishById(id);
    if (error) {
      console.error(error);
      return;
    }

    setWish(data);
  });

  useEffect(() => {
    fetchWish();
  }, []);

  const isLoading = isWishLoading || wish === null;

  return (
    <>
      {isLoading && <Loader />}

      {wish && <EditWish initialState={wish} />}
    </>
  );
};

export default EditWishPage;
