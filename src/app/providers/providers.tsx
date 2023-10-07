import StoreWrapper from "./with-store";
import StrictModeWrapper from "./with-strictmode";
import ThemeLoaderWrapper from "./with-theme-loader";

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <StoreWrapper>
            <StrictModeWrapper>
                <ThemeLoaderWrapper>{children}</ThemeLoaderWrapper>
            </StrictModeWrapper>
        </StoreWrapper>
    );
};

export default ProvidersWrapper;
