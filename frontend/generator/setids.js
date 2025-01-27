const fs = require("fs");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

// Ruta al archivo de texto
const filePath = path.normalize(path.resolve(__dirname, "result.json"));

function addUUIDToItems() {
  try {
    // Leer el archivo
    const data = fs.readFileSync(filePath, "utf8");

    // Parsear el contenido como JSON
    let items = JSON.parse(data);

    // Validar que sea un arreglo
    if (!Array.isArray(items)) {
      throw new Error("El archivo no contiene un arreglo de items.");
    }

    // Agregar un nuevo uuid a cada item
    items = items.map((item) => ({
      ...item,
      id: uuidv4(),
    }));

    total = items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    // Sobrescribir el archivo con los nuevos datos
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2), "utf8");
    console.log("Los UUIDs se han agregado exitosamente.");
    console.log("Total: ", total);
  } catch (error) {
    console.error("Error procesando el archivo:", error.message);
  }
}

// Ejecutar la función
addUUIDToItems();
