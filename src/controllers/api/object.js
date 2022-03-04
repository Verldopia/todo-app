import { getConnection } from "typeorm";

export const postObject = async (entityName, req, res, next) => {
    try {
        // Set name for output
        const readableEntityName = entityName.toLowerCase();

        // validate incoming body
        if(!req.body.name) throw new Error('Enter a name!');

        // get the repository from entityName
        const repository = getConnection().getRepository(entityName);
        const taskRepository = getConnection().getRepository('Task');
 
        // Get the entityName (if this one exists)
        const object = await repository.findOne({
            where: { name: req.body.name }
        })

        // If entityName already exists
        if(object) {
            return res.status(200).json({ 
                status: `Posted ${readableEntityName} with id: ${object.id}.`});
        }

        // save the entityName in repository
        const insertedEntityName = await repository.save({
            ...req.body,
            tasks: await taskRepository.find(),
            user_meta: {
                address: "Mariakerke",
                zipCode: "9030",
                city: "Gent"
            }
        });

        res.status(200).json({ status: `Posted ${readableEntityName} with id: ${insertedEntityName.id}.` });
    } catch(e) {
        next(e.message);
    }
};

export const getObject = async (entityName, req, res, next) => {
    try {
        // get the repository from entityName
        const repository = getConnection().getRepository(entityName);

        res.status(200).json(await repository.find({ relations: ["user_meta", "tasks"] }));
    } catch(e) {
        next(e.message);
    }
};

export const deleteObject = async (entityName, req, res, next) => {
    try {
        // Set name for output
        const readableEntityName = entityName.toLowerCase();

        // Catch the id from params
        const { id } = req.params;

        // Validate incoming variables
        if(!id) { throw new Error('Please specify an id to remove.') }
        
        // Get the requested repository
        const repository = getConnection().getRepository(entityName);
        
        // Get the requested entityName
        const object = await repository.findOne({ id });
        
        // Validate if the requested entityName exists
        if(!object) throw new Error(`The given ${readableEntityName} with id ${id} does not exist.`)
        
        // Delete the updated request
        await repository.remove({ id });
        
        res.status(200).json({ status: `Deleted ${readableEntityName} with id ${id}` });
    } catch(e) {
        next(e.message);
    }
};

export const updateObject = async (entityName, req, res, next) => {
    try {
        // Set name for output
        const readableEntityName = entityName.toLowerCase();

        if(!req.body.name) throw new Error(`Provide an id for the ${readableEntityName} you want to update`)
        
        // Search for unwanted inputs
        const validProperties = [ "id", "name" ];
        const unwantedProperties = Object.getOwnPropertyNames(req.body).filter((prop) => !validProperties.includes(prop));
        if(!unwantedProperties.length === 0) throw new Error (`You requested unwanted properties: ${unwantedProperties.join('')}`)
        
        // Get the requested repository
        const repository = getConnection().getRepository(entityName);
        
        // Get the requested entityName
        const object = await repository.findOne({
            where: { id: req.body.id }
        });
        
        // Validate if the requested entityName exists
        if(!object) throw new Error(`The given ${readableEntityName} does not exist.`)
        
        // Create the updated request
        const updatedEntityName = { ...entityName, ...req.body };
        
        // Save the updated request
        await repository.save(updatedEntityName);
        
        // Send back the updated id
        res.status(200).json({ status: `Updated ${readableEntityName} with id: ${req.body.id}` });
    } catch(e) {
        next(e.message);
    }
};