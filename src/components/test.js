let arr = ["1000", "1000.00", "1000,00", "1 000.00", "1 000,00", "1.000,00", "1,000.00"]

arr.map((item) => {
    console.log(item.replace(/[\s.,]+/g, '').substring(0,4))
})