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

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers,
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(`GitHub repos fetch failed: ${response.status}`);
      return NextResponse.json([]);
    }

    const data = await response.json();
    const repos = Array.isArray(data)
      ? data.map((repo: Record<string, unknown>) => ({
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          language: repo.language,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          updated_at: repo.updated_at,
        }))
      : [];

    return NextResponse.json(repos);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return NextResponse.json([]);
  }
}