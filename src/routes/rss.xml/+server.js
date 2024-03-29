// This is an endpoint that generates a basic rss feed for your posts.
// It is OK to delete this file if you don't want an RSS feed.
// credit: https://scottspence.com/posts/make-an-rss-feed-with-sveltekit#add-posts-for-the-rss-feed

import { Posts } from "$lib/data/posts";
import { NAME, URL } from "$lib/constants/metadata";

export const prerender = true;

// update this to something more appropriate for your website
const websiteDescription = `${NAME}'s blog`;
const postsUrl = `${URL}/posts`;
const posts = new Posts();

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ setHeaders }) {
	setHeaders({
		"Cache-Control": `max-age=0, s-max-age=600`,
		"Content-Type": "application/xml"
	});

	const xml = `<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title>${NAME}</title>
        <link>${URL}</link>
        <description>${websiteDescription}</description>
        <atom:link href="${URL}/rss.xml" rel="self" type="application/rss+xml" />
        ${posts
					.getAllPosts()
					.map(
						(post) =>
							`
              <item>
                <guid>${postsUrl}/${post.category}/${post.slug}</guid>
                <title>${post.title}</title>
                <description>${post.description ?? ""}</description>
                <link>${postsUrl}/${post.category}/${post.slug}</link>
                <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            </item>
          `
					)
					.join("")}
      </channel>
    </rss>`;

	return new Response(xml);
}
