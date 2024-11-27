// import React, { useState } from "react";
// import AllUserModal from "./AllUserModal"; // Modal component for displaying all users
// import PostModal from "./PostModal"; // Modal component for displaying posts
// import "./Sidebar.css";

// const Sidebar = ({ role }) => {
//   const [isAllUserModalOpen, setIsAllUserModalOpen] = useState(false);
//   const [isPostModalOpen, setIsPostModalOpen] = useState(false);  
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [isRejectedModalOpen, setIsRejectedModalOpen] = useState(false);

//   const handleModalToggle = (modalName) => {
//     switch (modalName) {
//       case "user":
//         setIsAllUserModalOpen((prev) => !prev);
//         break;
//       case "post":
//         setIsPostModalOpen((prev) => !prev);
//         break;
//       case "confirm":
//         setIsConfirmModalOpen((prev) => !prev);
//         break;
//       case "rejected":
//         setIsRejectedModalOpen((prev) => !prev);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <aside className="sidebar">
//       <button onClick={() => handleModalToggle("user")}>All Listed Authors</button>

//       {role === "Author" && (
//         <>
//           <button onClick={() => handleModalToggle("post")}>Your All Posts</button>
//           {isPostModalOpen && (
//             <PostModal
//               onClose={() => handleModalToggle("post")}
//               title="Your All Posts"
//               content="Here are all your posts."
//             />
//           )}
//         </>
//       )}

//       {role === "Admin" && (
//         <>
//           <button onClick={() => handleModalToggle("confirm")}>Confirm/Reject</button>
//           {isConfirmModalOpen && (
//             <AllUserModal
//               onClose={() => handleModalToggle("confirm")}
//               title="Confirm/Reject Authors"
//               content="Approve or reject listed authors here."
//             />
//           )}

//           <button onClick={() => handleModalToggle("rejected")}>Rejected Authors</button>
//           {isRejectedModalOpen && (
//             <AllUserModal
//               onClose={() => handleModalToggle("rejected")}
//               title="Rejected Authors"
//               content="View all rejected authors."
//             />
//           )}
//         </>
//       )}

//       {isAllUserModalOpen && (
//         <AllUserModal
//           onClose={() => handleModalToggle("user")}
//           title="All Listed Authors"
//           content="Here is a list of all authors."
//         />
//       )}
//     </aside>
//   );
// };

// export default Sidebar;

  




import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ role }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/allauthors"); // Redirect to the All Authors page
  };

  return (
    <aside className="sidebar">
      <button onClick={handleRedirect}>All Listed Authors</button>

      {/* {role === "Author" && (
        <button onClick={() => alert("Posts modal clicked")}>Your All Posts</button>
      )} */}
    </aside>
  );
};

export default Sidebar;
