import { forwardRef, useRef } from "react";
import { clsx, updateInputWidth } from "../../utils";
import styles from "./input.module.css";
import { Icon, LocationButton } from "..";
import { useResize } from "../../hooks";

export const Input = forwardRef(
  ({ className, type, id, value, ...props }, ref) => {
    const inputWrapperRef = useRef();

    useResize(() => {
      updateInputWidth(inputWrapperRef);
    }, inputWrapperRef);

    return (
      <div className={styles.wrapper} htmlFor={id} ref={inputWrapperRef}>
        <input
          ref={ref}
          id={id}
          type={type}
          className={clsx(styles.input, value && styles.hasValue, className)}
          value={value}
          spellCheck="false"
          autoComplete="off"
          {...props}
        />
        <button
          className={clsx("btn", styles.searchBtn)}
          type="button"
          disabled
        >
          <Icon className={styles.searchIcon} name="search" />
        </button>
        <button
          className={clsx("btn", styles.clearBtn)}
          type="reset"
          form="searchForm"
        >
          <Icon className={styles.closeIcon} name="close" />
        </button>
        <LocationButton />
      </div>
    );
  }
);
