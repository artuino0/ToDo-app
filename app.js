import colors from "colors";
import { guardarDB, leerDB } from "./helpers/database.js";
import {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareaBorrar,
  confirm,
  mostrarListadoChecklist,
} from "./helpers/inquirer.js";
import Tasks from "./models/tasks.js";

console.clear();

const main = async () => {
  let opt;
  const tareas = new Tasks();
  const tareasDB = leerDB();

  if (tareasDB) {
    tareasDB.map((tarea) => {
      tareas.cargarTareas(tarea);
    });
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const desc = await leerInput("Description: ");
        tareas.crearTarea(desc);
        guardarDB(tareas.listadoArr);
        break;
      case 2:
        tareas.listarTareas();
        break;
      case 3:
        tareas.listarTareasByCompletedAt(true);
        break;
      case 4:
        tareas.listarTareasByCompletedAt(false);
        break;
      case 5:
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case 6:
        const id = await listadoTareaBorrar(tareas.listadoArr);
        if (id != 0) {
          const ok = await confirm(
            "Are you sure you want to delete this task?"
          );
          if (ok) {
            tareas.borrarTarea(id);
            console.log("Tarea Borrada".green);
          }
        }
        break;
    }
    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== 0);
};

main();
