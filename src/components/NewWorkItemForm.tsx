"use client"; // Enable client components for form state

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WorkItem } from "@/app/types";

interface NewWorkItemFormProps {
  onNewWorkItem: (newWorkItem: WorkItem) => Promise<void>;
}

const NewWorkItemForm: React.FC<NewWorkItemFormProps> = ({ onNewWorkItem }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<WorkItem>({
    id: 0,
    machineId: "",
    machineName: "",
    createdBy: { name: "John Doe", position: "Employee" }, // Replace with dynamic fetching
    issueDetailDescription: "",
    fixDetailDescription: "",
    status: "PENDING",
    createdTimestamp: new Date().toISOString(),
  });

  const [formErrors, setFormErrors] = useState<Partial<WorkItem>>({});
  const [submissionError, setSubmissionError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      await onNewWorkItem(formData); // Pass formData to the parent component
      setFormData({
        ...formData,
        machineId: "",
        machineName: "",
        issueDetailDescription: "",
        fixDetailDescription: "", // Clear fields after successful submission
      });
    } catch (error) {
      setSubmissionError("Failed to create work item. Please try again.");
      console.error("Error creating work item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (data: WorkItem) => {
    const errors: Partial<WorkItem> = {};
    if (!data.machineId.trim()) errors.machineId = "Machine ID is required";
    if (!data.machineName.trim())
      errors.machineName = "Machine Name is required";
    if (!data.issueDetailDescription.trim())
      errors.issueDetailDescription = "Issue details are required";
    // Add more validation rules as needed
    return errors;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 mb-4"
    >
      <h2 className="text-lg font-semibold mb-2">Create New Work Item</h2>
      {submissionError && (
        <p className="text-red-500 text-xs">{submissionError}</p>
      )}

      {/* ... input fields for machineId, machineName, issueDetailDescription (same as previous examples) */}

      {/* Conditional fixDetailDescription field */}
      {formData.createdBy.position === "Technician" && (
        <div className="mb-4">
          <label
            htmlFor="fixDetailDescription"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Fix Details:
          </label>
          <textarea
            id="fixDetailDescription"
            name="fixDetailDescription"
            value={formData.fixDetailDescription}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Create"}
      </button>
    </form>
  );
};

export default NewWorkItemForm;
