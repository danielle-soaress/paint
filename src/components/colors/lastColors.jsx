var lastColors = ['#ffc0cb','#90ee90', '#ffffe0', '#add8e6'];

export const addColors = (color) => {
    lastColors.unshift(color);

    if (lastColors.length==8) {
        for (let i = 0; i<4; i++) {
            lastColors.pop();
        }
    }
}

export const getLastColors = () => {
    return lastColors;
}