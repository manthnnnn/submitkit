/**
 * Blueprint Engine
 * Contains all 1000+ project topic blueprints.
 * Free info is always visible. Full blueprint unlocks after ₹19 payment.
 *
 * Language rule: Simple English only. Max 15 words per sentence.
 * No jargon without explanation.
 */

import { TOPICS_555 } from "./blueprint-catalog-555";
import { TOPICS_EXTRA } from "./blueprint-catalog-extra";
import { TOPICS_EXTRA2 } from "./blueprint-catalog-extra2";
import { TOPICS_EXTRA3 } from "./blueprint-catalog-extra3";
import { TOPICS_EXTRA4 } from "./blueprint-catalog-extra4";
import { synthesizeFullBlueprint } from "./blueprint-synthesizer";

export type BlueprintCategory =
  | 'AIML'
  | 'FullStack'
  | 'Cybersecurity'
  | 'IoT'
  | 'Blockchain'
  | 'NLP'
  | 'DataScience'
  | 'Mobile'
  | 'Fintech';

export interface VivaQA {
  question: string;
  whyAsked: string;
  perfectAnswer: string;
  avoidSaying: string;
}

export interface BuildStep {
  step: number;
  title: string;
  duration: string;
  description: string;
  commands: string[];
  codeSnippet?: string;
  expectedOutput: string;
}

export interface TopicCard {
  id: string;
  letter: string;
  title: string;
  category: BlueprintCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  buildTimeDays: string;
  trending: boolean;
  tagline: string;
  // FREE content
  whatItDoes: string;
  realWorldUse: string;
  examinerExpects: string[];
  freeVivaQuestions: string[];   // questions only, no answers
  freeStep1Title: string;        // step title only, no commands
  datasetName: string;           // name only, no link
}

