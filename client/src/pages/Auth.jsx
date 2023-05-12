import React from "react";

const Auth = () => {
  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center fixed top-0 right-0 bottom-0 left-0 z-50">
      <div className="w-1/3 bg-white">
        <h1>Post App</h1>
        <div>
          <input type="text" placeholder="Username" className="" />
          <input type="text" placeholder="Email" className="" />
          <input type="text" placeholder="Password" className="" />
        </div>
        <div className="cursor-pointer hover:bg-indigo-800 w-full p-2 text-center bg-indigo-600 text-white rounded-md">
          Register
        </div>
      </div>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default Auth;
