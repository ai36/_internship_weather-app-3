import { ReactComponent as Logo } from "../../assets/img/logo.svg";
import { ReactComponent as LogoMobile } from "../../assets/img/logo-mobile.svg";

import { ReactComponent as Day01 } from "../../assets/img/01d.svg";
import { ReactComponent as Night01 } from "../../assets/img/01n.svg";
import { ReactComponent as Day02 } from "../../assets/img/02d.svg";
import { ReactComponent as Night02 } from "../../assets/img/02n.svg";
import { ReactComponent as Day03 } from "../../assets/img/03d.svg";
import { ReactComponent as Night03 } from "../../assets/img/03n.svg";
import { ReactComponent as Day04 } from "../../assets/img/04d.svg";
import { ReactComponent as Night04 } from "../../assets/img/04n.svg";
import { ReactComponent as Day09 } from "../../assets/img/09d.svg";
import { ReactComponent as Night09 } from "../../assets/img/09n.svg";
import { ReactComponent as Day10 } from "../../assets/img/10d.svg";
import { ReactComponent as Night10 } from "../../assets/img/10n.svg";
import { ReactComponent as Day11 } from "../../assets/img/11d.svg";
import { ReactComponent as Night11 } from "../../assets/img/11n.svg";
import { ReactComponent as Day13 } from "../../assets/img/13d.svg";
import { ReactComponent as Night13 } from "../../assets/img/13n.svg";
import { ReactComponent as Day50 } from "../../assets/img/50d.svg";
import { ReactComponent as Night50 } from "../../assets/img/50n.svg";

import { ReactComponent as Barometr } from "../../assets/img/barometr.svg";
import { ReactComponent as Direction } from "../../assets/img/direction.svg";
import { ReactComponent as Humidity } from "../../assets/img/humidity.svg";
import { ReactComponent as Sunrise } from "../../assets/img/sunrise.svg";
import { ReactComponent as Sunset } from "../../assets/img/sunset.svg";
import { ReactComponent as Visibility } from "../../assets/img/visibility.svg";

import { ReactComponent as Search } from "../../assets/img/search.svg";
import { ReactComponent as Delete } from "../../assets/img/delete.svg";
import { ReactComponent as HeartFeel } from "../../assets/img/heart-feel.svg";
import { ReactComponent as Heart } from "../../assets/img/heart.svg";
import { ReactComponent as ChevronLeft } from "../../assets/img/chevron-left.svg";
import { ReactComponent as ChevronRight } from "../../assets/img/chevron-right.svg";
import { ReactComponent as Close } from "../../assets/img/close.svg";
import { ReactComponent as Location } from "../../assets/img/location.svg";

import { ReactComponent as Sun } from "../../assets/img/sun.svg";
import { ReactComponent as Moon } from "../../assets/img/moon.svg";

export const Icon = ({
  className,
  name = "01d",
  width = "24",
  height = "24",
  ...props
}) => {
  const icons = {
    "logo": Logo,
    "logo-mobile": LogoMobile,
    "01d": Day01,
    "01n": Night01,
    "02d": Day02,
    "02n": Night02,
    "03d": Day03,
    "03n": Night03,
    "04d": Day04,
    "04n": Night04,
    "09d": Day09,
    "09n": Night09,
    "10d": Day10,
    "10n": Night10,
    "11d": Day11,
    "11n": Night11,
    "13d": Day13,
    "13n": Night13,
    "50d": Day50,
    "50n": Night50,
    "barometr": Barometr,
    "direction": Direction,
    "humidity": Humidity,
    "sunrise": Sunrise,
    "sunset": Sunset,
    "visibility": Visibility,
    "search": Search,
    "delete": Delete,
    "heart-feel": HeartFeel,
    "heart": Heart,
    "chevron-left": ChevronLeft,
    "chevron-right": ChevronRight,
    "close": Close,
    "location": Location,
    "sun": Sun,
    "moon": Moon,
  }

  const OutputIcon = icons[name];

  return (
    <OutputIcon className={className} width={width} height={height} {...props}/>
  );
}
