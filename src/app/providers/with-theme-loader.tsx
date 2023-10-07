import { useAppSelector } from "../store/store";
import { getTheme } from "../store/userSlice/userSlice";

const ThemeLoaderWrapper = ({ children }: { children: React.ReactNode }) => {
    const theme = useAppSelector(getTheme());

    if (theme === "dark") {
        document.body.className = "dark-theme";
    } else {
        document.body.className = "light-theme";
    }

    return <div>{children}</div>;
};

export default ThemeLoaderWrapper;
