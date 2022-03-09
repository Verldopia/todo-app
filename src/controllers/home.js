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
    
  // Delete object
export const homeDeleteObject = async (objectName, req, res, next) => {
  try {
    // get the repositories
    const repository = getConnection().getRepository(objectName);
    
    // Search for object in database
    let object = await repository.findOne({
      where: { id: req.body.id }
    });

    // If object exists, delete it
    if(object) {
      object = await repository.remove({
        id: req.body.id
      })
    }
    
    // Render homepage again
    res.redirect('/');
  } catch(e) {
      next(e.message);
  }
};

// Delete All Objects
export const homeDeleteAllObjects = async (objectName, status, req, res, next) => {
  try {
    // get the repositories
    const repository = getConnection().getRepository(objectName);

    // Search for object paramater in database
    let object = await repository.find();
    object = object.filter(( {checked} ) => checked === status);

    // If there are entities, delete them
    if(object) {
      object = await repository.remove(object)
    }
    
    // Render homepage again
    res.redirect('/');
  } catch(e) {
      next(e.message);
  }
};

// Edit Object
export const homeEditObject = async (objectName, status, req, res, next) => {
  try {
    // validate incoming body
    if(!req.body.id) throw new Error('Please provide a task');
    
    // get the repositories
    const repository = getConnection().getRepository(objectName);
    
    // Search if object already exists
    let object = await repository.findOne({
      where: { id: req.body.id }
    });

    // Remove object in objects,
    if(object) {
      object = await repository.remove({
        id: req.body.id
      })
    }
    
    // Add objects to done-list
    object = await repository.save({
      id: req.body.id,
      title: req.body.title, 
      checked: status
    });
    
    // Render homepage again
    res.redirect('/');
  } catch(e) {
      next(e.message);
  }
};