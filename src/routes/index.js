import { Router } from "express";
import { ConsultarPeliculas } from "../services/conexion.js";

const router = Router();


router.get("/", (req, res) => res.render("index", {title :"inicio"}));
router.get("/about", (req, res) => res.render("sobrenosotros", {title :"sobre nosotros"}));
router.get("/contact", (req, res) => res.render("contactanos", {title :"contacto"}));
router.get("/catalogo", (req, res) => res.render("Catalogo", {title :"catalogo"}));
router.get("/titanic", (req, res) => res.render("infotitanic", {title :"titanic"}));
router.get("/iniciarsesion", (req, res) => res.render("iniciarsesion", {title :"iniciarsesion"}));

router.get('/api/get-peliculas', async (req, res) => {
    const peliculas = await ConsultarPeliculas();
    res.status(200).json(peliculas);

});
export default router;