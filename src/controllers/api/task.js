export const postTask = async (req, res, next) => {
    try {
        // validate incoming body
        if(!req.body.firstName) throw new Error('Enter a name!')

        // get the repository from user
        const userRepository = getConnection().getRepository('User');

        // Get the user (if this one exists)
        const user = await userRepository.findOne({
            where: { firstName: req.body.firstName } && { lastName: req.body.lastName }
        })

        // If user already exists
        if(user) {
            return res.status(200).json({ 
                status: `Posted user with id: ${user.id}.`});
        }

        // save the user in repository
        const insertedUser = await userRepository.save(req.body);

        res.status(200).json({ status: `Posted user with id: ${insertedUser.id}.` });
    } catch(e) {
        next(e.message);
    }
};

export const getTask = async (req, res, next) => {
    try {
        
        // get the repository from user
        const userRepository = getConnection().getRepository('User');
        const user = await userRepository.find();

        res.status(200).json(user);
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
        const userRepository = getConnection().getRepository('User');
        
        // Get the requested user
        const user = await userRepository.findOne({ id });
        
        // Validate if the requested user exists
        if(!user) throw new Error(`The given user with id ${id} does not exist.`)
        
        // Delete the updated request
        await userRepository.remove(user);
        
        res.status(200).json({ status: `Deleted user with ${id}` });
    } catch(e) {
        next(e.message);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        if(!req.body.firstName) throw new Error('Provide an id for the user you want to update')
        
        // Search for unwanted inputs
        const validProperties = [ "id", "firstName", "lastName" ];
        const unwantedProperties = Object.getOwnPropertyNames(req.body).filter((prop) => !validProperties.includes(prop));
        if(!unwantedProperties.length === 0) throw new Error (`You requested unwanted properties: ${unwantedProperties.join('')}`)
        
        // Get the requested repository
        const userRepository = getConnection().getRepository('User');
        
        // Get the requested user
        const user = await userRepository.findOne({
            where: { id: req.body.id }
        });
        
        // Validate if the requested user exists
        if(!user) throw new Error('The given user does not exist.')
        
        // Create the updated request
        const updateduser = { ...user, ...req.body };
        
        // Save the updated request
        await userRepository.save(updateduser);
        
        // Send back the updated id
        res.status(200).json({ status: `Updated user with id: ${req.body.id}` });
    } catch(e) {
        next(e.message);
    }
};