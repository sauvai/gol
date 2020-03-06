class Utils {
    static posToIndex(pos, width) {
        return pos.y * width + pos.x;
    }

    static indexToPos(index, width) {
        return new Pos(index / width, index % width);
    }

    static extend(obj, src) {
        var newObj = {};

        Object.keys(obj).forEach(function(key) {
            newObj[key] = obj[key];
        });
        Object.keys(src).forEach(function(key) {
            newObj[key] = src[key];
        });

        return newObj;
    }

    static getRandomInt(max, offset) {
        return Math.floor(Math.random() * Math.floor(max)) + offset;
    }

    static getSelectedFromId(id) {
        var e = document.getElementById(id);
        return (e.options[e.selectedIndex].text);
    }

    static isCheckedById(id) {
        return document.getElementById(id).checked;
    }
}