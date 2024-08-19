import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
var AdminLayout = function (_a) {
    var children = _a.children;
    return (<div className="h-full w-full overflow-hidden bg-slate-100">
    <div className="h-full w-full px-10 py-6">
        <Navbar />
        <div className="h-full w-full mt-8 mx-auto grid grid-cols-8 gap-12">
            <Sidebar />
            {children}
        </div>
    </div>
    </div>);
};
export default AdminLayout;
