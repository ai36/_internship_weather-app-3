import styles from "./cardSkeleton.module.css"

export const CardSkeleton = () => {
  return (
    <article className={styles.card}>
      <div className={styles.main}>
        <div className={styles.title}></div>
        <div className={styles.icon}></div>
        <div className={styles.value}></div>
      </div>
      <div className={styles.footer}></div>
    </article>
  );
};
