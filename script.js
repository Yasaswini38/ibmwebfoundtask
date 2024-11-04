// Constants
const taskInput = document.querySelector("#newtask input");
const taskSection = document.querySelector('.tasks');

// Listener for Enter key
taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        createTask();
    }
});

// OnClick event for the Add Task button
document.querySelector('#push').onclick = function() {
    createTask();
};

// Function that creates a new task
function createTask() {
    // Check if the input field is empty
    if (taskInput.value.trim().length === 0) {
        alert("The task field is blank!!");
        return; 
    }

  
    const taskHTML = `
        <div class="task">
            <label id="taskname">
                <input onclick="updateTask(this)" type="checkbox" id="check-task">
                <p>${taskInput.value.trim()}</p>
            </label>
            <div class="delete" onclick="deleteTask(this)">
                <i class="uil uil-trash"></i>
            </div>
        </div>`;

    
    taskSection.insertAdjacentHTML('beforeend', taskHTML);

    
    taskInput.value = '';

    
    if (taskSection.offsetHeight >= 300) {
        taskSection.classList.add("overflow");
    } else {
        taskSection.classList.remove("overflow");
    }
}


function deleteTask(element) {
    element.parentElement.remove();
}


function updateTask(task) {
    const taskItem = task.parentElement.lastElementChild;
    if (task.checked) {
        taskItem.classList.add("checked");
    } else {
        taskItem.classList.remove("checked");
    }
}
const chatInput = document.querySelector("#chat-input");
const chatMessages = document.querySelector(".chatbot-messages");
const sendChatButton = document.querySelector("#send-chat");


sendChatButton.onclick = function() {
    sendMessage();
};

chatInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});


function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText.length === 0) {
        return;
    }

  
    const userMessage = document.createElement("div");
    userMessage.classList.add("chatbot-message", "user");
    userMessage.textContent = messageText;
    chatMessages.appendChild(userMessage);


    chatInput.value = '';

    setTimeout(() => {
        const botMessage = document.createElement("div");
        botMessage.classList.add("chatbot-message", "bot");
        botMessage.textContent = getBotResponse(messageText); 
        chatMessages.appendChild(botMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000); 
}

// Function to generate bot responses based on user input
function getBotResponse(input) {
    const normalizedInput = input.toLowerCase(); 
    if (normalizedInput.includes("task")) {
        return "You can add tasks using the input above. Just type your task and hit 'Add'!";
    } else if (normalizedInput.includes("delete") || normalizedInput.includes("remove")) {
        return "To delete a task, click the trash icon next to it!";
    } else if (normalizedInput.includes("how to use")) {
        return "You can add tasks, mark them as done, or delete them. Just type in the input box!";
    } else if (normalizedInput.includes("hello") || normalizedInput.includes("hi")) {
        return "Hello! I'm here to help you manage your tasks. What do you need?";
    } else if (normalizedInput.includes("help")) {
        return "Sure! You can ask me about adding tasks, deleting tasks, or how to use this app!";
    } else {
        return "I'm sorry, I didn't understand that. Can you please ask something else?";
    }
}
const openChatbotButton = document.querySelector("#open-chatbot");
const closeChatbotButton = document.querySelector("#close-chatbot");
const chatbotPopup = document.querySelector("#chatbot-popup");


openChatbotButton.onclick = function() {
    chatbotPopup.style.display = "block";
};

closeChatbotButton.onclick = function() {
    chatbotPopup.style.display = "none"; 
};

const chatbotHeader = document.querySelector("#chatbot-header");

// Variables to hold the offset position of the mouse and the chatbot
let offsetX, offsetY;

// Mouse down event to start dragging
chatbotHeader.addEventListener('mousedown', function(e) {
    // Calculate the offset position of the mouse
    offsetX = e.clientX - chatbotPopup.getBoundingClientRect().left;
    offsetY = e.clientY - chatbotPopup.getBoundingClientRect().top;

    // Listen for mouse movements and mouse up events
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
});

// Function to handle mouse movements
function mouseMoveHandler(e) {
    // Calculate the new position of the chatbot
    chatbotPopup.style.left = (e.clientX - offsetX) + 'px';
    chatbotPopup.style.top = (e.clientY - offsetY) + 'px';
}

// Function to handle mouse up event
function mouseUpHandler() {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
}