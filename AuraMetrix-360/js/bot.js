// Simulated Last Recorded Health Metrics
let lastRecordedMetrics = {
    heartRate: 80, // bpm
    temperature: 37.5, // °C
    bloodPressure: "120/80", // mmHg
    spo2: 98, // %
};

// Chat functionality
const sendMessageButton = document.getElementById('sendMessageButton');
const userMessageInput = document.getElementById('userMessage');
const chatMessages = document.getElementById('chatMessages');

// Function to handle sending messages
sendMessageButton.addEventListener('click', function () {
    const userMessage = userMessageInput.value.trim();
    if (userMessage !== '') {
        // Display the user's message
        appendMessage(userMessage, 'user');
        // Simulate a bot response
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            appendMessage(botResponse, 'bot');
        }, 1000);
        // Clear input after sending message
        userMessageInput.value = '';
        userMessageInput.focus();
    }
});

// Function to append messages to the chat box
function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `
        <div class="message-avatar">
            <img src="${sender === 'user' ? 'img/pp-blue.png' : 'img/bot.gif'}" alt="${sender}" />
        </div>
        <div class="message-bubble">${message}</div>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
}

// Function to generate bot response based on the user's message
function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Handle greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! How can I assist you with your health today?";
    }

    if (lowerMessage.includes('good morning')) {
        return "Good morning! Ready to check your health metrics?";
    }

    // Respond with the last recorded health data
    if (lowerMessage.includes('health data') || lowerMessage.includes('latest metrics') || lowerMessage.includes('metrics')) {
        return `Your last recorded health data is: 
                Heart Rate: ${lastRecordedMetrics.heartRate} bpm, 
                Temperature: ${lastRecordedMetrics.temperature} °C, 
                Blood Pressure: ${lastRecordedMetrics.bloodPressure}, 
                SpO2: ${lastRecordedMetrics.spo2}%. Would you like an explanation of these?`;
    }

    // Respond to "explain" prompt
    if (lowerMessage.includes('explain')) {
        return "Which metric would you like me to explain? Heart rate, temperature, blood pressure, or SpO2?";
    }

    // Handle specific health metric explanations
    if (lowerMessage.includes('heart rate')) {
        return `Your heart rate is ${lastRecordedMetrics.heartRate} bpm. 
                A normal resting heart rate is between 60 to 100 bpm. 
                If your heart rate is consistently above 100 bpm, it may indicate stress or a heart condition. Would you like any recommendations for managing this?`;
    }

    if (lowerMessage.includes('temperature')) {
        return `Your temperature is ${lastRecordedMetrics.temperature}°C. 
                A normal body temperature is around 37°C. A slight variation could indicate a mild fever or other conditions. Would you like more advice on this?`;
    }

    if (lowerMessage.includes('blood pressure')) {
        return `Your blood pressure is ${lastRecordedMetrics.bloodPressure}. 
                This is a normal reading. A healthy range for most adults is below 120/80 mmHg. 
                If you experience unusual readings, you should consult a healthcare provider. Would you like further tips?`;
    }

    if (lowerMessage.includes('spo2') || lowerMessage.includes('oxygen')) {
        return `Your SpO2 is ${lastRecordedMetrics.spo2}%. 
                Normal oxygen saturation levels are typically between 95-100%. If this value drops below 90%, it could indicate a respiratory issue. Would you like tips on improving your SpO2?`;
    }

    // Recommendations based on the user's health data
    if (lowerMessage.includes('recommendations') || lowerMessage.includes('tips')) {
        return `Here are some recommendations for improving your health:
                - Stay active with regular exercise to keep your heart healthy.
                - Drink enough water to maintain hydration and temperature balance.
                - Eat a balanced diet to support healthy blood pressure.
                - Practice breathing exercises to manage stress and improve heart rate.
                Would you like specific advice based on your latest metrics?`;
    }

    // Handle responses to yes or other confirmations
    if (lowerMessage.includes('yes')) {
        return "Great! Would you like me to go over any specific metric in more detail or give personalized recommendations?";
    }

    // Default response if nothing matches
    return "I'm here to help! You can ask me to explain your health metrics or provide recommendations based on your health data.";
}
