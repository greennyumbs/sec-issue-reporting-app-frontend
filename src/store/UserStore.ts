import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type User = {
  role: string;
};

interface UserProps {
  user: User;
  assignRole: (role: string) => void;
}

const useUserStore = create<UserProps>()(
  devtools((set) => ({
    user: { role: "" },
    assignRole: (role: string) => {
      set({ user: { role } });
    },
  }))
);

export { useUserStore };
