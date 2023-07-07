import * as fs from 'fs';
import { analyzeGrid, fillGrid } from './local_modules/analyze_grid';


const input = fs.readFileSync('../test.txt', 'utf8');
let gridAnalyzed = analyzeGrid(input);
let problem = fillGrid(gridAnalyzed);
problem.printProblem();

