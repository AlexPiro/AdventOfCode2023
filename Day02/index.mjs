import fs from 'fs'


const maxColorCube = {
    red:12,
    green: 13,
    blue: 14
}

function countCubesPerSet(set){
    const cubesCount = {
        red:0,
        green:0,
        blue: 0
    }

    const cubes = set.trim().split(',')
    cubes.forEach(cube => {
        const splitted = cube.trim().split(' ')
        cubesCount[splitted[1]] += parseInt(splitted[0])
    });

    return cubesCount

}


function parseGames()
{
    const input = fs.readFileSync("Day02/puzzle.txt", "utf-8").split("\n");
    
    const games = {}
    input.forEach(game=>{
        const splitted = game.split(': ');
        const gameNb = parseInt(splitted[0].split(' ')[1])
        const sets = splitted[1].split(';')
        const records = [];
        sets.forEach(set => {
            records.push(countCubesPerSet(set))
        })
        
        games[gameNb] = records
    })

    return games;

}

function part1()
{
    const games = parseGames();
    let sumOfValidGames = 0;
    for(const [k, sets] of Object.entries(games))
    {
        let gameValid = true;
        sets.forEach(set=>{
            for(const [key, value] of Object.entries(set))
            {
                if(value > maxColorCube[key])
                {
                    gameValid = false
                }
            }
        })

        if(gameValid) sumOfValidGames += parseInt(k);

    }

    console.log(sumOfValidGames)

}

// part1()


function part2()
{
    const games = parseGames();

    let output = 0;

    for(const [_, sets] of Object.entries(games))
    {
        const gameCubes = {
            red : 0,
            green: 0,
            blue: 0
        }

        sets.forEach(set=>{
            for(const [key, value] of Object.entries(set))
            {
                gameCubes[key] = Math.max(value, gameCubes[key]);
            }
        })

        let power = 1;
        for(const [_, cubes] of Object.entries(gameCubes))
        {
            power *= cubes;
        }

        output += power;
    }

    console.log(output)

}

part2()