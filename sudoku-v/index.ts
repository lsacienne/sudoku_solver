import * as fs from 'fs';
import { analyzeGrid, fillGrid } from './local_modules/analyze_grid';
import { generateAndTest, generateAndTest2 } from './local_modules/ai';


const input = fs.readFileSync('../test.txt', 'utf8');
let gridAnalyzed = analyzeGrid(input);
let problem = fillGrid(gridAnalyzed);
problem.printProblem();
/* FIRST APPROACH

let res = generateAndTest(problem);

*/

/* SECOND APPROACH
*/
let firstCell = problem.globalUpdateScore();
let res = generateAndTest2(problem, firstCell);
res?.printDenseSolution();

