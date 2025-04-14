// src/app/components/PuppyForm.tsx
"use client";

import { useState } from "react";
// import { graphqlRequest } from '../lib/graphqlClient';

export default function PuppyForm({
  waitingListId,
}: {
  waitingListId: string;
}) {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    ownerName: "",
    ownerPhone: "",
    service: "bath",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   await graphqlRequest(ADD_PUPPY_MUTATION, {
    //     input: {
    //       ...formData,
    //       waitingListId,
    //       arrivalTime: new Date().toISOString(),
    //     },
    //   });
    //   // Reset form
    //   setFormData({
    //     name: '',
    //     breed: '',
    //     ownerName: '',
    //     ownerPhone: '',
    //     service: 'bath',
    //     notes: '',
    //   });
    //   // You might want to add a callback to refresh the waiting list
    // } catch (error) {
    //   console.error('Error adding puppy:', error);
    // }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Puppy</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Puppy Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
            Puppy Name
            </label>
            <input
              type="text"
              value={formData.breed}
              onChange={(e) =>
                setFormData({ ...formData, breed: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Owner Name
            </label>
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) =>
                setFormData({ ...formData, ownerName: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Owner Phone
            </label>
            <input
              type="tel"
              value={formData.ownerPhone}
              onChange={(e) =>
                setFormData({ ...formData, ownerPhone: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Service
          </label>
          <select
            value={formData.service}
            onChange={(e) =>
              setFormData({ ...formData, service: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="bath">Bath</option>
            <option value="grooming">Grooming</option>
            <option value="nail-trim">Nail Trim</option>
            <option value="full-service">Full Service</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add to Waiting List
        </button>
      </form>
    </div>
  );
}
