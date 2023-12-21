const fs = require("fs");
const path = require("path");

const part1 = () => {
    console.log('--- PART ONE ---');
    let payload = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
    let dataArray = payload.map(str => str);
    let res = 0;
    dataArray.forEach((dataStr,index) => {
        const numArray = dataStr.match(/\d+/g);

        let currentStr = dataStr;
        
        numArray?.forEach(num => {
            const strIndex = currentStr.indexOf(num);
            const finalArray = [
                dataArray[index-1]?.substr(
                    strIndex  === 0 ? 0 : strIndex -1,
                    strIndex  === 0 ? num.length + 1  : num.length + 2 ,   
                ),
                dataStr.substr(
                    strIndex  === 0 ? 0 : strIndex -1,
                    strIndex  === 0 ? num.length + 1  : num.length + 2 ,   
                ),
                dataArray[index+1]?.substr(
                    strIndex  === 0 ? 0 : strIndex -1,
                    strIndex  === 0 ? num.length + 1  : num.length + 2 ,   
                ),
            ].filter(str => str);
            currentStr = currentStr.replace(num,'0'.repeat(num.length))
            const conditionArray = finalArray.map(piece => {
                return /^[0-9.]+$/.test(piece)
            })
            if (conditionArray.includes(false)) {
                res += Number(num)
            }
        })
    });
    console.log(res)
}

const part2 = () => {
    console.log('--- PART TWO ---');
    let payload = fs.readFileSync(path.resolve(__dirname, "input.txt"), "utf8").split("\n");
    let dataArray = payload.map(str => str);
    let res = 0;
    dataArray.forEach((dataStr,index) => {
        let copyStr = dataStr;
        const engineArray = copyStr.match(/\*/g);
        engineArray?.forEach(engine => {
            const sideEngines = copyStr.match(/\d+\*\d+/i);
            if (sideEngines) {
                sideEngines.forEach(se => {
                    let multiplyArray = se.split('*').map(Number);
                    res += multiplyArray[0] * multiplyArray[1]
                    copyStr = copyStr.replace(sideEngines[0],'0'.repeat(sideEngines[0].length))
                } )
            }
             else {
                let engineIndex = copyStr.indexOf('*');
                let prevStr = dataArray[index-1];
                let nextStr = dataArray[index+1];

                let previousEngineArray = [];
                let prevNum = '';
                let prevStartEngineIndex = !isNaN(prevStr[engineIndex]) ? engineIndex: engineIndex - 1;
                for (let index = prevStartEngineIndex; index >= 0 ; index--) {
                    if(!isNaN(prevStr[index])) {
                        prevNum = prevStr[index]+prevNum
                    } else {
                        index = -1
                    }
                }
                if(prevStartEngineIndex !== engineIndex) {
                    prevNum.length && previousEngineArray.push(prevNum);
                    prevNum = ''
                }
                for (let index = engineIndex+1; index <= prevStr.length-1 ; index++) {
                    if(!isNaN(prevStr[index])) {
                        prevNum = prevNum + prevStr[index]
                    } else {
                        index =  prevStr.length
                    }
                }
                prevNum.length && previousEngineArray.push(prevNum);
                prevNum = ''
                
                let nextEngineArray = [];
                let nextNum = '';
                let nextStartEngineIndex = !isNaN(nextStr[engineIndex]) ? engineIndex: engineIndex - 1;
                for (let index = nextStartEngineIndex; index >= 0 ; index--) {
                    if(!isNaN(nextStr[index])) {
                        nextNum = nextStr[index] + nextNum
                    } else {
                        index = -1
                    }
                }
                if(nextStartEngineIndex !== engineIndex) {
                    nextNum.length && nextEngineArray.push(nextNum);
                    nextNum = ''
                }
                for (let index = engineIndex+1; index <= nextStr.length-1 ; index++) {
                    if(!isNaN(nextStr[index])) {
                        nextNum = nextNum + nextStr[index]
                    } else {
                        index =  nextStr.length
                    }
                }
                nextNum.length && nextEngineArray.push(nextNum);
                nextNum = ''
                let onesideEngine = copyStr.match(/\d+\*\d+|\d+\*|\*\d+/i) ? copyStr.match(/\d+\*\d+|\d+\*|\*\d+/i)[0] : null;
                let finalEngineArray = [...previousEngineArray,...nextEngineArray]
                if(!isNaN(copyStr[copyStr.indexOf('*')-1]) || !isNaN(copyStr[copyStr.indexOf('*')+1])) {
                    finalEngineArray.push(onesideEngine?.split('*').filter(e => e.length)[0])
                }
                copyStr = copyStr.replace('*','0')
                let val =  Number(finalEngineArray[0]*finalEngineArray[1]);
                if (!isNaN(val)) {
                    res += val;
                }
                
            }
        })
    });
    console.log(res)
}
part1()
part2()