import React from "react";
import profile from "../../../../../assets/png/profile.png";

const Personal = () => {
  return (
    <div>
      <header>
        <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
          <img src={profile} alt="profile" />
          <div>
            <button className="rounded-full border-2 border-side px-6 py-3 font-br-semibold">
              Edit Profile
            </button>
          </div>
        </div>
      </header>
      <form action="login" className="mt-[1.5em] w-full text-logintext">
        <div className="flex gap-3 sm:flex-col lg:flex-row">
          <div className="w-full">
            <label htmlFor="firstName" className="flex-start flex">
              First Name
            </label>
            <input
              name="firstName"
              id="firstName"
              className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-side focus:outline-none"
            />
          </div>
          <div className="w-full">
            <label htmlFor="lastName" className="flex-start flex">
              Last Name
            </label>
            <input
              name="lastName"
              id="lastName"
              type="text"
              className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-side focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-[1em] w-full">
          <label htmlFor="email" className="flex-start flex">
            Email Address
          </label>
          <input
            name="email"
            id="email"
            type="email"
            className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-side focus:outline-none"
          />
        </div>

        <div className="mt-[1em]  flex gap-3 sm:flex-col lg:flex-row">
          <div className="w-full">
            <label htmlFor="country" className="flex-start flex">
              Country
            </label>
            <input
              name="country"
              id="country"
              className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-side focus:outline-none"
            />
          </div>
          <div className="w-full">
            <label htmlFor="phoneNumber" className="flex-start flex">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              id="phoneNumber"
              type="number"
              className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-side focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-[1em] flex gap-3 sm:flex-col lg:flex-row">
          <div className="w-full">
            <label htmlFor="password" className="flex-start flex">
              Country
            </label>
            <div className="relative flex items-center text-center">
              <input
                name="password"
                id="password"
                className="mt-[1em] flex w-full rounded-lg border-[2px]  border-border bg-inherit p-3 focus:border-side focus:outline-none "
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="confirmPassword" className="flex-start flex">
              Phone Number
            </label>
            <div className="relative flex items-center text-center">
              <input
                name="confirmPassword"
                className="mt-[1em] flex w-full rounded-lg border-[2px]  border-border bg-inherit p-3 focus:border-side focus:outline-none "
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Personal;