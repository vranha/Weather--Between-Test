
export const calcAverage = (array, setter) => {
    const sumTemps = array.reduce((total, current) => {
        return total + current;
    }, 0);

    setter((sumTemps / array.length).toFixed())
};