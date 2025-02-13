import express from 'express';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import router from './routes/index.js';
import { Conectar } from './services/conexion.js';

const app = express();

//configurar el motor de plantillas
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');


//usar enrutamiento y archivos estaticos
app.use(router);
app.use(express.static(join(__dirname, 'public')));


//inicio del servidor
app.listen(3000)
console.log('Server running at http://localhost:3000/');

//conectar a la base de datos
Conectar();
