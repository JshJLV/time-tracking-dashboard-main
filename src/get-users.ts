import type { UserActivity } from "./types/types";

export const getUserActivity = async (): Promise<UserActivity[]> => {
  const url = "/src/data/data.json";
  const res = await fetch(url);
  const data: UserActivity[] = await res.json();
  return data;
};
