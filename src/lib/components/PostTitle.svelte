<script>
  import { page } from "$app/stores";
  import clsx from "clsx";

  export let slug = "";
  export let title;
  export let category;

  const id = slug
    .toLowerCase()
    .replace(/[^a-zA-Z ]/g, "")
    .replace(/\s/g, "-");
  const href = slug ? `/posts/${category}/${slug}` : "#" + id;
</script>

<h1
class={clsx(
    "not-prose m-1 ml-0",
    "text-lg font-semibold text-defaultColor-900 dark:text-darkDefaultColor-900",
    $page.route.id.includes("posts") && "mt-20 text-2xl"
  )}
>
  <a {href}>
    {title}
  </a>
</h1>
