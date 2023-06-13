import { Fragment, useState, useEffect } from "react";
import facade from "../../ApiFacade";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function AdminHome() {
  const [event, setEvent] = useState({
    eventName: "",
    time: "",
    location: "",
    dish: "",
    pricePerPerson: null,
  });
  const [assignment, setAssignment] = useState({
    familyName: "",
    createDate: "",
    contactInfo: "",
  });
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  //Use effect to get all events
  useEffect(() => {
    facade.getEvents().then((data) => setEvents(data));
  }, []);

  //use effect to get all assignments
  useEffect(() => {
    facade.getAssignments().then((data) => setAssignments(data));
  }, []);

  //Handle assignment change
  function handleAssignmentChange(e) {
    setAssignment({
      ...assignment,
      [e.target.name]: e.target.value,
    });
  }

  //Handle assignment submit
  function handleAssignmentSubmit(e) {
    e.preventDefault();
    facade.createAssignment(assignment);
  }

  function handleChange(e) {
    if (e.target.name === "pricePerPerson") {
      setEvent({
        ...event,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setEvent({
        ...event,
        [e.target.name]: e.target.value,
      });
    }
  }
  //Creates a  event
  function handleSubmit(e) {
    e.preventDefault();
    facade.createEvent(event);
    setOpen(false);
  }

  //Edits an event
  function handleEditSubmit(e) {
    e.preventDefault();
    facade.updateEvent(selectedEvent.id, event);
  }

  //Click edit button
  function handleEditClick(e) {
    setEditOpen(true);
    setSelectedEvent(e);
  }

  //deletes an event
  function handleDelete(id) {
    facade.deleteEvent(id);
  }

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
  }

  // Handle search submit
  function handleSearchSubmit(e) {
    e.preventDefault();
    // Search for users and add them to the assignment here
  }

  return (
    <Fragment>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">A list of all events.</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => setOpen(true)}
            >
              Create Event
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Location
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Dish
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Price pr person
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Time
                    </th>

                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{event.eventName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.location}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.dish}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.pricePerPerson}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.time}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex flex-col">
                          {event.assignment && event.assignment.map((data) => <span key={data.id}></span>)}
                          <div>
                            <button
                              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              onClick={() => setIsAssignModalOpen(true)}
                            >
                              Assign
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button onClick={() => handleEditClick(event)}>Edit</button>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            handleDelete(event.id);
                          }}
                          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Add this Modal after your table */}
      {isAssignModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"></div>

            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Assign User</h3>

              {/* Search bar */}
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <input type="text" value={searchTerm} onChange={handleSearchChange} className="w-full py-2 px-4 text-gray-700 bg-gray-200 rounded" placeholder="Search for user" />
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Search
                </button>
              </form>

              {/* Assignment info form */}
              <form onSubmit={handleAssignmentSubmit}>
                {/* Replace this with your actual form inputs */}
                <input type="text" name="familyName" value={assignment.familyName} onChange={handleAssignmentChange} className="w-full py-2 px-4 mb-3 text-gray-700 bg-gray-200 rounded" placeholder="Family Name" />
                <input type="text" name="createDate" value={assignment.createDate} onChange={handleAssignmentChange} className="w-full py-2 px-4 mb-3 text-gray-700 bg-gray-200 rounded" placeholder="Create Date" />
                <input type="text" name="contactInfo" value={assignment.contactInfo} onChange={handleAssignmentChange} className="w-full py-2 px-4 mb-3 text-gray-700 bg-gray-200 rounded" placeholder="Contact Info" />
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Assign
                </button>
              </form>

              {/* Close button */}
              <button className="absolute top-0 right-0 p-4 text-gray-500 hover:text-gray-800" onClick={() => setIsAssignModalOpen(false)}>
                <XMarkIcon />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Event Modal */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                      <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                          <div className="flex items-center justify-between">
                            <Dialog.Title className="text-base font-semibold leading-6 text-white">New Event</Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button type="button" className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" onClick={() => setOpen(false)}>
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-indigo-300">Fill in the information where you wanna change the owner.</p>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="divide-y divide-gray-200 px-4 sm:px-6">
                            <div className="space-y-6 pb-5 pt-6">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Name of event</label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="eventName"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Location</label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="location"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Dish</label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="dish"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Time</label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="time"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Price per person</label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="pricePerPerson"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 justify-end px-4 py-4">
                        <button type="button" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={() => setOpen(false)}>
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={handleSubmit}
                        >
                          Create Owner
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Slide over for editing  */}

      <Transition.Root show={editOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setEditOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                      <div className="h-0 flex-1 overflow-y-auto">
                        <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                          <div className="flex items-center justify-between">
                            <Dialog.Title className="text-base font-semibold leading-6 text-white">New Boat</Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button type="button" className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" onClick={() => setEditOpen(false)}>
                                <span className="sr-only">Close panel</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-1">
                            <p className="text-sm text-indigo-300">Fill in the information to change the event info.</p>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div className="divide-y divide-gray-200 px-4 sm:px-6">
                            <div className="space-y-6 pb-5 pt-6">
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Event name</label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="eventName"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Event location</label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="location"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Event dish</label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="dish"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Event start time</label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="time"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Event price(Pr person)</label>
                                <div className="mt-2">
                                  <input
                                    type="number"
                                    name="pricePerPerson"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0 justify-end px-4 py-4">
                        <button type="button" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" onClick={() => setEditOpen(false)}>
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={handleEditSubmit}
                        >
                          Edit event
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
}
