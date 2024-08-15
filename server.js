const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "inventario"
});

//adaptacion del login

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    // Consulta a la base de datos para verificar al usuario
    const query = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'Error en el servidor' });
      }
      if (results.length > 0) {
        const user = results[0];
        res.json({ status: 'success', role: user.role });
      } else {
        res.json({ status: 'error', message: 'Credenciales incorrectas' });
      }
    });
  });

// Ruta para añadir una factura
app.post('/add_factura', (req, res) => {
    const sql = "INSERT INTO facturas (`id`, `numero_factura`, `fecha`, `total`) VALUES (?, ?, ?, ?)";
    const values = [req.body.id, req.body.numero_factura, req.body.fecha, req.body.total];
    db.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ message: "Ha ocurrido algo inesperado: " + err });
        }
        return res.json({ success: "Factura agregada satisfactoriamente" });
    });
});

//Visualizar factura
app.get('/get_facturas', (req, res) => {
    const sql = "SELECT id, numero_factura, fecha, total FROM facturas";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error al obtener facturas: " + err });
        }
        res.json(results);
    });
});

//Actualizar
app.post("/update_factura", (req, res) => {
    const sql = "UPDATE facturas SET numero_factura = ?, fecha = ?, total = ? WHERE id = ?";
    const values = [req.body.numero_factura, req.body.fecha, req.body.total, req.body.id]; // Coloca el id al final.

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error updating factura:", err);
        return res.json({ message: "Ha ocurrido algo inesperado: " + err });
      }
      return res.json({ success: "Factura actualizada satisfactoriamente" });
    });
});


//Borrar
app.delete('/delete_factura/:id', (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM facturas WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting factura:", err);
            return res.json({ message: "Error al eliminar la factura: " + err });
        }
        return res.json({ success: "Factura eliminada satisfactoriamente" });
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});










