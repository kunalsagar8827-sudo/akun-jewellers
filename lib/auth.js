import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

export function signAdminToken() {
  return jwt.sign({ role: "admin" }, SECRET, { expiresIn: "7d" });
}

export function verifyAdminToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded.role === "admin";
  } catch {
    return false;
  }
}
