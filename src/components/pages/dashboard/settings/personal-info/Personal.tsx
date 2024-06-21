// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GetUserProfile } from "../../../../../shared/redux/slices/transaction.slices";
// import { setMessage } from "../../../../../shared/redux/slices/message.slices";
// import ReactLoading from "react-loading";
// import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
// import { button } from "../../../../../shared/button/button";

// const Personal = () => {
//   const dispatch =
//     useDispatch<ThunkDispatch<unknown, unknown, UnknownAction>>();
//   const userData = useSelector((state: any) => state.transaction.userProfile);
//   const userToken = sessionStorage.getItem("userData");
//   console.log("data", userData);
//   console.log("token", userToken);

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (userToken) {
//       setLoading(true);
//       dispatch(GetUserProfile())
//         .unwrap()
//         .then(() => {
//           setLoading(false);
//         })
//         .catch((error: any) => {
//           const errorMessage = error.message;
//           dispatch(setMessage(errorMessage));
//           setLoading(false);
//         });
//     } else {
//       dispatch(setMessage("Token not found"));
//     }
//   }, [dispatch, userToken]);

//   return (
//     <div>
//       <header>
//         <div>
//           <button className="flex-end ml-auto flex rounded-full border-2 border-side px-6 py-3 font-br-semibold">
//             Edit Profile
//           </button>
//         </div>
//       </header>
//       <form action="login" className="mt-[1.5em] w-full text-logintext">
//         <div className="flex gap-3 sm:flex-col lg:flex-row">
//           <div className="w-full">
//             <label htmlFor="firstName" className="flex-start flex">
//               First Name
//             </label>
//             <input
//               name="firstName"
//               id="firstName"
//               value={userData?.firstName}
//               className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-border focus:outline-none"
//             />
//           </div>
//           <div className="w-full">
//             <label htmlFor="lastName" className="flex-start flex">
//               Last Name
//             </label>
//             <input
//               name="lastName"
//               id="lastName"
//               value={userData?.lastName}
//               type="text"
//               className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-border focus:outline-none"
//             />
//           </div>
//         </div>

//         <div className="mt-[1em] w-full">
//           <label htmlFor="email" className="flex-start flex">
//             Email Address
//           </label>
//           <input
//             name="email"
//             id="email"
//             value={userData?.email}
//             type="email"
//             className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-border focus:outline-none"
//           />
//         </div>

//         <div className="mt-[1em]  flex gap-3 sm:flex-col lg:flex-row">
//           <div className="w-full">
//             <label htmlFor="country" className="flex-start flex">
//               Country
//             </label>
//             <input
//               value={userData?.country}
//               name="country"
//               id="country"
//               className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-border focus:outline-none"
//             />
//           </div>
//           <div className="w-full">
//             <label htmlFor="phoneNumber" className="flex-start flex">
//               Phone Number
//             </label>
//             <input
//               name="phoneNumber"
//               value={userData?.phoneNumber}
//               id="phoneNumber"
//               type="number"
//               className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-border focus:bg-inherit focus:outline-none"
//             />
//           </div>
//         </div>
//       </form>
//       <div className="mt-[2em] flex flex-col justify-center">
//         <button.PrimaryButton
//           type="submit"
//           className="m-auto w-[80%]"
//           disabled={loading}
//         >
//           {loading ? (
//             <ReactLoading color="#FFFFFF" width={25} height={25} type="spin" />
//           ) : (
//             "Save Changes"
//           )}
//         </button.PrimaryButton>
//         <button className="mt-[2em]">
//           <h1 className="text-center text-red-500">Discard Changes</h1>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Personal;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUserProfile,
  UpdateProfile,
} from "../../../../../shared/redux/slices/transaction.slices";
import { setMessage } from "../../../../../shared/redux/slices/message.slices";
import ReactLoading from "react-loading";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { button } from "../../../../../shared/button/button";
import { toast } from "react-toastify";

