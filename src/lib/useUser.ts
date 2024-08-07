import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";

interface IUser {
  last_login: string;
  created_at: string;
  modified_at: string;
  username: string;
  name: string;
  email: string;
}

export default function useUser() {
  const {
    isLoading,
    data: user,
    isError,
  } = useQuery<IUser>({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });
  return {
    isLoading,
    user,
    isLoggedIn: !isError,
  };
}
