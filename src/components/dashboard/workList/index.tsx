import { WorkItem } from "@/app/types";
import { ConfirmationModal } from "@/components/confirmationModal";
import { Navbar } from "@/components/navbar";
import { WorkItemForm } from "@/components/workItemForm";
import { WorkTable } from "@/components/workTable";
import { mockWork } from "@/store/mock";
import { useState } from "react";

export const WorkListDashboard: React.FC = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>(mockWork);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedWorkItem, setSelectedWorkItem] = useState<WorkItem | null>(
    null
  );
  const [workItemToDelete, setWorkItemToDelete] = useState<WorkItem | null>(
    null
  );

  const handleNewWorkItem = (newItem: WorkItem) => {
    setWorkItems([...workItems, newItem]);
  };

  const handleEditWorkItem = (updatedItem: WorkItem) => {
    setWorkItems(
      workItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteWorkItem = async () => {
    if (workItemToDelete) {
      setWorkItems(workItems.filter((item) => item.id !== workItemToDelete.id));
      setIsConfirmModalOpen(false);
      setWorkItemToDelete(null);
    }
  };

  const handleEditClick = (workItem: WorkItem) => {
    setSelectedWorkItem(workItem);
    setIsEditModalOpen(true);
  };

  const handleConfirmDeleteClick = (workItem: WorkItem) => {
    setWorkItemToDelete(workItem);
    setIsConfirmModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Work List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
        >
          Add New Work Item
        </button>
      </div>
      <WorkTable
        workItems={workItems}
        onEdit={handleEditClick}
        onConfirmDelete={handleConfirmDeleteClick}
      />
      {isModalOpen && (
        <div className="modal modal-open">
          <WorkItemForm
            type="ADD"
            onSave={handleNewWorkItem}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
      {isEditModalOpen && selectedWorkItem && (
        <div className="modal modal-open">
          <WorkItemForm
            type="EDIT"
            item={selectedWorkItem}
            onSave={handleEditWorkItem}
            onClose={() => setIsEditModalOpen(false)}
          />
        </div>
      )}
      {isConfirmModalOpen && (
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onConfirm={handleDeleteWorkItem}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}
    </div>
  );
};
