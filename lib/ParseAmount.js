
// Add commas to numbers e.g. 1,000,000

export const parseAmount = (amount) => {
    if (amount > 1) {
        return parseInt(amount).toLocaleString('en-US')
    } else
        return amount
}