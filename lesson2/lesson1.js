// 1. Шахматная доска в парадигме ООП.
function ChessTable() {
    var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    var ROWS = 8;
    var COLS = 8;
    var that = this;
    var table = document.createElement('table');
    table.setAttribute('id', 'tbl');
    table.setAttribute('tabindex', '0');
    for (var i = 0; i < ROWS; i++) {
        var newRow = table.insertRow(i);
        for (var j = 0; j < COLS; j++) {
            var newCell = newRow.insertCell(j);
            var id = arr[j] + (ROWS - i);
            if ((i + j) % 2 != 0) {
                newCell.classList.add('black');
            }
            newCell.setAttribute('id', id);
            newCell.innerHTML = id;
        }
    }
    document.body.appendChild(table);

    var i = 0, j = 0;

    table.onclick = function (event) {
        if (event.target != event.currentTarget)
        that.sayRC(event.target);
    };

    this.sayRC = function (cll) {
        // Номер столбца текущей ячейки
        var c = cll.cellIndex;
        var r = that.gtRw(cll, c);
        var elems = table.getElementsByTagName('td');
        for (var i = 0; i < elems.length; i++)
            elems[i].classList.remove('highlights');
        that.activate(r,c);
        that.sayID(r,c);
    };

    this.sayID = function (_i, _j) {
        var id = arr[_j] + (ROWS - _i);
        var span = document.createElement('span');
        span.innerHTML = "Поле " + id + " ";
        return document.body.appendChild(span);
    };

// Возвращает номер строки, которой расположена ячейка cll
    this.gtRw = function (cll, c) {
        for (var i = 0; i < 8; i++) {
            var rw = tbl.rows[i];
            if (rw.cells[c] == cll) return i;
        }
    };

    table.onkeydown = function (event) {
        if (event.keyCode >= 37 && event.keyCode <= 40) {
            that.deactivate(i, j);
        }
        switch (event.keyCode) {
            case 37:
                that.activate(i, (j == 0 ? COLS - 1 : --j));
                that.sayID(i,j);
                break;
            case 38:
                that.activate((i == 0 ? ROWS - 1 : --i), j);
                that.sayID(i,j);
                break;
            case 39:
                that.activate(i, (j == COLS - 1 ? 0 : ++j));
                that.sayID(i,j);
                break;
            case 40:
                that.activate((i == ROWS - 1 ? 0 : ++i), j);
                that.sayID(i,j);
                break;
        }
    };

    this.activate = function (_i, _j) {
        i = _i;
        j = _j;
        table.children[0].children[_i].children[_j].classList.add('highlights');
    };

    this.deactivate = function (_i, _j) {
        table.children[0].children[_i].children[_j].classList.remove('highlights');
    }
}

// 2. Расширение для строковых объектов.

String.prototype.addToElement = function(elm, val) {
    return '<'+elm+' class='+val+'>'+this+'<'+elm+'>';
};

// 3. Объект myHTML, который работает с HTML-строкой.

function myHTML() {
    var string = '';
    this.addText = function (str) {
        return string += str;
    };
    this.showHTML = function () {
        return string;
    };
    this.addH=function (str, N) {
        return string += '<h'+N+'>'+str+'</h'+N+'>';
    };
}