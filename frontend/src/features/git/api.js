const GITHUB_API_URL = "https://api.github.com";

export const fetchRepositories = async () => {
  const query = `created:>${getThirtyDaysAgo()}`;
  const url = `${GITHUB_API_URL}/search/repositories?q=${query}&sort=stars&order=desc`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

const getThirtyDaysAgo = () => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  return thirtyDaysAgo.toISOString().split("T")[0];
};