function NewTaskCard({ unfilteredTasks, departmentId }) {
  const calculateNewTasks = () => {
    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const filteredTasks = unfilteredTasks.filter((task) => {
      const taskDate = new Date(task.created_at);
      return (
        taskDate >= startOfWeek &&
        taskDate <= endOfWeek &&
        task.department_id === departmentId
      );
    });

    return filteredTasks.length;
  };

  const totalNewTasks = calculateNewTasks();

  return <div className="new-task-text">{totalNewTasks}</div>;
}

export default NewTaskCard;
