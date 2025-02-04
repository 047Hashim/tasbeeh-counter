function tashbeehCounter() {
  let add = document.querySelector(".add");
  let editButton = document.querySelector(".edit");
  let countContainer = document.querySelector(".count");
  let countElement = document.querySelector(".inner-value");
  let reset = document.querySelector(".reset");
  let reciteTimes = document.querySelector("#recited-times");
  let themeBtn = document.querySelector(".color-change");
  let textTheme = document.querySelector(".text-theme");
  let textIcon = document.querySelector(".color-change i");
  let body = document.querySelector("body");
  let value = parseInt(countElement.innerText);
  let totalRecite = 0;
  let target;
  add.addEventListener("click", () => {
    value++;
    if (value === target && target > 0) {
      value = 0;
      totalRecite++;
      reciteTimes.innerText = totalRecite;
    }
    countElement.innerText = value;
  });

  // Reset value when the Reset button is clicked
  reset.addEventListener("click", () => {
    value = 0;
    countElement.innerText = value;
  });

  editButton.addEventListener("click", () => {
    countElement.setAttribute("contenteditable", "true");
    countElement.focus();

    const range = document.createRange();
    range.selectNodeContents(countElement);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    countElement.addEventListener("input", () => {
      const countElementWidth = countElement.offsetWidth;
      const countContainerWidth = countContainer.offsetWidth;

      if (countElementWidth > countContainerWidth) {
        countElement.textContent = countElement.textContent.slice(0, -1);
        const range = document.createRange();
        range.selectNodeContents(countElement);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
    countElement.addEventListener("blur", () => {
      countElement.setAttribute("contenteditable", "false");

      // Ensure the value is numeric; default to 0 if invalid
      const newValue = countElement.textContent.trim();
      countElement.textContent =
        isNaN(newValue) || newValue === "" ? "0" : newValue;

      value = parseInt(countElement.textContent);
    });

    // Stop editing when Enter is pressed
    countElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent new lines
        countElement.blur();
      }
    });
  });

  const targetSelect = document.getElementById("target");
  const customTargetInput = document.getElementById("custom-target-input");
  target = 0; //by default

  let customOption;

  targetSelect.addEventListener("change", () => {
    const selectedValue = targetSelect.value;
    value = 0;
    countElement.innerText = value;
    totalRecite = 0;
    reciteTimes.innerText = totalRecite;

    if (selectedValue === "custom") {
      customTargetInput.style.display = "inline-block";
      customTargetInput.focus();
    } else {
      customTargetInput.style.display = "none";
      customTargetInput.value = "";
      target = selectedValue == "none" ? 0 : parseInt(selectedValue);
      targetSelect.blur();
    }
  });

  customTargetInput.addEventListener("blur", () => {
    const customValue = parseInt(customTargetInput.value);
    if (isNaN(customValue)) {
      customTargetInput.style.display = "none";
      targetSelect.value = "none";
    }

    if (!isNaN(customValue) && customValue > 0) {
      if (customOption) {
        customOption.remove();
      }
      customOption = document.createElement("option");
      customOption.value = customValue;
      customOption.textContent = customValue;
      const fourthChild = targetSelect.children[4];
      if (fourthChild) {
        targetSelect.insertBefore(customOption, fourthChild);
      } else {
        targetSelect.appendChild(customOption);
      }
      targetSelect.value = customValue;

      customTargetInput.style.display = "none";
      target = customValue;

      console.log(`Custom target set to: ${target}`);
    }
  });
  customTargetInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      customTargetInput.blur();
    }
  });
  //Light mode and dark mode
  themeBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
      textTheme.textContent = "Dark";
      textIcon.classList.remove("fa-sun");
      textIcon.classList.add("fa-moon");
    } else {
      textTheme.textContent = "Light";
      textIcon.classList.remove("fa-moon");
      textIcon.classList.add("fa-sun");
    }
  });
}
tashbeehCounter();
