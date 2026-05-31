(function Anchor9Panel(thisObj) {
    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel)
            ? thisObj
            : new Window("palette", "Anchor 9", undefined, { resizeable: true });
        var mainGroup = win.add("group");
        mainGroup.orientation = "column";
        mainGroup.alignChildren = ["fill", "fill"];

        var row1 = mainGroup.add("group");
        var row2 = mainGroup.add("group");
        var row3 = mainGroup.add("group");

        var btnTL = row1.add("button", undefined, "↖");
        var btnTC = row1.add("button", undefined, "↑");
        var btnTR = row1.add("button", undefined, "↗");

        var btnCL = row2.add("button", undefined, "←");
        var btnCC = row2.add("button", undefined, "●");
        var btnCR = row2.add("button", undefined, "→");

        var btnBL = row3.add("button", undefined, "↙");
        var btnBC = row3.add("button", undefined, "↓");
        var btnBR = row3.add("button", undefined, "↘");

        function moveAnchor(horizontal, vertical) {
            app.beginUndoGroup("Anchor 9");

            var comp = app.project.activeItem;

            if (!(comp instanceof CompItem)) {
                alert("Select a composition.");
                app.endUndoGroup();
                return;
            }

            if (comp.selectedLayers.length === 0) {
                alert("Select at least one layer.");
                app.endUndoGroup();
                return;
            }

            for (var i = 0; i < comp.selectedLayers.length; i++) {
                var layer = comp.selectedLayers[i];

                try {
                    var rect;

                    try {
                        rect = layer.sourceRectAtTime(comp.time, true);
                    }
                    catch (err) {
                        rect = {
                            left: 0,
                            top: 0,
                            width: layer.width,
                            height: layer.height
                        };
                    }

                    var x;
                    var y;

                    if (horizontal === "left")
                        x = rect.left;
                    else if (horizontal === "center")
                        x = rect.left + rect.width / 2;
                    else
                        x = rect.left + rect.width;

                    if (vertical === "top")
                        y = rect.top;
                    else if (vertical === "center")
                        y = rect.top + rect.height / 2;
                    else
                        y = rect.top + rect.height;

                    var oldAnchor = layer.anchorPoint.value;
                    var oldPos = layer.position.value;

                    var newAnchor = [x, y];

                    var deltaX = newAnchor[0] - oldAnchor[0];
                    var deltaY = newAnchor[1] - oldAnchor[1];

                    layer.anchorPoint.setValue(newAnchor);

                    if (oldPos.length === 2) {
                        layer.position.setValue([
                            oldPos[0] + deltaX,
                            oldPos[1] + deltaY
                        ]);
                    }
                    else {
                        layer.position.setValue([
                            oldPos[0] + deltaX,
                            oldPos[1] + deltaY,
                            oldPos[2]
                        ]);
                    }
                }
                catch (e) { }
            }

            app.endUndoGroup();
        }

        btnTL.onClick = function () { moveAnchor("left", "top"); };
        btnTC.onClick = function () { moveAnchor("center", "top"); };
        btnTR.onClick = function () { moveAnchor("right", "top"); };

        btnCL.onClick = function () { moveAnchor("left", "center"); };
        btnCC.onClick = function () { moveAnchor("center", "center"); };
        btnCR.onClick = function () { moveAnchor("right", "center"); };

        btnBL.onClick = function () { moveAnchor("left", "bottom"); };
        btnBC.onClick = function () { moveAnchor("center", "bottom"); };
        btnBR.onClick = function () { moveAnchor("right", "bottom"); };

        win.layout.layout(true);
        win.layout.resize();

        return win;
    }

    var myPanel = buildUI(thisObj);

    if (myPanel instanceof Window) {
        myPanel.center();
        myPanel.show();
    }

})(this);
