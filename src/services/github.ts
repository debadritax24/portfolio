import type {
  ContributionData,
  ContributionYearsResponse,
  GitHubUser,
  GitHubRepo,
} from "@/types/github";

const contributionsCache = new Map<string, Promise<ContributionData>>();
const yearsCache = new Map<string, Promise<ContributionYearsResponse>>();

export async function fetchGitHubContributions(
  username: string
): Promise<ContributionData> {
  if (contributionsCache.has(username)) {
    return contributionsCache.get(username)!;
  }

  const promise = fetch(`/api/github/contributions/${username}`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch GitHub contributions");
    }
    return res.json();
  }).catch((err) => {
    contributionsCache.delete(username);
    throw err;
  });

  contributionsCache.set(username, promise);
  return promise;
}

export async function fetchGitHubContributionYears(
  username: string
): Promise<ContributionYearsResponse> {
  if (yearsCache.has(username)) {
    return yearsCache.get(username)!;
  }

  const promise = fetch(`/api/github/contributions-all/${username}`).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch GitHub contribution years");
    }
    return res.json();
  }).catch((err) => {
    yearsCache.delete(username);
    throw err;
  });

  yearsCache.set(username, promise);
  return promise;
}

const userCache = new Map<string, Promise<GitHubUser>>();
const reposCache = new Map<string, Promise<GitHubRepo[]>>();

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  if (userCache.has(username)) {
    return userCache.get(username)!;
  }
  
  const promise = fetch(`https://api.github.com/users/${username}`).then(res => {
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  }).catch(err => {
    userCache.delete(username);
    throw err;
  });
  
  userCache.set(username, promise);
  return promise;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  if (reposCache.has(username)) {
    return reposCache.get(username)!;
  }
  
  const promise = fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`).then(res => {
    if (!res.ok) throw new Error("Failed to fetch repos");
    return res.json();
  }).catch(err => {
    reposCache.delete(username);
    throw err;
  });
  
  reposCache.set(username, promise);
  return promise;
}

export function normalizeContributionData(
  data: ContributionData
): ContributionData {
  return data;
}
