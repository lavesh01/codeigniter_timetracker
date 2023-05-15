function addComponent() {
    const taskName = inputField.value;
    
    const tagElements = Array.from(displayTags.children);
    const tags = tagElements.map((tag) => tag.textContent);
    
    const taskComponent = {
      id: `task-component-${componentCount}`,
      taskName: taskName,
      projectName: selectedProjValue,
      tags: tags,
      billColor: billColor,
      taskComponentTime: {
        resumeTime: "00:00:00",
        inheritTaskTime: propTime,
        totalTime: propTotalTime
      }
    };
    
    taskComponentArea.appendChild(task);
    saveTaskComponentToDatabase(taskComponent);
  
    const component = document.createElement('div');
      component.id = taskComponent.id;
      component.classList.add("task-component");
      component.innerHTML=`
      <div class="top">
          <div id="inherited-time">Total Time: ${taskComponent.taskComponentTime.totalTime}</div>
      </div>
  
      <hr>
  
      <div class="bottom">
  
          <input type='checkbox' class="checkbox" >
          <div class="left">
          
              <div>
                  <div id="task-name">${taskComponent.taskName}</div>
              </div>
  
              <div id="task-project-name">
                  ${taskComponent.projectName ? `●${taskComponent.projectName}` : ""}
              </div>
  
              <div id="task-tags" class="timer-tag"> 
              ${tags.map((tag) => `<span class="timer-tags">${tag}</span>`).join("")}
              </div>
  
              <div id="task-bill" class="${taskComponent.billColor}">
            
              <i id="bill" class="fa-regular fa-dollar-sign"></i>
                  
              </div>
              |
          </div>
          
          <div class="right">
         
          <div id="display-resume-time" >
            ${taskComponent.taskComponentTime.resumeTime} 
          </div>
             <div id="resume-btn" data-component-id="${taskComponent.id}" >
             <i id="toggle-btn" class="fa-solid fa-play"></i>
          </div>
            <div id="delete-btn">
            <i class="fa fa-regular fa-trash-alt" data-component-id="task-component-${componentCount}" data-target="#deleteModal" data-toggle="modal" ></i>
          </div>
          </div>
    `;    
          
  componentCount++;
    return component;
}


// *****************************************************************************************


