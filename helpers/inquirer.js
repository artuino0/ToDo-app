import colors from "colors";

import inquirer from "inquirer";

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "What do you want to do?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Create task`,
      },
      {
        value: 2,
        name: `${"2.".green} List tasks`,
      },
      {
        value: 3,
        name: `${"3.".green} List completed tasks`,
      },
      {
        value: 4,
        name: `${"4.".green} List pending tasks`,
      },
      {
        value: 5,
        name: `${"5.".green} Complete task(s)`,
      },
      {
        value: 6,
        name: `${"6.".green} Delete tasks`,
      },
      {
        value: 0,
        name: `${"0.".green} Exit`,
      },
    ],
  },
];

export const inquirerMenu = async () => {
  console.clear();
  console.log("===================".green);
  console.log(" Select one option".white);
  console.log("===================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};

export const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"enter".green} to continue...`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

export const leerInput = async (menssage) => {
  const question = [
    {
      type: "input",
      name: "description",
      menssage,
      validate(value) {
        if (value.length === 0) {
          return "Please introduce a value.";
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);
  return description;
};

export const listadoTareaBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    let idx = i + 1;
    let mensaje = `${`${idx}.`.green} ${tarea.description}`;
    return {
      value: tarea.id,
      name: mensaje,
    };
  });

  choices.unshift({
    value: "0",
    name: "0.".green + " Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "what task do you want to delete?",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
};

export const confirm = async (varMessage) => {
  let question = [
    {
      type: "confirm",
      name: "ok",
      message: varMessage,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

export const mostrarListadoChecklist = async (tasks = []) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.completedAt ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select the task to complete",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};
