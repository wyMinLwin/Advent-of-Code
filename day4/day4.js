const fs = require("fs");
const path = require("path");

const part1 = () => {
    console.log('--- PART ONE ---');
    let payload = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
    let res = 0;
    payload.forEach(str => {
        const cardArray = str.slice(str.indexOf(':')+1).split('|');
        const winningNumerArray = cardArray[0].trim().split(' ');
        const numberWeHaveArray = cardArray[1].trim().split(' ');
        const wonNumerArray = winningNumerArray.filter(winningNumber => numberWeHaveArray.includes(winningNumber)).filter(w => w);
        if (wonNumerArray.length) {
            res += Math.pow(2,(wonNumerArray.length -1))
        }
    });
    console.log(res);
} 

const part2 = () => {
    console.log('--- PART TWO ---');
    let payload = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
    let ticketCounts = Array(payload.length).fill(1);
    payload.forEach((str,index) => {
        const cardArray = str.slice(str.indexOf(':')+1).split('|');
        const winningNumerArray = cardArray[0].trim().split(' ');
        const numberWeHaveArray = cardArray[1].trim().split(' ');
        const wonNumerArray = winningNumerArray.filter(winningNumber => numberWeHaveArray.includes(winningNumber)).filter(w => w);
        wonNumerArray.forEach((wonNum,i) => {
            ticketCounts[index+i+1] += ticketCounts[index]
        })
    });
    console.log(ticketCounts.reduce((init,current) => init + current ,0));
} 

part1()
part2()