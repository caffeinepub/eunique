import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product, Review } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetFeaturedProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["featured-products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubscribeNewsletter() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Actor not available");
      const already = await actor.isEmailSubscribed(email);
      if (already) throw new Error("already_subscribed");
      await actor.subscribeNewsletter(email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter"] });
    },
  });
}

// Product ID for the Art Is Alive tee
const ART_IS_ALIVE_PRODUCT_ID = BigInt(1);

export function useGetReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReviews(ART_IS_ALIVE_PRODUCT_ID);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      rating,
      text,
    }: {
      name: string;
      rating: number;
      text: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.submitReview(
        ART_IS_ALIVE_PRODUCT_ID,
        name,
        BigInt(rating),
        text,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
