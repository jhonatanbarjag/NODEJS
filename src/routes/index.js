import { Router } from "express";
const router = Router();

router.get("/", (req, res) => res.render("index", {title :"inicio"}));
router.get("/about", (req, res) => res.render("sobrenosotros", {title :"sobre nosotros"}));
router.get("/contact", (req, res) => res.render("contacto", {title :"contacto"}));

export default router;