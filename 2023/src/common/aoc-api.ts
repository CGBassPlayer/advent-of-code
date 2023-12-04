import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export async function fetchPuzzleInput(year: number, day: number) {
    const options = {
        method: "GET",
        url: `https://adventofcode.com/${year}/day/${day}/input`,
        headers: {
            "Cookie": process.env.AOC_TOKEN
        }
    }

    try {
        let response = axios(options);
        return (await response).data;
    } catch (err) {
        console.log('Failed to get puzzle input');
        console.log(err);
        return '';
    }
}


//     await axios.get(`https://adventofcode.com/${year}/day/${day}/input`, options)
//         .then(function (r) {
//             // console.log(r.data);
//             return r.data;
//         })
//         .catch(err => {
//             console.log('Failed to get puzzle input');
//             console.log(err);
//              return '';
//         });
// }