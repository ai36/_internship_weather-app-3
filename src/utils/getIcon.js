import clearDay from "../assets/img/01d.svg";
import clearNight from "../assets/img/01n.svg";
import fewCloudsDay from "../assets/img/02d.svg";
import fewCloudsNight from "../assets/img/02n.svg";
import scatteredCloudsDay from "../assets/img/03d.svg";
import scatteredCloudsNight from "../assets/img/03n.svg";
import brokenCloudsDay from "../assets/img/04d.svg";
import brokenCloudsNight from "../assets/img/04n.svg";
import showerRainDay from "../assets/img/09d.svg";
import showerRainNight from "../assets/img/09n.svg";
import rainDay from "../assets/img/10d.svg";
import rainNight from "../assets/img/10n.svg";
import thunderstormDay from "../assets/img/11d.svg";
import thunderstormNight from "../assets/img/11n.svg";
import snowDay from "../assets/img/13d.svg";
import snowNight from "../assets/img/13n.svg";
import mistDay from "../assets/img/50d.svg";
import mistNight from "../assets/img/50n.svg";

export const getIcon = (value) => {
  switch (value) {
    case "01d":
      return clearDay;
    case "01n":
      return clearNight;
    case "02d":
      return fewCloudsDay;
    case "02n":
      return fewCloudsNight;
    case "03d":
      return scatteredCloudsDay;
    case "03n":
      return scatteredCloudsNight;
    case "04d":
      return brokenCloudsDay;
    case "04n":
      return brokenCloudsNight;
    case "09d":
      return showerRainDay;
    case "09n":
      return showerRainNight;
    case "10d":
      return rainDay;
    case "10n":
      return rainNight;
    case "11d":
      return thunderstormDay;
    case "11n":
      return thunderstormNight;
    case "13d":
      return snowDay;
    case "13n":
      return snowNight;
    case "50d":
      return mistDay;
    case "50n":
      return mistNight;
    default:
      return clearDay;
  }
}
