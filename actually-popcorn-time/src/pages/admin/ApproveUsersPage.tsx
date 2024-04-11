import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { API_URL } from "../../constants";
interface User {
  is_approved: any;
  id: number;
  name: string;
  email: string;
  isApproved: boolean;
}

const ApproveUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${API_URL}approvals/users`)
      .then((res) => res.json())
      .then((fetchedUsers) => {
        console.log(fetchedUsers.data);

        const users = fetchedUsers.data.map((user: User) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          isApproved: user.is_approved,
        }));
        setUsers(users);
      });
  }, [refresh]);

  const handleApprove = (id: string) => {
    const token = sessionStorage.getItem("token");
    fetch(`${API_URL}approvals/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ is_approved: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the isApproved property of the corresponding user
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id.toString() === id ? { ...user, isApproved: true } : user
          )
        );
        setRefresh(!refresh); // Toggle the refresh state to force a re-render
      });
  };

  const handleDelete = (id: string) => {
    const token = sessionStorage.getItem("token");
    console.log(id);
    fetch(`${API_URL}approvals/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Remove the user from the list
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id.toString() !== id)
        );
        setRefresh(!refresh); // Toggle the refresh state to force a re-render
      });
  };

  return (
    <AdminLayout title="User Approval">
      <div className="flex w-full justify-center overflow-x-auto">
        {users.length === 0 ? (
          <div className="mt-10 text-primary">No users to approve</div>
        ) : (
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Approved</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.isApproved ? "Yes" : "No"}</td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className={`btn ${u.isApproved ? "btn-warning" : "btn-success"} btn-sm flex items-center justify-center`}
                        onClick={() => handleApprove(u.id.toString())}
                      >
                        <span className="material-symbols-outlined">
                          {u.isApproved ? "close" : "done"}
                        </span>
                      </button>

                      <button
                        onClick={() => handleDelete(u.id.toString())}
                        type="button"
                        className="justify-cente btn btn-error btn-sm flex items-center"
                      >
                        <span className="material-symbols-outlined">
                          delete
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default ApproveUsersPage;
