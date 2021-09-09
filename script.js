const paint = document.getElementById("paint"),
    olymp = document.getElementById("olymp"),
    color = document.getElementById("color"),
    brush = document.getElementById("brush"),
    brushSize = document.getElementById("brush-size");

const ctxPaint = paint.getContext("2d"),
    ctxOlymp = olymp.getContext("2d");

ctxPaint.strokeRect(0, 0, 400, 400);
ctxOlymp.strokeRect(0, 0, 700, 400);

color.addEventListener('input', () => ctxPaint.strokeStyle = color.value);

brush.addEventListener('input', () => {
    brushSize.textContent = brush.value;
    ctxPaint.lineWidth = brush.value;
});

paint.addEventListener('mousemove', e => {
    const x = e.offsetX,
        y = e.offsetY,
        mx = e.movementX,
        my = e.movementY;
    ctxPaint.lineWidth = 5;
    if (e.buttons > 0) {
        ctxPaint.beginPath();
        ctxPaint.moveTo(x, y);
        ctxPaint.lineTo(x - mx, y - my);
        ctxPaint.stroke();
        ctxPaint.closePath();
    }
});

const paintCircle = () => {
    ctxOlymp.moveTo(20, 20);
    ctxOlymp.lineWidth = 10;
    ctxOlymp.strokeStyle = "#429bf5";
    ctxOlymp.beginPath();
    ctxOlymp.arc(70, 70, 50, 0, 2 * Math.PI, true);
    ctxOlymp.stroke();
    ctxOlymp.closePath();
    // ctxOlymp.moveTo(120, 70);

    ctxOlymp.strokeStyle = "#429bf5";
    ctxOlymp.beginPath();
    ctxOlymp.arc(70, 70, 50, 0 * Math.PI, 2 * Math.PI, false);
    ctxOlymp.stroke();
    ctxOlymp.closePath();
    ctxOlymp.strokeStyle = "black";
    ctxOlymp.beginPath();
    ctxOlymp.arc(190, 70, 50, 0 * Math.PI, 2 * Math.PI, false);
    ctxOlymp.stroke();
    ctxOlymp.closePath();
    ctxOlymp.strokeStyle = "#f5d742";
    ctxOlymp.beginPath();
    ctxOlymp.arc(130, 120, 50, 0 * Math.PI, 2 * Math.PI, false);
    ctxOlymp.stroke();
    ctxOlymp.closePath();
    ctxOlymp.strokeStyle = "#f5426c";
    ctxOlymp.beginPath();
    ctxOlymp.arc(310, 70, 50, 0 * Math.PI, 2 * Math.PI, false);
    ctxOlymp.stroke();
    ctxOlymp.closePath();
    ctxOlymp.strokeStyle = "#2b9e48";
    ctxOlymp.beginPath();
    ctxOlymp.arc(250, 120, 50, 0 * Math.PI, 2 * Math.PI, false);
    ctxOlymp.stroke();
    ctxOlymp.closePath();

    ctxOlymp.strokeStyle = "#429bf5";
    ctxOlymp.beginPath();
    ctxOlymp.arc(70, 70, 50, 1.5 * Math.PI, 0.2 * Math.PI, false);
    ctxOlymp.stroke();
    ctxOlymp.closePath();

    ctxOlymp.strokeStyle = "black";
    ctxOlymp.beginPath();
    ctxOlymp.arc(190, 70, 50, 0.7 * Math.PI, 0.5 * Math.PI, true);
    ctxOlymp.stroke();
    ctxOlymp.closePath();

    ctxOlymp.strokeStyle = "black";
    ctxOlymp.beginPath();
    ctxOlymp.arc(190, 70, 50, 1.9 * Math.PI, 0.3 * Math.PI, false);
    ctxOlymp.stroke();
    ctxOlymp.closePath();

    ctxOlymp.strokeStyle = "#f5426c";
    ctxOlymp.beginPath();
    ctxOlymp.arc(310, 70, 50, 0.5 * Math.PI, 0.8 * Math.PI, false);
    ctxOlymp.stroke();
    ctxOlymp.closePath();



};
paintCircle();