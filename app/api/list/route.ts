import { NextResponse } from "next/server";

import data from "@/data/best.json";
import { type HNPost } from "@/app/lib/types";

function cleanPostData(post: HNPost) {
  const thisYear = new Date().getFullYear();
  const dbDate = post.date.split(" ")[0].split("-");
  const year = dbDate[0];

  if (year === thisYear.toString()) {
    dbDate.shift(); // remove year if it's current year
  } else {
    dbDate[0] = dbDate[0].slice(2); // change "2023" to "23"
  }

  const date = dbDate.reverse().join("/");
  return { ...post, date };
}

export async function GET() {
  return NextResponse.json({ posts: data.map(cleanPostData) });
}