const Personal = () => {
  const dispatch =
    useDispatch<ThunkDispatch<unknown, unknown, UnknownAction>>();
  const userData = useSelector((state: any) => state.transaction.userProfile);
  const userToken = sessionStorage.getItem("userData");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (userToken) {
      setLoading(true);
      dispatch(GetUserProfile())
        .unwrap()
        .then(() => {
          setLoading(false);
        })
        .catch((error: any) => {
          const errorMessage = error.message;
          dispatch(setMessage(errorMessage));
          setLoading(false);
        });
    } else {
      dispatch(setMessage("Token not found"));
    }
  }, [dispatch, userToken]);

  useEffect(() => {
    setFirstName(userData?.firstName || "");
    setLastName(userData?.lastName || "");
    setEmail(userData?.email || "");
    setCountry(userData?.country || "");
    setPhoneNumber(userData?.phoneNumber || "");
  }, [userData]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleDiscardChanges = () => {
    setFirstName(userData?.firstName || "");
    setLastName(userData?.lastName || "");
    setEmail(userData?.email || "");
    setCountry(userData?.country || "");
    setPhoneNumber(userData?.phoneNumber || "");
    setEditMode(false);
  };

  const updateUserData: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    setLoading(true);
    const body = {
      userID: userData?.id,
      firstName,
      lastName,
      email,
      country,
      phoneNumber,
    };
    try {
      await dispatch(UpdateProfile(body)).unwrap();
      toast.success("Profile updated successfully");
      setEditMode(false);

      dispatch(GetUserProfile())
        .unwrap()
        .then(() => {
          setLoading(false);
        })
        .catch((error: any) => {
          const errorMessage = error.message;
          dispatch(setMessage(errorMessage));
          setLoading(false);
        });
    } catch (error: any) {
      setLoading(false);
      const errorMessage =
        error.response?.data?.message || "Failed to update profile";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <header>
        <div>
          {!editMode && (
            <button
              className="flex-end ml-auto flex rounded-full border-2 border-side px-6 py-3 font-br-semibold"
              onClick={handleEditClick}
            >
              Edit Profile
            </button>
          )}
        </div>
      </header>
      <form
        onSubmit={updateUserData}
        className="mt-[1.5em] w-full text-logintext"
      >
        <div className="flex gap-3 sm:flex-col lg:flex-row">
          <div className="w-full">
            <label htmlFor="firstName" className="flex-start flex">
              First Name
            </label>
            <input
              name="firstName"
              id="firstName"
              value={userData?.firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-border focus:outline-none"
            />
          </div>
          <div className="w-full">
            <label htmlFor="lastName" className="flex-start flex">
              Last Name
            </label>
            <input
              name="lastName"
              id="lastName"
              value={lastName}
              readOnly={!editMode}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-border focus:outline-none"
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
            value={userData?.email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-border focus:outline-none"
          />
        </div>

        <div className="mt-[1em]  flex gap-3 sm:flex-col lg:flex-row">
          <div className="w-full">
            <label htmlFor="country" className="flex-start flex">
              Country
            </label>
            <input
              value={userData?.country}
              onChange={(e) => setCountry(e.target.value)}
              name="country"
              id="country"
              className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-border focus:outline-none"
            />
          </div>
          <div className="w-full">
            <label htmlFor="phoneNumber" className="flex-start flex">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={userData?.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="phoneNumber"
              type="number"
              className="mt-[1em] w-full rounded-lg border-[2px] border-border bg-inherit p-3 focus:border-border focus:bg-inherit focus:outline-none"
            />
          </div>
        </div>

        {editMode && (
          <div className="mt-[2em] flex flex-col justify-center">
            <button.PrimaryButton
              type="submit"
              className="m-auto w-[80%]"
              // onClick={updateUserData}
              disabled={loading}
            >
              {loading ? (
                <ReactLoading
                  color="#FFFFFF"
                  width={25}
                  height={25}
                  type="spin"
                />
              ) : (
                "Save Changes"
              )}
            </button.PrimaryButton>
            <button className="mt-[2em]" onClick={handleDiscardChanges}>
              <h1 className="text-center text-red-500">Discard Changes</h1>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Personal;
