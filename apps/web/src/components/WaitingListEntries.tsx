"use client";

import { useState } from "react";
import {
  Puppy,
  WaitingListEntry,
  WaitingList as WaitingListType,
} from "@/types";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useStore from "@/store";
import { cn } from "@/lib/utils";

const today = new Date().toISOString().split("T")[0] as string;

export default function WaitingList() {
  const waitingList = useStore((state) => state.waitingList);
  const [puppies, setPuppies] = useState<Puppy[]>([]);

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(puppies);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (reorderedItem) {
      items.splice(result.destination.index, 0, reorderedItem);
    }
    setPuppies(items);
  };

  const toggleServed = async (puppyId: number, served: boolean) => {};

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Waiting List for {today}</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="entries">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {waitingList?.entries?.map((entry, index) => (
                <Draggable
                  key={entry.id}
                  draggableId={entry.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        "p-4 border rounded-lg flex justify-between items-center",
                        entry.puppy?.serviced ? "bg-gray-100" : "bg-white"
                      )}
                    >
                      <div>
                        <h3 className="font-medium">
                          {entry.puppy?.puppyName} (
                          {entry.puppy?.serviced ? "Served" : "Not Served"})
                        </h3>
                        <p className="text-sm text-gray-600">
                          Owner: {entry.puppy?.ownerName}
                        </p>
                        <p className="text-sm">
                          Service: {entry.puppy?.serviceRequested}
                        </p>
                        <p className="text-xs text-gray-500">
                          Arrived:{" "}
                          {entry.puppy?.arrivalTime &&
                            new Date(
                              entry.puppy?.arrivalTime
                            ).toLocaleTimeString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          Notes: Notes go here...
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={entry.puppy?.serviced || false}
                            onChange={(e) =>
                              toggleServed(
                                entry.puppy?.id || 0,
                                e.target.checked
                              )
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
