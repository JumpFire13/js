/**
 * Created by Anton on 22.04.2016.
 */
var n = prompt('Введите n');
n = parseInt(n);
var m = prompt('Введите m');
m = parseInt(m);
function tablealf(n,m) {
    var alf=['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ь','ы','ъ','э','ю','я'];
    var newTable=document.createElement('table');
    newTable.setAttribute('border', '1px');
    for (var i = 0; i < n; i++) {
        var newRow=newTable.insertRow(i);
        for (var j = 0; j < m; j++) {
            var newCell = newRow.insertCell(j);
            var color1 = Math.floor(Math.random()* (255 + 1));
            var color2 = Math.floor(Math.random()* (255 + 1));
            var color3 = Math.floor(Math.random()* (255 + 1));
            var bgcolor = 'background:RGB(' + color1 + ',' + color2 + ',' + color3 + ')';
            newCell.setAttribute('style', bgcolor);
            var letter = Math.floor(Math.random()* (32 + 1));
            newCell.innerHTML=alf[letter];
        }
    }
    document.body.appendChild(newTable);
}

var tbl = "";
var arr=['a','b','c','d','e','f','g','h'];
function chess() {
    var newTable=document.createElement('table');
    newTable.setAttribute('id', 'tbl');
    for (var i = 0; i < 8; i++) {
        var newRow=newTable.insertRow(i);
        for (var j = 0; j < 8; j++) {
            var newCell = newRow.insertCell(j);
            var id = arr[j]+(8-i);
            var white = (i+j)%2;
            if (white == 0){
                var bgcolor = 'background:RGB(255, 255, 255)';}
            else {
                var bgcolor = 'background:RGB(128, 128, 128)';
            }
            newCell.setAttribute('style', bgcolor);
            newCell.setAttribute('id', id);
            newCell.setAttribute('onclick','sayRC(this)');
            newCell.innerHTML=id;
        }
    }
    document.body.appendChild(newTable);
    tbl = document.getElementById("tbl");
}
function sayRC(cll) {
    // Номер столбца текущей ячейки
    var c = cll.cellIndex;
    var r = gtRw(cll, c);
    var id = arr[c]+(8-r);
    var table = document.getElementById('tbl');
    var elems = table.getElementsByTagName('td');
    for(var i=0; i<elems.length; i++)
    elems[i].classList.remove('highlights');
    var cell = document.getElementById(id);
    cell.classList.add('highlights');
    var span = document.createElement('span');
    span.innerHTML = "Поле " + id + " ";
    document.body.appendChild(span);
}
// Возвращает номер строки, которой расположена ячейка cll
function gtRw(cll, c) {
    for (var i = 0; i < 8; i++) {
        var rw = tbl.rows[i];
        if (rw.cells[c] == cll) return i;
    }
}

function startRefocus(event) {
    event = event || window.event;
    //if (!event.ctrlKey) return;
    var key = event.keyCode;
    var targetElement = event.target || event.srcElement;
    focusMe(targetElement, key);
}
function focusMe(input, key) {
    var needFocusElement = true;

    function detectColumn(td) {
        var result = 0, x;
        while (td = td.previousElementSibling) {
            ++result
        }
        return result;
    }

    try {
        switch (key) {
            case 37:
                needFocusElement = input.parentNode.previousElementSibling.querySelector("input");
                sayRC(this);
                break;
            case 39:
                needFocusElement = input.parentNode.nextElementSibling.querySelector("input");
                sayRC(this);
                break;
            case 38:
                needFocusElement = input.parentNode.parentNode.previousElementSibling.querySelectorAll("td")[detectColumn(input.parentNode)].querySelector("input");
                sayRC(this);
                break;
            case 40:
                needFocusElement = input.parentNode.parentNode.nextElementSibling.querySelectorAll("td")[detectColumn(input.parentNode)].querySelector("input");
                sayRC(this);
                break;
            default:
                needFocusElement = false;
        }
    } catch (e) {
        needFocusElement = false;
    }

    if (!needFocusElement) return;
    needFocusElement.focus();
}