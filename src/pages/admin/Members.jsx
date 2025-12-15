import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import MemberRegistration from "../../components/members/MemberRegistration";
import MemberList from "../../components/members/MemberList";

const Members = () => {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleMemberAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <AdminLayout>
            <h4 className="mb-4">Members</h4>
            <MemberRegistration onSuccess={handleMemberAdded} />

            <div className="mt-5">
                <MemberList isAdmin={true} refreshTrigger={refreshTrigger} />
            </div>
        </AdminLayout>
    );
};

export default Members;
