import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from "../context/UserContext"
import { useContext } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });

  const { handleRegister } = useContext(UserContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await handleRegister(formData)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-amber-50 to-amber-100">

      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <fieldset className="space-y-4">
          <legend className="text-2xl font-semibold text-center text-green-950 mb-6">Create an Account</legend>

          <div>
            <label className="block text-sm font-medium text-black">Name</label>
            <input
              type="text"
              className="input input-bordered w-full py-3 px-4 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Full Name"
              onChange={handleChange}
              value={formData.name}
              name="name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Phone</label>
            <input
              type="tel"
              className="input input-bordered w-full py-3 px-4 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Phone Number"
              onChange={handleChange}
              value={formData.phone}
              name="phone"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              className="input input-bordered w-full py-3 px-4 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email Address"
              onChange={handleChange}
              value={formData.email}
              name="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              className="input input-bordered w-full py-3 px-4 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              name="password"
            />
          </div>

          <button
            className="btn btn-primary w-full py-3 mt-6 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
            onClick={handleSubmit}
          >
            Register
          </button>
        </fieldset>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}