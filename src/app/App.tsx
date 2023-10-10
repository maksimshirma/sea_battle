import ProvidersWrapper from "./providers/providers";
import Game from "../pages/Game";
import Header from "../widgets/Header";
import Layout from "../shared/ui/Layout/Layout";
import ModalPortal from "../shared/ui/ModalPortal";
import "./index.scss";
import Robot from "../shared/ui/Robot";

function App(): JSX.Element {
    return (
        <ProvidersWrapper>
            <Layout>
                <Header />
                <Game />
            </Layout>
            <ModalPortal />
            <Robot />
        </ProvidersWrapper>
    );
}

export default App;
