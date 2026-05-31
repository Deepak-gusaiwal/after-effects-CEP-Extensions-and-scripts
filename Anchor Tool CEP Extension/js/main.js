const cs = new CSInterface();

cs.evalScript(
    '$.evalFile("' +
    cs.getSystemPath(SystemPath.EXTENSION) +
    '/host/anchor.jsx")'
);

document
    .querySelectorAll("button")
    .forEach(button => {

        button.addEventListener("click", () => {
            const pos = button.dataset.pos;
            console.log("Button clicked:", pos);
            cs.evalScript(
                'moveAnchor("' + pos + '")'
            );

        });

    });