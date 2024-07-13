// "use client"; // Enable client components for SWR

// import React, { useState, useEffect } from 'react';
// import useSWR from 'swr';
// import { useRouter } from 'next/navigation';

// import NewWorkItemForm from '../components/NewWorkItemForm';
// import WorkFilter from '../components/WorkFilter'; // Optional
// import { WorkItem } from '../types'; // Define your WorkItem type

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const WorkListPage: React.FC = () => {
//   const router = useRouter();
//   const { data: workItems, error, mutate } = useSWR<WorkItem[]>('/api/work', fetcher);
//   const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'IN PROGRESS' | 'COMPLETED'>('ALL');

//   useEffect(() => {
//     const updateWorkItems = (updatedWorkItem: WorkItem) => {
//       mutate((prevWorkItems) =>
//         prevWorkItems?.map((item) => (item.id === updatedWorkItem.id ? updatedWorkItem : item))
//       );
//     };

//     // Subscribe to real-time updates (e.g., WebSockets, SSE)
//     // ... and call updateWorkItems when a work item changes

//     return () => {
//       // Unsubscribe from real-time updates
//     };
//   }, [mutate]);

//   const handleNewWorkItem = async (newWorkItem: WorkItem) => {
//     const response = await fetch('/api/work', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newWorkItem),
//     });

//     if (response.ok) {
//       const createdWorkItem = await response.json();
//       mutate((prevWorkItems) => [createdWorkItem, ...(prevWorkItems || [])]);
//     } else {
//       // Handle error
//     }
//   };

//   const handleDeleteWorkItem = async (workItemId: number) => {
//     const response = await fetch(`/api/work/${workItemId}`, { method: 'DELETE' });
//     if (response.ok) {
//       mutate((prevWorkItems) => prevWorkItems?.filter((item) => item.id !== workItemId));
//     } else {
//       // Handle error
//     }
//   };

//   const filteredWorkItems = workItems?.filter((item) =>
//     filter === 'ALL' ? true : item.status === filter
//   );

//   if (error) return <div>Failed to load work items</div>;
//   if (!workItems) return <div>Loading work items...</div>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Work List</h1>

//       {/* Optional Filter Component */}
//       {/* <WorkFilter filter={filter} setFilter={setFilter} /> */}

//       <NewWorkItemForm onNewWorkItem={handleNewWorkItem} />

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//         {filteredWorkItems.map((workItem) => (
//           <WorkCard
//             key={workItem.id}
//             workItem={workItem}
//             onDelete={handleDeleteWorkItem}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WorkListPage;
