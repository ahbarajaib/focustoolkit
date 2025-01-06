interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

class TaskService {
    private tasks: Task[] = [];
    private nextId: number = 1;

    createTask(title: string, description: string): Task {
        const newTask: Task = {
            id: this.nextId++,
            title,
            description,
            completed: false,
        };
        this.tasks.push(newTask);
        return newTask;
    }

    getTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: number): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }

    updateTask(id: number, updatedTask: Partial<Task>): Task | undefined {
        const task = this.getTaskById(id);
        if (task) {
            Object.assign(task, updatedTask);
            return task;
        }
        return undefined;
    }

    deleteTask(id: number): boolean {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            return true;
        }
        return false;
    }
}

export default TaskService;