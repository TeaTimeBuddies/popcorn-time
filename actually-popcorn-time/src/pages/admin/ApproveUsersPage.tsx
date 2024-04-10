import { useEffect, useState } from "react";
import GeneralLayout from "../../layouts/GeneralLayout";
import { API_URL } from "../../constants";
interface User {
  name: string;
  email: string;
}

const ApproveUsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users
    fetch(`${API_URL}approvals/users`)
      .then((res) => res.json())
      .then((fetchedUsers) => {
        console.log(fetchedUsers);
        // const users = fetchedUsers.map((user: User) => ({
        //   ...user,
        // }));
        // setUsers(users);
      });
  });

  return (
    <GeneralLayout>
      <span>
        {users.map((m) => (
          <div>
            <span>{m.name}</span>
            <span>{m.email}</span>
          </div>
        ))}
      </span>
    </GeneralLayout>
  );
};

export default ApproveUsersPage;
