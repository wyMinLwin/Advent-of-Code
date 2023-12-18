const fs = require("fs");
const path = require("path");
const totalCubes = {
    red: 12,
    green: 13,
    blue: 14,
}

const part1 = () => {
    console.log('--- PART ONE ---');
    let payload = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
    let res = 0;
    payload.forEach((str,index) => {
        const cubesArray = str.slice(str.indexOf(':')+1).split(/[;,]/);
        const modCubes = cubesArray.map((cubes,i) => {
            const cubeData = cubes.split(' ');
            return totalCubes[cubeData[2]] >= cubeData[1];
        })
        if (!modCubes.includes(false)) {
            res = res + index + 1
        }
    });
    console.log(res);
} 

const part2 = () => {
    console.log('--- PART TWO ---');
    let payload = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
    let res = 0;
    payload.forEach((str) => {
        const cubesArray = str.slice(str.indexOf(':')+1).split(/[;,]/);
        const modObj = {
            red:0,
            green:0,
            blue:0
        }
        cubesArray.forEach(cubes => {
            const cubeData = cubes.split(' ');
            modObj[cubeData[2]] = Number(modObj[cubeData[2]]) < Number(cubeData[1]) ? Number(cubeData[1]): Number(modObj[cubeData[2]])
        })
        const multiplyRes = Object.values(modObj).map(Number).reduce((currentVal, newVal) => currentVal * newVal ,1)
        res += multiplyRes
    });
    console.log(res);
} 

part1()
part2()