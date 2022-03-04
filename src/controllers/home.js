// The Home Controller
// 
import { getConnection } from "typeorm";

export const home = async (req, res, next) => {
  // Get the useritems
  const userRepository = getConnection().getRepository('User');
  const userData = await userRepository.findOne({ 
    where: { id: 1 },
    relations: ["tasks", "categories"]
  });

// Render to homepage
  res.render('home', {
    userData
  });
}

// Post Tasks
export const homePostTask = async (req, res, next) => {
  try {
    // validate incoming body
    if(!req.body.userId) throw new Error('Please provide a USER ID');
    if(!req.body.name) throw new Error('Please provide a task');
    
    // get the repositories
    const userRepository = getConnection().getRepository('User');
    const taskRepository = getConnection().getRepository('Task');

    // Search if user is same as userId
    const user = await userRepository.findOneOrFail({
      where: { id: parseInt(req.body.userId) },
      relations: ["tasks"]
    });

    // Search if task already exists
    let task = await taskRepository.findOne({
      where: { name: req.body.name }
    });

    // If task does not exists
    if(!task) {
      task = await taskRepository.save({ name: req.body.name });
    }
    const hasTask = user.tasks.filter((task) => task.name === req.body.name).length > 0;

    // If there's no task
    if(!hasTask) {
      user.tasks.push(task);
      await userRepository.save(user);
    }

    // Render homepage again
    res.redirect('/');
} catch(e) {
    next(e.message);
}
}

// Post Categories
export const homePostCategory = async (req, res, next) => {
    try {
        // validate incoming body
        if(!req.body.userId) throw new Error('Please provide a USER ID');
        if(!req.body.name) throw new Error('Please provide a category');
    
        // get the repositories
        const userRepository = getConnection().getRepository('User');
        const categoryRepository = getConnection().getRepository('Category');
    
        // Search if user is same as userId
        const user = await userRepository.findOneOrFail({
          where: { id: parseInt(req.body.userId) },
          relations: ["categories"]
        });
    
        // Search if category already exists
        let category = await categoryRepository.findOne({
          where: { name: req.body.name }
        });
    
        // If category does not exists
        if(!category) {
          category = await categoryRepository.save({ name: req.body.name });
        }
        const hasCategory = user.categories.filter((cat) => cat.name === req.body.name).length > 0;
    
        // If there's no category
        if(!hasCategory) {
          user.categories.push(category);
          await userRepository.save(user);
        }
    
        // Render homepage again
        res.redirect('/');
    } catch(e) {
        next(e.message);
    }
    }
    
  // Delete Task
export const homeDeleteTask = async (req, res, next) => {
    try {
        // Set name for output
        const readableEntityName = entityName.toLowerCase();

        // Catch the id from params
        const { id } = req.params;
        console.log(id);
        // Validate incoming variables
        if(!id) { throw new Error('Please specify an id to remove.') }
        
        // Get the requested repository
        const repository = getConnection().getRepository(entityName);
        
        // Delete the request
        await repository.remove({ id });
        
        res.status(200).json({ status: `Deleted ${readableEntityName} with id ${id}` });
    } catch(e) {
        next(e.message);
    }
};

// Delete All Tasks
export const homeDeleteAllTasks = async (req, res, next) => {
  try {
  } catch(e) {
      next(e.message);
  }
};

// Edit Task
export const homeEditTask = async (req, res, next) => {
  try {
  } catch(e) {
      next(e.message);
  }
};

// Finish Task
export const homeFinishTask = async (req, res, next) => {
  try {
  } catch(e) {
      next(e.message);
  }
};
