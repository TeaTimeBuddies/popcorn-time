import React from "react";
import GeneralLayout from "../../layouts/GeneralLayout";

interface UserDashboardPageProps {
  name: string;
}

const UserDashboardPage: React.FC<UserDashboardPageProps> = ({ name }) => {
  return (
    <GeneralLayout>
      <div className="flex flex-col">
        <h1 className="text-5xl">Hello, {name}!</h1>
      </div>
    </GeneralLayout>
  );
};

export default UserDashboardPage;
