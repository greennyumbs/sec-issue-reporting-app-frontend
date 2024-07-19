import { WorkItem } from "@/app/types";
import dayjs from "dayjs";
import React, { useState, useEffect, useRef } from "react";

interface WorkItemFormProps {
  type: "ADD" | "EDIT";
  onSave: (item: WorkItem) => void;
  onClose: () => void;
  item?: WorkItem;
}

export const WorkItemForm: React.FC<WorkItemFormProps> = ({
  type,
  onSave,
  onClose,
  item,
}) => {
  const [formData, setFormData] = useState<WorkItem>({
    id: "",
    machineId: "",
    machineName: "",
    creatorName: "",
    creatorPosition: "",
    issueDetailDescription: "",
    fixDetailDescription: "",
    assigneeName: "",
    assigneeId: "",
    status: "NONE",
    createdTimestamp: dayjs().format("YYYY-MM-DD"),
    completedTimestamp: "-",
  });

  useEffect(() => {
    if (item && type === "EDIT") {
      setFormData(item);
    }
  }, [item, type]);

  const handleSave = () => {
    onSave(formData);
    onClose();
    console.log(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget as
      | HTMLInputElement
      | HTMLTextAreaElement;
    if (name) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  function handleStatusChange(e: React.MouseEvent<HTMLAnchorElement>) {
    const status = (e.currentTarget as HTMLAnchorElement).dataset.status;
    const validStatus = status as WorkItem["status"];
    setFormData((prevState) => ({
      ...prevState,
      status: validStatus,
    }));
  }

  return (
    <div className="modal-box">
      <h2 className="font-bold text-lg">
        {type === "ADD" ? "Add New Work Item" : "Edit Work Item"}
      </h2>
      <form>
        <input
          type="text"
          name="machineId"
          placeholder="Machine ID"
          value={formData.machineId}
          onChange={handleChange}
          className="input input-bordered w-full mb-2"
        />
        <input
          type="text"
          name="machineName"
          placeholder="Machine Name"
          value={formData.machineName}
          onChange={handleChange}
          className="input input-bordered w-full mb-2"
        />
        <input
          type="text"
          name="creatorName"
          placeholder="Created By (Name)"
          value={formData.creatorName}
          onChange={handleChange}
          className="input input-bordered w-full mb-2"
        />
        <input
          type="text"
          name="creatorPosition"
          placeholder="Created By (Position)"
          value={formData.creatorPosition}
          onChange={handleChange}
          className="input input-bordered w-full mb-2"
        />
        <div className="dropdown mb-2">
          <div
            tabIndex={0}
            role="button"
            className={`btn m-1 ${
              formData.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : formData.status === "IN PROGRESS"
                ? "bg-blue-100 text-blue-800"
                : formData.status === "COMPLETED"
                ? "bg-green-100 text-green-800"
                : formData.status === "CANCELED"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {formData.status} ⏷
          </div>
          <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <a data-status="PENDING" onClick={handleStatusChange}>
                Pending
              </a>
            </li>
            <li>
              <a data-status="IN PROGRESS" onClick={handleStatusChange}>
                In Progress
              </a>
            </li>
            <li>
              <a data-status="COMPLETED" onClick={handleStatusChange}>
                Completed
              </a>
            </li>
            <li>
              <a data-status="CANCELED" onClick={handleStatusChange}>
                Canceled
              </a>
            </li>
          </ul>
        </div>

        <textarea
          name="issueDetailDescription"
          placeholder="Issue Detail Description"
          value={formData.issueDetailDescription}
          onChange={handleChange}
          className="textarea textarea-bordered w-full mb-2 resize-none"
        />
      </form>
      {/* button */}
      <div className="flex justify-end">
        <button onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button onClick={handleSave} className="btn btn-primary ml-2">
          Save
        </button>
      </div>
    </div>
  );
};
