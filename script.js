// Dynamic Greeting Message
const hour = new Date().getHours();
let greeting;
if (hour < 12) {
    greeting = "Good Morning!";
} else if (hour < 18) {
    greeting = "Good Afternoon!";
} else {
    greeting = "Good Evening!";
}
const greetingElement = document.getElementById("greeting");
if (greetingElement) {
    greetingElement.textContent = greeting;
}

// Interactive Baking Tips
const tips = [
    "Always preheat your oven for best results.",
    "Use room temperature ingredients for better mixing.",
    "Don’t overmix batter to keep cakes tender."
];
const tipButton = document.getElementById("tip-button");
const tipDisplay = document.getElementById("tip-display");
if (tipButton && tipDisplay) {
    tipButton.addEventListener("click", function() {
        const randomIndex = Math.floor(Math.random() * tips.length);
        tipDisplay.textContent = tips[randomIndex];
    });
}

// Contact Form Validation and Local Storage
const form = document.getElementById("contact-form");
if (form) {
    // Prefill form from local storage
    if (localStorage.getItem("name")) {
        document.getElementById("name").value = localStorage.getItem("name");
    }
    if (localStorage.getItem("email")) {
        document.getElementById("email").value = localStorage.getItem("email");
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const remember = document.getElementById("remember").checked;

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
        } else {
            if (remember) {
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
            } else {
                localStorage.removeItem("name");
                localStorage.removeItem("email");
            }
            alert("Thank you for your message!");
            form.reset();
        }
    });
}

// Chatbot functionality
const responses = {
    "hi": "Hello! How can I assist you today?",
    "hours": "We are open from 9 AM to 6 PM, Monday to Saturday.",
    "delivery": "Yes, we offer delivery 24/7.",
    "products": "We offer a variety of cakes, pastries, and cookies. Check our Products page for more details.",
    "location": "We are located at Community 17, Lashibi."
};

if (document.getElementById("chatbotModal")) {
    const chatbotModal = document.getElementById("chatbotModal");
    const conversationDiv = document.getElementById("conversation");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");

    function addMessage(message, sender) {
        const messageElement = document.createElement("p");
        messageElement.textContent = `${sender}: ${message}`;
        conversationDiv.appendChild(messageElement);
        conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }

    chatbotModal.addEventListener("shown.bs.modal", function() {
        conversationDiv.innerHTML = "<p>Bot: Hi there! Ask me anything about our bakery.</p>";
        userInput.focus();
    });

    sendButton.addEventListener("click", function() {
        const userMessage = userInput.value.trim().toLowerCase();
        if (userMessage) {
            addMessage(userMessage, "You");
            const response = responses[userMessage] || "I'm sorry, I didn't understand that. Can you please rephrase?";
            addMessage(response, "Bot");
            userInput.value = "";
        }
    });

    userInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    updateGreeting();
    setupSlider();
    setupRandomTip();
    setupFormValidation();
    setupChatbot();
});