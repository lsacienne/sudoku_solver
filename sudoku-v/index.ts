import * as fs from 'fs';
import { analyzeGrid, fillGrid } from './local_modules/analyze_grid';
import { generateAndTest } from './local_modules/ai';


const input = fs.readFileSync('../test.txt', 'utf8');
let gridAnalyzed = analyzeGrid(input);
let problem = fillGrid(gridAnalyzed);
problem.printProblem();
let res = generateAndTest(problem);
res?.printDenseSolution();

