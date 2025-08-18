export const String = {

    required: (value, name = null , message = `El campo ${name} es requerido`) => {
        return value.trim() !== "" ? "" : message;
    },

}