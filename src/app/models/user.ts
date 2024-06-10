export type User = {
  id: number;
  username: string;
  avatar_url: string;
  url: string;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type Repo = {
  id: number;
  name: string;
  url: string;
  description: string | null;
  topics: string[];
  created_at: string;
  homepage: string | null;
};
