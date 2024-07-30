import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";
import { Machine } from "./MachineStore";
import { Technician } from "./TechniciansStore";

export type Issue = {
  id: number;
  detail: string | null;
  techDetail: string | null;
  technician: Technician | null;
  status: string;
  updatedAt: string;
  machinePart: Machine;
};

interface IssuesStoreProps {
  issues: Issue[];
  fetchIssues: () => void;
}

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const useIssuesStore = create<IssuesStoreProps>()(
  devtools((set) => ({
    issues: [],
    fetchIssues: async () => {
      try {
        const res = await axios.get(`${url}/logs`);
        set({ issues: res.data });
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
      }
    },
  }))
);

export { useIssuesStore as useLogsStore };
