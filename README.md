# StudBud2022

## Documentation

There is three main components to this application: Study mode, task view mode and analytics

#### Task view mode
<img src="https://github.com/Alton999/StudBud2022/blob/master/README/taskViewer.png" width="1000px" align="center">

This mode has three different sections to preview your pending tasks, in progress tasks and also your completed tasks. In the new tasks section you can add a new task using the add new task button which will open the following modal.

<img src="https://github.com/Alton999/StudBud2022/blob/master/README/addTaskModal.png" width="1000px" align="center">
After filling out the required information you can proceed to add a task. (Only description is not required for the functionality to be complete) <br>

After adding a task in both the new tasks container and in progress container each task has 2 buttons, study now or delete. In the study now you can open the study mode component and passing the information to the study mode component. The completed tasks should not have this button but you are able to delete the selected button. Clicking on the study mode button will open the study mode component for that specific task.

<img src="https://github.com/Alton999/StudBud2022/blob/master/README/studyMode.png" width="1000px" align="center">
This is where the main functionality is.  

##### Study mode functionality
* Here you can start session, pause session and finish a task.
  * The pause session button and finish task buttons will activate when your elapsed duration reaches a certain amount of time. This stops people from taking a break too soon and ending the task too soon. 
  * If the elapsed duration reaches the estimated duration the background color will be orange and if it exceeds this by a certain amount it will be red. This serves as a warning for users that go above their estimated threshold.
  * Interruptions counter will also increase every time a user takes a break. If this number exceeds 5 it will turn orange and turn red after 10.
* This component also allows users to add study materials.
  * You can add materials through the add materials form which looks similar to the add task form
  * In this form you can add a category, name, reference and page number 
  * In this list you can click on the open button which will only appear if you have added a reference to that material, this open button will link directly to your resource.
* Once you are finished with the task you can complete the task with the finish task button which will push the information collecting during your study session into the analytics section

##### Task analytics section
<img src="https://github.com/Alton999/StudBud2022/blob/master/README/taskAnalytics.png" width="1000px" align="center">

   
