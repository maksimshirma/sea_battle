import StoreWrapper from "./with-store";
import StrictModeWrapper from "./with-strictmode";

const ProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <StoreWrapper>
            <StrictModeWrapper>{children}</StrictModeWrapper>
        </StoreWrapper>
    );
};

export default ProvidersWrapper;
