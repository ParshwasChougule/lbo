import React from 'react';
import BusinessList from '../../components/business/BusinessList';
import AdminLayout from '../../components/layout/AdminLayout';

const BusinessPage = () => {
    return (
        <AdminLayout>
            <BusinessList isAdmin={true} />
        </AdminLayout>
    );
};

export default BusinessPage;
