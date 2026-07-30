import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;
  const githubToken = process.env.GITHUB_TOKEN;

  if (!username) {
    return NextResponse.json(
      { error: "Username required" },
      { status: 400 }
    );
  }

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };
    if (githubToken) {
      headers.Authorization = `Bearer ${githubToken}`;
    }

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(`GitHub user fetch failed: ${response.status}`);
      return NextResponse.json({
        login: username,
        name: null,
        avatar_url: "",
        html_url: `https://github.com/${username}`,
        bio: null,
        public_repos: 0,
        followers: 0,
        following: 0,
      });
    }

    const data = await response.json();
    return NextResponse.json({
      login: data.login,
      name: data.name,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      bio: data.bio,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
    });
  } catch (error) {
    console.error("Failed to fetch GitHub user:", error);
    return NextResponse.json({
      login: username,
      name: null,
      avatar_url: "",
      html_url: `https://github.com/${username}`,
      bio: null,
      public_repos: 0,
      followers: 0,
      following: 0,
    });
  }
}