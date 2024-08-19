"use client";
import { SessionProvider } from "next-auth/react";
var Provider = function (_a) {
    var children = _a.children, session = _a.session;
    return (<SessionProvider session={session}>
      {children}
    </SessionProvider>);
};
export default Provider;
