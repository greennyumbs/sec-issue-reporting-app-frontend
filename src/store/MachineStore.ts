import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

export type Machine = {
  id: number;
  name: string;
  address?: string;
};

interface MachineStoreProps {
  machines: Machine[];
  fetchMachines: () => void;
}

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const useMachineStore = create<MachineStoreProps>()(
  devtools((set) => ({
    machines: [],
    fetchMachines: async () => {
      try {
        const res = await axios.get(`${url}/machine`);
        set({ machines: res.data.data });
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
      }
    },
  }))
);

export { useMachineStore };
