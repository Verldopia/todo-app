/**
 * The Home Controller
 */
import { getConnection } from 'typeorm';

export const home = async (req, res) => {
  // Get the repositories
  const userRepository = getConnection().getRepository('User');

  // Find in sql tables
  const userData = await userRepository.findOne({
    where: { id: req.user?.userId },
    relations: ['roles', 'categories', 'categories.tasks'],
  });

  // Define data
  const categoryData = userData.categories ?? [];
  const currentCategory =
    categoryData.find((e) => e.id == req.query.id) ?? categoryData[0];
  const taskData = currentCategory?.tasks ?? [];
  const categories = currentCategory?.id ?? 1;
  // Render to homepage
  res.render('home', {
    taskData,
    categoryData,
    userData,
    categories,
  });
};

// Post Objects
export const homePostObject = async (objectName, data, req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.title) throw new Error(`Please provide a ${objectName}`);

    // get the repositories
    const repository = getConnection().getRepository(objectName);

    // Search if object already exists
    let object = await repository.findOne({
      where: { title: req.body.title },
    });

    // Delete doubles
    if (objectName === 'Category') {
      delete req.body.categories;
    } else {
      delete req.body.users;
    }

    // If object does not exists
    if (!object) {
      object = await repository.save({
        ...req.body,
        ...data,
        categories: req.body.categories,
        slug: req.body.title,
      });
    }

    const url = objectName === 'Task' ? object.categories : object.id;

    // Render homepage again
    res.redirect(`/?id=${url}`);
  } catch (e) {
    next(e.message);
  }
};

// Delete object
export const homeDeleteObject = async (objectName, req, res, next) => {
  try {
    // get the repositories
    const repository = getConnection().getRepository(objectName);

    let object = await repository.findOne({
      where: { id: req.body.id },
    });

    // Delete the object
    if (object) {
      object = await repository.remove({
        id: req.body.id,
      });
    }

    // Render homepage again
    res.redirect('/');
  } catch (e) {
    next(e.message);
  }
};

// Delete object
export const homeDeleteCategory = async (req, res, next) => {
  try {
    // get the repositories
    const repository = getConnection().getRepository('Category');
    const taskRepository = getConnection().getRepository('Task');

    let object = await repository.findOne({
      where: { id: req.body?.id ?? 1 },
      relations: ['tasks'],
    });

    let { tasks } = object;
    // Delete the category
    if (tasks) {
      tasks = await taskRepository.remove(tasks);
    }

    if (object) {
      object = await repository.remove({
        id: req.body.id,
      });
    }

    // Render homepage again
    res.redirect('/');
  } catch (e) {
    next(e.message);
  }
};

// Delete All Objects
export const homeDeleteAllObjects = async (
  objectName,
  status,
  req,
  res,
  next
) => {
  try {
    // get the repositories
    const repository = getConnection().getRepository(objectName);

    // Search for object paramater in database
    let object = await repository.find();
    object = object.filter(({ checked }) => checked === status);

    // If there are entities, delete them
    if (object) {
      object = await repository.remove(object);
    }

    // Render homepage again
    res.redirect('/');
  } catch (e) {
    next(e.message);
  }
};

// Edit Object
export const homeEditObject = async (objectName, status, req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.id) throw new Error('Please provide a task');

    // get the repositories
    const repository = getConnection().getRepository(objectName);

    // Search if object already exists
    const object = await repository.findOne({
      where: { id: req.body.id },
    });

    // Add objects to done-list
    await repository.save({
      ...object,
      checked: status,
      title: req.body.title,
    });

    // Render homepage again
    res.redirect('/');
  } catch (e) {
    next(e.message);
  }
};
