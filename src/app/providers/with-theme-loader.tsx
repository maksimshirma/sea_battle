import { useAppSelector } from "../store/store";
import { serviceActions } from "../store/serviceSlice/serviceSlice";

const ThemeLoaderWrapper = ({ children }: { children: React.ReactNode }) => {
    const theme = useAppSelector(serviceActions.getTheme());

    if (theme === "dark") {
        document.body.className = "dark-theme";
    } else {
        document.body.className = "light-theme";
    }

    return <div>{children}</div>;
};

export default ThemeLoaderWrapper;
