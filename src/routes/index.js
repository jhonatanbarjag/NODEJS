import { Router } from "express";
const router = Router();

router.get("/", (req, res) => res.render("index", {title :"inicio"}));
router.get("/about", (req, res) => res.render("sobrenosotros", {title :"sobre nosotros"}));
router.get("/contact", (req, res) => res.render("contactanos", {title :"contacto"}));
router.get("/catalogo", (req, res) => res.render("Catalogo", {title :"catalogo"}));
router.get("/titanic", (req, res) => res.render("infotitanic", {title :"titanic"}));
export default router;