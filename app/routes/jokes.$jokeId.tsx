
import { db } from "~/utils/db.server";

import { LoaderArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const joke = await db.joke.findUnique({
    where: {id: params.jokeId}
  });

  if (!joke) {
    throw new Error("Joke not found")
  };
  
  return json({joke});
};

export default function JokeRoute() {
  const data = useLoaderData<typeof loader>();

    return (
      <div>
        <p>Here's your hilarious joke:</p>
        <p>{data.joke.content}</p>
      </div>
    );
  }
  