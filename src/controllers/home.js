// The Home Controller
// 
import { getConnection } from "typeorm";

export const home = async (req, res, next) => {
  // Get the useritems
  const userRepository = getConnection().getRepository('User');
  const userData = await userRepository.findOne({ 
    where: { id: 1 },
    relations: ["tasks"] 
  });

// Render to homepage
  res.render('home', {
    userData
  });
}

export const homePostTask = async (req, res, next) => {
  try {
    // validate incoming body
    if(!req.body.userId) throw new Error('Please provide a USER ID');
    if(!req.body.name) throw new Error('Please provide an task');

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