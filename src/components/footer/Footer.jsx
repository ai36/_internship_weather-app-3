import { memo } from "react";
import { clsx } from "../../utils";
import styles from "./footer.module.css";

export const Footer = memo(() => {
  return (
    <footer className={styles.footer}>
      <p className={clsx("descr", styles.descr)}>
        Проект выполнен в рамках стажировки{" "}
        <a
          className={styles.link}
          href="https://preax.ru"
          target="_blank"
          rel="noopener noreferrer"
        >
          PREAX
        </a>
      </p>
    </footer>
  );
});
