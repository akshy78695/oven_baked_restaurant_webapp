export const deleteObjectProperty = (obj, prop) => {
    if (obj[prop] && !obj[prop].length) delete obj[prop];
};
