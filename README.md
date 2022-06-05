# StudBud2022

## Deviations from design brief
Through the two rounds of user testing it was highlighted that there should be minimal interactions during the use of this application. Main reason being this was an effective tool to analyse the way that user's study and hence find ways to improve. Unlike a Pomodoro timer where its a more tyrant way of forcing a user to study. This application gives the user the freedom to take constant breaks and automates the way that the user can track their study pattern for each subject. <br>

1. The music player was removed entirely due to the fact that during testing users found it in the way when they are attempting their study sessions. Most users stated that they would rather simply use their phones and have this timer running in the background while they do their work as their songs have already been saved and it was be a chore to lose that.
2. Kanban functionality has been changed to become automatic. There is clear incentive to automate this task tracker as it keeps the structure rigid. Storing and rendering the tasks as their states was a more effective way of storing the tasks. Moving the tasks automatically allows the users to not have to worry about placing them in the wrong place as that is simply automated.
3. The colours throughout the app was used in accordance to strict design principles. For example green clearly means a go to button like the study now and navigation. Red shows clear warnings for example the delete button. Similar to this the study mode colour effects mean the same thing the colours go from calm to warm to hot showing clear indications of warnings for the user.


## Improvements and iterations
User testing and evaluations were conducted to evaluate the usability and desirability of this application. 5 initial testing was done for the mockup stages which involved users going through a think aloud protocol and asking them to use the application without guidance. This ensures that each step of the application is simple for the users to navigate. During the completion phases of the application another 5 think aloud protocols were conducted to gain insights on the usability of the developed prototype application. This ensures all the logic is being handled but also tests for different error handling methods to ensure users don't use this application in the wrong way.

### Navigation
After initial testing phase of the mockups it was noted that the navigation was unnecessarily big and takes too much space on the page. It was also noted that the icons are not needed and adds clutter to the page. During testing and development it was noted that the study mode button in the navigation bar would not be necessary as you should only be able to enter the page through the study button on each task list. 

<p float="left">
  <img src="https://github.com/Alton999/StudBud2022/blob/master/README/navigationMockups.png" width="50%" />
  <img src="https://github.com/Alton999/StudBud2022/blob/master/README/navigationDevelopment.png" width="50%" />
</p>

The key issue throughout the initial mockups is simplicity. The idea of the application is a non-disruptive environment for users to track their study habits without being disturbed with the sheer amount of options.

### Task viewer 
<p float="left">
  <img src="https://github.com/Alton999/StudBud2022/blob/master/README/taskViewerMockup.png" width="40%" />
  <img src="https://github.com/Alton999/StudBud2022/blob/master/README/taskViewerDevelopment.png" width="40%" />
</p>
<p float="left">
  <img src="https://github.com/Alton999/StudBud2022/blob/master/README/taskViewerMockupMobile.png" width="40%" />
  <img src="https://github.com/Alton999/StudBud2022/blob/master/README/taskViewerDevelopmentMobile.png" width="40%" />
</p>

#### Changes

* Add task button made smaller (Unnecessarily big button in mockups)
* Added study now button and delete button which were oversight in the mockups. There needed a way to easily access the study mode with the correct information
* The add task form changed to not have the checkbox to create a list of materials but that is rather done in the study mode instead.
* Add new task is kept in the development mobile version. Reduces extra step required for the user although it adds clutter.

### Study Mode component
<p float="left">
  <img src="https://github.com/Alton999/StudBud2022/blob/master/README/studyModeMockup.png" width="40%" />
  <img src="https://github.com/Alton999/StudBud2022/blob/master/README/studyModeDevMobile.png" width="40%" />
</p>
<img src="https://github.com/Alton999/StudBud2022/blob/master/README/studyModeMockupMobile.png" width="100%" align="center">

