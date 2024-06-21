// import React, { useEffect, useState } from "react";
import profile from "../../../../../assets/png/profile.png";
// import { useDispatch, useSelector } from "react-redux";
// import { GetUserProfile } from "../../../../../shared/redux/slices/transaction.slices";
// import { setMessage } from "../../../../../shared/redux/slices/message.slices";

const Personal = () => {
  // const dispatch = useDispatch();
  // const userId = useSelector((state: any) => state.transaction);
  // console.log("id", userId);

  // const userData = useSelector((state: any) => state.transaction.userProfile);
  // console.log("userdata:", userData);
  // const [fetching, setFetching] = useState(false);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     setFetching(true);
  //     try {
  //       const data = GetUserProfile(userId);
  //       console.log("User Profile:", data);
  //     } catch (error: any) {
  //       dispatch(setMessage(error.message));
  //     } finally {
  //       setFetching(false);
  //     }
  //   };
  //   fetchUserProfile();
  // }, [dispatch, userId]);

  return (
    <div>
      <header>
        <div className="flex h-full flex-col items-center justify-between gap-5 lg:flex-row">
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
      </form>
    </div>
  );
};

export default Personal;
