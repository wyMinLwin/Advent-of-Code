const fs = require("fs");
const path = require("path");
const numbers = {
    zero:0,
    one:1,
    two:2,
    three:3,
    four:4,
    five:5,
    six:6,
    seven:7,
    eight:8,
    nine:9
}

const part1 = () => {
    console.log('--- PART ONE ---');
    let payload = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n")
    let res = 0;
    payload.forEach(str => {
        const numArr = str.match(/\d/g);
        res += Number(numArr[0] + numArr[numArr.length-1])
    })
    console.log(res)
}

const part2 = () => {
    console.log('--- PART TWO ---');
    let payload = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n")
    let res = 0;
    payload.forEach(str => {
        let modStr = str;
        Object.keys(numbers).forEach(num => {
            modStr = modStr.replaceAll(num.slice(0,num.length),num[0]+numbers[num]+num[num.length-1])
        })
        const numArr = modStr.match(/\d/g); 
        res += Number(numArr[0] + numArr[numArr.length-1])      
    })
    console.log(res)
}


part1();
part2();