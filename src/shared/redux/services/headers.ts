// export default function authHeader() {
//   const user = sessionStorage.getItem("userData");

//     if (user) {
//       return {
//         Authorization: "Bearer " + user,
//         // "user-id": ,
//       };
//     } else {
//       return {
//         // "user-id": "4207cdf9-4588-43bf-9c4f-7c5056c14b4d"
//       };
//     }
// }

export default function authHeader() {
  const user = sessionStorage.getItem("userData");
  const userId = sessionStorage.getItem("userId"); // Assuming you store userId separately in sessionStorage

  if (user) {
    return {
      Authorization: "Bearer " + user,
      ...(userId && { "user-id": userId }), // Add the "user-id" header only if userId is available
    };
  } else {
    return {};
  }
}
