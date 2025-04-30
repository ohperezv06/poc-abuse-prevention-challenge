import { Router } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { Country } from '../types/country';

const router = Router();

router.get('/', (req, res) => {
  const dataPath = path.join(__dirname, '../data/countriesMock.json');
  const countries: Country[] = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.json(countries);
});

export default router;
