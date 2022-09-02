import Task from "./task.js";

class Tasks {
  _listado = {};

  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  crearTarea(description = "") {
    const tarea = new Task(description);
    this._listado[tarea.id] = tarea;
  }

  cargarTareas(tarea) {
    this._listado[tarea.id] = tarea;
  }

  listarTareas() {
    console.log();
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}.`.green;
      const { description, completedAt } = tarea;
      const estado = completedAt ? "Completed".green : "Pending".red;
      console.log(`${idx} ${description} :: ${estado}`);
    });
  }

  listarTareasByCompletedAt(completed) {
    console.log();
    let idx = 0;
    this.listadoArr.forEach((tarea) => {
      const { description, completedAt } = tarea;
      const estado = completedAt ? "Completed".green : "Pending".red;

      if (completed) {
        if (completedAt) {
          idx++;
          console.log(`${`${idx}.`.green} ${description} :: ${completedAt}`);
        }
      } else {
        if (!completedAt) {
          idx++;
          console.log(`${`${idx}.`.green} ${description} :: ${estado}`);
        }
      }
    });
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []) {
    console.log(ids);
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completedAt) {
        tarea.completedAt = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completedAt = null;
      }
    });
  }
}

export default Tasks;
