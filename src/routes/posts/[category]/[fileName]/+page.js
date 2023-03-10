import { error } from "@sveltejs/kit";
import slugFromPath from "$lib/utils/slugFromPath";

export const load = async ({ params }) => {
  const { fileName } = params;

  const modules = Object.entries(
    import.meta.glob(`/src/posts/*/*.{md,svx,svelte.md}`, { eager: true })
  );

  for (const [path, resolver] of modules) {
    if (slugFromPath(path) === fileName) {
      const { metadata, default: component } = resolver;

      return {
        component,
        metadata
      };
    }
  }

  throw error(404, "Post not found");
};
