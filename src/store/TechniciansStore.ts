import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

export type Technician = {
  technicianId: number;
  technicianName: string;
};

export type TechnicianAssignProps = {
  issueId: number;
  technicianId: number;
};

interface IssuesStoreProps {
  technicians: Technician[];
  fetchTechnicians: () => void;
  assignTechnician: (body: TechnicianAssignProps) => void;
}

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const useTechniciansStore = create<IssuesStoreProps>()(
  devtools((set) => ({
    technicians: [],
    fetchTechnicians: async () => {
      try {
        // const res = await axios.get(`${url}/logs`);
        const res = {
          data: [
            { technicianId: 1, technicianName: "โยฮัน ลีเบิท" },
            { technicianId: 2, technicianName: "อุจิฮะ ซาซูเกะ" },
            { technicianId: 3, technicianName: "คิม มินจี" },
          ],
        };
        set({ technicians: res.data });
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
      }
    },
    assignTechnician: async (body) => {
      console.log("Assign Technician to Issue: ", body);
    },
  }))
);

export { useTechniciansStore };
