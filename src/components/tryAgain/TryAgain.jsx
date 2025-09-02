import { clsx } from "utils";
import styles from "./tryAgain.module.css";
import { Button } from "components";

export const TryAgain = ({ variant = "none", onClick }) => {
  return (
    <div className={clsx(styles.tryAgainBox, styles[variant])}>
      <div className={styles.header}>
        <h3 className={styles.title}>Упс! Произошла ошибка</h3>
        <p className={styles.emptyMessage}>
          Проверьте настройки и повторите попытку.
        </p>
      </div>
      <Button handleClick={onClick}>Повторить попытку</Button>
    </div>
  );
};
