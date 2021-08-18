const showElement = (elem) => {
	elem.classList.remove("hide");
};

const hideElement = (elem) => {
	elem.classList.add("hide");
};

export { showElement, hideElement };
