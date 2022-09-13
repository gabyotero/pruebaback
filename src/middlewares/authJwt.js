import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import User from "../model/User.js";
import Role from "../model/Role.js";

export const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) return res.status(403).json({ message: "Sin token" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Sin autorización!" });
  }
};

export const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        console.log("Es moderador");
        next();
        return;
      }
    }
    return res.status(403).json({ message: "Se requiere rol Moderator!" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Se requiere rol Admin!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error });
  }
};