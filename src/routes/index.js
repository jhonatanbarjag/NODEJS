import { Router } from "express";
import BodyParser from "body-parser";
import {ConsultarPeliculas } from "../services/conexion.js";
import {RegistrarCliente} from "../services/conexion.js";
import {IniciarSesionCliente} from "../services/conexion.js";

const router = Router();

router.use(BodyParser.urlencoded({extended: true}));
router.use(BodyParser.json());

router.get("/", (req, res) => res.render("index", {title :"inicio"}));
router.get("/about", (req, res) => res.render("sobrenosotros", {title :"sobre nosotros"}));
router.get("/contact", (req, res) => res.render("contactanos", {title :"contacto"}));
router.get("/catalogo", (req, res) => res.render("Catalogo", {title :"catalogo"}));
router.get("/registrarcliente", (req, res) => res.render("registrarcliente", {title :"registrarcliente"}));
router.get("/titanic", (req, res) => res.render("infotitanic", {title :"titanic"}));
router.get("/iniciarsesion", (req, res) => res.render("iniciarsesion", {title :"iniciarsesion"}));

router.get('/api/get-peliculas', async (req, res) => {
    const peliculas = await ConsultarPeliculas();
    res.status(200).json(peliculas);
});


router.post('/api/register', async (req, res) => {
    const {username, password , email} = req.body;

    if(!username || !password || !email) {
        return res.status(400).json({success:false, message: 'Faltan campos por llenar'});
    }

    const resultado = await RegistrarCliente(username, password, email);
    
    if (resultado.success) {
        return res.status(201).json(resultado);
    } else {
        return res.status(400).json(resultado);
    }
});	




router.use(BodyParser.urlencoded({extended: true}));
router.use(BodyParser.json());

router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
 
    if (!username || !password) {
       return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }
 
    const resultado = await IniciarSesionCliente(username, password);
 
    if (resultado.success) {
       res.status(200).json(resultado);
    } else {
       res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
 });

export default router;