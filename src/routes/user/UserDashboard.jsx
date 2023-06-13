import { Fragment, useState, useEffect } from "react";
import facade from "../../ApiFacade";
import { Dialog, Transition } from "@headlessui/react";

export default function Dashboard({ username }) {
  const [events, setEvents] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUsersModalOpen, setIsAddUsersModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [assignment, setAssignment] = useState({
    familyName: "",
    createDate: "",
    contactInfo: "",
  });

  useEffect(() => {
    facade.getEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  useEffect(() => {
    facade.getAllUsers().then(setAllUsers);
  }, []);

  const handleUserSelection = (username) => {
    setSelectedUsers((prevUsers) => {
      if (prevUsers.includes(username)) {
        return prevUsers.filter((user) => user !== username);
      }
      return [...prevUsers, username];
    });
  };

  const handleAssignmentChange = (e) => {
    setAssignment({
      ...assignment,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();

    try {
      await facade.createAssignment(assignment);
      setIsModalOpen(false);
      // Perform any necessary cleanup or update actions after successful submission
    } catch (error) {
      // Handle any errors that occurred during the submission
      console.error(error);
    }
  };

  const handleAddUsers = () => {
    setIsAddUsersModalOpen(true);
  };

  const handleAddUsersSubmit = async () => {
    try {
      await facade.assignUsersToAssignment(selectedUsers);
      setIsAddUsersModalOpen(false);
      // Perform any necessary actions after successfully adding users
    } catch (error) {
      // Handle any errors that occurred while adding users
      console.error(error);
    }
  };

  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }

  const filteredUsers = allUsers.filter((user) => user.user_name.toLowerCase().includes(searchTerm));

  return (
    <Fragment>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">A list of all events, including their boat and the harbor the boat is in.</p>
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
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Email
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
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          type="button"
                          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() => setIsModalOpen(true)}
                        >
                          Add Assignment
                        </button>
                        <button
                          type="button"
                          className="mt-2 ml-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                          onClick={handleAddUsers}
                        >
                          Add Users
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

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setIsModalOpen(false)}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Add Assignment
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                      <div className="flex flex-col">
                        <label htmlFor="familyName" className="font-medium">
                          Family Name:
                        </label>
                        <input type="text" name="familyName" onChange={handleAssignmentChange} value={assignment.familyName} className="border border-gray-300 px-2 py-1 rounded-md" />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="createDate" className="font-medium">
                          Create Date:
                        </label>
                        <input type="text" name="createDate" onChange={handleAssignmentChange} value={assignment.createDate} className="border border-gray-300 px-2 py-1 rounded-md" />
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="contactInfo" className="font-medium">
                          Contact Info:
                        </label>
                        <input type="text" name="contactInfo" onChange={handleAssignmentChange} value={assignment.contactInfo} className="border border-gray-300 px-2 py-1 rounded-md" />
                      </div>

                      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Create Assignment
                      </button>
                    </form>
                  </div>
                </div>
                <div className="ml-3 mt-3 sm:mt-0 sm:ml-4 sm:pr-4 sm:order-2 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isAddUsersModalOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={() => setIsAddUsersModalOpen(false)}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-middle bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    Add Users
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleAddUsersSubmit} className="space-y-4">
                      <div className="flex flex-col">
                        <label htmlFor="searchUsers" className="font-medium">
                          Search Users:
                        </label>
                        <input type="text" onChange={handleSearch} value={searchTerm} className="border border-gray-300 px-2 py-1 rounded-md" />
                        <ul>
                          {filteredUsers.map((user) => (
                            <li key={user.user_name} className="flex items-center space-x-2">
                              <input type="checkbox" checked={selectedUsers.includes(user.user_name)} onChange={() => handleUserSelection(user.user_name)} className="form-checkbox border-gray-300 rounded" />
                              <span>{user.user_name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Add Users
                      </button>
                    </form>
                  </div>
                </div>
                <div className="ml-3 mt-3 sm:mt-0 sm:ml-4 sm:pr-4 sm:order-2 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setIsAddUsersModalOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
}