export interface FullBlueprint extends TopicCard {
  problemStatement: string;
  objectives: string[];
  dataset: {
    name: string;
    url: string;
    description: string;
    size: string;
    format: string;
    backupDataset: string;
    backupUrl: string;
  };
  techStack: { component: string; tool: string; reason: string }[];
  architectureExplanation: string;
  architectureDiagram: string;
  buildSteps: BuildStep[];
  vivaQA: VivaQA[];
  deploymentGuide: string;
  resumeBullets: string[];
  linkedinPost: string;
  githubReadmeTemplate: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MASTER TOPIC MAP — 120 hand-crafted blueprints + 1000+ synthesized topics
// ─────────────────────────────────────────────────────────────────────────────

export const TOPIC_MAP: Record<string, FullBlueprint> = {

  // ═══════════════════════════════════════════════════════
  // A
  // ═══════════════════════════════════════════════════════

  'ai-chatbot-college-faq': {
    id: 'ai-chatbot-college-faq',
    letter: 'A',
    title: 'AI Chatbot for College FAQ',
    category: 'NLP',
    difficulty: 2,
    buildTimeDays: '2–3 days',
    trending: false,
    tagline: 'A smart bot that answers college questions automatically.',
    whatItDoes: 'This project builds a chatbot for a college website. Students can type questions like "What is the last date to pay fees?" or "Where is the library?" The bot reads the question and gives the right answer automatically. No human needs to sit and reply. The bot works 24 hours a day, 7 days a week.',
    realWorldUse: 'Companies like Amity University and BITS Pilani use AI chatbots on their websites. Banks like HDFC use chatbots to answer customer questions without calling the helpdesk.',
    examinerExpects: [
      'You should be able to explain how NLP (Natural Language Processing) works in simple words.',
      'You should show a live demo where the bot answers at least 5 different questions correctly.',
      'You should explain what happens when the bot does not know the answer.',
      'You should know the difference between a rule-based chatbot and an AI chatbot.',
    ],
    freeVivaQuestions: [
      'What is the difference between a rule-based chatbot and an NLP chatbot?',
      'What will your bot do if someone asks a question it does not know the answer to?',
    ],
    freeStep1Title: 'Set up Python environment and install required libraries',
    datasetName: 'Custom college FAQ dataset (you create this yourself)',
    problemStatement: 'Students waste time searching the college website for basic information. The college helpdesk gets hundreds of repeated calls every day. An AI chatbot can answer these questions instantly without any human help.',
    objectives: [
      'Build a chatbot that understands student questions written in normal English.',
      'Train the bot on at least 100 common college FAQ questions and answers.',
      'Create a simple web interface where students can type and get answers.',
      'Handle cases when the bot does not know the answer — redirect to a human.',
      'Deploy the chatbot so any student can access it from a browser.',
    ],
    dataset: {
      name: 'Custom College FAQ Dataset',
      url: 'https://github.com/Topics/chatbot-dataset',
      description: 'You will create this yourself. Write 100–150 questions and answers about your college — fees, hostel, library timings, exam dates, admission process, etc. Save it as a JSON or CSV file.',
      size: '100–150 Q&A pairs',
      format: 'JSON or CSV',
      backupDataset: 'Open source university FAQ dataset',
      backupUrl: 'https://huggingface.co/datasets/McAuley-Lab/Amazon-C4',
    },
    techStack: [
      { component: 'Programming Language', tool: 'Python 3.10+', reason: 'Python has the best libraries for NLP and machine learning.' },
      { component: 'NLP Library', tool: 'NLTK + scikit-learn', reason: 'NLTK helps the bot understand words. Scikit-learn matches questions to answers.' },
      { component: 'Web Framework', tool: 'Flask', reason: 'Flask is simple and lightweight. Good for small projects like this.' },
      { component: 'Frontend', tool: 'HTML + CSS + JavaScript', reason: 'Simple chat interface. No complex framework needed.' },
      { component: 'Deployment', tool: 'Render.com (free)', reason: 'Completely free hosting. No credit card needed.' },
    ],
    architectureExplanation: 'The student types a question in the chat box. The question goes to the Flask server. Flask sends it to the NLP model. The model compares the question with all stored FAQ questions. It finds the closest match. It sends back the answer. The answer appears in the chat box.',
    architectureDiagram: `
[Student Browser]
     |
     | types question
     v
[Flask Web Server]
     |
     | sends text to model
     v
[NLP Engine (NLTK + TF-IDF)]
     |
     | compares with FAQ database
     v
[FAQ JSON Database]
     |
     | returns best matching answer
     v
[Flask sends answer back]
     |
     v
[Student sees answer in chat box]
    `,
    buildSteps: [
      {
        step: 1, title: 'Set up Python environment and install libraries', duration: '20 minutes',
        description: 'First, create a project folder. Then set up a virtual environment. This keeps your project libraries separate from other Python projects on your computer.',
        commands: ['mkdir college-chatbot', 'cd college-chatbot', 'python -m venv venv', 'venv\\Scripts\\activate  # Windows', 'pip install flask nltk scikit-learn numpy'],
        codeSnippet: '# Check everything installed correctly\nimport flask, nltk, sklearn\nprint("All libraries ready!")',
        expectedOutput: 'No errors. All libraries installed successfully.',
      },
      {
        step: 2, title: 'Create your FAQ dataset', duration: '30 minutes',
        description: 'Create a file called faq.json. Write at least 100 questions and answers about your college. The more questions you add, the smarter the bot becomes.',
        commands: ['# Create faq.json file manually'],
        codeSnippet: `{
  "faq": [
    {
      "question": "What are the library timings?",
      "answer": "The library is open from 8 AM to 8 PM on weekdays."
    },
    {
      "question": "How do I pay the exam fees?",
      "answer": "You can pay exam fees online through the student portal or at the accounts office."
    }
  ]
}`,
        expectedOutput: 'faq.json file created with at least 100 entries.',
      },
      {
        step: 3, title: 'Build the NLP matching engine', duration: '45 minutes',
        description: 'This is the brain of the chatbot. We use TF-IDF to convert questions into numbers. Then we compare those numbers to find the closest match.',
        commands: ['# Write model.py file'],
        codeSnippet: `import json, numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
nltk.download('punkt')

with open('faq.json') as f:
    data = json.load(f)

questions = [item['question'] for item in data['faq']]
answers = [item['answer'] for item in data['faq']]

vectorizer = TfidfVectorizer()
question_vectors = vectorizer.fit_transform(questions)

def get_answer(user_question):
    user_vec = vectorizer.transform([user_question])
    similarities = cosine_similarity(user_vec, question_vectors)
    best_match_idx = np.argmax(similarities)
    confidence = similarities[0][best_match_idx]
    if confidence < 0.3:
        return "Sorry, I don't know the answer to that. Please contact the college office."
    return answers[best_match_idx]`,
        expectedOutput: 'model.py works — test by calling get_answer("library timings") and getting the right answer.',
      },
      {
        step: 4, title: 'Build the Flask API', duration: '20 minutes',
        description: 'Now we connect the brain to a web server. Flask will receive the question from the browser and send back the answer.',
        commands: ['# Write app.py'],
        codeSnippet: `from flask import Flask, request, jsonify, render_template
from model import get_answer

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    response = get_answer(user_message)
    return jsonify({'reply': response})

if __name__ == '__main__':
    app.run(debug=True)`,
        expectedOutput: 'Flask server starts on http://localhost:5000',
      },
      {
        step: 5, title: 'Build the chat UI', duration: '45 minutes',
        description: 'Create a simple HTML page with a chat box. The student types a question, clicks Send, and sees the answer.',
        commands: ['mkdir templates', '# Create templates/index.html'],
        codeSnippet: `<!-- templates/index.html -->
<!DOCTYPE html>
<html>
<head><title>College FAQ Chatbot</title></head>
<body>
  <div id="chat-box" style="height:400px; overflow-y:scroll; border:1px solid #ccc; padding:10px;"></div>
  <input id="user-input" type="text" placeholder="Ask a question..." style="width:80%">
  <button onclick="sendMessage()">Send</button>
  <script>
    async function sendMessage() {
      const msg = document.getElementById('user-input').value;
      const chatBox = document.getElementById('chat-box');
      chatBox.innerHTML += '<p><b>You:</b> ' + msg + '</p>';
      const res = await fetch('/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({message: msg})
      });
      const data = await res.json();
      chatBox.innerHTML += '<p><b>Bot:</b> ' + data.reply + '</p>';
      document.getElementById('user-input').value = '';
    }
  </script>
</body>
</html>`,
        expectedOutput: 'Chat page loads. You can type a question and get an answer.',
      },
      {
        step: 6, title: 'Test with 20 different questions', duration: '30 minutes',
        description: 'Test your chatbot with at least 20 different questions. Note which ones fail. Improve the FAQ dataset to fix failures.',
        commands: ['python app.py', '# Open browser at http://localhost:5000'],
        expectedOutput: 'At least 80% of your test questions get correct answers.',
      },
      {
        step: 7, title: 'Add a "not understood" fallback', duration: '15 minutes',
        description: 'When the bot does not know the answer, it should say so politely and give the office phone number.',
        commands: ['# Already handled in model.py — confidence < 0.3 check'],
        expectedOutput: 'Unknown questions show: "Sorry, I don\'t know that. Call: 1800-XXX-XXXX"',
      },
      {
        step: 8, title: 'Deploy to Render.com (free)', duration: '30 minutes',
        description: 'Put your project on GitHub first. Then connect GitHub to Render. Render will host your chatbot for free and give you a public URL.',
        commands: ['git init', 'git add .', 'git commit -m "chatbot ready"', 'git push origin main', '# Create Render.com account', '# Connect GitHub repo', '# Set build command: pip install -r requirements.txt', '# Set start command: python app.py'],
        expectedOutput: 'Your chatbot is live at https://your-app.onrender.com',
      },
      {
        step: 9, title: 'Take screenshots for documentation', duration: '15 minutes',
        description: 'Take 5 screenshots: the home page, a correct answer, an unknown question fallback, the code structure, and the Render dashboard showing it is live.',
        commands: ['# Use browser screenshot tool or Snipping Tool on Windows'],
        expectedOutput: '5 screenshots saved for your project documentation.',
      },
      {
        step: 10, title: 'Final checklist before viva', duration: '15 minutes',
        description: 'Check all these things before your viva day. Practice explaining the project in simple words.',
        commands: [],
        codeSnippet: `Checklist:
[ ] Bot answers 80%+ of test questions correctly
[ ] Unknown questions show a helpful fallback message
[ ] Project is live on Render with a public URL
[ ] You can explain TF-IDF in 3 simple sentences
[ ] You know what happens if two questions have the same similarity score
[ ] Code is uploaded to GitHub with a README`,
        expectedOutput: 'All checkboxes ticked. You are ready for viva.',
      },
    ],
    vivaQA: [
      {
        question: 'What is the difference between a rule-based chatbot and an AI chatbot?',
        whyAsked: 'The examiner wants to know if you understand what your project actually is. Many students copy an AI chatbot but think it is rule-based.',
        perfectAnswer: 'A rule-based chatbot works like a decision tree. You write exact rules. If the user says this word, show this answer. It is rigid. It only works for exact matches. An AI chatbot is different. It learns from data. It understands the meaning of a question, not just the exact words. So if someone asks "library open kab hai?" instead of "What are library timings?", an AI chatbot still gets it right. Our chatbot uses TF-IDF and cosine similarity. This means it converts questions into numbers and finds the closest match mathematically. It is smarter than rule-based because it handles variations in how people ask the same question.',
        avoidSaying: 'Do not say "AI chatbot uses if-else conditions." That is a rule-based chatbot.',
      },
      {
        question: 'What is TF-IDF? Explain in simple words.',
        whyAsked: 'TF-IDF is the core algorithm of this project. If you cannot explain it, the examiner knows you did not build it.',
        perfectAnswer: 'TF-IDF stands for Term Frequency — Inverse Document Frequency. Let me explain both parts. Term Frequency means: how often does this word appear in this question? If the word "library" appears 3 times in a question, it gets a higher score. Inverse Document Frequency means: how rare is this word across all questions? Common words like "the" and "is" appear everywhere. TF-IDF gives them a low score. Rare important words get a higher score. Together, TF-IDF converts a question into a list of numbers. Each number represents how important each word is. Then we compare these numbers for the user question and all FAQ questions. The FAQ question with the most similar numbers is the best match.',
        avoidSaying: 'Do not say "TF-IDF is a machine learning model." It is a mathematical scoring technique, not a learning model.',
      },
      {
        question: 'What happens if someone asks a question your bot has never seen?',
        whyAsked: 'This tests your error handling. Every system must handle unknown inputs gracefully.',
        perfectAnswer: 'We handle this with a confidence threshold. After TF-IDF matches the user question to an FAQ question, it gives a similarity score between 0 and 1. 1 means perfect match. 0 means no match at all. We set a threshold of 0.3. If the best match score is below 0.3, the bot says: "Sorry, I do not have an answer for this. Please contact the college office at this number." This is called graceful degradation. The bot admits it does not know rather than giving a wrong answer. This is better for the user.',
        avoidSaying: 'Do not say the bot will crash or show an error to the user.',
      },
      {
        question: 'How would you make this chatbot understand Hindi questions?',
        whyAsked: 'The examiner is testing if you can think beyond your current implementation.',
        perfectAnswer: 'Right now our chatbot only understands English questions. To add Hindi support, we would need two things. First, a multilingual NLP model. Instead of TF-IDF, we would use a model like LaBSE or IndicBERT, which understand both Hindi and English. Second, we would add Hindi translations of our FAQ questions to the training data. This is called a bilingual dataset. The model would then match questions in both languages to the same answer. This is a future scope for our project.',
        avoidSaying: 'Do not say "We just translate the question using Google Translate." That is not a proper solution.',
      },
      {
        question: 'Why did you use Flask and not Django for the backend?',
        whyAsked: 'Tests if you understand your own tech stack choices.',
        perfectAnswer: 'Django is a full-featured framework. It comes with a lot of built-in tools for large applications — user authentication, admin panel, ORM. But for our chatbot, we only need one thing: receive a question, return an answer. Flask is a micro-framework. It is lightweight. It starts fast. It has less code. For a small project with one or two API endpoints, Flask is the right choice. Using Django here would be like using a truck to deliver one letter.',
        avoidSaying: 'Do not say "I used Flask because I do not know Django." Say you chose Flask because it fits the project size.',
      },
      {
        question: 'What is cosine similarity and why do you use it?',
        whyAsked: 'Cosine similarity is the matching algorithm. This is a core concept the examiner will test.',
        perfectAnswer: 'After TF-IDF converts questions into numbers, we get vectors. A vector is just a list of numbers. For example, the user question becomes [0.2, 0.8, 0.1, 0.5...]. Each FAQ question is also a vector. Now we need to find which FAQ vector is closest to the user vector. We use cosine similarity to measure this. Cosine similarity measures the angle between two vectors. If the angle is 0 degrees, they are identical — score is 1.0. If the angle is 90 degrees, they are completely different — score is 0. We find the FAQ question with the highest cosine similarity score. That is our best match.',
        avoidSaying: 'Do not confuse cosine similarity with Euclidean distance. They measure similarity differently.',
      },
      {
        question: 'What is the accuracy of your chatbot?',
        whyAsked: 'The examiner wants to see if you tested your own project.',
        perfectAnswer: 'We tested the chatbot with 50 different questions — some from the FAQ dataset and some new questions we created. Out of 50, the bot answered 43 correctly. That gives us 86% accuracy. The 7 incorrect answers happened when the user asked questions in a very different way than our training data. For example, "kya library kal bhi khuli rahegi?" could not be matched because our FAQ is in English only. To improve this, we would add more question variations for each FAQ entry. This is called data augmentation.',
        avoidSaying: 'Do not say "100% accuracy." No chatbot is 100% accurate. Be honest and show you tested it.',
      },
      {
        question: 'How is your chatbot different from ChatGPT?',
        whyAsked: 'Students often say they "used AI" without knowing how their system differs from large language models.',
        perfectAnswer: 'ChatGPT is a Large Language Model. It was trained on billions of web pages. It can answer any question about almost any topic. Our chatbot is a domain-specific retrieval system. It only knows what is in our FAQ dataset. If you ask it about movies, it will say it does not know. ChatGPT generates new answers from scratch. Our chatbot finds and returns existing answers from our database. Our system is much simpler, but it is predictable and safe for a college use case. A college cannot risk ChatGPT making up fee information or wrong exam dates.',
        avoidSaying: 'Do not say "My chatbot is just like ChatGPT but smaller." They are fundamentally different systems.',
      },
      {
        question: 'How would you deploy this chatbot so 1000 students can use it at the same time?',
        whyAsked: 'Tests scalability thinking.',
        perfectAnswer: 'Right now we use Flask\'s development server. It can handle maybe 5–10 users at the same time. For 1000 concurrent users, we would need three things. First, use Gunicorn as the WSGI server with multiple worker processes. Each worker handles separate requests. Second, put a load balancer in front. This distributes traffic across multiple servers. Third, cache the TF-IDF vectorizer in memory so it does not reload for every request. With these changes, the same code could handle thousands of requests per minute.',
        avoidSaying: 'Do not say "just buy a bigger server." That is not a technical solution.',
      },
      {
        question: 'What are the limitations of your project?',
        whyAsked: 'Examiners respect students who know their project\'s weaknesses. It shows maturity.',
        perfectAnswer: 'Our chatbot has three main limitations. First, it only understands English. Hindi or mixed language questions fail. Second, it cannot learn from new conversations. If a student asks a question we never added, the bot cannot learn from it automatically. We have to manually update the FAQ file. Third, TF-IDF only matches words, not meaning. So "library timing" and "when does the reading room open" might not match because the words are different, even though the meaning is the same. To fix this last problem, we could use a sentence transformer model like sentence-bert, which understands meaning, not just words.',
        avoidSaying: 'Do not say "it has no limitations." Every system has limitations.',
      },
      {
        question: 'What is NLTK and why did you use it?',
        whyAsked: 'NLTK is listed in your tech stack. You must know what it does.',
        perfectAnswer: 'NLTK stands for Natural Language Toolkit. It is a Python library for working with human language text. In our project, we use NLTK for tokenization. Tokenization means breaking a sentence into individual words. For example, "What are the library timings?" becomes ["What", "are", "the", "library", "timings"]. We also use NLTK to remove stop words. Stop words are common words like "is", "the", "are" that do not help with matching. Removing them makes TF-IDF more accurate because it focuses on meaningful words like "library" and "timings".',
        avoidSaying: 'Do not say NLTK is an AI model. It is a text processing toolkit.',
      },
      {
        question: 'How does Flask handle the request from the browser to your Python code?',
        whyAsked: 'Tests your understanding of how the frontend and backend communicate.',
        perfectAnswer: 'The browser sends an HTTP POST request to the /chat URL. The request contains a JSON object with the user\'s message. Flask receives this request. The @app.route decorator tells Flask which function to call for this URL. Our chat() function runs. It extracts the message from request.json. It passes the message to our get_answer() function. The function returns the best matching answer. Flask wraps this answer in a JSON object and sends it back to the browser as an HTTP response. The browser\'s JavaScript reads this response and displays the answer in the chat box.',
        avoidSaying: 'Do not say "Flask automatically connects to JavaScript." HTTP request-response is what connects them.',
      },
      {
        question: 'Why is your data stored in a JSON file and not a database?',
        whyAsked: 'Tests your design decisions and understanding of tradeoffs.',
        perfectAnswer: 'For a project with 100–150 FAQ entries, a JSON file is perfectly fine. It is simple, fast to load, and does not need database setup. We load the entire JSON file into memory when the server starts. This makes each query very fast. If this was a production system with 10,000 questions that change every day, we would use a proper database like PostgreSQL. We could use Elasticsearch for even better text search performance. But for a college project demo, JSON is the right choice. It is simple and it works.',
        avoidSaying: 'Do not say "databases are too complicated." Say JSON is the right choice for this scale.',
      },
      {
        question: 'How would you add a feature to collect unanswered questions?',
        whyAsked: 'Tests if you can think about improving your system.',
        perfectAnswer: 'When the bot\'s confidence score falls below 0.3, it means the bot could not answer. Right now, we show an error message. As a future improvement, we can log these failed questions. Every time the bot fails, we save the question to a database table with the timestamp. The college admin can then log into an admin dashboard, see all unanswered questions, and add proper answers to the FAQ. This is called a feedback loop. Over time, the bot improves automatically based on real student questions.',
        avoidSaying: 'Do not say "we would retrain the model every day." That is computationally expensive and unnecessary for this system.',
      },
      {
        question: 'Explain your project in one sentence for someone who is not from a technology background.',
        whyAsked: 'Tests communication skills. An examiner may ask this to see if you truly understand what you built.',
        perfectAnswer: 'Our project is like a very smart FAQ page. Instead of a student scrolling through a long list of questions to find their answer, they just type their question in plain English, and the system automatically finds and shows the correct answer in seconds.',
        avoidSaying: 'Do not use technical terms like TF-IDF or cosine similarity in this answer.',
      },
    ],
    deploymentGuide: `
HOW TO DEPLOY YOUR COLLEGE CHATBOT FOR FREE ON RENDER.COM

Step 1: Create a requirements.txt file
Run this command in your project folder:
pip freeze > requirements.txt

Step 2: Create a Procfile (no file extension)
Create a file called "Procfile" (exactly this, no .txt extension).
Write this inside it:
web: gunicorn app:app

Step 3: Push your code to GitHub
git init
git add .
git commit -m "College chatbot - ready for deployment"
git branch -M main
git push -u origin main

Step 4: Create a Render account
Go to render.com and sign up for free using your GitHub account.

Step 5: Create a new Web Service on Render
- Click "New +" > "Web Service"
- Connect your GitHub repository
- Build Command: pip install -r requirements.txt
- Start Command: gunicorn app:app
- Instance Type: Free

Step 6: Click "Create Web Service"
Render will take 2-3 minutes to deploy your app.
You will get a URL like: https://college-chatbot.onrender.com

Step 7: Test your live URL
Open the URL in your browser. Type a test question.
If it works, your chatbot is now live on the internet.

BACKUP DEMO PLAN (if Render is down during viva):
Run the project locally on your laptop.
Command: python app.py
Open browser at: http://localhost:5000
Show the examiner on your laptop screen directly.
    `,
    resumeBullets: [
      'Built an NLP-based FAQ chatbot for a college using Python, Flask, and TF-IDF vectorization, achieving 86% answer accuracy on a 150-question dataset.',
      'Implemented cosine similarity-based question matching to handle variations in how students phrase the same question.',
      'Deployed the chatbot on Render.com with a Gunicorn WSGI server, making it publicly accessible with zero hosting cost.',
    ],
    linkedinPost: `Just finished building an AI Chatbot for College FAQs as my final year project! 🤖

The chatbot answers student questions like "When does the library close?" or "How to pay exam fees?" instantly — no human needed.

Key things I built:
✅ NLP matching using TF-IDF + cosine similarity
✅ Flask REST API backend
✅ Simple chat UI that works on mobile too
✅ Deployed live on Render.com for free

Tech stack: Python · Flask · NLTK · scikit-learn · HTML/CSS

Check it out: [your-render-url]

#MachineLearning #NLP #Python #Flask #CollegeProject #ArtificialIntelligence #SubmitKit`,
    githubReadmeTemplate: `# College FAQ Chatbot

An AI-powered chatbot that answers student questions about college information.

## What This Does
Students type questions in normal English. The bot finds the best matching answer from the FAQ database and replies instantly.

## Tech Stack
- Python 3.10
- Flask (web server)
- NLTK (text processing)
- scikit-learn TF-IDF (question matching)

## How to Run Locally
\`\`\`bash
pip install -r requirements.txt
python app.py
# Open http://localhost:5000
\`\`\`

## Live Demo
[https://your-app.onrender.com](https://your-app.onrender.com)

## Accuracy
86% on 50 test questions

## Future Scope
- Add Hindi language support using IndicBERT
- Auto-learn from unanswered questions
- Add admin dashboard to update FAQ
`,
  },

  // ═══════════════════════════════════════════════════════
  // A - Face Recognition Attendance (TRENDING)
  // ═══════════════════════════════════════════════════════

  'face-recognition-attendance': {
    id: 'face-recognition-attendance',
    letter: 'A',
    title: 'Face Recognition Attendance System',
    category: 'AIML',
    difficulty: 3,
    buildTimeDays: '3–5 days',
    trending: true,
    tagline: 'Camera sees your face. Attendance marked automatically.',
    whatItDoes: 'This project marks student attendance using a camera. The camera takes a photo of each student\'s face. The system matches the face with photos stored in the database. If the face matches, attendance is marked for that student. No roll call needed. No signing a register. The teacher just starts the camera and walks away.',
    realWorldUse: 'Amazon uses face recognition in their fulfillment centers to track employee check-ins. Many airports use it for security checks. Schools in China and some Indian tech companies now use this for daily attendance.',
    examinerExpects: [
      'Show a live demo where the camera detects and recognizes at least 3 different faces.',
      'Explain what CNN is in simple words without reading from notes.',
      'Tell the difference between your face recognition method and a simple photo match.',
      'Know what accuracy your system achieves and how you measured it.',
    ],
    freeVivaQuestions: [
      'Why did you use CNN instead of a simple template matching approach?',
      'What happens if two students look very similar or are twins?',
    ],
    freeStep1Title: 'Install Python, OpenCV, and the face_recognition library',
    datasetName: 'LFW (Labeled Faces in the Wild) dataset + custom student photos',
    problemStatement: 'Taking attendance manually wastes 5–10 minutes of every class. Proxy attendance (one student signing for another) is a common problem. An automated face recognition system can mark attendance in seconds and make proxy attendance impossible.',
    objectives: [
      'Build a system that detects human faces in real-time using a webcam.',
      'Recognize individual students by comparing their face with stored photos.',
      'Mark attendance automatically in a database when a face is recognized.',
      'Generate a daily attendance report that a teacher can download.',
      'Handle poor lighting and slight angle changes in face detection.',
    ],
    dataset: {
      name: 'Custom Student Photo Dataset',
      url: 'https://www.kaggle.com/datasets/atulanandjha/lfwpeople',
      description: 'For this project, you take 5–10 photos of each student from different angles. Store them in folders named after each student. The face_recognition library uses these photos to learn what each person looks like.',
      size: '5–10 photos per student, 30–50 students',
      format: 'JPG or PNG images in folders',
      backupDataset: 'LFW (Labeled Faces in the Wild)',
      backupUrl: 'https://vis-www.cs.umass.edu/lfw/',
    },
    techStack: [
      { component: 'Programming Language', tool: 'Python 3.10+', reason: 'Python has the best computer vision libraries.' },
      { component: 'Face Detection', tool: 'OpenCV', reason: 'OpenCV detects faces in images in real-time. It is fast and free.' },
      { component: 'Face Recognition', tool: 'face_recognition library', reason: 'Built on top of dlib. Gives 99.38% accuracy on standard benchmarks. Very easy to use.' },
      { component: 'Database', tool: 'SQLite', reason: 'Simple database. No server setup needed. Perfect for storing attendance records.' },
      { component: 'Web Interface', tool: 'Flask + HTML', reason: 'Simple web page to start/stop the camera and view attendance reports.' },
      { component: 'Deployment', tool: 'Localhost (laptop demo)', reason: 'Face recognition needs a physical camera. Best demoed from your own laptop.' },
    ],
    architectureExplanation: 'The webcam captures a live video frame. OpenCV detects all faces in that frame. The face_recognition library converts each detected face into a 128-number code (face encoding). This code is compared with stored encodings for all registered students. If the match is close enough, the student is identified. Their name and current time is saved to the SQLite database. The teacher can open the web page to see today\'s attendance table.',
    architectureDiagram: `
[Webcam]
   |
   | live video frames
   v
[OpenCV - Face Detector]
   |
   | detected face regions
   v
[face_recognition library]
   |
   | 128-number face encoding
   v
[Comparison with stored encodings]
   |
   | if match found (distance < 0.6)
   v
[SQLite Database - mark attendance]
   |
   v
[Flask Web Page - attendance report]
    `,
    buildSteps: [
      {
        step: 1, title: 'Install Python and required libraries', duration: '20 minutes',
        description: 'The face_recognition library needs cmake and dlib to install. Follow these steps carefully.',
        commands: ['pip install cmake', 'pip install dlib', 'pip install face_recognition', 'pip install opencv-python', 'pip install flask'],
        expectedOutput: 'All libraries installed. Test by running: import face_recognition',
      },
      {
        step: 2, title: 'Collect student photos and encode them', duration: '45 minutes',
        description: 'Create a folder called "students". Inside it, create one subfolder for each student. Put 5–10 clear photos of that student in their folder. Then run the encoding script.',
        commands: ['mkdir students/John_Doe', '# Copy 5-10 photos of John into this folder'],
        codeSnippet: `import face_recognition, os, pickle

known_encodings = []
known_names = []

for student_name in os.listdir('students'):
    student_folder = f'students/{student_name}'
    for img_file in os.listdir(student_folder):
        img_path = f'{student_folder}/{img_file}'
        image = face_recognition.load_image_file(img_path)
        encodings = face_recognition.face_encodings(image)
        if encodings:
            known_encodings.append(encodings[0])
            known_names.append(student_name.replace('_', ' '))

with open('encodings.pkl', 'wb') as f:
    pickle.dump({'encodings': known_encodings, 'names': known_names}, f)
print(f"Encoded {len(known_names)} face images")`,
        expectedOutput: 'encodings.pkl file created. Console shows "Encoded X face images".',
      },
      {
        step: 3, title: 'Build the real-time face recognition engine', duration: '1 hour',
        description: 'This is the main script. It opens the webcam, detects faces, compares them with stored encodings, and marks attendance.',
        commands: ['# Write recognize.py'],
        codeSnippet: `import face_recognition, cv2, pickle, sqlite3
from datetime import datetime

with open('encodings.pkl', 'rb') as f:
    data = pickle.load(f)
known_encodings = data['encodings']
known_names = data['names']

conn = sqlite3.connect('attendance.db')
conn.execute('''CREATE TABLE IF NOT EXISTS attendance
               (id INTEGER PRIMARY KEY, name TEXT, date TEXT, time TEXT)''')
conn.commit()

marked_today = set()
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    for encoding, location in zip(face_encodings, face_locations):
        matches = face_recognition.compare_faces(known_encodings, encoding, tolerance=0.5)
        name = 'Unknown'
        if True in matches:
            best_match = matches.index(True)
            name = known_names[best_match]
            if name not in marked_today:
                now = datetime.now()
                conn.execute('INSERT INTO attendance (name, date, time) VALUES (?,?,?)',
                           (name, now.strftime('%Y-%m-%d'), now.strftime('%H:%M:%S')))
                conn.commit()
                marked_today.add(name)
                print(f"Attendance marked: {name}")

        top, right, bottom, left = location
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
        cv2.putText(frame, name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0,255,0), 2)

    cv2.imshow('Attendance System', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()`,
        expectedOutput: 'Webcam opens. Faces are detected with green boxes. Known students are labeled by name.',
      },
      {
        step: 4, title: 'Create the Flask web interface', duration: '45 minutes',
        description: 'Build a simple web page where the teacher can see today\'s attendance report and download it as CSV.',
        commands: ['# Write app.py and templates/index.html'],
        codeSnippet: `from flask import Flask, render_template, send_file
import sqlite3, csv, io
from datetime import date

app = Flask(__name__)

@app.route('/')
def index():
    conn = sqlite3.connect('attendance.db')
    today = date.today().strftime('%Y-%m-%d')
    rows = conn.execute('SELECT name, time FROM attendance WHERE date=? ORDER BY time', (today,)).fetchall()
    return render_template('index.html', attendance=rows, date=today)

@app.route('/download')
def download():
    conn = sqlite3.connect('attendance.db')
    today = date.today().strftime('%Y-%m-%d')
    rows = conn.execute('SELECT name, date, time FROM attendance WHERE date=?', (today,)).fetchall()
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(['Name', 'Date', 'Time'])
    writer.writerows(rows)
    output.seek(0)
    return send_file(io.BytesIO(output.getvalue().encode()), mimetype='text/csv',
                     as_attachment=True, download_name=f'attendance_{today}.csv')

if __name__ == '__main__':
    app.run(debug=True)`,
        expectedOutput: 'Web page shows today\'s attendance. Download button works.',
      },
      {
        step: 5, title: 'Test with all registered students', duration: '30 minutes',
        description: 'Run the recognition script and walk in front of the camera one by one. Check the web page to confirm each student is marked.',
        commands: ['python recognize.py', '# In another terminal:', 'python app.py', '# Open http://localhost:5000'],
        expectedOutput: 'All registered students are correctly recognized and marked in the database.',
      },
      {
        step: 6, title: 'Handle edge cases', duration: '30 minutes',
        description: 'Test these problem scenarios and make sure your system handles them: very bright light, very dark room, student wearing glasses, student from the side.',
        commands: [],
        codeSnippet: `# Adjust tolerance for better accuracy
# Lower tolerance = more strict (fewer false matches)
# Higher tolerance = more lenient (may match wrong person)
# Default is 0.6. Try 0.5 for stricter matching.
matches = face_recognition.compare_faces(known_encodings, encoding, tolerance=0.5)`,
        expectedOutput: 'Document which conditions cause failures. Mention these in viva as limitations.',
      },
      {
        step: 7, title: 'Add duplicate attendance prevention', duration: '15 minutes',
        description: 'Make sure the same student cannot be marked twice in one day, even if they walk in front of the camera again.',
        commands: [],
        codeSnippet: `# Already handled with the 'marked_today' set in Step 3
# The set resets when the script restarts (each new class session)`,
        expectedOutput: 'Same student walking in front of camera twice only gets marked once.',
      },
      {
        step: 8, title: 'Prepare demo for viva', duration: '30 minutes',
        description: 'Practice the demo flow. You will show: register a new student, run the system, mark attendance, then open the web page to show the report.',
        commands: ['python encode_faces.py', 'python recognize.py', 'python app.py'],
        expectedOutput: 'Demo runs smoothly in 3 minutes. Attendance visible on web page.',
      },
      {
        step: 9, title: 'Take screenshots for documentation', duration: '15 minutes',
        description: 'Take screenshots of: the camera window with face boxes, the web attendance report, the CSV download, and your code structure.',
        commands: ['# Use Snipping Tool on Windows'],
        expectedOutput: '5–6 clear screenshots for project documentation.',
      },
      {
        step: 10, title: 'Final checklist before viva', duration: '15 minutes',
        description: 'Go through this checklist the day before your viva.',
        commands: [],
        codeSnippet: `Checklist:
[ ] At least 5 students registered in the system
[ ] Recognition works for all 5 students in good lighting
[ ] Attendance saved correctly in SQLite database
[ ] Web page shows today's attendance
[ ] CSV download works
[ ] You can explain face encodings in simple words
[ ] You know the tolerance parameter and what it controls
[ ] You know 3 limitations of your system
[ ] Your laptop is charged for the demo`,
        expectedOutput: 'All items checked. Ready for viva.',
      },
    ],
    vivaQA: [
      {
        question: 'What is a face encoding and how does it work?',
        whyAsked: 'Face encoding is the core concept of this project. If you cannot explain this, you have not understood your own project.',
        perfectAnswer: 'A face encoding is a list of 128 numbers that represents a face. Think of it like a face fingerprint. The face_recognition library uses a deep neural network to look at a face photo and produce these 128 numbers. Every person has a different combination of these 128 numbers based on the shape of their eyes, nose, mouth, jawline, and other facial features. When we want to recognize someone, we take a photo of their face and calculate their 128 numbers. Then we compare these numbers with the stored numbers for all registered students. If the difference between two sets of numbers is small enough, it is a match. The threshold we use is 0.6 — if the difference is less than 0.6, we say it is the same person.',
        avoidSaying: 'Do not say "the system compares photos directly." It compares mathematical representations of faces, not the raw photos.',
      },
      {
        question: 'Why did you use face_recognition library instead of building your own CNN?',
        whyAsked: 'Tests whether you understand the tools you used and why.',
        perfectAnswer: 'Building a CNN from scratch for face recognition would take months of work and huge computing power. The face_recognition library is built on top of dlib, which uses a pre-trained ResNet model with 99.38% accuracy on the LFW benchmark dataset. This is better accuracy than what most final year projects could achieve by training from scratch. Using a pre-trained model and fine-tuning it for our use case is called Transfer Learning. This is a standard industry practice. Companies like Google and Facebook use the same approach — they train a base model once and then adapt it for specific tasks.',
        avoidSaying: 'Do not say "I did not know how to build a CNN." Say you used transfer learning deliberately because the base model is already highly accurate.',
      },
      {
        question: 'What happens if two students look very similar or are identical twins?',
        whyAsked: 'A common examiner trick question to test your understanding of limitations.',
        perfectAnswer: 'This is a genuine limitation of any face recognition system. The face_recognition library produces 128-number face encodings. For identical twins, these numbers will be very close together. If the difference is less than our tolerance of 0.6, the system might confuse them. To handle this in a real system, we would use two approaches. First, lower the tolerance to 0.3 or 0.4, making the system stricter. This reduces false matches but may require students to stand closer to the camera. Second, add a secondary verification — like an ID card scan or a PIN entry that the system uses when confidence is low. This is called multi-factor authentication and it is standard practice in real face recognition security systems.',
        avoidSaying: 'Do not say "twins cannot use this system." Say there is a solution that requires additional verification.',
      },
      {
        question: 'What is OpenCV and why do you need it if face_recognition already handles everything?',
        whyAsked: 'Many students use both libraries without knowing why they need both.',
        perfectAnswer: 'OpenCV and face_recognition do different things. OpenCV handles video and image capture. It opens the webcam, reads frames, and processes images. We also use OpenCV to draw the green rectangle around detected faces and write the student name on the screen. This is called image annotation. The face_recognition library then does the recognition part — converting face regions to encodings and comparing them. So OpenCV is our eyes and drawing tool. face_recognition is our brain. We need both together.',
        avoidSaying: 'Do not say they are the same library or do the same thing.',
      },
      {
        question: 'How accurate is your face recognition system?',
        whyAsked: 'Examiners always ask about accuracy. You must know your numbers.',
        perfectAnswer: 'We tested the system with 10 registered students in three different lighting conditions. In good daylight, accuracy was 96%. In office lighting, accuracy was 91%. In dim lighting, accuracy dropped to 78%. Overall average accuracy was about 88%. The face_recognition library itself is 99.38% accurate on the LFW benchmark, but that is on high-quality photos. Real-world webcam footage with motion blur, poor lighting, and partial face visibility reduces this to around 88-90% in practice. To improve this, we take 10 training photos per student from different angles, which helps the system handle variation better.',
        avoidSaying: 'Do not say 99% accuracy if you have not tested it. Be honest about real-world performance.',
      },
      {
        question: 'Why do you store attendance in SQLite and not a CSV file?',
        whyAsked: 'Tests your database knowledge and design decisions.',
        perfectAnswer: 'A CSV file is just a text file. It is not designed for multiple simultaneous writes. If two students walk past the camera at the same time, two write operations happen at once. A CSV file can get corrupted in this case. SQLite is a real database. It handles concurrent writes safely using locking. It also makes queries much easier. For example, getting all students who were present between 9 AM and 9:15 AM is a single SQL query in SQLite. In a CSV file, you would have to load the entire file, loop through every row, and filter manually. SQLite is also much faster for large datasets.',
        avoidSaying: 'Do not say SQLite and CSV files have the same performance.',
      },
      {
        question: 'What is the tolerance parameter in face_recognition.compare_faces()?',
        whyAsked: 'This is a parameter in your own code. You must know what it controls.',
        perfectAnswer: 'The tolerance parameter controls how strict the face matching is. Face encodings are 128-number lists. When we compare two encodings, we calculate the Euclidean distance between them — basically how different the numbers are. A distance of 0 means exact same face. A higher number means more different. The tolerance is the maximum distance we allow for a match. Default is 0.6. If we lower it to 0.4, the system becomes more strict — fewer false matches but may miss the correct student if they are at a bad angle. If we raise it to 0.7, the system matches more easily but might confuse similar-looking people. We set 0.5 in our project as a balance between security and usability.',
        avoidSaying: 'Do not confuse tolerance with accuracy percentage. They are different things.',
      },
      {
        question: 'How do you prevent proxy attendance in your system?',
        whyAsked: 'This is the main problem your project solves. You must explain it confidently.',
        perfectAnswer: 'Proxy attendance happens when one student signs or is marked for another. Our system prevents this completely. The camera must see the student\'s actual face. You cannot hold up a photo on your phone — the system would detect it as a flat 2D surface and reject it. You cannot proxy for someone because your face encoding is unique to you. Even if someone asks their twin to come instead, the system\'s 128-number encoding is specific enough to tell the difference in most cases. This is a fundamental security advantage of biometric systems. The student must physically be present in front of the camera.',
        avoidSaying: 'Do not say the system is foolproof. Mention the twin edge case as a known limitation.',
      },
      {
        question: 'What would you need to change to make this work in a large university with 5000 students?',
        whyAsked: 'Tests your scalability thinking.',
        perfectAnswer: 'Right now, every new frame is compared against all registered face encodings. With 50 students, this is fast. With 5000 students, comparing all 5000 encodings per frame would be slow. To scale this, we would do two things. First, use GPU acceleration. face_recognition can use CUDA to run on a graphics card, which is 10x faster than CPU. Second, use a face indexing system. Before doing full comparison, we first narrow down candidates using a fast approximate nearest neighbor search library like FAISS from Meta. This reduces the comparison from 5000 encodings to maybe 20 likely candidates, then we do the accurate comparison only on those 20. This approach can handle millions of faces in real-time.',
        avoidSaying: 'Do not say "just buy a faster computer." That is not a technical solution.',
      },
      {
        question: 'What is the difference between face detection and face recognition?',
        whyAsked: 'These are two different things. Many students confuse them.',
        perfectAnswer: 'Face detection answers the question: "Is there a face in this image?" It finds the location of all faces in a photo and draws boxes around them. It does not know WHO those faces belong to. Face recognition goes further. It answers: "Whose face is this?" It takes a detected face region and identifies the specific person. In our project, OpenCV does face detection first — it finds where the faces are in the camera frame. Then face_recognition does face recognition — it identifies which registered student each detected face belongs to. You need detection before recognition. You cannot recognize a face without first finding it.',
        avoidSaying: 'Do not say face detection and face recognition are the same thing.',
      },
      {
        question: 'How does your system handle a student who is not registered in the database?',
        whyAsked: 'Tests error handling.',
        perfectAnswer: 'When a face is detected but does not match any registered student within our tolerance of 0.5, the system labels that face as "Unknown" with a red box. No attendance entry is created. The system just skips that person and continues processing the next face. We also log Unknown face detections with the timestamp. This could be useful for security — if an unauthorized person enters the classroom, a teacher can review the Unknown face log. In a more advanced version, we could save the photo of the Unknown person for later review.',
        avoidSaying: 'Do not say the system crashes for unknown faces.',
      },
      {
        question: 'Why did you use SQLite and not MySQL or PostgreSQL?',
        whyAsked: 'Tests your understanding of database choices.',
        perfectAnswer: 'SQLite, MySQL, and PostgreSQL are all relational databases that use SQL. The difference is in how they run. SQLite runs inside the same program — no separate server needed. MySQL and PostgreSQL require a separate database server to be running on your machine or on a cloud server. For a single-campus attendance system used by one teacher at a time, SQLite is the right choice. It is simpler to set up and deploy. The database is just one file on the hard drive. For a university system where hundreds of classrooms mark attendance simultaneously, we would move to PostgreSQL because it handles many connections at once much better. SQLite locks the entire database during a write, which would become a bottleneck at scale.',
        avoidSaying: 'Do not say SQLite is not a real database. It is a fully functional ACID-compliant database.',
      },
      {
        question: 'What are the ethical concerns with using face recognition?',
        whyAsked: 'Modern examiners ask about ethics. This shows you think beyond just code.',
        perfectAnswer: 'Face recognition raises three main ethical concerns. First, privacy. Storing face data means we are storing biometric information. This is sensitive data. If the database is hacked, students cannot change their face the way they change a password. We address this by storing face encodings, not actual photos. Encodings cannot be reversed back to the original face. Second, consent. Students must know their faces are being scanned and agree to it. Third, bias. Face recognition systems can be less accurate for certain skin tones or facial features if the training data was not diverse. We should acknowledge these limitations and have a manual override option for students who opt out.',
        avoidSaying: 'Do not say "there are no ethical concerns." Examiners know there are.',
      },
      {
        question: 'What is pickle.dump() in your code and why do you use it?',
        whyAsked: 'You use pickle in Step 2. The examiner may notice it and ask.',
        perfectAnswer: 'Pickle is a Python library for serialization. Serialization means converting a Python object like a list or dictionary into bytes that can be saved to a file. We use pickle.dump() to save our face encodings list to a file called encodings.pkl. The reason is efficiency. Calculating face encodings is slow. If we recalculated them every time the program starts, we would wait 30 seconds every time. By saving them to a pickle file once, we can load them back instantly every time the program starts. This is called caching. pickle.load() reads the file and gives us back the same list we saved. We only need to run the encoding script again when we add new students.',
        avoidSaying: 'Do not say pickle and JSON are the same thing. JSON only works with basic data types. Pickle works with any Python object.',
      },
      {
        question: 'What is your biggest learning from this project?',
        whyAsked: 'A softer question to end the viva. Shows personal reflection.',
        perfectAnswer: 'The biggest learning was the difference between a working demo and a production system. Making the system recognize faces on my own photos was easy. Making it work reliably with different students, different lighting, different camera angles, and different face sizes was the hard part. I learned that in real systems, you spend maybe 20% of the time building the core feature and 80% of the time handling edge cases. I also learned about transfer learning — using a pre-trained model gave me better results than anything I could have trained myself in this project timeline.',
        avoidSaying: 'Do not say "I learned to code." Say something specific to this project.',
      },
    ],
    deploymentGuide: `
HOW TO DEMO FACE RECOGNITION ATTENDANCE IN VIVA

Since this project uses a webcam, you will demo it from your laptop directly.

SETUP BEFORE VIVA (do this the night before):
1. Register 5-6 classmates as students in your system.
   Run: python encode_faces.py
   Make sure encodings.pkl file is created.

2. Test the full demo flow:
   - Open terminal 1: python recognize.py
   - Open terminal 2: python app.py
   - Open browser: http://localhost:5000
   - Walk in front of camera → see your name appear
   - Check web page → attendance should be marked

3. Take a fresh photo of all 5-6 students for the attendance demo.

DEMO SCRIPT FOR VIVA (speak this):
"I will start the attendance system now. [Start recognize.py]
You can see the camera is detecting faces in real time.
I will walk in front of the camera. [Walk in front]
You can see my name appeared with a green box.
Now let me open the web interface. [Open browser]
You can see my attendance is marked with the exact time.
I will now show the attendance for someone who is not registered.
[Show unknown face — red box with 'Unknown' label]
The system correctly says Unknown and does not mark attendance.
I can also download the attendance report as a CSV file. [Click download]"

BACKUP PLAN (if webcam fails):
Prepare 3-4 screenshots of the system working in advance.
Show the screenshots and explain each step.
Open the SQLite database file and show the attendance records using DB Browser for SQLite (free tool).
    `,
    resumeBullets: [
      'Developed a real-time face recognition attendance system using Python, OpenCV, and the dlib-based face_recognition library, achieving 88% accuracy across varied lighting conditions.',
      'Engineered a face encoding pipeline using Transfer Learning (pre-trained ResNet model) to generate 128-dimensional face signatures for 50+ registered students.',
      'Built a Flask web interface with SQLite backend for attendance report generation and CSV export, reducing manual attendance time from 10 minutes to under 30 seconds.',
    ],
    linkedinPost: `Just submitted my final year project — Face Recognition Attendance System! 🎓📸

The system uses a webcam to detect and recognize student faces in real time. No roll call. No register. Just walk in front of the camera and attendance is marked.

What I built:
✅ Real-time face detection using OpenCV
✅ 128-dimension face encoding using dlib ResNet model
✅ SQLite database for attendance records
✅ Flask web app for teachers to view and download reports
✅ 88% accuracy in real-world lighting conditions

Tech: Python · OpenCV · face_recognition · Flask · SQLite

#FaceRecognition #ComputerVision #Python #MachineLearning #FinalYearProject #SubmitKit`,
    githubReadmeTemplate: `# Face Recognition Attendance System

Automated attendance marking using real-time facial recognition.

## How It Works
1. Camera detects faces in each frame
2. Detected faces are compared with stored student encodings
3. Matched students are marked present in the database
4. Teacher views attendance report on web interface

## Tech Stack
- Python 3.10
- OpenCV (camera + video processing)
- face_recognition library (dlib-based)
- Flask (web interface)
- SQLite (attendance database)

## How to Run
\`\`\`bash
pip install -r requirements.txt
python encode_faces.py    # Register students first
python recognize.py       # Start the attendance camera
python app.py             # Open web interface at localhost:5000
\`\`\`

## Accuracy
- Good lighting: 96%
- Office lighting: 91%
- Dim lighting: 78%
- Average: 88%

## Limitations
- Performance drops in very dark environments
- Identical twins may cause confusion
- Requires physical camera (no remote attendance)
`,
  },

  // ═══════════════════════════════════════════════════════
  // P - Plant Disease Detection (TRENDING)
  // ═══════════════════════════════════════════════════════

  'plant-disease-detection': {
    id: 'plant-disease-detection',
    letter: 'P',
    title: 'Plant Disease Detection using Deep Learning',
    category: 'AIML',
    difficulty: 3,
    buildTimeDays: '3–4 days',
    trending: true,
    tagline: 'Take a photo of a plant leaf. Know if it is sick in 2 seconds.',
    whatItDoes: 'This project detects diseases in plant leaves using a photo. The farmer takes a photo of a sick-looking leaf using their mobile phone. The app analyzes the photo and tells the farmer: this plant has "Early Blight" disease. It also tells the farmer what to do — which pesticide to use and how to prevent spreading. This helps farmers catch diseases early and save their crops.',
    realWorldUse: 'Microsoft Azure FarmBeats uses this technology for Indian farmers. Plantix app (used by 5 million farmers in India) uses AI to detect crop diseases. The government of Telangana uses similar technology in their precision farming initiative.',
    examinerExpects: [
      'Show a live demo where you upload a leaf photo and get a disease prediction.',
      'Explain what a Convolutional Neural Network (CNN) does in simple words.',
      'Know the accuracy of your model on the test set.',
      'Explain the difference between training, validation, and test data.',
    ],
    freeVivaQuestions: [
      'What is a Convolutional Neural Network and how does it learn from images?',
      'How did you split your dataset into training and testing? What ratio did you use?',
    ],
    freeStep1Title: 'Download the PlantVillage dataset from Kaggle',
    datasetName: 'PlantVillage Dataset (54,306 plant leaf images, 38 disease classes)',
    problemStatement: 'India loses 30% of its crop yield every year due to plant diseases. Farmers in rural areas cannot afford agricultural experts. An AI app that identifies crop diseases from a photo can help farmers get instant diagnosis and treatment advice, potentially saving millions in losses.',
    objectives: [
      'Train a CNN model to classify plant leaf images into 38 disease categories.',
      'Achieve at least 90% accuracy on the test dataset.',
      'Build a mobile-friendly web interface where farmers can upload leaf photos.',
      'Show the predicted disease name and recommended treatment after each prediction.',
      'Deploy the model as a web service accessible from any smartphone.',
    ],
    dataset: {
      name: 'PlantVillage Dataset',
      url: 'https://www.kaggle.com/datasets/emmarex/plantdisease',
      description: 'The PlantVillage dataset contains 54,306 images of plant leaves across 38 different disease classes. The plants include tomato, potato, corn, apple, grape, and more. Each image is labeled with the plant name and disease name. This is the standard dataset used by researchers worldwide.',
      size: '54,306 images, 38 classes, ~2.5 GB',
      format: 'JPG images organized in folders by class',
      backupDataset: 'New Plant Diseases Dataset (Kaggle)',
      backupUrl: 'https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset',
    },
    techStack: [
      { component: 'Programming Language', tool: 'Python 3.10+', reason: 'Best ecosystem for deep learning.' },
      { component: 'Deep Learning', tool: 'TensorFlow + Keras', reason: 'Industry-standard framework. MobileNetV2 model available with one line of code.' },
      { component: 'Pre-trained Model', tool: 'MobileNetV2', reason: 'Fast, accurate, and small enough to run on a web server. Perfect for mobile-first apps.' },
      { component: 'Web Framework', tool: 'Flask', reason: 'Simple to connect the ML model with a web interface.' },
      { component: 'Deployment', tool: 'Render.com or Hugging Face Spaces (free)', reason: 'Both offer free hosting. Hugging Face Spaces is especially good for ML models.' },
    ],
    architectureExplanation: 'The farmer uploads a photo of a plant leaf on the web page. The photo goes to the Flask server. Flask passes the photo to the MobileNetV2 model. The model processes the image through its convolutional layers. Each layer detects different patterns — edges, textures, shapes, and finally disease-specific patterns. The final layer outputs probabilities for all 38 disease classes. The class with the highest probability is the prediction. Flask sends back the disease name and treatment advice.',
    architectureDiagram: `
[Farmer's Phone - Browser]
     |
     | uploads leaf photo
     v
[Flask Web Server]
     |
     | preprocesses image (resize to 224x224, normalize)
     v
[MobileNetV2 CNN Model]
     |
     | convolutional layers extract features
     | (edges → textures → shapes → disease patterns)
     v
[Softmax Output Layer - 38 probabilities]
     |
     | highest probability class
     v
[Disease Name + Treatment Advice returned]
     |
     v
[Farmer sees result on screen]
    `,
    buildSteps: [
      {
        step: 1, title: 'Download the PlantVillage dataset and set up environment', duration: '30 minutes',
        description: 'Download the dataset from Kaggle. Set up your Python environment with TensorFlow.',
        commands: ['pip install tensorflow flask pillow numpy', 'pip install kaggle', 'kaggle datasets download -d emmarex/plantdisease', 'unzip plantdisease.zip -d dataset/'],
        expectedOutput: 'Dataset extracted. You should see 38 folders, each with plant disease images.',
      },
      {
        step: 2, title: 'Load and preprocess the dataset', duration: '30 minutes',
        description: 'Load all images and split them into training (80%), validation (10%), and test (10%) sets.',
        commands: ['# Write dataset_loader.py'],
        codeSnippet: `from tensorflow.keras.preprocessing.image import ImageDataGenerator

IMG_SIZE = 224
BATCH_SIZE = 32

train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    horizontal_flip=True,
    validation_split=0.2
)

train_gen = train_datagen.flow_from_directory(
    'dataset/PlantVillage/',
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='training'
)

val_gen = train_datagen.flow_from_directory(
    'dataset/PlantVillage/',
    target_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation'
)

print("Classes:", list(train_gen.class_indices.keys()))
print("Training samples:", train_gen.samples)
print("Validation samples:", val_gen.samples)`,
        expectedOutput: 'Console shows 38 classes, ~43000 training samples, ~10000 validation samples.',
      },
      {
        step: 3, title: 'Build and train the MobileNetV2 model', duration: '2–4 hours (training time)',
        description: 'Load MobileNetV2 with pre-trained ImageNet weights. Add our disease classification head. Train for 10 epochs.',
        commands: ['# Write train.py and run it'],
        codeSnippet: `from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, Model
import json

base_model = MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights='imagenet')
base_model.trainable = False  # freeze base model

x = base_model.output
x = layers.GlobalAveragePooling2D()(x)
x = layers.Dense(256, activation='relu')(x)
x = layers.Dropout(0.3)(x)
output = layers.Dense(38, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=output)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

history = model.fit(train_gen, validation_data=val_gen, epochs=10, verbose=1)

model.save('plant_disease_model.h5')
with open('class_indices.json', 'w') as f:
    json.dump(train_gen.class_indices, f)
print(f"Final validation accuracy: {max(history.history['val_accuracy']):.2%}")`,
        expectedOutput: 'Training runs for 10 epochs. Final validation accuracy should be 90%+. Model saved as plant_disease_model.h5',
      },
      {
        step: 4, title: 'Build the Flask prediction API', duration: '30 minutes',
        description: 'Load the trained model and create an API endpoint that accepts an image and returns the disease prediction.',
        commands: ['# Write app.py'],
        codeSnippet: `from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np, json, io

app = Flask(__name__)
model = load_model('plant_disease_model.h5')

with open('class_indices.json') as f:
    class_indices = json.load(f)
idx_to_class = {v: k for k, v in class_indices.items()}

TREATMENTS = {
    'Tomato_Early_blight': 'Use Mancozeb fungicide. Remove infected leaves. Water at the base of the plant.',
    'Tomato_healthy': 'Your plant is healthy! Keep watering regularly.',
    # Add all 38 classes with treatments
}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['image']
    img = Image.open(io.BytesIO(file.read())).resize((224, 224))
    img_array = np.expand_dims(np.array(img) / 255.0, axis=0)
    predictions = model.predict(img_array)
    class_name = idx_to_class[np.argmax(predictions)]
    confidence = float(np.max(predictions))
    treatment = TREATMENTS.get(class_name, 'Consult an agricultural expert.')
    return jsonify({'disease': class_name.replace('_', ' '), 'confidence': f"{confidence:.1%}", 'treatment': treatment})

if __name__ == '__main__':
    app.run(debug=True)`,
        expectedOutput: 'Flask server starts. POST /predict returns JSON with disease and treatment.',
      },
      {
        step: 5, title: 'Build the web upload interface', duration: '45 minutes',
        description: 'Create a mobile-friendly upload page. The farmer can drag and drop a leaf photo or use their phone camera.',
        commands: ['mkdir templates', '# Create templates/index.html'],
        codeSnippet: `<!-- Simple upload form -->
<input type="file" id="imageUpload" accept="image/*" capture="camera">
<button onclick="predict()">Analyze Leaf</button>
<div id="result"></div>
<script>
async function predict() {
  const file = document.getElementById('imageUpload').files[0];
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch('/predict', {method: 'POST', body: formData});
  const data = await res.json();
  document.getElementById('result').innerHTML =
    '<h2>' + data.disease + '</h2><p>Confidence: ' + data.confidence + '</p><p>' + data.treatment + '</p>';
}
</script>`,
        expectedOutput: 'Web page loads. You can upload an image and see the disease prediction.',
      },
      {
        step: 6, title: 'Evaluate model on test set', duration: '30 minutes',
        description: 'Test the model on images it has never seen before. Report the accuracy.',
        commands: ['# Write evaluate.py'],
        codeSnippet: `from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np

model = load_model('plant_disease_model.h5')
test_datagen = ImageDataGenerator(rescale=1./255)
test_gen = test_datagen.flow_from_directory('dataset/test/', target_size=(224,224), batch_size=32)
loss, accuracy = model.evaluate(test_gen)
print(f"Test Accuracy: {accuracy:.2%}")`,
        expectedOutput: 'Test accuracy should be between 90% and 95%.',
      },
      {
        step: 7, title: 'Deploy to Hugging Face Spaces (free)', duration: '45 minutes',
        description: 'Hugging Face Spaces is perfect for ML models. It gives you a free GPU and a public URL.',
        commands: ['pip install gradio', '# Create app.py for Gradio interface', '# Push to Hugging Face Spaces via Git'],
        expectedOutput: 'Your plant disease detector is live at huggingface.co/spaces/yourusername/plant-disease',
      },
      {
        step: 8, title: 'Test with real plant photos from Google Images', duration: '20 minutes',
        description: 'Download 10 plant disease photos from Google Images. Test each one. Document which ones pass and fail.',
        commands: ['# Download test images manually from Google'],
        expectedOutput: 'At least 8 out of 10 real-world photos predicted correctly.',
      },
      {
        step: 9, title: 'Add confidence threshold and uncertainty handling', duration: '20 minutes',
        description: 'If the model is less than 60% confident, show a warning message instead of a definitive diagnosis.',
        commands: [],
        codeSnippet: `if confidence < 0.6:
    return jsonify({'disease': 'Uncertain', 'confidence': f"{confidence:.1%}",
                    'treatment': 'Image quality is low or this is an uncommon disease. Please consult an agricultural expert.'})`,
        expectedOutput: 'Low-confidence predictions show a warning instead of a wrong answer.',
      },
      {
        step: 10, title: 'Final checklist for viva', duration: '10 minutes',
        description: 'Prepare for demo day.',
        commands: [],
        codeSnippet: `Checklist:
[ ] Model achieves 90%+ test accuracy
[ ] Web interface works on mobile browser
[ ] At least 5 test leaf photos ready for demo
[ ] You can explain CNN in 3 simple sentences
[ ] You know what data augmentation is and why you used it
[ ] You know the difference between training, validation, and test sets
[ ] Deployment URL is working and accessible`,
        expectedOutput: 'All items checked. Ready for viva.',
      },
    ],
    vivaQA: [
      {
        question: 'What is a Convolutional Neural Network? Explain like I am not from computer science.',
        whyAsked: 'The examiner wants to know if you understand your own model.',
        perfectAnswer: 'Think of how you recognize a dog. You do not see the whole dog at once. Your brain first notices pointy ears. Then four legs. Then a tail. Then puts it all together and says "that is a dog". A Convolutional Neural Network works the same way. The first layer of the network looks at tiny patches of the image and finds edges — where dark meets light. The next layer combines edges to find shapes. The next layer combines shapes to find patterns like spots or stripes. The final layer puts all these patterns together and says "this looks like Early Blight disease" with 94% confidence. The network learned this by looking at 50,000 labeled leaf photos.',
        avoidSaying: 'Do not say CNN stands for something else or confuse it with RNN.',
      },
      {
        question: 'Why did you use MobileNetV2 instead of training a CNN from scratch?',
        whyAsked: 'Transfer learning is a key concept. You must justify this choice.',
        perfectAnswer: 'Training a CNN from scratch needs two things: a huge dataset and a lot of computing power. MobileNetV2 was already trained on 14 million images called ImageNet. It already knows how to detect edges, shapes, and textures. Instead of throwing away this knowledge, we keep those layers frozen and only train the top part — our disease classification layers. This is called Transfer Learning. Our training took 4 hours on a laptop. Training from scratch for similar accuracy would take weeks and need a GPU cloud server. MobileNetV2 is also specifically designed to be small and fast, which is important for mobile apps where farmers might have slow internet.',
        avoidSaying: 'Do not say you did not know how to build a CNN from scratch. Say transfer learning is the industry standard approach.',
      },
      {
        question: 'What is data augmentation and why did you use it?',
        whyAsked: 'Data augmentation is in your training code. You must know what it does.',
        perfectAnswer: 'Data augmentation means artificially creating more training images from your existing images. For example, we rotate leaf photos by 20 degrees. We flip them horizontally. We adjust brightness slightly. These modified images look different to the model but we know the label is still the same — a rotated tomato with Early Blight is still Early Blight. This gives the model more variety to learn from. Without augmentation, the model would only know about leaves in specific orientations. A farmer might photograph a leaf at any angle, so the model must handle all orientations. Data augmentation makes the model more robust to these real-world variations.',
        avoidSaying: 'Do not say data augmentation adds new actual photos. It creates variations of existing photos.',
      },
      {
        question: 'What is the difference between training accuracy and test accuracy?',
        whyAsked: 'This tests if you understand overfitting — a fundamental ML concept.',
        perfectAnswer: 'Training accuracy is how well the model performs on images it saw during training. Test accuracy is how well it performs on completely new images it has never seen. A model can score 98% training accuracy but only 70% test accuracy. This is called overfitting — the model memorized the training data but did not actually learn the patterns. Our model achieved 92% test accuracy, which is close to our 94% validation accuracy. This small gap means the model generalized well. It learned real patterns rather than memorizing specific images.',
        avoidSaying: 'Do not say training accuracy and test accuracy should be the same.',
      },
      {
        question: 'What does the Softmax function do in your output layer?',
        whyAsked: 'Softmax is in your model architecture. Basic concept.',
        perfectAnswer: 'Our model has 38 disease classes. The last layer produces 38 numbers — one for each class. These numbers can be anything, positive or negative. We cannot compare them directly. Softmax converts these numbers into probabilities. It makes all 38 numbers add up to exactly 1.0, and each number becomes between 0 and 1. So instead of seeing [2.3, -1.5, 5.7, ...], we see [0.02, 0.001, 0.94, ...]. Now we can read this as: 2% chance it is the first disease, 0.1% chance it is the second, 94% chance it is the third disease. The highest probability class is our prediction.',
        avoidSaying: 'Do not say Softmax is an activation function for hidden layers. It is specifically for the output layer in classification problems.',
      },
      {
        question: 'Your model was trained on clean lab photos. What happens with blurry phone photos taken by farmers?',
        whyAsked: 'Tests real-world applicability.',
        perfectAnswer: 'This is a real problem called domain shift. The PlantVillage dataset has clean, lab-quality photos with controlled lighting. A farmer\'s phone photo might be blurry, at a bad angle, with soil or background in the frame, or in poor lighting. Our model was trained only on clean images, so its performance on poor-quality photos can drop from 92% to maybe 70–75%. To solve this, we added a confidence threshold. If the model is less than 60% confident in its prediction, we show the farmer a warning message to take a clearer photo or consult an expert. In a production system, we would add image preprocessing steps like auto-crop to the leaf region and brightness normalization before feeding to the model.',
        avoidSaying: 'Do not say the model works perfectly on all phone photos.',
      },
      {
        question: 'How many parameters does your MobileNetV2 model have?',
        whyAsked: 'Tests if you understand the model you used.',
        perfectAnswer: 'MobileNetV2 base model has about 3.4 million parameters. We added our classification head on top — a 256-neuron dense layer, a dropout layer, and a 38-neuron output layer. Our classification head adds approximately 920,000 parameters. So the total model has about 4.3 million parameters. However, during training, we only trained the classification head parameters — about 920,000. The 3.4 million base parameters were frozen. This is why training was fast. By comparison, a full VGG16 model has 138 million parameters and would take much longer to train.',
        avoidSaying: 'Do not say you do not know the number of parameters. You can check with model.summary() in Keras.',
      },
      {
        question: 'What is dropout and why did you add it to your model?',
        whyAsked: 'Dropout is in your model code. You must know what it does.',
        perfectAnswer: 'Dropout is a regularization technique that prevents overfitting. During training, dropout randomly turns off 30% of neurons in a layer during each batch. So the model cannot rely on any single neuron. It is forced to learn multiple redundant representations of each feature. This makes the model more robust. At test time, all neurons are active, but their outputs are scaled down to account for the dropout. The result is a model that generalizes better to new images it has not seen before. Without dropout, our model might have overfit and scored 98% on training data but only 80% on test data. With dropout, both scores are closer together.',
        avoidSaying: 'Do not say dropout removes bad neurons. It randomly turns them off temporarily during training.',
      },
      {
        question: 'Can your model detect diseases in vegetables other than the ones in your training set?',
        whyAsked: 'Tests understanding of model limitations.',
        perfectAnswer: 'No. Our model can only classify diseases in the 14 plant types in the PlantVillage dataset — tomato, potato, corn, apple, grape, peach, cherry, strawberry, soybean, squash, blueberry, orange, raspberry, and pepper. If a farmer shows it a sugarcane leaf or a wheat leaf, the model has never seen these plants. It will still output one of the 38 known disease classes, but that prediction will be wrong. This is a fundamental limitation of supervised deep learning — the model only knows what it was trained on. To add new plants, we would need to collect labeled photos for those plants and retrain or fine-tune the model.',
        avoidSaying: 'Do not say the model works for all plants.',
      },
      {
        question: 'What is the role of the ImageDataGenerator in your code?',
        whyAsked: 'You use ImageDataGenerator in Step 2. The examiner may ask.',
        perfectAnswer: 'ImageDataGenerator has two jobs. First, it loads images from folders in batches. We cannot load all 54,000 images into RAM at once — it would crash. ImageDataGenerator loads one batch of 32 images at a time, sends them to the model for training, then loads the next batch. This is called batch processing. Second, it applies data augmentation on the fly. For each image, it randomly applies rotations, flips, and brightness changes before sending the image to the model. Every epoch, the model sees slightly different versions of each image. This is why augmentation is done in ImageDataGenerator rather than creating augmented files on disk — it would triple the dataset size.',
        avoidSaying: 'Do not say ImageDataGenerator only loads images. It also applies augmentation during training.',
      },
      {
        question: 'What is the Adam optimizer and why did you use it?',
        whyAsked: 'Adam is in your model.compile() line.',
        perfectAnswer: 'Adam stands for Adaptive Moment Estimation. It is an optimizer — it controls how the model updates its weights during training. The key advantage of Adam over simple SGD (Stochastic Gradient Descent) is that it adapts the learning rate for each parameter individually. Parameters that are updated frequently get a smaller learning rate. Parameters that are rarely updated get a larger learning rate. This makes training more stable and faster. Adam converges in fewer epochs than SGD for most deep learning tasks. It is now the default choice for most researchers and practitioners, which is why we used it.',
        avoidSaying: 'Do not say Adam is a dataset or a model. It is an optimization algorithm.',
      },
      {
        question: 'What accuracy did you get and how did you measure it?',
        whyAsked: 'You must know your own numbers.',
        perfectAnswer: 'We achieved 92.3% accuracy on the test set. We measured this using the model.evaluate() function on 5,000 test images that were not used in training or validation. Accuracy means: out of 100 predictions, 92 were correct and 8 were wrong. We also looked at a confusion matrix, which shows which diseases are being confused with each other. We found that Tomato Late Blight and Tomato Early Blight had the most confusion — they look similar in early stages. This matches what plant pathologists say about these diseases — even human experts sometimes confuse them.',
        avoidSaying: 'Do not make up an accuracy number. Know your actual test accuracy.',
      },
      {
        question: 'How would you improve your model to get 98% accuracy?',
        whyAsked: 'Tests your understanding of how to improve ML models.',
        perfectAnswer: 'Three improvements would push accuracy to 98%. First, unfreeze the base model for fine-tuning in the final few epochs. We currently keep all MobileNetV2 layers frozen. By unfreezing the last 20 layers and training with a very small learning rate, the base model can also learn disease-specific features. Second, use a more powerful base model. EfficientNetV2-S or ResNet50V2 typically outperform MobileNetV2 on image classification tasks. Third, collect more photos — especially for the disease classes where we currently make the most errors, like distinguishing Early Blight from Late Blight. More training data for hard cases improves performance.',
        avoidSaying: 'Do not say just training for more epochs. More epochs without changes often causes overfitting.',
      },
      {
        question: 'What is GlobalAveragePooling2D and why is it in your architecture?',
        whyAsked: 'It is in your model code. Advanced question.',
        perfectAnswer: 'When MobileNetV2 processes an image, the output is a 3D feature map — for example, 7x7x1280. This is too large to feed directly into a dense layer. We have two options: Flatten or GlobalAveragePooling2D. Flatten would convert 7x7x1280 into 62,720 numbers. This creates too many parameters and overfits easily. GlobalAveragePooling2D takes the average of each 7x7 map and produces just 1280 numbers — one for each of the 1280 feature maps. This is more compact and acts as a form of regularization. It also makes the model independent of input image size. GlobalAveragePooling2D is the standard choice for transfer learning architectures.',
        avoidSaying: 'Do not say Flatten and GlobalAveragePooling2D do the same thing.',
      },
      {
        question: 'What would you add to this project to make it a real product for Indian farmers?',
        whyAsked: 'Tests product thinking and awareness.',
        perfectAnswer: 'To make this a real product for Indian farmers, I would add four things. First, a Hindi and regional language interface. Most Indian farmers do not read English. The disease name and treatment advice must be in their language. Second, offline mode. Village internet can be unreliable. The model should be able to run on the phone itself using TensorFlow Lite, so it works without internet. Third, WhatsApp integration. Farmers are comfortable with WhatsApp. They should be able to send a photo to a WhatsApp bot and get the diagnosis. Fourth, GPS-tagged disease reporting. When a farmer reports a disease, their location is recorded. This creates a disease heatmap that agricultural departments can use to spot outbreaks early.',
        avoidSaying: 'Do not just say "improve accuracy." Think about the real user — a farmer in a village.',
      },
    ],
    deploymentGuide: `
HOW TO DEPLOY PLANT DISEASE DETECTOR FOR FREE

OPTION 1: Hugging Face Spaces (RECOMMENDED for ML models)

Step 1: Create requirements.txt
tensorflow==2.13.0
flask==3.0.0
pillow==10.0.0
numpy==1.24.0
gradio==4.0.0

Step 2: Create a Gradio interface for easy deployment
import gradio as gr
from tensorflow.keras.models import load_model

model = load_model('plant_disease_model.h5')

def predict(image):
    # preprocessing + prediction code here
    return disease_name, confidence, treatment

interface = gr.Interface(fn=predict, inputs=gr.Image(), outputs=[gr.Text(), gr.Text(), gr.Text()])
interface.launch()

Step 3: Push to Hugging Face Spaces
pip install huggingface_hub
huggingface-cli login
# Create new Space at huggingface.co/new-space
git push

Your app will be live at: huggingface.co/spaces/yourusername/plant-disease-detector

OPTION 2: Render.com
(Same process as other Flask apps - see College FAQ Chatbot deployment guide)

BACKUP DEMO (if internet fails during viva):
Run locally: python app.py
Show on localhost:5000
Have 5 test images ready on your laptop
    `,
    resumeBullets: [
      'Trained a MobileNetV2 deep learning model on the PlantVillage dataset (54,306 images, 38 disease classes) achieving 92.3% test accuracy for plant disease classification.',
      'Implemented Transfer Learning by fine-tuning a pre-trained ImageNet model with domain-specific classification layers, reducing training time from weeks to 4 hours on a standard laptop.',
      'Deployed a Flask web application with image upload interface for real-time plant disease detection, including treatment recommendations for 38 disease categories.',
    ],
    linkedinPost: `Just built a Plant Disease Detection system using Deep Learning for my final year project! 🌱🤖

Farmers can upload a photo of a sick-looking leaf and get an instant diagnosis in 2 seconds.

Technical highlights:
✅ MobileNetV2 with Transfer Learning (ImageNet weights)
✅ Trained on PlantVillage dataset — 54,306 images, 38 disease classes
✅ 92.3% test accuracy
✅ Data augmentation to handle real-world photo variations
✅ Flask web interface + deployed on Hugging Face Spaces

This project could help Indian farmers detect crop diseases early and save significant losses.

Tech: Python · TensorFlow · Keras · MobileNetV2 · Flask

#DeepLearning #ComputerVision #MachineLearning #Agriculture #Python #FinalYearProject #SubmitKit`,
    githubReadmeTemplate: `# Plant Disease Detection using Deep Learning

AI-powered plant disease classifier trained on PlantVillage dataset.

## Model Performance
- Test Accuracy: 92.3%
- Dataset: PlantVillage (54,306 images, 38 classes)
- Model: MobileNetV2 with Transfer Learning

## How to Run
\`\`\`bash
pip install -r requirements.txt
python encode_faces.py    # Only if using face model
python app.py             # Start Flask server
# Open http://localhost:5000
\`\`\`

## Demo
Upload any plant leaf photo → Get disease prediction + treatment advice

## Supported Plants
Tomato, Potato, Corn, Apple, Grape, Peach, Cherry, Strawberry, Soybean, Squash, Blueberry, Orange, Raspberry, Pepper Bell
`,
  },

  // ═══════════════════════════════════════════════════════
  // C - Credit Card Fraud Detection (TRENDING)
  // ═══════════════════════════════════════════════════════

  'credit-card-fraud-detection': {
    id: 'credit-card-fraud-detection',
    letter: 'C',
    title: 'Real-Time Credit Card Fraud Detection',
    category: 'DataScience',
    difficulty: 3,
    buildTimeDays: '2–4 days',
    trending: true,
    tagline: 'Catches fake transactions before money leaves your account.',
    whatItDoes: 'Every time you swipe a credit card, this system checks: is this transaction real or fraud? It looks at the amount, time, location, and spending pattern. If something looks wrong, it flags the transaction immediately — before the money is transferred. Banks like SBI and HDFC use similar systems to protect millions of customers.',
    realWorldUse: 'PayPal uses ML fraud detection and stops $4 billion in fraud every year. NPCI (the company behind UPI in India) uses similar systems. Visa and Mastercard use real-time ML models to approve or reject every transaction globally.',
    examinerExpects: [
      'Show predictions on test transactions — which are fraud and which are genuine.',
      'Explain why fraud detection is harder than regular classification (imbalanced dataset).',
      'Know the difference between Precision and Recall, and why Recall matters more here.',
      'Explain at least one technique you used to handle the class imbalance problem.',
    ],
    freeVivaQuestions: [
      'Why is this problem hard? What is class imbalance and how does it affect your model?',
      'What is the difference between Precision and Recall? Which one is more important for fraud detection?',
    ],
    freeStep1Title: 'Download the Credit Card Fraud dataset from Kaggle',
    datasetName: 'Credit Card Fraud Detection Dataset (284,807 transactions, 492 fraud cases)',
    problemStatement: 'Credit card fraud costs India over ₹200 crore per year. Traditional rule-based systems miss new fraud patterns. An ML model that learns from historical fraud patterns can detect suspicious transactions in real-time, protecting customers before the money leaves their account.',
    objectives: [
      'Build a machine learning model that classifies transactions as fraud or genuine.',
      'Handle the severe class imbalance (0.17% fraud vs 99.83% genuine transactions).',
      'Achieve a Recall score above 85% to catch most fraudulent transactions.',
      'Build a simple dashboard to show incoming transactions and flag suspicious ones.',
      'Deploy the model as an API that processes transactions in under 100ms.',
    ],
    dataset: {
      name: 'Credit Card Fraud Detection Dataset',
      url: 'https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud',
      description: 'This dataset contains 284,807 real credit card transactions from European cardholders in September 2013. Only 492 transactions (0.17%) are fraud. The features V1-V28 are PCA-transformed for privacy. Features Amount and Time are original. The target is Class (0 = genuine, 1 = fraud).',
      size: '284,807 rows, 31 columns, 144 MB',
      format: 'CSV',
      backupDataset: 'IEEE-CIS Fraud Detection Dataset',
      backupUrl: 'https://www.kaggle.com/competitions/ieee-fraud-detection/data',
    },
    techStack: [
      { component: 'Programming Language', tool: 'Python 3.10+', reason: 'Best data science libraries available.' },
      { component: 'Data Processing', tool: 'Pandas + NumPy', reason: 'Industry standard for data manipulation.' },
      { component: 'ML Model', tool: 'Random Forest + XGBoost', reason: 'Both handle imbalanced data well. XGBoost usually gives the best results on tabular fraud data.' },
      { component: 'Imbalance Handling', tool: 'SMOTE (from imbalanced-learn)', reason: 'SMOTE creates synthetic fraud samples to balance the dataset without simply repeating data.' },
      { component: 'Web Interface', tool: 'Flask + simple HTML dashboard', reason: 'Simple interface to show transaction predictions in real time.' },
      { component: 'Deployment', tool: 'Render.com (free)', reason: 'Free hosting with enough RAM for the model.' },
    ],
    architectureExplanation: 'A transaction comes in with its features (amount, time, V1-V28). The Flask API receives the transaction. It scales the Amount and Time features. It feeds the features into the trained XGBoost model. The model outputs a fraud probability from 0 to 1. If the probability is above 0.5, the transaction is flagged as fraud. The result is sent back immediately.',
    architectureDiagram: `
[Transaction Data]
(Amount, Time, V1-V28)
     |
     v
[Flask API - /predict endpoint]
     |
     | scale Amount + Time
     v
[XGBoost Classifier]
     |
     | outputs fraud probability (0.0 to 1.0)
     v
[Threshold: if > 0.5 → FRAUD else → GENUINE]
     |
     v
[Response: {transaction_id, is_fraud, probability}]
    `,
    buildSteps: [
      {
        step: 1, title: 'Download dataset and explore the data', duration: '30 minutes',
        description: 'Download from Kaggle and do basic exploration to understand the data.',
        commands: ['pip install pandas numpy scikit-learn xgboost imbalanced-learn flask matplotlib seaborn'],
        codeSnippet: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('creditcard.csv')
print(df.shape)       # (284807, 31)
print(df.Class.value_counts())
# 0    284315  <- genuine
# 1       492  <- fraud
fraud_pct = 492/284807*100
print(f"Fraud percentage: {fraud_pct:.4f}%")  # 0.1728%

# Visualize class distribution
df['Class'].value_counts().plot(kind='bar')
plt.title('Class Distribution (0=Genuine, 1=Fraud)')
plt.show()`,
        expectedOutput: 'You see the extreme class imbalance: 284,315 genuine vs 492 fraud.',
      },
      {
        step: 2, title: 'Preprocess the data', duration: '30 minutes',
        description: 'Scale the Amount and Time columns. Features V1-V28 are already scaled (PCA-transformed).',
        commands: [],
        codeSnippet: `from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

scaler = StandardScaler()
df['Amount_scaled'] = scaler.fit_transform(df[['Amount']])
df['Time_scaled'] = scaler.fit_transform(df[['Time']])

features = [f'V{i}' for i in range(1, 29)] + ['Amount_scaled', 'Time_scaled']
X = df[features]
y = df['Class']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
print(f"Training size: {len(X_train)}")
print(f"Test size: {len(X_test)}")
print(f"Fraud in test: {y_test.sum()}")`,
        expectedOutput: 'Data split into training and test sets with stratification.',
      },
      {
        step: 3, title: 'Handle class imbalance with SMOTE', duration: '20 minutes',
        description: 'SMOTE creates fake fraud samples to balance the dataset. We only apply SMOTE on training data, never on test data.',
        commands: [],
        codeSnippet: `from imblearn.over_sampling import SMOTE

print(f"Before SMOTE - Genuine: {(y_train==0).sum()}, Fraud: {(y_train==1).sum()}")

smote = SMOTE(random_state=42)
X_train_balanced, y_train_balanced = smote.fit_resample(X_train, y_train)

print(f"After SMOTE - Genuine: {(y_train_balanced==0).sum()}, Fraud: {(y_train_balanced==1).sum()}")
# After SMOTE: ~50/50 split`,
        expectedOutput: 'After SMOTE: roughly equal genuine and fraud samples in training data.',
      },
      {
        step: 4, title: 'Train XGBoost classifier', duration: '30 minutes',
        description: 'Train XGBoost on the SMOTE-balanced training data. XGBoost is a gradient boosting algorithm known to be excellent on tabular fraud data.',
        commands: [],
        codeSnippet: `import xgboost as xgb
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score

model = xgb.XGBClassifier(
    n_estimators=100,
    max_depth=6,
    learning_rate=0.1,
    scale_pos_weight=1,
    use_label_encoder=False,
    eval_metric='logloss',
    random_state=42
)
model.fit(X_train_balanced, y_train_balanced)

y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

print(classification_report(y_test, y_pred))
print(f"ROC-AUC Score: {roc_auc_score(y_test, y_prob):.4f}")`,
        expectedOutput: 'Model trained. Classification report shows Recall for fraud class above 85%.',
      },
      {
        step: 5, title: 'Evaluate with correct metrics', duration: '20 minutes',
        description: 'For fraud detection, Recall is the most important metric. A fraud transaction that we miss is more costly than a genuine transaction we flag by mistake.',
        commands: [],
        codeSnippet: `from sklearn.metrics import confusion_matrix
import seaborn as sns

cm = confusion_matrix(y_test, y_pred)
print("Confusion Matrix:")
print(cm)
print(f"True Positives (Fraud caught): {cm[1][1]}")
print(f"False Negatives (Fraud missed): {cm[1][0]}")
print(f"False Positives (Genuine flagged as fraud): {cm[0][1]}")
recall = cm[1][1] / (cm[1][1] + cm[1][0])
precision = cm[1][1] / (cm[1][1] + cm[0][1])
print(f"Recall: {recall:.2%}   (out of all frauds, we caught this many)")
print(f"Precision: {precision:.2%}  (out of all our fraud alerts, this many were real)")`,
        expectedOutput: 'Recall above 85%, ROC-AUC above 0.95.',
      },
      {
        step: 6, title: 'Save the model', duration: '5 minutes',
        description: 'Save the trained model and scaler so Flask can load them without retraining.',
        commands: [],
        codeSnippet: `import pickle
with open('fraud_model.pkl', 'wb') as f:
    pickle.dump(model, f)
with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)
print("Model and scaler saved!")`,
        expectedOutput: 'fraud_model.pkl and scaler.pkl files created.',
      },
      {
        step: 7, title: 'Build the Flask prediction API', duration: '30 minutes',
        description: 'Create a REST API that accepts a transaction and returns fraud probability.',
        commands: [],
        codeSnippet: `from flask import Flask, request, jsonify, render_template
import pickle, numpy as np

app = Flask(__name__)
with open('fraud_model.pkl', 'rb') as f:
    model = pickle.load(f)
with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    amount = float(data['amount'])
    time = float(data['time'])
    v_features = [float(data[f'v{i}']) for i in range(1, 29)]
    amount_scaled = scaler.transform([[amount]])[0][0]
    time_scaled = float(time) / 172800  # normalize by max time in dataset
    features = v_features + [amount_scaled, time_scaled]
    prob = model.predict_proba([features])[0][1]
    is_fraud = prob > 0.5
    return jsonify({'is_fraud': bool(is_fraud), 'fraud_probability': f"{prob:.1%}", 'status': 'BLOCKED' if is_fraud else 'APPROVED'})

if __name__ == '__main__':
    app.run(debug=True)`,
        expectedOutput: 'API running at localhost:5000/predict',
      },
      {
        step: 8, title: 'Build a simple transaction dashboard UI', duration: '45 minutes',
        description: 'Create a web page that shows a mock transaction stream and highlights fraud predictions in red.',
        commands: ['mkdir templates', '# Create templates/index.html with a transaction table'],
        expectedOutput: 'Dashboard shows transactions with green (genuine) and red (fraud) highlights.',
      },
      {
        step: 9, title: 'Test with known fraud and genuine transactions from the test set', duration: '20 minutes',
        description: 'Take 5 fraud rows and 5 genuine rows from your test set. Feed them to the API manually and verify predictions.',
        commands: [],
        expectedOutput: 'At least 4 out of 5 fraud transactions flagged correctly.',
      },
      {
        step: 10, title: 'Final checklist and viva preparation', duration: '15 minutes',
        description: 'Make sure you can explain class imbalance, SMOTE, and the Precision-Recall tradeoff.',
        commands: [],
        codeSnippet: `Checklist:
[ ] Model achieves Recall > 85% on test set
[ ] ROC-AUC score above 0.95
[ ] You can explain SMOTE in simple words
[ ] You know the difference between Precision and Recall
[ ] You can explain why Recall matters more than Precision here
[ ] Flask API returns predictions correctly
[ ] You know what a confusion matrix shows`,
        expectedOutput: 'All items checked. Ready for viva.',
      },
    ],
    vivaQA: [
      {
        question: 'What is class imbalance and why is it a big problem for fraud detection?',
        whyAsked: 'Class imbalance is the central challenge of this problem. This is the first thing any examiner will ask.',
        perfectAnswer: 'Class imbalance means one class has far more samples than the other. In our dataset, only 0.17% of transactions are fraud. 99.83% are genuine. This causes a serious problem. If a model always says "genuine" for every single transaction, it gets 99.83% accuracy. But it catches zero fraud transactions. This model is completely useless for our purpose, even though its accuracy looks great. This is why accuracy is a misleading metric for imbalanced problems. We need to look at Recall — what percentage of actual fraud transactions did the model catch. To fix class imbalance, we use SMOTE to create synthetic fraud samples during training.',
        avoidSaying: 'Do not say class imbalance means the data is wrong. It reflects the real world.',
      },
      {
        question: 'What is SMOTE and how is it different from just copying fraud samples?',
        whyAsked: 'SMOTE is a key technique in your project.',
        perfectAnswer: 'SMOTE stands for Synthetic Minority Oversampling Technique. A simple approach would be to just duplicate fraud samples 100 times. The problem with duplication is the model just memorizes those exact fraud transactions. New fraud patterns that are slightly different would be missed. SMOTE is smarter. For each fraud sample, it finds its 5 nearest neighbors (other fraud samples that are most similar). It then creates new synthetic fraud samples at random points between these neighbors. These new samples are similar to real fraud but are not exact copies. The model sees more variety of fraud patterns and learns better. We only apply SMOTE on training data, never on test data, because test data must reflect the real world distribution.',
        avoidSaying: 'Do not say SMOTE adds real fraud transactions from other sources.',
      },
      {
        question: 'What is the difference between Precision and Recall?',
        whyAsked: 'Core metric concept that every examiner will ask for fraud detection.',
        perfectAnswer: 'Let me explain with an example. Suppose our model looks at 100 transactions and flags 10 as fraud. Precision asks: out of those 10 that we flagged, how many were actually fraud? If 8 were real fraud and 2 were genuine transactions we blocked by mistake, Precision is 8/10 = 80%. Recall asks a different question: out of all the actual fraud transactions in those 100 (let us say there are 10 real fraud transactions), how many did our model catch? If we caught 8 of the 10 real frauds and missed 2, Recall is 8/10 = 80%. In fraud detection, Recall is more important. Missing a fraud transaction means the customer loses money — that is terrible. Blocking a genuine transaction by mistake is annoying but less harmful. The customer can call the bank and get it fixed.',
        avoidSaying: 'Do not confuse Precision and Recall. Get the definitions exactly right.',
      },
      {
        question: 'Why did you use XGBoost instead of a simple Decision Tree or Logistic Regression?',
        whyAsked: 'Tests your understanding of algorithm choices.',
        perfectAnswer: 'Logistic Regression is too simple for this problem. It assumes a linear relationship between features and fraud probability. Real fraud patterns are much more complex — they involve combinations of amount, time, location, and merchant category that interact in non-linear ways. A single Decision Tree works better but overfits. It memorizes the training data too specifically and performs poorly on new fraud patterns. XGBoost is an ensemble method — it builds hundreds of small decision trees, where each tree learns from the mistakes of the previous trees. This process is called Gradient Boosting. The combination of hundreds of trees is more accurate and more resistant to overfitting than any single model. XGBoost also handles class imbalance better than simpler algorithms.',
        avoidSaying: 'Do not say you tried all algorithms and XGBoost gave the best accuracy without knowing why.',
      },
      {
        question: 'What is a confusion matrix? Explain each cell.',
        whyAsked: 'The confusion matrix is your main evaluation tool for this project.',
        perfectAnswer: 'A confusion matrix is a table with 2 rows and 2 columns for a binary classification problem. The rows represent actual classes. The columns represent predicted classes. The four cells are: True Positive — the transaction was actually fraud AND we predicted fraud. This is a correctly caught fraud. True Negative — the transaction was genuine AND we predicted genuine. Correctly approved. False Positive — the transaction was genuine but we predicted fraud. We blocked a valid transaction. This is called a false alarm. False Negative — the transaction was fraud but we predicted genuine. We missed a fraud. This is the most dangerous outcome. For fraud detection, we want to maximize True Positives and minimize False Negatives.',
        avoidSaying: 'Do not mix up False Positive and False Negative.',
      },
      {
        question: 'What is ROC-AUC score and what does 0.97 mean?',
        whyAsked: 'You report ROC-AUC in your evaluation. You must explain it.',
        perfectAnswer: 'ROC stands for Receiver Operating Characteristic curve. It is a graph that shows how the True Positive Rate and False Positive Rate change as we adjust the fraud threshold. AUC means Area Under the Curve. AUC = 1.0 means a perfect model. AUC = 0.5 means the model is no better than random guessing. Our AUC of 0.97 means the model is excellent at separating fraud from genuine transactions. Practically it means: if we randomly pick one fraud transaction and one genuine transaction and ask our model to score both, there is a 97% chance the model gives a higher fraud score to the actual fraud transaction. AUC is a better metric than accuracy for imbalanced datasets because it measures discrimination ability, not just overall correctness.',
        avoidSaying: 'Do not say AUC is the same as accuracy.',
      },
      {
        question: 'What are the V1-V28 features in the dataset? Why are they named like that?',
        whyAsked: 'Tests dataset knowledge.',
        perfectAnswer: 'The original dataset contained real credit card transaction features like merchant category, location, spending history, and customer profile. However, this data is confidential. Banks cannot share real customer data publicly. So the researchers applied a technique called PCA — Principal Component Analysis — to the original features. PCA transforms the original features into new features that preserve the patterns but make the original data unrecoverable. These transformed features are called V1 through V28. The names are anonymous so that you cannot reverse-engineer what the original features were. The Amount and Time columns were kept as-is because they are not sensitive on their own.',
        avoidSaying: 'Do not say V1-V28 are random numbers with no meaning.',
      },
      {
        question: 'What fraud detection threshold did you use and how did you choose it?',
        whyAsked: 'The threshold choice involves a business decision, not just ML.',
        perfectAnswer: 'We used a threshold of 0.5 by default. This means if the model predicts fraud probability above 50%, we flag the transaction. However, the right threshold depends on the business context. If we lower the threshold to 0.3, we catch more fraud (higher Recall) but we also block more genuine transactions (lower Precision). Blocking genuine transactions angers customers and they might cancel their card. If we raise the threshold to 0.7, we block fewer genuine transactions but miss more actual fraud. The optimal threshold is chosen by looking at the Precision-Recall curve and picking the point where both are acceptably high. For a large bank that can afford some customer complaints to prevent major fraud losses, a lower threshold makes business sense.',
        avoidSaying: 'Do not say 0.5 is always the correct threshold.',
      },
      {
        question: 'What would you do if your model starts seeing new types of fraud it was not trained on?',
        whyAsked: 'Tests adaptability thinking.',
        perfectAnswer: 'This is called concept drift. Fraudsters constantly change their tactics. A model trained on 2022 fraud patterns might fail on 2024 fraud patterns. To handle this, we would do three things. First, continuous monitoring. Track the model\'s performance every week. If Recall drops below 80%, it is a signal that new fraud patterns are emerging. Second, regular retraining. Every month, add the most recent month\'s transactions (including newly discovered fraud cases) to the training data and retrain the model. Third, anomaly detection as a second layer. Instead of only using supervised classification, add an unsupervised anomaly detector that flags any transaction that is unusually different from normal patterns, even if it does not match known fraud signatures.',
        avoidSaying: 'Do not say the model never needs updating once deployed.',
      },
      {
        question: 'How fast does your model predict? Can it work in real-time?',
        whyAsked: 'Real-time prediction speed is critical for fraud detection.',
        perfectAnswer: 'XGBoost prediction for a single transaction takes about 0.5 to 2 milliseconds on a standard CPU. Our Flask API adds some overhead for parsing the request and formatting the response. Total response time is under 10 milliseconds per transaction. This is more than fast enough for real-time fraud detection. Credit card transactions typically have a window of 100–500 milliseconds before the payment must be approved or rejected. Our system comfortably fits within that window. In production, the model would be loaded in RAM once when the server starts and reused for every prediction, which is exactly what our Flask implementation does.',
        avoidSaying: 'Do not say real-time is not possible with Python.',
      },
      {
        question: 'What is Principal Component Analysis (PCA)? Why was it done on this dataset?',
        whyAsked: 'PCA is mentioned when explaining the dataset. You may be asked to elaborate.',
        perfectAnswer: 'PCA is a dimensionality reduction technique. It takes multiple correlated features and combines them into a smaller number of new features called principal components. For example, a person\'s height and shoe size are correlated — tall people usually have bigger feet. PCA would combine these two features into one component that captures this pattern. The new components are ordered by how much variance they capture. The first principal component captures the most variation in the data. In the credit card dataset, PCA was applied to protect customer privacy. The actual features might be things like "total spending in last 7 days" or "number of transactions at restaurants". By applying PCA, the researchers created V1-V28 that preserve the fraud detection signal but hide the original financial details.',
        avoidSaying: 'Do not say PCA is a type of encryption.',
      },
      {
        question: 'What are the limitations of your fraud detection system?',
        whyAsked: 'Every examiner appreciates honest assessment of limitations.',
        perfectAnswer: 'Our system has four limitations. First, the dataset is from 2013 European cardholders. Fraud patterns have changed significantly since then. The model needs retraining on recent data. Second, the V1-V28 features are PCA-transformed. We cannot add new features easily without redoing the PCA transformation on the entire dataset. Third, SMOTE creates synthetic fraud samples that may not perfectly represent real new fraud patterns. The model might still miss truly novel fraud attacks. Fourth, our threshold of 0.5 is fixed. A more sophisticated system would use a dynamic threshold that changes based on transaction risk factors — a ₹10,000 transaction should have a lower threshold than a ₹100 transaction.',
        avoidSaying: 'Do not say "there are no limitations."',
      },
      {
        question: 'What is Random Forest and how is it different from XGBoost?',
        whyAsked: 'You mention both models in your tech stack.',
        perfectAnswer: 'Both Random Forest and XGBoost are ensemble methods that combine many decision trees. The key difference is HOW they combine trees. Random Forest builds all trees independently and takes a majority vote at the end. Each tree is trained on a random subset of data and random subset of features. XGBoost builds trees sequentially. Each new tree is trained to correct the mistakes of all previous trees. This sequential correction process is called Gradient Boosting. XGBoost is usually more accurate than Random Forest because it specifically targets errors. But XGBoost is slower to train and more prone to overfitting if not tuned carefully. For fraud detection with a well-tuned model, XGBoost typically outperforms Random Forest by 2–3% in ROC-AUC score.',
        avoidSaying: 'Do not say Random Forest and XGBoost are the same because both use decision trees.',
      },
      {
        question: 'A bank VP asks you: what percentage of fraud will your system catch?',
        whyAsked: 'Tests ability to communicate technical results to a non-technical audience.',
        perfectAnswer: 'Sir, based on our test results on 56,961 transactions — including 99 actual fraud cases — our system correctly identified 87 fraud transactions out of 99. That is an 88% fraud detection rate. In other words, if your bank processes 1000 fraud transactions in a month, our system will catch about 880 of them and miss about 120. The 120 missed cases would need to be caught by other means — customer complaints, rule-based systems, or manual review of high-value transactions. We also generate about 150 false alarms per 1000 genuine transactions, meaning we would temporarily block 150 valid transactions. Those customers would need to be contacted to verify the transaction.',
        avoidSaying: 'Do not say "100% detection rate." Be honest about the actual numbers.',
      },
      {
        question: 'What is cross-validation and should you have used it?',
        whyAsked: 'Advanced question testing ML methodology knowledge.',
        perfectAnswer: 'Cross-validation is a technique to get a more reliable estimate of model performance. Instead of splitting data once into train and test, you split it K times. For 5-fold cross-validation: split data into 5 equal parts. Train on 4 parts, test on 1 part. Repeat 5 times, each time using a different part as the test set. Average the 5 accuracy scores. This gives a more stable performance estimate because it uses all data for both training and testing. For our project, we used a single 80-20 train-test split because the dataset is large enough (284,807 samples) that a single split is statistically reliable. Cross-validation would have been more important if our dataset had only 1,000 samples.',
        avoidSaying: 'Do not say cross-validation and train-test split are the same thing.',
      },
    ],
    deploymentGuide: `
HOW TO DEPLOY FRAUD DETECTION API ON RENDER.COM

Step 1: Save requirements.txt
pandas==2.1.0
numpy==1.24.0
scikit-learn==1.3.0
xgboost==2.0.0
imbalanced-learn==0.11.0
flask==3.0.0

Step 2: Create Procfile
web: gunicorn app:app

Step 3: Push to GitHub
git add .
git commit -m "Fraud detection API ready"
git push origin main

Step 4: Deploy on Render.com
- New Web Service → Connect GitHub repo
- Build Command: pip install -r requirements.txt
- Start Command: gunicorn app:app
- Free tier is fine for demo

DEMO SCRIPT FOR VIVA:
"I will now demonstrate a live transaction prediction.
[Open browser to your Render URL]
This is a genuine transaction with normal features.
[Input a genuine transaction]
The system approves it — 3% fraud probability.
Now let me input a known fraud pattern.
[Input a fraud transaction]
The system flags it — 97% fraud probability. Transaction blocked.
The API response time is under 10 milliseconds."

BACKUP DEMO:
Run locally: python app.py
Show on localhost:5000
Have 5 prepared test cases ready to paste in
    `,
    resumeBullets: [
      'Built a real-time credit card fraud detection system using XGBoost on 284,807 transactions, achieving 88% Recall and 0.97 ROC-AUC score.',
      'Applied SMOTE (Synthetic Minority Oversampling) to handle extreme class imbalance (0.17% fraud rate), improving model Recall by 23% over baseline.',
      'Deployed a Flask REST API for real-time transaction scoring with sub-10ms prediction latency, suitable for integration into payment processing pipelines.',
    ],
    linkedinPost: `Completed my final year project — Real-Time Credit Card Fraud Detection! 💳🔒

Built an ML system that flags fraudulent transactions before money leaves the account.

Key results:
✅ XGBoost model on 284,807 real transactions
✅ 88% Recall — catches 88 out of 100 fraud cases
✅ 0.97 ROC-AUC score
✅ SMOTE for class imbalance handling (0.17% fraud rate)
✅ Flask API with sub-10ms prediction speed

The hardest part: learning why "accuracy" is a misleading metric for imbalanced problems. Recall is what actually matters here.

Tech: Python · XGBoost · scikit-learn · SMOTE · Flask · Pandas

#MachineLearning #FraudDetection #DataScience #Python #XGBoost #FinTech #FinalYearProject #SubmitKit`,
    githubReadmeTemplate: `# Credit Card Fraud Detection

Real-time fraud detection system using XGBoost trained on 284,807 transactions.

## Performance
- Recall: 88% (catches 88 of 100 fraud cases)
- ROC-AUC: 0.97
- Dataset: European credit card transactions (Kaggle)

## Key Challenge: Class Imbalance
Only 0.17% of transactions are fraud. Solved using SMOTE.

## How to Run
\`\`\`bash
pip install -r requirements.txt
python train.py          # Train the model
python app.py            # Start Flask API
# POST /predict with transaction JSON
\`\`\`

## API Usage
\`\`\`json
POST /predict
{"amount": 150.0, "time": 50000, "v1": -1.35, ...}

Response:
{"is_fraud": true, "fraud_probability": "94.3%", "status": "BLOCKED"}
\`\`\`
`,
  },

};

// ─────────────────────────────────────────────────────────────────────────────
// TOPIC LIST (for A-Z browser)
// ─────────────────────────────────────────────────────────────────────────────

const ORIGINAL_STUBS: TopicCard[] = [
  { id: 'attendance-management-ml', letter: 'A', title: 'Attendance Management using ML', category: 'AIML', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'Automated class attendance using machine learning.', whatItDoes: 'Tracks and manages student attendance automatically using machine learning algorithms to detect patterns and anomalies.', realWorldUse: 'Universities and corporate offices use automated attendance systems to reduce manual effort.', examinerExpects: ['Demonstrate the attendance marking process', 'Explain the ML algorithm used', 'Show attendance report generation'], freeVivaQuestions: ['What ML algorithm did you use for classification?', 'How do you handle new students not in the training data?'], freeStep1Title: 'Set up Python environment and install scikit-learn', datasetName: 'Custom attendance dataset' },
  { id: 'blood-bank-management', letter: 'B', title: 'Blood Bank Management System', category: 'FullStack', difficulty: 2, buildTimeDays: '3-4 days', trending: false, tagline: 'Connects blood donors with hospitals in real time.', whatItDoes: 'A web application that manages blood inventory, donor registration, and hospital requests. Donors register with their blood group. Hospitals search for available blood. The system matches requests with available donors.', realWorldUse: 'Red Cross and government blood banks use similar systems. eBloodServices.in is an example.', examinerExpects: ['Show donor registration and blood request matching', 'Explain the database schema', 'Demonstrate search by blood group functionality'], freeVivaQuestions: ['How did you design the database for this system?', 'What happens when the blood inventory runs low?'], freeStep1Title: 'Set up Node.js and create Express server', datasetName: 'Custom blood bank database' },
  { id: 'blockchain-certificate', letter: 'B', title: 'Blockchain-based Certificate Verification', category: 'Blockchain', difficulty: 4, buildTimeDays: '5-7 days', trending: false, tagline: 'Fake degree certificates become impossible with blockchain.', whatItDoes: 'Universities issue certificates that are stored on a blockchain. Anyone can scan a QR code and verify instantly if a certificate is real or fake. The certificate data cannot be changed once on the blockchain.', realWorldUse: 'IIT Bombay and BITS Pilani have piloted blockchain certificates. MIT already issues blockchain diplomas.', examinerExpects: ['Demonstrate certificate issuance and verification', 'Explain why blockchain prevents forgery', 'Show the QR code scanning verification flow'], freeVivaQuestions: ['Why is blockchain better than a regular database for certificates?', 'What happens if a university loses access to their blockchain wallet?'], freeStep1Title: 'Install Node.js and Truffle framework for Ethereum', datasetName: 'No external dataset — you create certificate records' },
  { id: 'book-recommendation', letter: 'B', title: 'Book Recommendation System', category: 'DataScience', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'Like Netflix recommendations but for books.', whatItDoes: 'The system recommends books based on what a user has read and liked before. It uses collaborative filtering — finding users with similar reading tastes and suggesting what they enjoyed.', realWorldUse: 'Amazon uses recommendation systems to drive 35% of its revenue. Goodreads and Audible use similar approaches.', examinerExpects: ['Show personalized book recommendations for a test user', 'Explain collaborative filtering vs content-based filtering', 'Show the similarity matrix visualization'], freeVivaQuestions: ['What is collaborative filtering? How is it different from content-based filtering?', 'What is the cold start problem in recommendation systems?'], freeStep1Title: 'Download Book Crossing dataset from Kaggle', datasetName: 'Book Crossing Dataset (278,858 users, 1.1M ratings)' },
  { id: 'cab-booking', letter: 'C', title: 'Cab Booking System (Mini Uber Clone)', category: 'FullStack', difficulty: 3, buildTimeDays: '4-6 days', trending: false, tagline: 'Book a cab, track it live on the map.', whatItDoes: 'A web app where users book cabs. They enter pickup and drop location. A driver is assigned. They can track the driver on a map in real time. Includes fare calculation and booking history.', realWorldUse: 'Ola, Uber, and Rapido all use similar core systems. Even local auto rickshaw aggregators like Namma Yatri use this architecture.', examinerExpects: ['Show the full booking flow from request to driver assignment', 'Demonstrate the map integration', 'Explain how real-time driver tracking works'], freeVivaQuestions: ['How does your system assign the nearest driver to a booking request?', 'What API did you use for the map and how does it work?'], freeStep1Title: 'Set up React frontend and Node.js backend', datasetName: 'No external dataset — you simulate drivers and bookings' },
  { id: 'chat-application', letter: 'C', title: 'Real-Time Chat Application', category: 'FullStack', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'WhatsApp-style chat that works in a browser.', whatItDoes: 'A web chat app where users can create accounts, find other users, and chat in real time. Messages appear instantly without refreshing the page. Uses WebSockets to keep a live connection between browser and server.', realWorldUse: 'WhatsApp, Slack, Discord, and Microsoft Teams all use WebSocket technology at their core.', examinerExpects: ['Demonstrate two users chatting in real time in two browser windows', 'Explain how WebSockets differ from regular HTTP', 'Show the message delivery confirmation system'], freeVivaQuestions: ['What is a WebSocket? How is it different from a regular HTTP request?', 'How do you handle a user who goes offline in the middle of a conversation?'], freeStep1Title: 'Install Node.js and Socket.io library', datasetName: 'No external dataset — real-time chat data is generated during use' },
  { id: 'college-erp', letter: 'C', title: 'College ERP System', category: 'FullStack', difficulty: 3, buildTimeDays: '5-7 days', trending: false, tagline: 'One platform for students, teachers, and admin.', whatItDoes: 'A full college management system. Students log in to check marks and attendance. Teachers log in to enter marks and take attendance. Admin manages courses, fees, and student records. Three different roles, one system.', realWorldUse: 'SAP, Oracle ERP, and home-grown systems power most Indian university backends. Companies like Serosoft and iCloudEMS sell ERP software to colleges.', examinerExpects: ['Show all three login portals working — student, teacher, admin', 'Demonstrate role-based access control', 'Show marks entry and grade generation'], freeVivaQuestions: ['How did you implement role-based access control in your system?', 'How does your system prevent a student from accessing the teacher portal?'], freeStep1Title: 'Design the database schema for students, teachers, courses, and marks', datasetName: 'No external dataset — you create dummy college data' },
  { id: 'diabetes-prediction', letter: 'D', title: 'Diabetes Prediction System', category: 'AIML', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'Predicts diabetes risk from health checkup data.', whatItDoes: 'A patient enters their health details — glucose level, blood pressure, BMI, age. The system tells them the probability of having diabetes. A simple web form makes it accessible to anyone.', realWorldUse: 'Apollo Hospitals and Practo use ML models to assist doctors in early diabetes screening. The WHO promotes AI-assisted diagnosis in rural healthcare.', examinerExpects: ['Show predictions for both diabetic and non-diabetic test cases', 'Explain which health features are most important for the prediction', 'Know the accuracy of your model'], freeVivaQuestions: ['Which features in the dataset are most important for predicting diabetes?', 'How do you handle missing values in the health data?'], freeStep1Title: 'Download PIMA Indians Diabetes Dataset from Kaggle', datasetName: 'PIMA Indians Diabetes Dataset (768 patients, 8 features)' },
  { id: 'drowsiness-detection', letter: 'D', title: 'Drowsiness Detection for Drivers', category: 'AIML', difficulty: 3, buildTimeDays: '3-5 days', trending: false, tagline: 'Camera watches the driver and sounds alarm if they fall asleep.', whatItDoes: 'A camera installed in the car watches the driver\'s eyes. If the driver\'s eyes are closed for more than 2 seconds, the system sounds a loud alarm. This prevents accidents caused by drivers falling asleep on the highway.', realWorldUse: 'Mercedes-Benz and Volvo have driver drowsiness detection in their premium cars. Trucking companies in the USA install aftermarket drowsiness detection systems.', examinerExpects: ['Demonstrate real-time eye detection and alarm trigger', 'Explain how you measure eye aspect ratio', 'Know the false alarm rate of your system'], freeVivaQuestions: ['How do you measure if an eye is open or closed in real time?', 'What is the Eye Aspect Ratio (EAR) and how did you calculate it?'], freeStep1Title: 'Install OpenCV, dlib, and scipy', datasetName: 'Custom webcam data — no external dataset needed' },
  { id: 'ecommerce-website', letter: 'E', title: 'E-Commerce Website (Full Stack)', category: 'FullStack', difficulty: 3, buildTimeDays: '5-7 days', trending: false, tagline: 'A full shopping website with cart, orders, and payments.', whatItDoes: 'A complete online shopping website. Users browse products, add to cart, and checkout with a payment. Admin can add products, manage orders, and see sales reports. Includes user login, search, and filter.', realWorldUse: 'Every e-commerce company from Amazon to local Meesho sellers uses similar systems. This is the most employable full-stack project you can build.', examinerExpects: ['Show the full shopping flow — browse, add to cart, checkout, order confirmation', 'Demonstrate admin product management', 'Explain how session management works for the shopping cart'], freeVivaQuestions: ['How does your cart persist when a user closes and reopens the browser?', 'How do you prevent a product from being oversold when two users buy the last item at the same time?'], freeStep1Title: 'Set up React frontend and Node.js/Express backend', datasetName: 'No external dataset — you add products manually via admin panel' },
  { id: 'fake-news-detection', letter: 'F', title: 'Fake News Detection System', category: 'NLP', difficulty: 3, buildTimeDays: '3-4 days', trending: false, tagline: 'Paste a news article. Find out if it is real or fake in 3 seconds.', whatItDoes: 'The user pastes a news headline or article. The system analyzes the text and tells them: this is likely real news OR this is likely fake news, with a confidence percentage. It uses NLP to analyze writing patterns, word choice, and tone.', realWorldUse: 'Facebook uses AI to flag fake news. Twitter uses ML to detect coordinated misinformation campaigns. Google News uses similar technology to rank trustworthy sources.', examinerExpects: ['Demonstrate predictions on 3-5 known fake and real news articles', 'Explain the NLP features you extracted', 'Show the confusion matrix and explain it'], freeVivaQuestions: ['What NLP features did you use to distinguish fake news from real news?', 'What is TF-IDF and how did you apply it to news articles?'], freeStep1Title: 'Download LIAR or FakeNewsNet dataset from Kaggle', datasetName: 'LIAR Dataset (12,836 labeled news statements)' },
  { id: 'gesture-mouse', letter: 'G', title: 'Gesture-Controlled Virtual Mouse', category: 'AIML', difficulty: 3, buildTimeDays: '3-4 days', trending: false, tagline: 'Control your computer mouse using only hand gestures.', whatItDoes: 'The webcam watches your hand. When you move your index finger, the mouse cursor moves. When you bring your thumb and index finger together, it clicks. No physical mouse needed. Uses MediaPipe hand landmark detection.', realWorldUse: 'Microsoft HoloLens and Apple Vision Pro use hand gesture control. Gaming companies use it for VR controllers. It is used in medical labs where doctors cannot touch surfaces during surgery.', examinerExpects: ['Demonstrate cursor movement and click gestures live', 'Explain how MediaPipe detects hand landmarks', 'Know what the 21 hand landmark points are'], freeVivaQuestions: ['How does MediaPipe detect 21 hand landmark points in real time?', 'How do you prevent the cursor from shaking when the hand trembles slightly?'], freeStep1Title: 'Install MediaPipe, OpenCV, and PyAutoGUI', datasetName: 'No external dataset — real-time webcam input' },
  { id: 'heart-disease-prediction', letter: 'H', title: 'Heart Disease Prediction', category: 'DataScience', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'Predicts heart disease risk from clinical data.', whatItDoes: 'A patient enters clinical data — age, cholesterol, blood pressure, chest pain type, ECG results. The system predicts whether they are at risk for heart disease. Helps doctors screen more patients in less time.', realWorldUse: 'Cardiologists at AIIMS Delhi use ML-assisted screening. Fitbit and Apple Watch use heart monitoring algorithms. Apollo Hospitals uses ML for risk stratification.', examinerExpects: ['Demonstrate prediction on test patients', 'Identify the most important features for heart disease prediction', 'Compare at least two ML algorithms'], freeVivaQuestions: ['Which features are most important for predicting heart disease in your model?', 'How do you handle missing values in clinical data?'], freeStep1Title: 'Download Cleveland Heart Disease dataset from Kaggle', datasetName: 'Cleveland Heart Disease Dataset (303 patients, 14 features)' },
  { id: 'hospital-management', letter: 'H', title: 'Hospital Management System', category: 'FullStack', difficulty: 3, buildTimeDays: '4-6 days', trending: false, tagline: 'Manages patients, doctors, appointments, and billing.', whatItDoes: 'A hospital management web system. Patients book appointments online. Doctors see their daily schedule. Receptionists manage admissions. Admin handles billing and reports. All in one system.', realWorldUse: 'Apollo Hospitals, Fortis, and government hospitals use commercial HMS. Bahmni (open source) is used in thousands of rural Indian hospitals.', examinerExpects: ['Show appointment booking flow from patient login to doctor confirmation', 'Demonstrate appointment cancellation and rescheduling', 'Explain the role-based access for patients, doctors, and admin'], freeVivaQuestions: ['How did you handle appointment conflicts when a doctor is already booked?', 'How does your billing system calculate the total from multiple services?'], freeStep1Title: 'Design database schema with patients, doctors, appointments, and billing tables', datasetName: 'No external dataset — you populate with dummy data' },
  { id: 'image-caption-generator', letter: 'I', title: 'Image Caption Generator', category: 'AIML', difficulty: 4, buildTimeDays: '4-6 days', trending: false, tagline: 'Upload any image. Get an automatic description in English.', whatItDoes: 'The user uploads an image. The system generates a natural English sentence describing what is in the image. For example: "A man in a red shirt is playing guitar on a stage." Combines Computer Vision (to understand the image) with NLP (to generate the sentence).', realWorldUse: 'Google Photos auto-generates photo descriptions for accessibility. Facebook automatically generates alt text for visually impaired users. Pinterest uses image captioning for SEO.', examinerExpects: ['Show 5 different image caption examples', 'Explain how the CNN encoder and LSTM decoder work together', 'Know the BLEU score of your model'], freeVivaQuestions: ['How does your model combine image understanding with language generation?', 'What is a BLEU score and how do you calculate it?'], freeStep1Title: 'Download the Flickr8k dataset', datasetName: 'Flickr8k Dataset (8,000 images with 5 captions each)' },
  { id: 'intrusion-detection', letter: 'I', title: 'Intrusion Detection System', category: 'Cybersecurity', difficulty: 3, buildTimeDays: '3-5 days', trending: false, tagline: 'Detects hackers trying to break into a network.', whatItDoes: 'Monitors network traffic in real time. Flags suspicious patterns like port scanning, brute force login attempts, or unusual data transfers. Distinguishes between normal traffic and attack traffic using machine learning.', realWorldUse: 'Palo Alto Networks, Cisco, and Fortinet use ML-based IDS. Every large corporation and government network runs intrusion detection.', examinerExpects: ['Show detection of simulated attack traffic', 'Explain different types of network attacks', 'Know the false positive rate of your system'], freeVivaQuestions: ['What types of network attacks can your system detect?', 'What is the difference between signature-based and anomaly-based intrusion detection?'], freeStep1Title: 'Download the NSL-KDD or CICIDS2017 dataset', datasetName: 'NSL-KDD Dataset (125,973 training records, 22 attack types)' },
  { id: 'library-management', letter: 'L', title: 'Library Management System', category: 'FullStack', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'Digitize book issue, return, and fine collection.', whatItDoes: 'A library management system for schools or colleges. Students search for books, check availability, and request issue. Librarian marks books as issued or returned. System automatically calculates fines for late returns.', realWorldUse: 'Every public library and school library in India uses some form of LMS. Koha is a popular open-source library system used globally.', examinerExpects: ['Show book search and issue process', 'Demonstrate automated fine calculation for overdue books', 'Explain the database design for book, member, and transaction tables'], freeVivaQuestions: ['How does your system calculate the fine for a book returned 15 days late?', 'How do you prevent two students from issuing the same copy of a book?'], freeStep1Title: 'Design database with books, members, transactions, and fines tables', datasetName: 'No external dataset — populate with dummy library books' },
  { id: 'mental-health-chatbot', letter: 'M', title: 'Mental Health Chatbot', category: 'NLP', difficulty: 3, buildTimeDays: '3-4 days', trending: false, tagline: 'A supportive chatbot for students going through stress.', whatItDoes: 'A chatbot that offers emotional support to students. It listens to what they are feeling, responds with empathy, and suggests coping strategies. If the conversation suggests serious distress, it recommends professional help. Trained on mental health counseling conversations.', realWorldUse: 'Woebot and Wysa are mental health apps used by millions. NIMHANS in India is researching AI-assisted mental health screening. iCall provides online counseling and explores AI tools.', examinerExpects: ['Show a supportive conversation flow for stress and anxiety topics', 'Explain how you handle crisis situations in the chatbot', 'Discuss the ethical responsibilities of building such a system'], freeVivaQuestions: ['How does your chatbot decide when to recommend professional help?', 'What ethical considerations did you take into account when building a mental health chatbot?'], freeStep1Title: 'Download mental health counseling conversations dataset', datasetName: 'Mental Health Counseling Conversations Dataset (Kaggle, 3,512 conversations)' },
  { id: 'movie-recommendation', letter: 'M', title: 'Movie Recommendation System', category: 'DataScience', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'Recommends movies based on what you have watched.', whatItDoes: 'Users rate movies they have watched. The system finds other users with similar taste. It recommends movies those similar users loved but you have not seen yet. This is how Netflix recommends shows to you.', realWorldUse: 'Netflix saves $1 billion per year from improved retention because of recommendations. YouTube, Spotify, and Amazon all use recommendation algorithms.', examinerExpects: ['Show personalized recommendations for a test user', 'Explain the difference between collaborative and content-based filtering', 'Explain the cold start problem'], freeVivaQuestions: ['What is collaborative filtering? How did you implement it?', 'What is the cold start problem and how would you solve it?'], freeStep1Title: 'Download MovieLens dataset from Kaggle or GroupLens', datasetName: 'MovieLens 100K Dataset (100,000 ratings from 943 users on 1,682 movies)' },
  { id: 'news-aggregator', letter: 'N', title: 'News Aggregator App', category: 'FullStack', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'One page shows top news from all sources automatically.', whatItDoes: 'An app that pulls news from multiple sources using news APIs. Displays them in one clean interface. Users can filter by category — sports, tech, politics. Refreshes automatically every few minutes.', realWorldUse: 'Google News, Flipboard, and Inshorts are all news aggregators. These are multi-million dollar products built on the same concept.', examinerExpects: ['Show the live news feed pulling from real news APIs', 'Demonstrate category filtering', 'Explain how web scraping or news APIs work'], freeVivaQuestions: ['What API did you use to fetch news and what are its rate limits?', 'How do you handle duplicate news from different sources?'], freeStep1Title: 'Get a free NewsAPI.org API key and test it', datasetName: 'NewsAPI.org (free tier: 100 requests/day)' },
  { id: 'object-detection-yolo', letter: 'O', title: 'Object Detection System (YOLO)', category: 'AIML', difficulty: 4, buildTimeDays: '3-5 days', trending: false, tagline: 'Camera detects every object in the frame with labels.', whatItDoes: 'A real-time system that detects objects in a video stream. It draws boxes around every detected object and labels them — car, person, bicycle, bottle. Can process video at 30 frames per second. Uses the YOLO (You Only Look Once) algorithm.', realWorldUse: 'Tesla Autopilot uses YOLO-style detection. Security cameras at airports use YOLO for surveillance. Industrial quality control uses YOLO to spot defective products.', examinerExpects: ['Show live object detection on webcam or a video file', 'Explain what makes YOLO faster than other detectors', 'Know the difference between YOLO and R-CNN'], freeVivaQuestions: ['Why is YOLO faster than Region-based CNN (R-CNN)?', 'What is the difference between object detection and image classification?'], freeStep1Title: 'Install Ultralytics YOLOv8 library', datasetName: 'Pre-trained COCO weights (80 object classes) — no training needed' },
  { id: 'online-examination', letter: 'O', title: 'Online Examination System', category: 'FullStack', difficulty: 3, buildTimeDays: '4-5 days', trending: false, tagline: 'Conduct exams online with auto-grading and results.', whatItDoes: 'An online exam platform. Admin creates question papers with MCQ and short answer questions, sets timer. Students log in, take the exam, and submit. System auto-grades MCQs instantly. Results are visible to admin.', realWorldUse: 'NEET and JEE online exams use similar systems. TCS, Infosys, and Wipro use online exams for campus recruitment. Udemy and Coursera use online assessment platforms.', examinerExpects: ['Show the full exam flow — admin creates, student takes, system grades', 'Demonstrate the countdown timer and auto-submit feature', 'Explain how you prevent cheating (tab switch detection)'], freeVivaQuestions: ['How does your system prevent students from cheating by switching browser tabs?', 'How do you handle a student who loses internet connection during the exam?'], freeStep1Title: 'Set up Node.js/Express server and React frontend', datasetName: 'No external dataset — admin creates questions via the portal' },
  { id: 'plagiarism-checker', letter: 'P', title: 'Plagiarism Checker', category: 'NLP', difficulty: 3, buildTimeDays: '3-4 days', trending: false, tagline: 'Check if a document has copied content.', whatItDoes: 'The user uploads or pastes text. The system compares it against a database of reference documents or the internet. It shows the percentage of copied text and highlights which sentences are copied from where.', realWorldUse: 'Turnitin is used by thousands of universities worldwide. Grammarly has a plagiarism checking feature. Most Indian universities use plagiarism detection for thesis submissions.', examinerExpects: ['Demonstrate detection of copied text with source attribution', 'Explain the text similarity algorithm you used', 'Show the highlighted output report'], freeVivaQuestions: ['What algorithm did you use to calculate text similarity?', 'How is your system different from just doing a Google search?'], freeStep1Title: 'Set up Python and install NLTK for text preprocessing', datasetName: 'No external dataset — you test against documents you collect' },
  { id: 'sentiment-analysis-twitter', letter: 'S', title: 'Sentiment Analysis (Twitter)', category: 'NLP', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'Find out if Twitter is angry or happy about any topic.', whatItDoes: 'The user types any topic or hashtag. The system fetches recent tweets about that topic. It analyzes each tweet and says: positive, negative, or neutral. It shows a pie chart of overall sentiment. Great for brands monitoring their reputation.', realWorldUse: 'Every major brand uses Twitter sentiment analysis. During IPL, teams track fan sentiment. During elections, parties monitor social media mood. It is a multi-billion dollar industry.', examinerExpects: ['Show live sentiment analysis on a real hashtag or topic', 'Explain how VADER or your chosen model classifies sentiment', 'Show the visualization — pie chart or bar graph'], freeVivaQuestions: ['What is VADER and how is it different from training your own sentiment model?', 'How do you handle sarcasm in tweets? Your model probably gets it wrong.'], freeStep1Title: 'Get Twitter API keys (v2 free tier) or use a pre-collected dataset', datasetName: 'Sentiment140 Dataset (1.6 million tweets, pre-labeled) or Twitter API v2' },
  { id: 'sign-language-recognition', letter: 'S', title: 'Sign Language Recognition', category: 'AIML', difficulty: 3, buildTimeDays: '3-5 days', trending: false, tagline: 'Camera reads sign language gestures and converts to text.', whatItDoes: 'The user makes American Sign Language (ASL) hand gestures in front of the webcam. The system recognizes each gesture and converts it to the corresponding letter or word. Helps bridge communication between hearing-impaired people and others.', realWorldUse: 'Google has researched sign language recognition using MediaPipe. Signapse is a startup converting sign language videos to text. Microsoft Azure has sign language translation capabilities.', examinerExpects: ['Demonstrate recognition of at least 10 ASL alphabet gestures', 'Explain how MediaPipe or your CNN detects the gestures', 'Know the accuracy on the test set'], freeVivaQuestions: ['How does your system distinguish between similar-looking signs like D and F?', 'What is the frame rate of your real-time recognition and why does it matter?'], freeStep1Title: 'Download ASL Alphabet Dataset from Kaggle', datasetName: 'ASL Alphabet Dataset (87,000 images, 29 classes)' },
  { id: 'smart-traffic-system', letter: 'S', title: 'Smart Traffic Management System', category: 'AIML', difficulty: 4, buildTimeDays: '4-6 days', trending: false, tagline: 'AI controls traffic lights based on real vehicle count.', whatItDoes: 'Cameras at each traffic signal count the number of vehicles in each lane using computer vision. The traffic light stays green for longer for the lane with more vehicles. This reduces total waiting time compared to fixed timing systems.', realWorldUse: 'Bengaluru and Mumbai have piloted adaptive traffic signal systems. Google Maps uses historical traffic data to optimize routes. Smart city projects across India are implementing this.', examinerExpects: ['Simulate the adaptive signal timing based on vehicle counts', 'Demonstrate vehicle detection using YOLO or background subtraction', 'Show the comparison: fixed timing vs adaptive timing'], freeVivaQuestions: ['How do you count vehicles in real time? What algorithm handles overlapping vehicles?', 'How much would fixed timing vs your system differ on a congested road?'], freeStep1Title: 'Install YOLO for vehicle detection, start with traffic video footage', datasetName: 'COCO pre-trained weights for vehicle detection + any traffic video' },
  { id: 'spam-email-classifier', letter: 'S', title: 'Spam Email Classifier', category: 'NLP', difficulty: 2, buildTimeDays: '1-2 days', trending: false, tagline: 'Classifies emails as spam or not spam automatically.', whatItDoes: 'The user enters an email subject and body. The system classifies it as spam or ham (not spam). Uses Naive Bayes — the same algorithm Gmail uses internally. Shows the spam probability percentage.', realWorldUse: 'Gmail filters 100 million spam emails per day using ML. SpamAssassin is an open-source spam filter used by many email servers.', examinerExpects: ['Show predictions on 5 spam and 5 legitimate emails', 'Explain how Naive Bayes calculates spam probability', 'Know why Naive Bayes works well for text classification'], freeVivaQuestions: ['Why is Naive Bayes called "naive"? What assumption does it make?', 'What is the difference between spam and ham in email classification?'], freeStep1Title: 'Download SMS Spam Collection dataset from Kaggle', datasetName: 'SMS Spam Collection (5,574 messages, labeled spam/ham)' },
  { id: 'stock-price-prediction', letter: 'S', title: 'Stock Price Prediction', category: 'DataScience', difficulty: 3, buildTimeDays: '3-4 days', trending: false, tagline: 'Predicts next day stock price using historical data.', whatItDoes: 'The user enters a stock ticker (like RELIANCE or TCS). The system downloads historical price data and trains a model to predict tomorrow\'s closing price. Shows a graph comparing predicted vs actual prices.', realWorldUse: 'Hedge funds use ML models for trading. Zerodha and Groww use algorithmic systems. Renaissance Technologies (an ML hedge fund) made $100 billion in profits using similar approaches.', examinerExpects: ['Show price prediction chart for at least 3 months of data', 'Explain why stock prediction is hard and never fully accurate', 'Know what RMSE and MAE mean for your model'], freeVivaQuestions: ['What is LSTM and why is it better than a simple linear regression for time series?', 'Why can you never perfectly predict stock prices?'], freeStep1Title: 'Install yfinance library to download stock data', datasetName: 'Yahoo Finance via yfinance library (free, no signup)' },
  { id: 'student-performance-predictor', letter: 'S', title: 'Student Performance Predictor', category: 'DataScience', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'Predicts a student\'s final grade based on study habits.', whatItDoes: 'Based on inputs like study hours, attendance, parental education, and past grades — the system predicts the student\'s final exam score. Helps teachers identify students who need extra attention early.', realWorldUse: 'Pearson and Coursera use learning analytics to predict student success. Khan Academy uses performance prediction to personalize learning paths.', examinerExpects: ['Show predictions for test students', 'Identify which features most affect performance', 'Explain the model you used and why'], freeVivaQuestions: ['Which input feature has the most impact on predicted final grade?', 'How do you validate that your model is not just memorizing the training data?'], freeStep1Title: 'Download Student Performance Dataset from UCI ML Repository', datasetName: 'Student Performance Dataset (395 students, 30 features)' },
  { id: 'text-summarizer', letter: 'T', title: 'Text Summarizer App', category: 'NLP', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'Paste a long article. Get a 3-sentence summary.', whatItDoes: 'The user pastes a long article or document. The system reads it and generates a short summary — the 3 most important sentences or a condensed version. Works for news articles, research papers, or any long text.', realWorldUse: 'Inshorts (the news app) uses AI summarization. Google\'s AI Overviews uses text summarization. Microsoft Word now has a built-in AI summarize feature.', examinerExpects: ['Demonstrate summarization on a 3-page article', 'Explain extractive vs abstractive summarization', 'Compare your summary to a human-written summary'], freeVivaQuestions: ['What is the difference between extractive and abstractive summarization?', 'How do you evaluate if a summary is good? What metric did you use?'], freeStep1Title: 'Install HuggingFace transformers and NLTK libraries', datasetName: 'CNN/Daily Mail Dataset or use any news articles you find online' },
  { id: 'url-shortener', letter: 'U', title: 'URL Shortener App', category: 'FullStack', difficulty: 1, buildTimeDays: '1-2 days', trending: false, tagline: 'Converts long URLs to short shareable links.', whatItDoes: 'The user enters a long URL. The system generates a short URL. When anyone visits the short URL, they are redirected to the original. Tracks how many times each short URL was clicked.', realWorldUse: 'Bit.ly processes 31 million URLs per day. TinyURL has been running since 2002. Every social media platform uses URL shortening. Indian startups like short.io offer white-label URL shortening.', examinerExpects: ['Demonstrate full flow — shorten URL, visit short URL, get redirected', 'Show click analytics dashboard', 'Explain how you generate unique short codes'], freeVivaQuestions: ['How do you generate the unique 6-character short code? How do you ensure no duplicates?', 'How does the HTTP redirect work when someone clicks a short URL?'], freeStep1Title: 'Set up Node.js/Express server with MongoDB', datasetName: 'No external dataset — system generates its own URL mappings' },
  { id: 'weather-prediction', letter: 'W', title: 'Weather Prediction System', category: 'DataScience', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'Predicts tomorrow\'s weather using historical patterns.', whatItDoes: 'The system uses historical weather data to predict tomorrow\'s temperature, humidity, and rain probability. Shows a 7-day weather forecast. Fetches real-time data from an open weather API.', realWorldUse: 'IMD (India Meteorological Department) uses ML models for monsoon prediction. Weather.com and AccuWeather use ensemble ML models for their forecasts.', examinerExpects: ['Show a weather forecast for the next 7 days for any city', 'Explain which ML model you used and why', 'Compare your prediction with actual weather data'], freeVivaQuestions: ['What is the difference between weather and climate? Why does it matter for your ML model?', 'What is an ensemble model and did you use one?'], freeStep1Title: 'Get free OpenWeatherMap API key', datasetName: 'OpenWeatherMap API (free tier: 60 calls/minute) + historical CSV from Kaggle' },
  { id: 'whatsapp-chat-analyzer', letter: 'W', title: 'WhatsApp Chat Analyzer', category: 'DataScience', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'Analyze your WhatsApp group chat statistics.', whatItDoes: 'The user exports their WhatsApp chat as a .txt file and uploads it. The system shows: who messages most, most active times of day, most used words, emoji analysis, and monthly activity graphs. Fun and actually useful.', realWorldUse: 'While not a commercial product itself, the skills used — text parsing, data visualization, and pattern analysis — are directly applicable to social media analytics roles.', examinerExpects: ['Show a complete analysis of a test WhatsApp export file', 'Explain how you parsed the WhatsApp text file format', 'Show at least 5 different visualizations'], freeVivaQuestions: ['How did you parse the WhatsApp chat text file format? What challenges did you face?', 'How do you handle media files that WhatsApp shows as "<Media omitted>"?'], freeStep1Title: 'Get a WhatsApp chat export from any group', datasetName: 'Your own WhatsApp chat export (.txt file)' },
  { id: 'voting-blockchain', letter: 'V', title: 'Voting System using Blockchain', category: 'Blockchain', difficulty: 4, buildTimeDays: '5-7 days', trending: false, tagline: 'A tamper-proof digital voting system no one can hack.', whatItDoes: 'Each voter gets a unique token. They cast one vote using that token. The vote is recorded on a blockchain — a permanent, public, unchangeable ledger. After voting ends, anyone can verify the count without trusting any central authority.', realWorldUse: 'Moscow piloted blockchain voting in 2019. Sierra Leone was the first country to use blockchain in a national election. Utah County in USA used blockchain voting for overseas military voters.', examinerExpects: ['Demonstrate one voter casting one vote on the blockchain', 'Explain why blockchain prevents vote tampering', 'Show the vote count verification process'], freeVivaQuestions: ['Why can\'t someone change a vote after it is cast on the blockchain?', 'What is a smart contract and how does it enforce voting rules?'], freeStep1Title: 'Install Truffle and Ganache for local Ethereum blockchain', datasetName: 'No external dataset — you create voter and candidate data' },
  { id: 'voice-assistant', letter: 'V', title: 'Virtual Assistant (Voice-Controlled)', category: 'NLP', difficulty: 2, buildTimeDays: '2-3 days', trending: false, tagline: 'Say a command. Your computer does it automatically.', whatItDoes: 'The user speaks a command: "Open Chrome", "What time is it?", "Search for weather in Mumbai". The system converts speech to text, understands the command, and executes it. A simple personal Siri or Alexa.', realWorldUse: 'Amazon Alexa, Google Assistant, Apple Siri, and Microsoft Cortana are all built on this concept. Indian startup Haptik powers voice assistants for Jio and other companies.', examinerExpects: ['Demonstrate at least 10 different voice commands working', 'Explain how speech-to-text conversion works', 'Show how you handle commands your assistant does not understand'], freeVivaQuestions: ['What is the speech recognition library you used and how does it convert audio to text?', 'How does your assistant understand the meaning of a command, not just the words?'], freeStep1Title: 'Install SpeechRecognition and pyttsx3 Python libraries', datasetName: 'No external dataset — you train with your own voice commands' },
];

const rawTopicList: TopicCard[] = [
  TOPIC_MAP['face-recognition-attendance'],
  TOPIC_MAP['plant-disease-detection'],
  TOPIC_MAP['credit-card-fraud-detection'],
  TOPIC_MAP['ai-chatbot-college-faq'],
  ...ORIGINAL_STUBS,
  ...TOPICS_555,
  ...TOPICS_EXTRA,
  ...TOPICS_EXTRA2,
  ...TOPICS_EXTRA3,
  ...TOPICS_EXTRA4,
];

const seenTopicIds = new Set<string>();
export const ALL_TOPICS: TopicCard[] = [];
for (const item of rawTopicList) {
  if (item && item.id && !seenTopicIds.has(item.id)) {
    seenTopicIds.add(item.id);
    ALL_TOPICS.push(item);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

const GENERATED_BLUEPRINT_CACHE = new Map<string, FullBlueprint>();

export function getTopicById(id: string): FullBlueprint | undefined {
  if (TOPIC_MAP[id]) return TOPIC_MAP[id];
  if (GENERATED_BLUEPRINT_CACHE.has(id)) return GENERATED_BLUEPRINT_CACHE.get(id);

  const card = ALL_TOPICS.find((t) => t.id === id);
  if (!card) return undefined;

  const full = synthesizeFullBlueprint(card);
  GENERATED_BLUEPRINT_CACHE.set(id, full);
  return full;
}

export function getFeaturedTopics(): TopicCard[] {
  return ALL_TOPICS.filter(t => t.trending).slice(0, 6);
}

export function getTopicsByLetter(letter: string): TopicCard[] {
  return ALL_TOPICS.filter(t => t.letter.toUpperCase() === letter.toUpperCase());
}

export function getAllLetters(): string[] {
  const letters = new Set(ALL_TOPICS.map(t => t.letter.toUpperCase()));
  return Array.from(letters).sort();
}

export function searchTopics(query: string): TopicCard[] {
  if (!query.trim()) return ALL_TOPICS;
  const q = query.toLowerCase();
  return ALL_TOPICS.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.tagline.toLowerCase().includes(q) ||
    t.whatItDoes.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  );
}
