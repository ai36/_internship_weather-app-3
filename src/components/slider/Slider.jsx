import { useEffect, useRef, useState } from "react";
import { clsx } from "../../utils";
import styles from "./slider.module.css";
import { Button, Icon, SliderCard, TabBar, TryAgain } from "..";
import { useWeather, useScrollAndResize } from "../../hooks";
import { APP_RELOAD, TABS_LIST } from "../../constants";

export const Slider = () => {
  const { isError, data } = useWeather();
  const forecast = data?.forecast;

  const slideRefs = useRef([]);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const [activeTab, setActiveTab] = useState(Object.keys(TABS_LIST)[0]);

  const updateButtons = () => {
    const elem = contentRef.current;
    if (!elem) return;
    const maxScrollLeft = elem.scrollWidth - elem.clientWidth;
    setCanPrev(elem.scrollLeft > 1);
    setCanNext(elem.scrollLeft < maxScrollLeft - 1);
  };

  useScrollAndResize(updateButtons, contentRef);

  useEffect(() => {
    slideRefs.current.length = 0;
    if (contentRef.current) contentRef.current.scrollTo({ left: 0 });
    updateButtons();
  }, [activeTab]);

  const getStep = () => {
    const list = wrapperRef.current;
    if (!list) return 0;
  
    const firstSlide = list.firstElementChild;
    if (!firstSlide) return 0;
  
    const slideWidth = firstSlide.getBoundingClientRect().width;
    const gapStr = window.getComputedStyle(list).columnGap || "0";
    const gap = parseFloat(gapStr) || 0;
  
    return slideWidth + gap;
  };

  const onNext = () => {
    const box = contentRef.current;
    if (!box) return;
    const step = getStep();
    if (!step) return;

    const distanceToEnd = box.scrollWidth - box.offsetWidth - box.scrollLeft;
    box.scrollBy({
      left: distanceToEnd < 1.5 * step ? 2 * step : step,
      top: 0,
    });
    updateButtons();
  };

  const onPrev = () => {
    const box = contentRef.current;
    if (!box) return;
    const step = getStep();
    if (!step) return;

    const distanceToStart = box.scrollLeft;
    box.scrollBy({
      left: distanceToStart > 1.5 * step ? -step : -2 * step,
      top: 0,
    });
    updateButtons();
  };

  return (
    <section className={styles.forecast}>
      <header className={styles.header}>
        <h2 className={clsx("title section-title", styles.title)}>Прогноз:</h2>
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </header>

      {isError ? (
        <TryAgain variant="slider" onClick={APP_RELOAD} />
      ) : (
        <div className={styles.slider}>
          <Button
            type="button"
            handleClick={onPrev}
            disabled={!canPrev}
            aria-label="Прокрутить назад"
          >
            <Icon name="chevron-left" width="24" height="24" />
          </Button>

          <div className={styles.content} ref={contentRef} tabIndex={-1}>
              {forecast &&
                <ul
                  className={styles.sliderWrapper}
                  ref={wrapperRef}
                >
                  {forecast[activeTab].map((elem, index) => {
                    return (
                      <SliderCard
                        data={elem}
                        key={`${activeTab}-${index}`}
                        ref={(el) => {
                          slideRefs.current[index] = el;
                        }}
                      />
                    )
                  })}
                </ul>
              }
          </div>

          <Button
            type="button"
            handleClick={onNext}
            disabled={!canNext}
            aria-label="Прокрутить вперед"
          >
            <Icon name="chevron-right" width="24" height="24" />
          </Button>
        </div>
      )}
    </section>
  );
};
