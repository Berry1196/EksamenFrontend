import React from "react";
import { useState } from "react";
import facade from "../../ApiFacade";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CreateUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_name: "",
    user_pass: "",
    address: "",
    phone: "",
    email: "",
    birthYear: "",
    account: null,
  });
  const [error, setError] = useState(null);

  async function createAccount(event) {
    event.preventDefault();
    const res = await facade.createUser(user);
    console.log(res);
    if (res.token) {
      facade.setToken(res.token);
      window.location.href = "/";
    } else {
      setError(res.message);
    }
  }

  useEffect(() => {
    if (facade.getToken()) {
      navigate("/");
    }
  }, []);

  function handleChange(e) {
    if (e.target.name === "account") {
      setUser({
        ...user,
        [e.target.name]: parseInt(e.target.value, 10),
      });
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign up for an account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" method="POST" onSubmit={createAccount}>
              {error ? <div className="text-red-500">{error}</div> : null}
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="user_name"
                    name="user_name"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="user_pass" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="user_pass"
                    name="user_pass"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                  Address
                </label>
                <div className="mt-2">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="birthYear" className="block text-sm font-medium leading-6 text-gray-900">
                  Birth Year
                </label>
                <div className="mt-2">
                  <input
                    id="birthYear"
                    name="birthYear"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="account" className="block text-sm font-medium leading-6 text-gray-900">
                  Account
                </label>
                <div className="mt-2">
                  <input
                    id="account"
                    name="account"
                    type="number"
                    required
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
