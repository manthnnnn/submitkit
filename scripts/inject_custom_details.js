const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const customDetails = {
  "aerofuel-predictor": "This project specifically targets the aviation sector by predicting how much fuel an aircraft will actually consume. It analyzes flight data, weather conditions, and route distances to stop airlines from over-fueling, saving massive costs and reducing carbon emissions.",
  "healthcare-ehr-portal": "This project solves the massive headache of lost medical records. It provides a centralized dashboard where doctors and patients can securely upload, view, and share Electronic Health Records (EHR) instantly, meaning patients don't have to carry physical files from clinic to clinic.",
  "spaceshield-ai": "This project acts like a traffic control system for satellites. It uses machine learning to predict the exact path of orbital space debris and warns satellite operators in advance, preventing catastrophic collisions that could destroy billion-dollar equipment.",
  "resume-parsing-engine": "This project automatically reads through thousands of uploaded resumes, extracts the key skills, and scores candidates based on the job description. HR managers can skip the manual reading phase and instantly see the top 5 most qualified candidates.",
  "skin-lesion-classifier": "This project allows users to upload a photo of a skin mark or acne. It then uses deep learning to classify what type of skin lesion it is. This acts as an immediate preliminary screening tool before the user goes to a real dermatologist.",
  "crop-disease-detector": "This project helps farmers identify sick plants instantly. A farmer simply uploads a picture of a crop leaf, and the AI detects exactly what disease the plant has and suggests the correct pesticide, saving the harvest from ruin.",
  "fake-news-verifier": "This project tackles the spread of misinformation on social media. You input an article URL or text, and the AI cross-references the claims against trusted sources to give a 'Truth Score', instantly spotting deepfakes and clickbait.",
  "smart-city-traffic": "This project uses computer vision to monitor live CCTV feeds of city intersections. It detects accidents the second they happen and automatically alerts emergency services, completely skipping the need for a bystander to call 911.",
  "face-attendance-system": "This project replaces manual roll calls in colleges and offices. Students simply walk into the classroom, the camera recognizes their faces, and their attendance is automatically marked in the database without wasting 15 minutes of lecture time.",
  "web3-voting-system": "This project runs college or local elections on the blockchain. Because votes are stored as immutable smart contracts, it is literally impossible for anyone to tamper with the results or cast fake votes, ensuring a 100% fair election.",
  "smart-expense-tracker": "This project is a personal finance dashboard that doesn't just track spending, it learns from it. It categorizes your transactions and predicts where you will overspend next month so you can adjust your budget before you go broke.",
  "restaurant-qr-ordering": "This project replaces physical menus and waiters. Customers scan a QR code at their table, browse the menu on their phone, and send the order directly to the kitchen display screen, significantly reducing wait times and order mistakes.",
  "ransomware-sandbox": "This project is a secure, isolated environment designed specifically for cybersecurity analysis. It safely detonates suspected ransomware files to observe how they try to encrypt files, helping security researchers build better antivirus tools.",
  "sql-injection-scanner": "This project automatically tests websites for database vulnerabilities. You input a URL, and it safely fires hundreds of test queries to see if the site is vulnerable to SQL injection, generating a security report before hackers can exploit it.",
  "phishing-detector-ai": "This project acts as a security guard for your browser. It uses machine learning to analyze the URL and website structure of links sent via email. If it detects a fake login page trying to steal your password, it blocks the site immediately.",
  "movie-recommender": "This project figures out exactly what movie you should watch next. Instead of basic genre filtering, it uses collaborative filtering to find users with similar tastes to you, and recommends the hidden gems that they loved.",
  "blockchain-identity": "This project gives users total control over their personal data. Instead of trusting Facebook or Google with your identity, it creates a Decentralized Identifier (DID) on the blockchain, letting you log into apps without a centralized password.",
  "spam-classifier-nlp": "This project is exactly what stops junk texts and emails. It uses Natural Language Processing to read incoming messages, detect spammy keywords or scam patterns, and automatically filters the junk into a separate folder.",
  "wifi-deauth-monitor": "This project is a defensive tool that detects when someone is trying to hack your Wi-Fi. It specifically monitors for 'Deauthentication Attacks'—a common method hackers use to kick you off your network—and alerts the network admin instantly.",
  "crypto-crowdfunding": "This project is like Kickstarter, but runs entirely on cryptocurrency. Creators can raise funds globally without paying massive banking fees, and investors are protected by smart contracts that automatically refund them if the goal isn't met.",
  "twitter-sentiment-analysis": "This project tracks public opinion in real-time. It streams live tweets about a specific hashtag or brand, uses AI to figure out if the sentiment is positive, negative, or neutral, and plots it on a live dashboard for marketing teams.",
  "web3-freelance-platform": "This project connects freelancers with clients without taking a 20% cut like Upwork. Payments are locked in a smart contract escrow, meaning the freelancer is guaranteed to get paid when they deliver the work, and the client is protected from scams.",
  "nft-marketplace": "This project is a fully functional decentralized app (DApp) where users can mint, buy, and sell digital artwork as NFTs. It connects directly to MetaMask and handles all royalties automatically via smart contracts.",
  "virtual-try-on": "This project brings the fitting room to your house. It uses your webcam to track your facial landmarks and overlays 3D models of glasses onto your face in real-time, letting you see exactly how they look before you buy them.",
  "decentralized-cloud-storage": "This project is a Web3 alternative to Google Drive. Instead of storing your files on a central server, it encrypts them and splits them across the IPFS network, meaning no single company can ever spy on or delete your personal files.",
  "plagiarism-checker-tool": "This project helps professors and students check assignments for copying. You upload a document, and the system compares every sentence against a massive database of previous papers and web articles, highlighting exact matches and giving a uniqueness score.",
  "e-learning-lms": "This project is a complete online course platform. Instructors can upload video lectures and quizzes, while students can track their progress, take notes, and earn a digital certificate upon completion.",
  "alumni-networking-portal": "This project connects current college students with graduated alumni. It features a job board, mentorship requests, and an alumni directory, making it incredibly easy for students to get referrals for their first tech jobs.",
  "real-estate-bidding": "This project brings property auctions online. It features a real-time WebSocket dashboard where multiple buyers can place bids on a house simultaneously, updating the highest price instantly without needing to refresh the page.",
  "blood-bank-management": "This project solves blood shortages in emergencies. It connects hospitals directly with registered donors, tracks exactly how much blood of each type is in the fridge, and sends instant SMS alerts to nearby donors when a rare blood type is needed.",
  "house-price-prediction": "This project tells you exactly how much a house should cost. You enter the number of bedrooms, location, and square footage, and the machine learning model compares it against historical real estate data to estimate the fair market value.",
  "honey-pot-server": "This project is a trap for hackers. It pretends to be a vulnerable server with open ports. When a hacker tries to break in, the honeypot silently logs their IP address and attack methods, feeding that intelligence back to the security team.",
  "credit-card-fraud": "This project detects stolen credit cards in milliseconds. Every time a transaction happens, the AI analyzes the location, amount, and spending habits. If the transaction looks suspicious, it flags and blocks it before the money is lost.",
  "driver-drowsiness-alert": "This project stops drivers from falling asleep at the wheel. It uses a webcam on the dashboard to track the driver's eyes. If it detects the driver's eyes closing for more than two seconds, it triggers a loud alarm.",
  "supply-chain-blockchain": "This project guarantees product authenticity. From the factory to the retail store, every step of the shipping process is logged on the blockchain. Customers can scan a QR code on the box to verify their luxury item isn't a counterfeit.",
  "blockchain-notary": "This project replaces public notaries. You upload a legal document, and the system generates a cryptographic hash and stores it on the blockchain. This proves beyond any doubt that the document existed at that specific time and hasn't been altered.",
  "online-code-compiler": "This project is a cloud-based IDE just like LeetCode. Users can type Python, C++, or Java code in the browser, hit run, and the backend safely executes the code in an isolated Docker container, returning the output instantly.",
  "steganography-tool": "This project hides secret messages inside normal-looking image files. You can type a highly sensitive message, upload a picture of a cat, and the tool subtly alters the image pixels to contain the text, making it invisible to the naked eye.",
  "sign-language-translator": "This project breaks the communication barrier for the deaf community. It uses the webcam to track hand gestures and translates American Sign Language (ASL) directly into spoken words or text in real-time.",
  "dapp-staking": "This project lets cryptocurrency holders earn passive income. Users deposit their tokens into the staking smart contract, lock them up for a period of time, and automatically earn interest payouts without a centralized bank taking a cut.",
  "bug-tracking-system": "This project keeps software development teams organized. Testers can log bugs, assign severity levels, and tag developers. It gives the project manager a complete dashboard of what's broken and who is fixing it.",
  "keylogger-detector": "This project protects your passwords from being stolen. It constantly scans your computer's running processes and memory to detect malicious spyware that is secretly recording your keystrokes.",
  "network-ids": "This project acts as a security guard for a corporate network. It sniffs all incoming and outgoing internet traffic in real-time and raises an alert if it detects the signature of a DDoS attack or a malware infection.",
  "password-strength-nn": "This project teaches users to make better passwords. Instead of simple rules like 'must contain a number', it uses a neural network trained on millions of leaked passwords to determine exactly how easily a hacker could guess your input.",
  "customer-churn-ml": "This project helps businesses stop losing customers. It analyzes user activity—like how often they log in or if they complained to support—and predicts which users are about to cancel their subscription, so the company can offer them a discount.",
  "stock-predictor-lstm": "This project predicts tomorrow's stock market prices. It uses an advanced Long Short-Term Memory (LSTM) neural network to analyze years of historical stock charts and output a forecast of whether the price will go up or down.",
  "pneumonia-xray-cnn": "This project helps doctors diagnose patients faster. You upload a chest X-ray image, and the Convolutional Neural Network (CNN) highlights the exact areas of the lungs that show signs of Pneumonia, acting as an AI second opinion.",
  "crypto-portfolio-tracker": "This project gives investors a unified view of their money. Instead of logging into 5 different exchanges, users can connect their APIs and see their total crypto net worth, profit/loss charts, and live coin prices in one beautiful dashboard.",
  "fake-product-identification": "This project stops people from buying fake sneakers or watches. The manufacturer embeds an NFC chip linking to a Web3 smart contract. The buyer simply taps their phone to the product to instantly verify its authenticity on the blockchain.",
  "blockchain-land-registry": "This project solves real estate disputes and property fraud. Instead of relying on corruptible physical paper records, the ownership deeds for land are digitized and stored on a public blockchain, ensuring the true owner can always be verified.",
  "task-management-kanban": "This project is a productivity tool similar to Trello. Users can create boards, drag and drop tasks between 'To Do', 'In Progress', and 'Done' columns, and collaborate with their teammates in real-time."
};

async function run() {
  console.log('Injecting unique, easy-language descriptions for 51 projects...');

  for (const slug of Object.keys(customDetails)) {
    const detailText = customDetails[slug] + "\\n\\n**Why is this project unique?**\\n• It completely automates manual workflows.\\n• It provides a beautiful, clean interface that anyone can use immediately.\\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.";
    
    const { error } = await supabase
      .from('projects')
      .update({ problem_statement: detailText })
      .eq('slug', slug);

    if (error) {
      console.error(`Failed to update ${slug}:`, error);
    }
  }

  console.log('Successfully injected unique project details!');
}

run();
