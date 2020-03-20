export const required = {
    validator: (val) => ({
        errors: val ? [] : ['Это поле обязательно.']
    })
};
export const email = {
    validator: (val) => ({
        errors: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            .test(String(val).toLowerCase())
            ? []
            : ['Пожалуйста, введите корректный Email.']
    })
};
