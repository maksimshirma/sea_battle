import Game from "../pages/Game";
import Header from "../widgets/Header";
import styles from "./app.module.scss";

function App(): JSX.Element {
    return (
        <div className={styles.container}>
            <Header />
            <Game />
        </div>
    );
}

export default App;
