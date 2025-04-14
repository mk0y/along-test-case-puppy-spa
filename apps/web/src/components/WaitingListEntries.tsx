"use client";

import { useState } from "react";
import {
  Puppy,
  WaitingListEntry,
  WaitingList as WaitingListType,
} from "@/types";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const today = new Date().toISOString().split("T")[0] as string;

export default function WaitingList({
  waitingList,
  waitingListEntries,
}: {
  waitingList: WaitingListType;
  waitingListEntries: WaitingListEntry[];
}) {
  const [puppies, setPuppies] = useState<Puppy[]>(
    // waitingListEntries[0]?.puppy ?? []
    []
  );

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(puppies);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (reorderedItem) {
      items.splice(result.destination.index, 0, reorderedItem);
    }

    setPuppies(items);

    // try {
    //   await graphqlRequest(UPDATE_PUPPY_ORDER_MUTATION, {
    //     waitingListId: waitingList.id,
    //     puppyIds: items.map((p) => p.id),
    //   });
    // } catch (error) {
    //   console.error("Error updating order:", error);
    //   // Revert if error
    //   setPuppies(waitingList.puppies);
    // }
  };

  const toggleServed = async (puppyId: number, served: boolean) => {
    // try {
    //   await graphqlRequest(MARK_PUPPY_SERVED_MUTATION, {
    //     puppyId,
    //     served,
    //   });
    //   setPuppies(puppies.map((p) => (p.id === puppyId ? { ...p, served } : p)));
    // } catch (error) {
    //   console.error("Error marking puppy as served:", error);
    // }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Waiting List for {today}
      </h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="puppies">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {puppies.map((puppy, index) => (
                <Draggable
                  key={puppy.id}
                  draggableId={puppy.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-4 border rounded-lg flex justify-between items-center ${
                        puppy.serviced ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <div>
                        <h3 className="font-medium">
                          {puppy.puppyName} (
                          {puppy.serviceRequested ? "Served" : "Not Served"})
                        </h3>
                        <p className="text-sm text-gray-600">
                          Owner: {puppy.ownerName}
                        </p>
                        <p className="text-sm">
                          Service: {puppy.serviceRequested}
                        </p>
                        <p className="text-xs text-gray-500">
                          Arrived:{" "}
                          {new Date(puppy.arrivalTime).toLocaleTimeString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Notes: Notes go here...
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={puppy.serviced}
                            onChange={(e) =>
                              toggleServed(puppy.id, e.target.checked)
                            }
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          />
                          <span className="ml-2 text-sm">Served</span>
                        </label>
                      </div>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
