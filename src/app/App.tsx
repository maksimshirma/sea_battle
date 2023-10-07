import ProvidersWrapper from "./providers/providers";
import Game from "../pages/Game";
import Header from "../widgets/Header";
import Layout from "../shared/ui/Layout/Layout";
import "./index.scss";

function App(): JSX.Element {
    return (
        <ProvidersWrapper>
            <Layout>
                <Header />
                <Game />
            </Layout>
        </ProvidersWrapper>
    );
}

export default App;
