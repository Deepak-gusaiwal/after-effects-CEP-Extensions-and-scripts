function moveAnchor(position) {
    app.beginUndoGroup("Anchor Tool");

    var comp = app.project.activeItem;

    if (!(comp instanceof CompItem)) {
        alert("Select a composition.");
        return;
    }

    if (comp.selectedLayers.length === 0) {
        alert("Select at least one layer.");
        return;
    }

    var horizontal;
    var vertical;

    switch (position) {
        case "tl":
            horizontal = "left";
            vertical = "top";
            break;

        case "tc":
            horizontal = "center";
            vertical = "top";
            break;

        case "tr":
            horizontal = "right";
            vertical = "top";
            break;

        case "cl":
            horizontal = "left";
            vertical = "center";
            break;

        case "cc":
            horizontal = "center";
            vertical = "center";
            break;

        case "cr":
            horizontal = "right";
            vertical = "center";
            break;

        case "bl":
            horizontal = "left";
            vertical = "bottom";
            break;

        case "bc":
            horizontal = "center";
            vertical = "bottom";
            break;

        case "br":
            horizontal = "right";
            vertical = "bottom";
            break;
    }

    for (var i = 0; i < comp.selectedLayers.length; i++) {
        var layer = comp.selectedLayers[i];

        try {
            var rect;

            try {
                rect = layer.sourceRectAtTime(
                    comp.time,
                    true
                );
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
        catch (e) {
        }
    }

    app.endUndoGroup();

    return "done";
}