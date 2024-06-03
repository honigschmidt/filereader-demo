function main() {
    const dragAndDropArea = document.querySelector("#dd_area");
    const clearButton = document.querySelector("#clear_button");
    const dragAndDropAreaDefaultText = "Pull text files here to read their content";

    dragAndDropArea.classList.add("dd_init");
    dragAndDropArea.textContent = dragAndDropAreaDefaultText;

    dragAndDropArea.addEventListener("dragover", (evt) => {
        evt.preventDefault();
        dragAndDropArea.classList.add("selected");
    })

    dragAndDropArea.addEventListener("dragleave", () => {
        dragAndDropArea.classList.remove("selected");
    })
    
    dragAndDropArea.addEventListener("drop", handleDropEvent);

    clearButton.addEventListener("click", () => {
        dragAndDropArea.classList.add("dd_init");
        dragAndDropArea.textContent = dragAndDropAreaDefaultText;
    })
    
    function handleDropEvent(evt) {
        evt.preventDefault();
        dragAndDropArea.classList.remove("selected", "dd_init");
        if (dragAndDropArea.textContent == dragAndDropAreaDefaultText) {
            dragAndDropArea.textContent = "";
        }
        Object.values(evt.dataTransfer.files).forEach(file => {
            if (file.type.match("text.*")) {
                let fileName = `=== ${file.name} ===`;
                const reader = new FileReader();
                reader.readAsText(file);
                reader.onload = () => {
                    let result = reader.result;
                    let currentText = dragAndDropArea.innerHTML;
                    if (dragAndDropArea.textContent != "") {
                        dragAndDropArea.innerHTML = currentText + "<br><br>" + fileName + "<br>" + result;
                    } else {
                        dragAndDropArea.innerHTML = fileName + "<br>" + result;
                    }
                    dragAndDropArea.scrollTop = dragAndDropArea.scrollHeight;
                }
            }
            else {
                let fileName = `=== ${file.name} ===`;
                let currentText = dragAndDropArea.innerHTML;
                    if (dragAndDropArea.textContent != "") {
                        dragAndDropArea.innerHTML = currentText + "<br><br>" + fileName + "<br>" + "[Can't read file content, not a text file.]";
                    } else {
                        dragAndDropArea.innerHTML = fileName + "<br>" + "[Can't read file content, not a text file.]";
                    }
                    dragAndDropArea.scrollTop = dragAndDropArea.scrollHeight;
            }
        })
    } 
}

document.addEventListener("DOMContentLoaded", main());