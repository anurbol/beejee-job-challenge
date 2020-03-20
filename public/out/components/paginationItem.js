export const paginationItem = (item) => {
    const classes = ['page-item'];
    if (item.active) {
        classes.push('active');
    }
    if (item.disabled) {
        classes.push('disabled');
    }
    const onclick = (item.disabled || item.active)
        ? ''
        : `onclick="app.setPage(${item.targetPage});event.preventDefault()`;
    return `
    <li class="${classes.join(' ')}">
        <a class="page-link" href="#" ${onclick}">
            ${item.label}
        </a>
    </li>
    `;
};
