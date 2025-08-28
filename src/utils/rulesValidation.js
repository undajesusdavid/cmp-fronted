export const String = {

    required: (value, name = null , message = `El campo ${name} es requerido`) => {
        return value.trim() !== "" ? "" : message;
    },

}


export const Number = {

    required: (value, name = null , message = `El campo ${name} es requerido`) => {
        return value !== "" ? "" : message;
    },

}