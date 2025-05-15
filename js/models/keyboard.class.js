class Keyboard {
    LEFT = false;
    UP = false;
    DOWN = false;
    SPACE = false;

    allFalse() {
        return Object.values(this).every(value => value === false);
    }
}
