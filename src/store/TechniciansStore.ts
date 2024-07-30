import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";

export type Technician = {
  technician_id: number;
  tech_name: string;
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
        const res = await axios.get(`${url}/technician`);
        set({ technicians: res.data });
      } catch (e) {
        toast.error("Error fetching technicians");
      }
    },
    assignTechnician: async (body) => {
      try {
        const res = await axios.patch(`${url}/technician/assign`, body);
        console.log(res.data);
      } catch (e) {
        toast.error("Error patching technicians");
      }
    },
  }))
);

export { useTechniciansStore };