const resetValues = () => {
    inputField.value= "";
  
    selectedProjValue = "";
    selectedProject.innerText= "";
  
    displayTags.innerHTML = "";
    selectedTagValue = null;
  }
  
  // TAGS 
  let selectedTagValue;
  const tagDropdownMenu = document.querySelector('#tag-dropdown-menu');
  const tags = []; 
  
  const populateTags = () => {
    tags.forEach(tag => {
        const tagItem = document.createElement('li');
        tagItem.classList.add('dropdown-item');
        tagItem.textContent = tag;
        tagDropdownMenu.appendChild(tagItem);
      });
    
    tagDropdownMenu.appendChild(form);
  }
  
  const addNewTag = (tagName) => {
    const tagItem = document.createElement('li');
    const tagLink = document.createElement('a');
    const crossBtn = document.createElement('button');
    
    tagItem.classList.add('dropdown-item');
    tagLink.classList.add('tag-link');
    tagLink.setAttribute('data-value', tagName);
    tagLink.textContent = tagName;
    crossBtn.classList.add('cross-btn')
    crossBtn.innerHTML = '<i class="fa fa-thin fa-xmark"></i>';
  
    crossBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      tagItem.remove();
    });
  
    tagLink.appendChild(crossBtn);
    tagItem.appendChild(tagLink);
    tagDropdownMenu.insertBefore(tagItem, form);
  };
  
  const form = document.createElement('form');
  form.classList.add('px-1', 'pt-1');
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Create New tag';
  input.classList.add('form-control');
  
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const tagName = input.value.trim();
        if (tagName.length > 0) {
          addNewTag(tagName);
          input.value = '';
        }
    }
  });
  form.appendChild(input);
  
  const dropdownToggle = document.querySelector('#tag-dropdown');  
  dropdownToggle.addEventListener('click', () => {
    populateTags();
  });
  
  tagDropdownMenu.addEventListener('click', function(event) {
    selectedTagValue = event.target.dataset.value;
  
    if(selectedTagValue) {
      const newTag = document.createElement('span');
      newTag.classList.add('timer-tags');
      newTag.textContent = selectedTagValue;
  
      const crossBtn = document.createElement('button');
      crossBtn.classList.add('cross-btn');
      crossBtn.innerHTML = '<i class="fa fa-thin fa-xmark"></i>';
  
      crossBtn.addEventListener('click', () => {
        newTag.remove();
      });
  
      newTag.appendChild(crossBtn);
      displayTags.appendChild(newTag);
    }
  });
  
  // DOLLAR BILL 
  let billColor;
  const dollarBtn = document.getElementById("bill");
  dollarBtn.addEventListener('click', () => {
  dollarBtn.classList.toggle("bill-color");
  billColor = dollarBtn.classList.contains("bill-color") ? "bill-color" : "";
  })  
  
  // CREATING NEW PROJECT 
  let newprojectname;
  let selectedProjValue = "";
  
  const projDropdownMenu = document.querySelector('.dropdown-menu');
  const newProjInput = document.querySelector('#newproject-name');
  const selectedProject = document.getElementById('selected-project');
  
  // Modal 
  const projectModal = document.getElementById('projectModal');
  
  if (projectModal) {
  
  projectModal.addEventListener('show.bs.modal', () => {
    newProjInput.focus();
  
  })
  
  const createButton = projectModal.querySelector('#create-btn');
  createButton.addEventListener('click', (event) => {
    
    const modalBodyInput = projectModal.querySelector('.modal-body input');
      newprojectname= modalBodyInput.value;
      
    if(newprojectname.trim() !== '') {
      const newProj = document.createElement('li');
      newProj.classList.add('tag-link');
      newProj.innerHTML=`<a class="dropdown-item" data-value="${newprojectname}">${newprojectname}</a>`;
      
      const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('cross-btn');
    deleteBtn.style.marginRight='1rem';
    deleteBtn.innerHTML = '<i class="fa fa-thin fa-xmark"></i>';
    deleteBtn.addEventListener('click', () => {
      newProj.remove();
    });
  
    newProj.appendChild(deleteBtn);
    
    projDropdownMenu.appendChild(newProj);
    
    modalBodyInput.value = "";
    // projectModal.modal('hide');
  }
  });
  }
  
  projDropdownMenu.addEventListener("click", function(event) {
    if (event.target.classList.contains('delete-btn')) {
      event.stopPropagation();
      event.target.parentNode.remove();
    } else {
      selectedProjValue = event.target.dataset.value;
      if(selectedProjValue){
        selectedProject.innerText= `● ${selectedProjValue}`;
      }
    }
  });
  
  // Get the current date
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = monthsOfYear[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();
  const year = currentDate.getFullYear();
  const dateString = `${dayOfWeek}, ${month} ${dayOfMonth} ${year}`;
  
  
  function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
  }  
  
  function formatNumber(number) {
    return number.toString().padStart(2, "0");
  }  
  
  
  // TIMER 
  const startBtn = document.getElementById("start-btn");
  const toggleText = document.getElementById("toggle-text");
  const timeDisplay = document.getElementById("time-display");
  const displayTags = document.querySelector('#display-tags');
  
  let timerInterval; 
  let propTime;
  let propTotalTime;
  
  startBtn.addEventListener('click', () => {
    toggleText.innerText = toggleText.innerText === "Start" ? "Stop" : "Start";
    startBtn.classList.toggle("red-btn");
    
    if (toggleText.innerText === "Stop") {
      let startTime = Date.now(); 
      timerInterval = setInterval(() => {
        let elapsedTime = Date.now() - startTime; 
        let formattedTime = formatTime(elapsedTime); 
      
        timeDisplay.innerText = formattedTime; 
        propTime = formattedTime;      
      }, 10);  
    } else {
      propTotalTime = propTime;
      clearInterval(timerInterval); 
      timeDisplay.innerText = "00:00:00"; 
    
      createTaskComponent();
    }  
  
  });  
  
  const inputField = document.querySelector('#task-class');
  const taskComponentArea = document.querySelector('#task-component-area');
  const taskWrapper = document.querySelector('#task-wrapper');
  
  const createTaskComponent = async () => {
    
    
    // let taskDate = taskWrapper.querySelector('.date');
    // if (!taskDate) {
      //   let dateArea = document.querySelector('#date-area');
      //   taskWrapper.classList.add('task-wrapper');
      //   taskDate = document.createElement('div');
      //   taskDate.classList.add('date');
    //   taskDate.innerText = dateString;
    //   dateArea.appendChild(taskDate);
    // }
  
    const taskName = inputField.value;
    
    const tagElements = Array.from(displayTags.children);
    const tags = tagElements.map((tag) => tag.textContent);
    
    const taskComponent = {
      taskName: taskName,
      projectName: selectedProjValue,
      tags: tags,
      billColor: billColor,
      taskComponentTime: {
        resumeTime: "00:00:00",
        inheritTaskTime: propTime,
        totalTime: propTotalTime
      }
    };
    
    saveTaskComponentToDatabase(taskComponent);
    resetValues();
    console.log("reset");
  }
  
  function fetchTaskComponents() {
    fetch('http://localhost/timetracker/index.php/timetracker/get_all_task_components')
      .then(response => response.json())
      .then(taskComponents => {
        const taskComponentArea = document.getElementById('task-component-area');
        taskComponentArea.innerHTML = ''; 
  
        taskComponents.forEach(taskComponent => {
          taskComponent.taskComponentTime = JSON.parse(taskComponent.taskComponentTime);
          const taskComponentElement = createTaskComponentElement(taskComponent);
          taskComponentArea.appendChild(taskComponentElement);
        });
      })
      .catch(error => console.error(error));
  }
  
  function saveTaskComponentToDatabase(taskComponent) {
    fetch('http://localhost/timetracker/index.php/timetracker/save_task_components', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskName: taskComponent.taskName,
        projectName: taskComponent.projectName,
        tags: taskComponent.tags,
        billColor: taskComponent.billColor,
        taskComponentTime: taskComponent.taskComponentTime,
      }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Task component saved successfully');
        // console.log(response);
        fetchTaskComponents();
      } else {
        console.error('Error saving task component to database');
      }
    })
    .catch(error => console.error(error));
  }
      
  function createTaskComponentElement(taskComponent){
    const taskComponentElement = document.createElement('div');
    taskComponentElement.id = taskComponent.id;
      taskComponentElement.classList.add("task-component");
      taskComponentElement.innerHTML=`
      <div class="top">
          <div id="inherited-time">Total Time: ${taskComponent.taskComponentTime.totalTime}</div>
      </div>
  
      <hr>
  
      <div class="bottom">
  
          <input type='checkbox' class="checkbox" >
          <div class="left">
          
              <div>
                  <div id="task-name">${taskComponent.taskName}</div>
              </div>
  
              <div id="task-project-name">
                  ${taskComponent.projectName ? `●${taskComponent.projectName}` : ""}
              </div>
  
              <div id="task-tags" class="timer-tag"> 
              ${tags.map((tag) => `<span class="timer-tags">${tag}</span>`).join("")}
              </div>
  
              <div id="task-bill" class="${taskComponent.billColor}">
            
              <i id="bill" class="fa-regular fa-dollar-sign"></i>
                  
              </div>
              |
          </div>
          
          <div class="right">
         
          <div id="display-resume-time" >
            ${taskComponent.taskComponentTime.resumeTime} 
          </div>
             <div id="resume-btn-${taskComponent.id}" data-component-id="${taskComponent.id}" >
             <i id="toggle-btn" class="fa-solid fa-play"></i>
          </div>
          <div id="delete-btn-${taskComponent.id}">
            <i class="fa fa-regular fa-trash-alt" data-component-id="${taskComponent.id}" data-target="#deleteModal" data-toggle="modal" ></i>
          </div>
          </div>
    `;    
  
    const toggleBtn = taskComponentElement.querySelector('#toggle-btn');
    const displayResumeTime = taskComponentElement.querySelector('#display-resume-time');
    const resumeBtn = taskComponentElement.querySelector(`#resume-btn-${taskComponent.id}`);
    const inheritTaskTime = taskComponentElement.querySelector('#inherited-time');
  
    resumeBtn.addEventListener('click', (event) => {
      const clickedComponentId = event.currentTarget.getAttribute('data-component-id');
      console.log(clickedComponentId);
  
      fetch('http://localhost/timetracker/index.php/timetracker/get_task_component_by_id/' + clickedComponentId)
      .then(response => response.json())
      .then(taskComponent => {
        console.log(taskComponent);
        const taskComponentTime = JSON.parse(taskComponent.taskComponentTime);
        let resumeTime = taskComponentTime.resumeTime;
        let totalTime = taskComponentTime.totalTime;
  
        // Rest of your code
        toggleBtn.className = toggleBtn.className === 'fa-solid fa-play' ? 'fa-solid fa-stop' : 'fa-solid fa-play';
  
        if (toggleBtn.className === 'fa-solid fa-stop') {
          let startTime = Date.now();
          timerInterval = setInterval(() => {
            let elapsedTime = Date.now() - startTime;
            let formattedTime = formatTime(elapsedTime);
    
            displayResumeTime.innerText = formattedTime;
  
            resumeTime = formattedTime;
            console.log(resumeTime)
          }, 10);
        } else {
          let savedResumeTime = displayResumeTime.innerText;
    
          console.log("inherited: " + totalTime);
          console.log("savedresumed: " + savedResumeTime);
    
          const [hours1, minutes1, seconds1] = savedResumeTime.split(':').map(Number);
          const [hours2, minutes2, seconds2] = totalTime.split(':').map(Number);
    
          let totalSeconds = seconds1 + seconds2;
          let totalMinutes = minutes1 + minutes2;
          let totalHours = hours1 + hours2;
    
          if (totalSeconds >= 60) {
            totalSeconds -= 60;
            totalMinutes++;
          }
    
          if (totalMinutes >= 60) {
            totalMinutes -= 60;
            totalHours++;
          }
    
          const result = `${totalHours.toString().padStart(2, '0')}:${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`;
    
          totalTime = result;
          console.log("TotalTime: " + totalTime);
    
          
          const updateData = {
            // resumeTime: savedResumeTime,
            totalTime: totalTime
          };
  
          fetch('http://localhost/timetracker/index.php/timetracker/update_task_component/' + clickedComponentId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
          })
          .then(response => response.json())
          .then(updatedTaskComponent => {
            console.log('Task component updated:', updatedTaskComponent);
          });
          
          inheritTaskTime.innerText = `Total Time: ${totalTime}`;
          
          clearInterval(timerInterval);
          displayResumeTime.innerText = "00:00:00";
        }
        
      })
      .catch(error => {
        console.log('Error:', error);
      });
  
     
    });
  
   
    const deleteBtn = taskComponentElement.querySelector(`#delete-btn-${taskComponent.id} .fa-trash-alt`);
    
    deleteBtn.addEventListener('click', (event) => {
      const componentId = event.target.getAttribute('data-component-id');
  
      const taskComponent = document.getElementById(componentId);
  
      const modal = document.createElement('div');
      modal.id = `deleteModal-${componentId}`;
      modal.innerHTML = `
        <div class="modal fade" data-backdrop="false" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">Delete Task</h5>
                <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                Are you sure you want to delete this task?
              </div>
              <div class="modal-footer">
                <button type="button" class="blue-btn" data-dismiss="modal">No</button>
                <button type="button" class="red-btn" id="deleteButton">Yes</button>
              </div>
            </div>
          </div>
        </div>
      `;
  
      document.body.appendChild(modal);
  
      const deleteTask = modal.querySelector('#deleteButton');
      deleteTask.addEventListener('click', () => {
        
          fetch(`http://localhost/timetracker/index.php/timetracker/delete_task_component/${componentId}`, {
            method: 'DELETE'
          })
            .then(response => {
              if (response.ok) {
                console.log('Task component deleted successfully');
                taskComponent.remove();
              } else {
                console.error('Error deleting task component from the database');
              }
            })
            .catch(error => console.error(error));
  
        modal.remove();
      });
  
      const deleteModal = document.getElementById(`deleteModal-${componentId}`);
      deleteModal.classList.add('show');
    });
  
    return taskComponentElement;
    
  }
  
  
// DATE coulmn 
// *************************

    // console.log(taskDate);

  // let taskDateDiv = taskWrapper.querySelector(`.date[data-date="${taskDate}"]`);
  // if (!taskDateDiv) {
  //   let dateArea = document.querySelector('#date-area');
  //   if (!dateArea) {
  //     dateArea = document.createElement('div');
  //     dateArea.id = 'date-area';
  //     taskWrapper.appendChild(dateArea);
  //   }
  //   taskDateDiv = document.createElement('div');
  //   taskDateDiv.classList.add('date');
  //   taskDateDiv.setAttribute('data-date', taskDate);
  //   taskDateDiv.innerText = taskDate;
  //   dateArea.appendChild(taskDateDiv);
  // }


  <div id="task-name">${taskComponent.taskName}</div>
