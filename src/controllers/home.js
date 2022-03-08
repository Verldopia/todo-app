// The Home Controller
// 
import { body } from "express-validator";
import { getConnection } from "typeorm";

export const home = async (req, res, next) => {
  // Get the repositories
  const taskRepository = getConnection().getRepository('Task');
  const categoryRepository = getConnection().getRepository("Category");
  const userRepository = getConnection().getRepository('User');

  // Find in sql tables
  const taskData = await taskRepository.find();
  const categoryData = await categoryRepository.find();
  const userData = await userRepository.findOne({
    where: { id: req.user?.userId },
    relations: [ "user_meta" ]
  });

  // Render to homepage
  res.render('home', {
    taskData,
    categoryData,
    userData
  });
}

// Post Tasks
export const homePostTask = async (req, res, next) => {
  try {
    // validate incoming body
    if(!req.body.title) throw new Error('Please provide a task');
    
    // get the repositories
    const repository = getConnection().getRepository("Task");
    
    // Search if task already exists
    let task = await repository.findOne({
      where: { title: req.body.title }
    });

    // If task does not exists
    if(!task) {
      task = await repository.save({ 
        title: req.body.title, 
        checked: false
      });
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
    if(!req.body.title) throw new Error('Please provide a category');
    const title = req.body.title;

    // get the repositories
    const repository = getConnection().getRepository("Category");
    
    // Search if category already exists
    let category = await repository.findOne({
      where: { title: req.body.title }
    });

    // If category does not exists
    if(!category) {
      category = await repository.save({ 
        title: req.body.title, 
        slug: title
      });
    }
    
    // Render homepage again
    res.redirect('/');
} catch(e) {
    next(e.message);
}
    }
    
  // Delete entity
export const homeDeleteObject = async (entityName, req, res, next) => {
  try {
    // get the repositories
    const repository = getConnection().getRepository(entityName);
    
    // Search for entity in database
    let entity = await repository.findOne({
      where: { id: req.body.id }
    });

    // If entity exists, delete it
    if(entity) {
      entity = await repository.remove({
        id: req.body.id
      })
    }
    
  } catch(e) {
      next(e.message);
  }
};

// Delete All Tasks
export const homeDeleteAllTasks = async (req, res, next) => {
  log('init')
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
    // get the repositories
    const repository = getConnection().getRepository("Task");
    
    // Search if task already exists
    let task = await repository.findOne({
      where: { title: req.body.title }
    });

    task = await repository.save({ 
      title: req.body.title, 
      checked: true
    });

    // Render homepage again
    res.redirect('/');
} catch(e) {
    next(e.message);
}
};