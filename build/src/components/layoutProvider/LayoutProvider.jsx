"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
var LayoutProvider = function (_a) {
    var children = _a.children;
    var pathname = usePathname();
    var queryClient = new QueryClient();
    return (<>
      <QueryClientProvider client={queryClient}>
        {pathname !== "/login" && pathname !== "/signup" && !pathname.includes("/admin") && <Navbar />}
        {children}
        {pathname !== "/login" && pathname !== "/signup" && !pathname.includes("/admin") && <Footer />}
      </QueryClientProvider>
    </>);
};
export default LayoutProvider;
