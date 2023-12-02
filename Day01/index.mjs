import fs from "fs";

function part1() {
  const input = fs.readFileSync("Day01/puzzle.txt", "utf-8").split("\n");

  const calibrationsValues = [];
  input.forEach((line) => {
    const digitValues = line.match(/[0-9]/g).map((n) => parseInt(n));

    calibrationsValues.push(
      digitValues[0] * 10 + digitValues[digitValues.length - 1]
    );
  });

  return calibrationsValues.reduce((acc, val) => acc + val);
}

// const output1 = part1();

// console.log(output1)

const stringNumbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
};

// const regexStringNumbers = /(one|two|three|four|five|six|seven|eight|nine)/g;

function part2() {
  const input = fs.readFileSync("Day01/puzzle.txt", "utf-8").split("\n");

  const calibrationsValues = [];
  input.forEach((line) => {
    const regex = /[0-9]|(one|two|three|four|five|six|seven|eight|nine)/g
    // const digitValues = line.match(regex)
    const matchValues = [];

    let next = regex.exec(line);

    while (next) {
        matchValues.push(next[0]);
        regex.lastIndex = next.index + 1;
        next = regex.exec(line);
    }

    const digitValues = matchValues.map(e => {
        if(isNaN(e)) return stringNumbers[e]
        else return parseInt(e)
    })

    calibrationsValues.push(
      digitValues[0] * 10 + digitValues[digitValues.length - 1]
    );
  });

  return calibrationsValues.reduce((acc, val) => acc + val, 0);
}

const output2 = part2();

console.log(output2);
