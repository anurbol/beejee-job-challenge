export const arrow = (direction: 'up' | 'down' | null) =>
    `<img src="/public/vendor/bootstrap-icons/${
    direction === 'up'
        ? 'arrow-up'
        : direction === 'down'
            ? 'arrow-down'
            : 'arrow-up-down'}.svg" alt="" width="32" height="32" title="Bootstrap"></img>`