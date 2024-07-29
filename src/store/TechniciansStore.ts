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
        const res = await axios.get(`${url}/technician`);
    
        const transformedData = res.data.map((item: { technician_id: number; tech_name: string; }) => {
          return {
            technicianId: item.technician_id,
            technicianName: item.tech_name 
          };
        });
    
        set({ technicians: transformedData });
      } catch (e) {
        toast.error("Error fetching technicians");
      }
    },
    assignTechnician: async (body) => {
      console.log("Assign Technician to Issue: ", body);
    },
  }))
);

export { useTechniciansStore };
