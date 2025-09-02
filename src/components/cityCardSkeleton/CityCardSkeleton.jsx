import styles from "./cityCardSkeleton.module.css";

export const CityCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}></div>
        <div className={styles.date}></div>
        <div className={styles.time}></div>
      </div>
      <div className={styles.main}></div>
      <div className={styles.footer}>
        <div className={styles.content}></div>
        <div className={styles.desc}></div>
      </div>
    </div>
  );
};
