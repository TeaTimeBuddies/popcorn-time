import React from 'react';

interface UserDashboardPageProps {
    name: string;
}

const UserDashboardPage: React.FC<UserDashboardPageProps> = ({ name }) => {
    return (
        <div className="flex flex-col">
            <h1 className="text-5xl">Hello, {name}!</h1>
        </div>
    );
};

export default UserDashboardPage;