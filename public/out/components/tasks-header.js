"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arrow_1 = require("./arrow");
exports.tasksHeader = function () { return "<table class=\"table\">\n<thead>\n    <tr>" + ['#', 'Имя', 'email', 'Текст']
    .map(function (i) {
    return "<th scope=\"col\" onclick=sort(" + i + ")>" + i + " " + arrow_1.arrow() + "</th>";
}) + "\n    </tr>\n</thead>\n<app-tasks></app-tasks>\n</table>"; };
