import Trending from "app/(home)/Trending";
import Tech from "app/(home)/Tech";
import Travel from "app/(home)/Travel";
import Other from "app/(shared)/Other";
import Subscribe from "app/(shared)/Subscribe";
import Sidebar from "app/(shared)/Sidebar";
import { prisma } from "app/api/client";
import { Post } from "@prisma/client";

// Incremental Static Regeneration (ISR)
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// Set the default revalidation time for a layout or page. 
// This option does not override the revalidate value set by individual fetch requests
export const revalidate = 60;

// getting the components and pre-rendering from the backend `formatPosts()` to render to the frontend
const getPosts = async () => {
  const posts = await prisma.post.findMany();
  // console.log("🚀 ~ file: page.tsx:14 ~ getPosts ~ posts:", posts)

  const formattedPosts = await Promise.all(
    posts.map(async (post: Post) => {
      const imageModule = require(`../public${post.image}`);
      return {
        ...post,
        image: imageModule.default,
      };
    })
  );

  return formattedPosts;
};

export default async function Home() {
  const posts = await getPosts();

  const formatPosts = () => {
    const trendingPosts: Array<Post> = [];
    const techPosts: Array<Post> = [];
    const travelPosts: Array<Post> = [];
    const otherPosts: Array<Post> = [];

    posts.forEach((post: Post, i: number) => {
      if (i < 4) {
        trendingPosts.push(post);
      }
      if (post?.category === "Tech") {
        // Tech Post section
        techPosts.push(post);
      } else if (post?.category === "Travel") {
        // Travel Post section
        travelPosts.push(post);
      } else if (post?.category === "Interior Design") {
        // Other Trending Post section
        otherPosts.push(post);
      }
    });

    return [trendingPosts, techPosts, travelPosts, otherPosts];
  };

  const [trendingPosts, techPosts, travelPosts, otherPosts] = formatPosts();

  return (
    <main className="px-10 leading-7">
      {/* Trending section */}
      <Trending trendingPosts={trendingPosts} />
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          {/* Tech section */}
          <Tech techPosts={techPosts} />
          {/* Travel section */}
          <Travel travelPosts={travelPosts} />
          {/* Other Posts section */}
          <Other otherPosts={otherPosts} />
          <div className="hidden md:block">
            {/* hidden on mobile */}
            <Subscribe />
          </div>
        </div>
        <div className="basis-1/4">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}