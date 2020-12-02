module.exports = {
    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomFloat(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.random() * (max - min + 1) + min;
    }
}