// import React, { useEffect, useState } from 'react';
// import './AllAuthor.css';

// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [notification, setNotification] = useState('');

//   const currentUser = JSON.parse(localStorage.getItem('currentUser'));

//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:8000/dashboard/allauthors');
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error('Failed to fetch users:', error);
//       }
//     };

//     useEffect(() => {
//       useEffect(() => {
//         fetchUsers();
//       }, []);
//     });

  

//   const handleDeleteUser = async (userId) => {
//     if (currentUser.role === 'Author') {
//       setNotification('You are an Author and do not have permission to delete users.');
//       return;
//     }

//     try {
//       await fetch(`http://localhost:8000/dashboard/allauthors/${userId}`, {
//         method: 'DELETE',
//       });
//       setUsers(users.filter((user) => user._id !== userId));
//     } catch (error) {
//       console.error('Failed to delete user:', error);
//     }
//   };

//   return (
//     <div className="all-users-container">
//       <h2 className="all-authors">All Listed Authors</h2>
//       {notification && <p className="notification">{notification}</p>}
//       {users.length === 0 ? (
//         <p>No users found.</p>
//       ) : (
//         <div className="user-grid">
//           {users.map((user) => (
//             <div key={user._id} className="user-card">
//               <span className="user-info">{user.name}</span>
//               <span className="user-info">{user.email}</span>
//               <button
//                 className="delete-btn"
//                 onClick={() => handleDeleteUser(user._id)}
//                 disabled={currentUser.role === 'Author'}
//               >
//                 {currentUser.role === 'Author' ? 'Cannot Delete' : 'Delete'}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllUsers;



import React, { useEffect, useState } from "react";
import "./AllAuthor.css";

const AllUsers = () => {
  // State to store users fetched from the API
  const [users, setUsers] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user")); // Parse the stored user data
  const currentUserRole = storedUser ? storedUser.userRole : "";
  console.log('localStorage',storedUser);
  // Fetching users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetching data from the API
        const response = await fetch("http://localhost:8000/dashboard/allauthors");
        const data = await response.json();
        // Storing the fetched users in the state
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    // Call the fetchUsers function
    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once on component mount

  // Function to handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      // Making DELETE request to the API
      await fetch(`http://localhost:8000/dashboard/allauthors/${userId}`, {
        method: "DELETE",
      });
      // Updating the state by filtering out the deleted user
      setUsers((prev) => prev.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="all-users-container">
      <h2 className="all-authors">All Listed Authors</h2>
      
      {/* Displaying message if there are no users */}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="user-grid">
          {/* Mapping over the users and displaying each one */}
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <span className="user-info">{user.name}</span>
              <span className="user-info">{user.email}</span>
              {/* Delete button for each user */}
              <button
                className="delete-btn"
                onClick={() => handleDeleteUser(user._id)}
                disabled={currentUserRole === "Author"} // Disable if role is Author
              >
                {currentUserRole === "Author" ? "Delete" : "Delete"}
              </button>
              {currentUserRole === "Author" && (
                <p className="notification">You are an Author and do not have permission to delete users.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
