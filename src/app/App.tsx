import Button from "../shared/ui/Button";
import styles from "./app.module.scss";

function App(): JSX.Element {
    return (
        <div className={styles.container}>
            <Button
                content="Расставить в ручную"
                onClick={() => console.log("click")}
            />
        </div>
    );
}

export default App;
