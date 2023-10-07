import React from "react";

const StrictModeWrapper = ({ children }: { children: React.ReactNode }) => {
    return <React.StrictMode>{children}</React.StrictMode>;
};

export default StrictModeWrapper;
