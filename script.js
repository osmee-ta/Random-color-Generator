const containerEl = document.querySelector(".container");
const regenerateBtn = document.getElementById("regenerateBtn");
const toast = document.getElementById("toast");

function createColorBoxes() {
    containerEl.innerHTML = ""; // clear existing

    for (let index = 0; index < 50; index++) {
        const colorContainerEl = document.createElement("div");
        colorContainerEl.classList.add("color-container");

        const colorCodeEl = document.createElement("span");
        colorCodeEl.classList.add("color-code");
        colorContainerEl.appendChild(colorCodeEl);

        const copyButtonEl = document.createElement("button");
        copyButtonEl.innerText = "Copy";
        colorContainerEl.appendChild(copyButtonEl);

        containerEl.appendChild(colorContainerEl);
    }
}

function randomColor() {
    const chars = "0123456789ABCDEF";
    let colorCode = "";
    for (let i = 0; i < 6; i++) {
        colorCode += chars[Math.floor(Math.random() * chars.length)];
    }
    return colorCode;
}

function generateColors() {
    const colorContainerEls = document.querySelectorAll(".color-container");

    colorContainerEls.forEach((el) => {
        const newColorCode = randomColor();
        const colorCodeEl = el.querySelector(".color-code");
        const copyButtonEl = el.querySelector("button");

        el.style.backgroundColor = "#" + newColorCode;
        colorCodeEl.innerText = "#" + newColorCode;

        copyButtonEl.onclick = () => {
            copyToClipboard("#" + newColorCode);
        };
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            showToast(`Copied: ${text}`);
        })
        .catch((err) => {
            console.error("Failed to copy", err);
        });
}

function showToast(message) {
    toast.innerText = message;
    toast.className = "show";
    setTimeout(() => {
        toast.className = toast.className.replace("show", "");
    }, 2500);
}

// Initial Load
createColorBoxes();
generateColors();

// Button Click
regenerateBtn.addEventListener("click", () => {
    generateColors();
});
