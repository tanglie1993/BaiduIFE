function mouseMove(ev) {
            Ev = ev || window.event;
            var mousePos = mouseCoords(ev);
            document.getElementById("xxx").value = mousePos.x;
            document.getElementById("yyy").value = mousePos.y;
        }

        function mouseCoords(ev) {
            if (ev.pageX || ev.pageY) {
                return {
                    x: ev.pageX,
                    y: ev.pageY
                };
            }
            return {
                x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: ev.clientY + document.body.scrollTop - document.body.clientTop
            };
        }
        document.onmousemove = mouseMove;