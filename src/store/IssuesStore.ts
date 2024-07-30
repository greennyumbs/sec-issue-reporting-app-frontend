import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

export type Issue = {
  issue_id: number;
  machine_id: string;
  issue_detail: string;
  tech_detail: string | null;
  technician_id: number | null;
  technician: Technician;
  status: string;
  updated_at: string;
  machine_part: {
    name: string;
    address: string;
  };
};

type Technician = {
  tech_name: string | null;
}

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
