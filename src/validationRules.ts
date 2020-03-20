import { ValidationRule } from "./contracts";

export const required: ValidationRule = {
    validator: (val: any) => ({
        errors: val ? [] : ['Это поле обязательно.']
    })
}

export const email: ValidationRule = {
    validator: (val: any) => ({
        errors:
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                .test(String(val).toLowerCase())
                ? []
                : ['Пожалуйста, введите корректный Email.']
    })
}