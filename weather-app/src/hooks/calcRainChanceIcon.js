export const calcRainChanceIcon = (chance) => {
    if (chance >= 90 && chance <= 100) {
        return "thunder";
    }

    if (chance >= 75 && chance < 90) {
        return "rainy-7";
    }

    if (chance >= 55 && chance < 75) {
        return "rainy-5";
    }

    if (chance >= 0 && chance < 15) {
        return "day";
    }

    if (chance >= 15 && chance < 30) {
        return "cloudy-day-1";
    }

    if (chance >= 30 && chance < 45) {
        return "cloudy-day-2";
    }

    if (chance >= 45 && chance < 55) {
        return "cloudy-day-3";
    }
};
