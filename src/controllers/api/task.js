import { getConnection } from "typeorm";

export const postTask = async (req, res, next) => {
    try {
        // validate incoming body
        if(!req.body.name) throw new Error('Enter a name!');

        // get the repository from task
        const taskRepository = getConnection().getRepository('Task');
        
        // Get the task (if this one exists)
        const task = await taskRepository.findOne({
            where: { name: req.body.name }
        })

        // If task already exists
        if(task) {
            return res.status(200).json({ 
                status: `Posted task with id: ${task.id}.`});
        }

        // save the task in repository
        const insertedTask = await taskRepository.save(req.body);

        res.status(200).json({ status: `Posted task with id: ${insertedTask.id}.` });
    } catch(e) {
        next(e.message);
    }
};

export const getTask = async (req, res, next) => {
    try {
        
        // get the repository from task
        const taskRepository = getConnection().getRepository('Task');
        const task = await taskRepository.find();

        res.status(200).json(task);
    } catch(e) {
        next(e.message);
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        // Catch the id from params
        const { id } = req.params;

        // Validate incoming variables
        if(!id) throw new Error('Please specify an id to remove.')
        
        // Get the requested repository
        const taskRepository = getConnection().getRepository('Task');
        
        // Get the requested task
        const task = await taskRepository.findOne({ id });
        
        // Validate if the requested task exists
        if(!task) throw new Error(`The given task with id ${id} does not exist.`)
        
        // Delete the updated request
        await taskRepository.remove(task);
        
        res.status(200).json({ status: `Deleted task with ${id}` });
    } catch(e) {
        next(e.message);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        if(!req.body.name) throw new Error('Provide an id for the task you want to update')
        
        // Search for unwanted inputs
        const validProperties = [ "id", "name" ];
        const unwantedProperties = Object.getOwnPropertyNames(req.body).filter((prop) => !validProperties.includes(prop));
        if(!unwantedProperties.length === 0) throw new Error (`You requested unwanted properties: ${unwantedProperties.join('')}`)
        
        // Get the requested repository
        const taskRepository = getConnection().getRepository('Task');
        
        // Get the requested task
        const task = await taskRepository.findOne({
            where: { id: req.body.id }
        });
        
        // Validate if the requested task exists
        if(!task) throw new Error('The given task does not exist.')
        
        // Create the updated request
        const updatedtask = { ...task, ...req.body };
        
        // Save the updated request
        await taskRepository.save(updatedtask);
        
        // Send back the updated id
        res.status(200).json({ status: `Updated task with id: ${req.body.id}` });
    } catch(e) {
        next(e.message);
    }
};