export const UcFirst = (n) => {
    if (n && n.trim().length) {
        let arrayString = n.split('')
        if (arrayString.length) {
            arrayString[0] = arrayString[0].toUpperCase()
            return arrayString.join('')
        }
        return null
    } else return null
}