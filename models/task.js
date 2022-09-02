import { v4 as uuidv4 } from "uuid";

class Task {
  id = "";
  description = "";
  completedAt = null;

  constructor(description) {
    this.id = uuidv4();
    this.description = description;
  }
}

export default Task;
