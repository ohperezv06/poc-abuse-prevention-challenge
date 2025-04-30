import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as fs from 'fs';
import usersRouter from './routes/users';
import countriesRouter from './routes/countries';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/meli-users', usersRouter);
app.use('/api/meli-countries', countriesRouter);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.send('Servidor Express corriendo correctamente');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express en http://localhost:${PORT}`);
});

app.get('/ssr-form', (req, res) => {
    const referrer = req.query.referrer || '/';
    const token = req.query.token || '';
  
    const user = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/usersMock.json'), 'utf-8'));
    const countries = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/countriesMock.json'), 'utf-8'));
  
    res.render('form', {
      referrer,
      token,
      user,
      countries
    });
  });
  
  app.post('/ssr-form', (req, res) => {
    const { referrer, token } = req.body;
  
    const redirectUrl = `${referrer}?token=${encodeURIComponent(token)}`;
    res.redirect(redirectUrl);
  });