#### Changes
* Select dropdown in task is no longer necessary due to improvements in usability by adding study now button to each task instead.
* Removed shadows from buttons to remove the distracting nature of those buttons.
* Added a total break duration tab in the table to allow users to view how long the breaks they are taking have been. Gives users motivation when they are working on a task. This was implemented after the second round of user testings.
* Music player and background videos have been removed. After the mockup testing (Round 1) it was highlighted that this app was extremely useful when used in the background rather. This case users felt it was distracting to have a background video playing and a music player as they would spend time choosing the tracks and videos etc. After these results the music player and video have been removed for a less cluttered approach to tracking user's study habits.
* Through user testing user's would like to be able to use the study materials to directly open their resources hence the reference and open button were added

### Analytics 
<p float="left">
  <img src="https://github.com/Alton999/StudBud2022/blob/master/README/flowTrackerMockup.png" width="40%" />
  <img src="https://github.com/Alton999/StudBud2022/blob/master/README/flowTrackerMockupMobile.png" width="40%" />
</p>
<p float="left">
  <img src="https://github.com/Alton999/StudBud2022/blob/master/README/flowTrackerDevMobile.png" width="40%" />
  <img src="https://github.com/Alton999/StudBud2022/blob/master/README/flowTrackerDev.png" width="40%" />
</p>


#### Changes
There were a few subtle changes here to looks and as well as simplicity
* Table now includes total break duration for users to track how long they took their breaks
* Turnaround was another effective tool brought up by users as they want to track how long they delayed their start times by
* Mobile mode was changed for simplicity and ease of understanding. It is clear that in the mockups it was significantly different to the desktop version. We wanted to keep the same style of analytics as the desktop version to avoid confusion. This table was effective in producing that
* The table was changed during production to include the different shades for each task as during testing users felt it was difficult to see which they were looking at

## Documentation

There is three main components to this application: Study mode, task view mode and analytics

#### Task view mode
<img src="https://github.com/Alton999/StudBud2022/blob/master/README/taskViewer.png" width="100%" align="center">

This mode has three different sections to preview your pending tasks, in progress tasks and also your completed tasks. In the new tasks section you can add a new task using the add new task button which will open the following modal.

<img src="https://github.com/Alton999/StudBud2022/blob/master/README/addTaskModal.png" width="1000px" align="center">
After filling out the required information you can proceed to add a task. (Only description is not required for the functionality to be complete) <br>

After adding a task in both the new tasks container and in progress container each task has 2 buttons, study now or delete. In the study now you can open the study mode component and passing the information to the study mode component. The completed tasks should not have this button but you are able to delete the selected button. Clicking on the study mode button will open the study mode component for that specific task.

<img src="https://github.com/Alton999/StudBud2022/blob/master/README/studyMode.png" width="100%" align="center">
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
<img src="https://github.com/Alton999/StudBud2022/blob/master/README/taskAnalytics.png" width="100%" align="center">
This is the most important section as it tracks all the completed tasks and analyses the task and shows your flow efficiency. This is calculated by taking the amountof breaks and break duration and finding the percentage in which you worked and rested. This shows which subjects you struggle to focus and which subjects you excel in focusing and engaging in the flow.

##### Like every app, you have to be ensuring that you use this app to its potential and avoid cheating whenever possible to allow accurate tracking of your tasks, break habits and study durations.


## References
* Favicon icon - Free vector: Boy student sitting on stack of books with Laptop Flat Icon Illustration. Freepik. (2021, August 23). Retrieved June 5, 2022, from https://www.freepik.com/free-vector/boy-student-sitting-stack-books-with-laptop-flat-icon-illustration_17543960.htm#query=study%20icon&amp;position=6&amp;from_view=search 
* HTML tables - HTML tables. (n.d.). Retrieved June 5, 2022, from https://www.w3schools.com/html/html_tables.asp 
* Countdown timer -  Berhanu, Y., &amp; Jacques, N. (2020, June 1). Build a countdown timer in just 18 lines of JavaScript. SitePoint. Retrieved June 5, 2022, from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/ 
* Simple Stopwatch is a great JavaScript project for beginners. In this article you will learn how to make a stopwatch using JavaScript. (2022, April 26). Create a simple stopwatch using JavaScript (tutorial + code). Foolish Developer. Retrieved June 5, 2022, from https://www.foolishdeveloper.com/2021/10/simple-stopwatch-using-javascript.html 

