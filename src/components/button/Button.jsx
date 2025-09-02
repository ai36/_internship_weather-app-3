import { clsx } from "../../utils";
import styles from "./button.module.css";

export const Button = ({ className, variant = "primary", type = "button", disabled, handleClick, children }) => {
  return (
    <button
      className={clsx(styles.btn, styles[variant], className)}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
