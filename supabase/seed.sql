-- Seed data for initial projects
INSERT INTO projects (slug, title, category, tier, price_inr, description, problem_statement, architecture_details, tech_stack, features, live_demo_url, s3_storage_key, report_template_key)
VALUES
(
    'resume-parsing-engine',
    'AI Resume Parsing & Scoring Engine',
    'AIML',
    'MINI',
    299,
    'Automated CV screener matching resume keyword vectors against job descriptions using spaCy NLP.',
    'This project automatically reads through thousands of uploaded resumes, extracts the key skills, and scores candidates based on the job description. HR managers can skip the manual reading phase and instantly see the top 5 most qualified candidates.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, spaCy, FastAPI, Next.js.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'spaCy', 'FastAPI', 'Next.js'],
    ARRAY['PDF text extraction', 'NLP entity recognition', 'Keyword vector matching', 'Score dashboard'],
    'https://ui.shadcn.com/examples/tasks',
    'bundles/mini/resume-parser.zip',
    'templates/mini/resume-parser-report.docx'
),
(
    'healthcare-ehr-portal',
    'Centralized Smart Healthcare & EHR Portal',
    'FullStack',
    'MAJOR',
    499,
    'Role-based medical record portal featuring patient portals, doctor appointment scheduling, and encrypted medical history storage.',
    'This project solves the massive headache of lost medical records. It provides a centralized dashboard where doctors and patients can securely upload, view, and share Electronic Health Records (EHR) instantly, meaning patients don''t have to carry physical files from clinic to clinic.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Next.js, Node.js, MongoDB, Express.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Next.js', 'Node.js', 'MongoDB', 'Express'],
    ARRAY['Role-based access control (RBAC)', 'AES-256 data encryption', 'Appointment scheduling', 'PDF prescription generation'],
    'https://ui.shadcn.com/examples/mail',
    'bundles/major/healthcare-ehr.zip',
    'templates/major/healthcare-ehr-report.docx'
),
(
    'spaceshield-ai',
    'SpaceShield AI: Orbital Debris Avoidance',
    'FullStack',
    'MAJOR',
    499,
    'Real-time orbital space debris collision avoidance system using SGP4 orbit propagation algorithms and satellite proximity warnings.',
    'This project acts like a traffic control system for satellites. It uses machine learning to predict the exact path of orbital space debris and warns satellite operators in advance, preventing catastrophic collisions that could destroy billion-dollar equipment.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, FastAPI, Three.js, PostgreSQL.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'FastAPI', 'Three.js', 'PostgreSQL'],
    ARRAY['SGP4 propagation', '3D WebGL visualization', 'Real-time collision alerts', 'Historical TLE data analysis'],
    'https://ui.shadcn.com/examples/music',
    'bundles/major/spaceshield.zip',
    'templates/major/spaceshield-report.docx'
),
(
    'aerofuel-predictor',
    'AeroFuel Predictor AI',
    'AIML',
    'MINI',
    299,
    'Aircraft fuel consumption estimator using multi-variable regression models based on flight trajectory and payload inputs.',
    'This project specifically targets the aviation sector by predicting how much fuel an aircraft will actually consume. It analyzes flight data, weather conditions, and route distances to stop airlines from over-fueling, saving massive costs and reducing carbon emissions.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, Streamlit, Scikit-Learn, Pandas.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'Streamlit', 'Scikit-Learn', 'Pandas'],
    ARRAY['Multi-variable regression', 'Interactive web dashboard', 'CSV data export', 'Real-time inference'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/mini/aerofuel.zip',
    'templates/mini/aerofuel-report.docx'
),
(
    'skin-lesion-classifier',
    'Skin Lesion & Acne Classifier',
    'AIML',
    'MINI',
    299,
    'Deep learning classification engine using MobileNetV2 with an immediate camera upload UI.',
    'This project allows users to upload a photo of a skin mark or acne. It then uses deep learning to classify what type of skin lesion it is. This acts as an immediate preliminary screening tool before the user goes to a real dermatologist.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, TensorFlow, Flask, React.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'TensorFlow', 'Flask', 'React'],
    ARRAY['MobileNetV2 architecture', 'Live camera capture', 'Confidence scoring', 'REST API'],
    'https://ui.shadcn.com/examples/cards',
    'bundles/mini/skin-lesion.zip',
    'templates/mini/skin-lesion-report.docx'
),
(
    'face-attendance-system',
    'Smart Class Attendance via Face Recognition',
    'AIML',
    'MINI',
    299,
    'Automated college attendance system using classroom CCTV feeds to recognize student faces and update the attendance database.',
    'This project replaces manual roll calls in colleges and offices. Students simply walk into the classroom, the camera recognizes their faces, and their attendance is automatically marked in the database without wasting 15 minutes of lecture time.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, OpenCV, dlib, MySQL.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'OpenCV', 'dlib', 'MySQL'],
    ARRAY['Multiple face detection', 'Spoofing prevention', 'Automated Excel reports', 'Teacher dashboard'],
    'https://ui.shadcn.com/examples/forms',
    'bundles/mini/face-attendance.zip',
    'templates/mini/face-attendance-report.docx'
),
(
    'fake-news-verifier',
    'Fake News & Deepfake Verification Engine',
    'Cybersecurity',
    'MINI',
    299,
    'An NLP and image analysis tool that fact-checks news articles and detects deepfake image manipulations on social media.',
    'This project tackles the spread of misinformation on social media. You input an article URL or text, and the AI cross-references the claims against trusted sources to give a ''Truth Score'', instantly spotting deepfakes and clickbait.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, PyTorch, BeautifulSoup, Next.js.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'PyTorch', 'BeautifulSoup', 'Next.js'],
    ARRAY['URL fact-checking', 'Deepfake image detection', 'Source credibility scoring', 'Chrome extension integration'],
    'https://ui.shadcn.com/examples/tasks',
    'bundles/mini/fake-news.zip',
    'templates/mini/fake-news-report.docx'
),
(
    'smart-expense-tracker',
    'AI Smart Expense Tracker & Analyzer',
    'FullStack',
    'MINI',
    299,
    'A personal finance dashboard that automatically categorizes transactions and predicts monthly spending using machine learning.',
    'This project is a personal finance dashboard that doesn''t just track spending, it learns from it. It categorizes your transactions and predicts where you will overspend next month so you can adjust your budget before you go broke.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: React, Node.js, PostgreSQL, Scikit-Learn.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['React', 'Node.js', 'PostgreSQL', 'Scikit-Learn'],
    ARRAY['Automated categorization', 'Spending prediction', 'Receipt OCR scanning', 'Mobile-responsive UI'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/mini/expense-tracker.zip',
    'templates/mini/expense-tracker-report.docx'
),
(
    'crop-disease-detector',
    'Agricultural Crop Disease Detector',
    'AIML',
    'MINI',
    299,
    'Computer vision app for farmers to take photos of plant leaves and instantly identify diseases and get pesticide recommendations.',
    'This project helps farmers identify sick plants instantly. A farmer simply uploads a picture of a crop leaf, and the AI detects exactly what disease the plant has and suggests the correct pesticide, saving the harvest from ruin.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, TensorFlow, Flask, React.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'TensorFlow', 'Flask', 'React'],
    ARRAY['Real-time leaf scanning', 'Disease classification', 'Remedy recommendations', 'Offline mode support'],
    'https://ui.shadcn.com/examples/cards',
    'bundles/mini/crop-disease.zip',
    'templates/mini/crop-disease-report.docx'
),
(
    'web3-voting-system',
    'Decentralized Campus Voting System',
    'FullStack',
    'MAJOR',
    499,
    'A blockchain-based election system ensuring 100% transparent, tamper-proof, and anonymous voting for university student councils.',
    'This project runs college or local elections on the blockchain. Because votes are stored as immutable smart contracts, it is literally impossible for anyone to tamper with the results or cast fake votes, ensuring a 100% fair election.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Solidity, Ethereum, React, Web3.js.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Solidity', 'Ethereum', 'React', 'Web3.js'],
    ARRAY['Smart contract election logic', 'Metamask integration', 'Immutable vote ledger', 'Real-time tally dashboard'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/major/web3-voting.zip',
    'templates/major/web3-voting-report.docx'
),
(
    'smart-city-traffic',
    'Smart City Traffic & Accident Detector',
    'AIML',
    'MAJOR',
    499,
    'Intelligent traffic management system using YOLOv8 to detect vehicle congestion, illegal parking, and accidents from traffic cams.',
    'This project uses computer vision to monitor live CCTV feeds of city intersections. It detects accidents the second they happen and automatically alerts emergency services, completely skipping the need for a bystander to call 911.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, YOLOv8, FastAPI, React.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'YOLOv8', 'FastAPI', 'React'],
    ARRAY['Real-time vehicle counting', 'Accident detection alerts', 'Number plate recognition (ANPR)', 'Traffic flow heatmaps'],
    'https://ui.shadcn.com/examples/music',
    'bundles/major/smart-city-traffic.zip',
    'templates/major/smart-city-traffic-report.docx'
),
(
    'phishing-detector-ai',
    'AI-Powered Phishing URL Detector',
    'Cybersecurity',
    'MINI',
    299,
    'Machine learning model that analyzes URL lexical features to detect zero-day phishing attacks.',
    'This project acts as a security guard for your browser. It uses machine learning to analyze the URL and website structure of links sent via email. If it detects a fake login page trying to steal your password, it blocks the site immediately.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, Random Forest, Flask, Chrome Extension.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'Random Forest', 'Flask', 'Chrome Extension'],
    ARRAY['URL feature extraction', 'Browser integration', 'Real-time scoring'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/mini/phishing-detector-ai.zip',
    'templates/mini/phishing-detector-ai-report.docx'
),
(
    'movie-recommender',
    'Collaborative Movie Recommender',
    'DataScience',
    'MINI',
    299,
    'Recommendation engine using cosine similarity and matrix factorization on the MovieLens dataset.',
    'This project figures out exactly what movie you should watch next. Instead of basic genre filtering, it uses collaborative filtering to find users with similar tastes to you, and recommends the hidden gems that they loved.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, Surprise Library, React.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'Surprise Library', 'React'],
    ARRAY['User-based filtering', 'Item-based filtering', 'Cold-start handling'],
    'https://ui.shadcn.com/examples/forms',
    'bundles/mini/movie-recommender.zip',
    'templates/mini/movie-recommender-report.docx'
),
(
    'blockchain-identity',
    'Decentralized Identity (DID) Auth',
    'Cybersecurity',
    'MAJOR',
    499,
    'Passwordless authentication system using Ethereum blockchain and verifiable credentials.',
    'This project gives users total control over their personal data. Instead of trusting Facebook or Google with your identity, it creates a Decentralized Identifier (DID) on the blockchain, letting you log into apps without a centralized password.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Solidity, Web3.js, Next.js, Node.js.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Solidity', 'Web3.js', 'Next.js', 'Node.js'],
    ARRAY['Zero-knowledge proofs', 'MetaMask login', 'Identity recovery'],
    'https://ui.shadcn.com/examples/music',
    'bundles/major/blockchain-identity.zip',
    'templates/major/blockchain-identity-report.docx'
),
(
    'spam-classifier-nlp',
    'SMS Spam Classifier (NLP)',
    'AIML',
    'MINI',
    299,
    'Naive Bayes classifier using TF-IDF vectorization to detect spam SMS messages.',
    'This project is exactly what stops junk texts and emails. It uses Natural Language Processing to read incoming messages, detect spammy keywords or scam patterns, and automatically filters the junk into a separate folder.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, Scikit-Learn, NLTK, Flask.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'Scikit-Learn', 'NLTK', 'Flask'],
    ARRAY['TF-IDF Vectorizer', 'Confusion matrix', 'Instant text analysis'],
    'https://ui.shadcn.com/examples/tasks',
    'bundles/mini/spam-classifier-nlp.zip',
    'templates/mini/spam-classifier-nlp-report.docx'
),
(
    'wifi-deauth-monitor',
    'Wi-Fi Deauthentication Monitor',
    'Cybersecurity',
    'MINI',
    299,
    'Detects Wi-Fi deauth attacks (like those from ESP8266) and alerts the network admin.',
    'This project is a defensive tool that detects when someone is trying to hack your Wi-Fi. It specifically monitors for ''Deauthentication Attacks''—a common method hackers use to kick you off your network—and alerts the network admin instantly.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, Scapy, Linux Aircrack-ng.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'Scapy', 'Linux Aircrack-ng'],
    ARRAY['Packet monitoring', 'MAC spoof detection', 'SMS Alerts'],
    'https://ui.shadcn.com/examples/mail',
    'bundles/mini/wifi-deauth-monitor.zip',
    'templates/mini/wifi-deauth-monitor-report.docx'
),
(
    'crypto-crowdfunding',
    'Web3 Crowdfunding Platform',
    'FullStack',
    'MAJOR',
    499,
    'Kickstarter clone where backers fund projects using ETH. Funds are released via milestone voting.',
    'This project is like Kickstarter, but runs entirely on cryptocurrency. Creators can raise funds globally without paying massive banking fees, and investors are protected by smart contracts that automatically refund them if the goal isn''t met.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Solidity, Hardhat, Next.js, TailwindCSS.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Solidity', 'Hardhat', 'Next.js', 'TailwindCSS'],
    ARRAY['Milestone voting', 'Refund mechanism', 'Campaign creation'],
    'https://ui.shadcn.com/examples/tasks',
    'bundles/major/crypto-crowdfunding.zip',
    'templates/major/crypto-crowdfunding-report.docx'
),
(
    'twitter-sentiment-analysis',
    'Real-time Twitter Sentiment Analysis',
    'DataScience',
    'MAJOR',
    499,
    'Streams live tweets using API and classifies them as positive, negative, or neutral using NLP.',
    'This project tracks public opinion in real-time. It streams live tweets about a specific hashtag or brand, uses AI to figure out if the sentiment is positive, negative, or neutral, and plots it on a live dashboard for marketing teams.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, NLTK, Tweepy, Grafana.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'NLTK', 'Tweepy', 'Grafana'],
    ARRAY['Live streaming', 'Emotion classification', 'Word clouds'],
    'https://ui.shadcn.com/examples/music',
    'bundles/major/twitter-sentiment-analysis.zip',
    'templates/major/twitter-sentiment-analysis-report.docx'
),
(
    'web3-freelance-platform',
    'Decentralized Freelance Platform',
    'FullStack',
    'MAJOR',
    499,
    'Upwork clone where payments are locked in an Ethereum smart contract escrow until work is delivered.',
    'This project connects freelancers with clients without taking a 20% cut like Upwork. Payments are locked in a smart contract escrow, meaning the freelancer is guaranteed to get paid when they deliver the work, and the client is protected from scams.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Solidity, Next.js, The Graph.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Solidity', 'Next.js', 'The Graph'],
    ARRAY['Escrow contracts', 'Dispute resolution', 'Gasless transactions'],
    'https://ui.shadcn.com/examples/cards',
    'bundles/major/web3-freelance-platform.zip',
    'templates/major/web3-freelance-platform-report.docx'
),
(
    'nft-marketplace',
    'Decentralized NFT Marketplace',
    'FullStack',
    'MAJOR',
    499,
    'Full-stack Web3 application for minting, buying, and selling ERC-721 tokens (NFTs).',
    'This project is a fully functional decentralized app (DApp) where users can mint, buy, and sell digital artwork as NFTs. It connects directly to MetaMask and handles all royalties automatically via smart contracts.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Solidity, Next.js, Ethers.js, IPFS.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Solidity', 'Next.js', 'Ethers.js', 'IPFS'],
    ARRAY['IPFS Image Hosting', 'Smart contract escrow', 'Wallet integration'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/major/nft-marketplace.zip',
    'templates/major/nft-marketplace-report.docx'
),
(
    'virtual-try-on',
    'AR Virtual Glasses Try-On',
    'AIML',
    'MAJOR',
    499,
    'Augmented Reality web app that uses facial landmarks to overlay 3D glasses on the user face.',
    'This project brings the fitting room to your house. It uses your webcam to track your facial landmarks and overlays 3D models of glasses onto your face in real-time, letting you see exactly how they look before you buy them.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: React, Three.js, MediaPipe, WebRTC.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['React', 'Three.js', 'MediaPipe', 'WebRTC'],
    ARRAY['Facial tracking', '3D model rendering', 'Snapshot feature'],
    'https://ui.shadcn.com/examples/forms',
    'bundles/major/virtual-try-on.zip',
    'templates/major/virtual-try-on-report.docx'
),
(
    'decentralized-cloud-storage',
    'Web3 Dropbox (IPFS)',
    'FullStack',
    'MAJOR',
    499,
    'A decentralized file storage application using IPFS and smart contracts for access control.',
    'This project is a Web3 alternative to Google Drive. Instead of storing your files on a central server, it encrypts them and splits them across the IPFS network, meaning no single company can ever spy on or delete your personal files.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: IPFS, Solidity, React, Pinata.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['IPFS', 'Solidity', 'React', 'Pinata'],
    ARRAY['File encryption', 'IPFS pinning', 'Access management'],
    'https://ui.shadcn.com/examples/music',
    'bundles/major/decentralized-cloud-storage.zip',
    'templates/major/decentralized-cloud-storage-report.docx'
),
(
    'e-learning-lms',
    'E-Learning Course Platform',
    'FullStack',
    'MAJOR',
    499,
    'Udemy clone where instructors upload video courses and students track learning progress.',
    'This project is a complete online course platform. Instructors can upload video lectures and quizzes, while students can track their progress, take notes, and earn a digital certificate upon completion.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Next.js, PostgreSQL, AWS S3, Stripe.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Next.js', 'PostgreSQL', 'AWS S3', 'Stripe'],
    ARRAY['Video streaming', 'Progress tracking', 'Certificate generation'],
    'https://ui.shadcn.com/examples/cards',
    'bundles/major/e-learning-lms.zip',
    'templates/major/e-learning-lms-report.docx'
),
(
    'alumni-networking-portal',
    'College Alumni Networking Portal',
    'FullStack',
    'MAJOR',
    499,
    'A LinkedIn-like platform exclusive to college alumni for job referrals, events, and mentorship.',
    'This project connects current college students with graduated alumni. It features a job board, mentorship requests, and an alumni directory, making it incredibly easy for students to get referrals for their first tech jobs.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: React, Node.js, MongoDB, Socket.io.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['React', 'Node.js', 'MongoDB', 'Socket.io'],
    ARRAY['Job boards', 'Real-time chat', 'Event management', 'Donation portal'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/major/alumni-networking-portal.zip',
    'templates/major/alumni-networking-portal-report.docx'
),
(
    'real-estate-bidding',
    'Real Estate Auction & Bidding',
    'FullStack',
    'MAJOR',
    499,
    'Platform for auctioning properties with live WebSocket bidding and virtual property tours.',
    'This project brings property auctions online. It features a real-time WebSocket dashboard where multiple buyers can place bids on a house simultaneously, updating the highest price instantly without needing to refresh the page.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: React, Node.js, Socket.io, PostgreSQL.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
    ARRAY['Live bidding', 'Virtual tour integration', 'Agent dashboard'],
    'https://ui.shadcn.com/examples/mail',
    'bundles/major/real-estate-bidding.zip',
    'templates/major/real-estate-bidding-report.docx'
),
(
    'house-price-prediction',
    'Real Estate Price Predictor',
    'DataScience',
    'MINI',
    299,
    'Multiple linear regression model that predicts house prices based on location, area, and amenities.',
    'This project tells you exactly how much a house should cost. You enter the number of bedrooms, location, and square footage, and the machine learning model compares it against historical real estate data to estimate the fair market value.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, Scikit-Learn, Streamlit.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'Scikit-Learn', 'Streamlit'],
    ARRAY['Interactive inputs', 'Model evaluation metrics', 'Map visualization'],
    'https://ui.shadcn.com/examples/cards',
    'bundles/mini/house-price-prediction.zip',
    'templates/mini/house-price-prediction-report.docx'
),
(
    'blood-bank-management',
    'Smart Blood Bank Management',
    'FullStack',
    'MINI',
    299,
    'Connects blood donors directly with recipients and tracks blood inventory in hospitals.',
    'This project solves blood shortages in emergencies. It connects hospitals directly with registered donors, tracks exactly how much blood of each type is in the fridge, and sends instant SMS alerts to nearby donors when a rare blood type is needed.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: PHP, Laravel, MySQL, Bootstrap.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
    ARRAY['Donor geolocation', 'Inventory tracking', 'Emergency alerts'],
    'https://ui.shadcn.com/examples/tasks',
    'bundles/mini/blood-bank-management.zip',
    'templates/mini/blood-bank-management-report.docx'
),
(
    'honey-pot-server',
    'Deceptive Honeypot Server',
    'Cybersecurity',
    'MAJOR',
    499,
    'Simulated vulnerable SSH and FTP server to trap attackers and analyze their techniques.',
    'This project is a trap for hackers. It pretends to be a vulnerable server with open ports. When a hacker tries to break in, the honeypot silently logs their IP address and attack methods, feeding that intelligence back to the security team.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, Twisted, Docker, Kibana.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'Twisted', 'Docker', 'Kibana'],
    ARRAY['Protocol simulation', 'Attack logging', 'IP geolocation mapping'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/major/honey-pot-server.zip',
    'templates/major/honey-pot-server-report.docx'
),
(
    'driver-drowsiness-alert',
    'Driver Drowsiness Detection',
    'AIML',
    'MAJOR',
    499,
    'Tracks Eye Aspect Ratio (EAR) using dlib to detect if a driver is falling asleep and sounds an alarm.',
    'This project stops drivers from falling asleep at the wheel. It uses a webcam on the dashboard to track the driver''s eyes. If it detects the driver''s eyes closing for more than two seconds, it triggers a loud alarm.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, OpenCV, dlib, Pygame.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'OpenCV', 'dlib', 'Pygame'],
    ARRAY['Facial landmark detection', 'EAR calculation', 'Audio alerts'],
    'https://ui.shadcn.com/examples/mail',
    'bundles/major/driver-drowsiness-alert.zip',
    'templates/major/driver-drowsiness-alert-report.docx'
),
(
    'supply-chain-blockchain',
    'Blockchain Supply Chain Tracker',
    'FullStack',
    'MAJOR',
    499,
    'Tracks the provenance of pharmaceutical drugs from manufacturer to patient using Ethereum.',
    'This project guarantees product authenticity. From the factory to the retail store, every step of the shipping process is logged on the blockchain. Customers can scan a QR code on the box to verify their luxury item isn''t a counterfeit.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Solidity, React, Truffle, Node.js.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Solidity', 'React', 'Truffle', 'Node.js'],
    ARRAY['Product lifecycle tracking', 'QR code scanning', 'Immutable ledger'],
    'https://ui.shadcn.com/examples/cards',
    'bundles/major/supply-chain-blockchain.zip',
    'templates/major/supply-chain-blockchain-report.docx'
),
(
    'blockchain-notary',
    'Blockchain Document Notary',
    'FullStack',
    'MINI',
    299,
    'Hashes a digital document (PDF) and stores the hash on the blockchain to prove existence at a specific time.',
    'This project replaces public notaries. You upload a legal document, and the system generates a cryptographic hash and stores it on the blockchain. This proves beyond any doubt that the document existed at that specific time and hasn''t been altered.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Solidity, React, SHA-256.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Solidity', 'React', 'SHA-256'],
    ARRAY['Document hashing', 'Timestamping', 'Verification portal'],
    'https://ui.shadcn.com/examples/mail',
    'bundles/mini/blockchain-notary.zip',
    'templates/mini/blockchain-notary-report.docx'
),
(
    'online-code-compiler',
    'Cloud Remote Code Compiler',
    'FullStack',
    'MAJOR',
    499,
    'Leetcode-like web IDE that executes C++, Java, and Python code in isolated Docker containers.',
    'This project is a cloud-based IDE just like LeetCode. Users can type Python, C++, or Java code in the browser, hit run, and the backend safely executes the code in an isolated Docker container, returning the output instantly.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: React, Node.js, Docker, Redis.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['React', 'Node.js', 'Docker', 'Redis'],
    ARRAY['Code execution', 'Sandboxing', 'Syntax highlighting'],
    'https://ui.shadcn.com/examples/cards',
    'bundles/major/online-code-compiler.zip',
    'templates/major/online-code-compiler-report.docx'
),
(
    'steganography-tool',
    'Secure Steganography Vault',
    'Cybersecurity',
    'MINI',
    299,
    'Advanced image steganography tool to hide encrypted text data inside LSB of images.',
    'This project hides secret messages inside normal-looking image files. You can type a highly sensitive message, upload a picture of a cat, and the tool subtly alters the image pixels to contain the text, making it invisible to the naked eye.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, OpenCV, AES-256, Tkinter.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'OpenCV', 'AES-256', 'Tkinter'],
    ARRAY['LSB Encoding', 'AES Encryption', 'Lossless compression'],
    'https://ui.shadcn.com/examples/tasks',
    'bundles/mini/steganography-tool.zip',
    'templates/mini/steganography-tool-report.docx'
),
(
    'sign-language-translator',
    'Sign Language to Text Translator',
    'AIML',
    'MAJOR',
    499,
    'Uses MediaPipe hand tracking and LSTMs to translate live ASL sign language gestures into text.',
    'This project breaks the communication barrier for the deaf community. It uses the webcam to track hand gestures and translates American Sign Language (ASL) directly into spoken words or text in real-time.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, MediaPipe, Keras, React.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'MediaPipe', 'Keras', 'React'],
    ARRAY['Live webcam feed', 'Dynamic gesture recognition', 'Text-to-speech'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/major/sign-language-translator.zip',
    'templates/major/sign-language-translator-report.docx'
),
(
    'ransomware-sandbox',
    'Ransomware Behavior Sandbox',
    'Cybersecurity',
    'MAJOR',
    499,
    'Isolated environment for detonating malware and logging file-system and registry modifications.',
    'This project is a secure, isolated environment designed specifically for cybersecurity analysis. It safely detonates suspected ransomware files to observe how they try to encrypt files, helping security researchers build better antivirus tools.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: C++, Windows API, Python, React.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['C++', 'Windows API', 'Python', 'React'],
    ARRAY['API Hooking', 'Behavioral analysis', 'Report generation'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/major/ransomware-sandbox.zip',
    'templates/major/ransomware-sandbox-report.docx'
),
(
    'plagiarism-checker-tool',
    'Document Plagiarism Checker',
    'FullStack',
    'MINI',
    299,
    'Compares uploaded text against web search results using Cosine Similarity and Jaccard distance.',
    'This project helps professors and students check assignments for copying. You upload a document, and the system compares every sentence against a massive database of previous papers and web articles, highlighting exact matches and giving a uniqueness score.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, Flask, NLTK, Google Search API.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'Flask', 'NLTK', 'Google Search API'],
    ARRAY['Web scraping', 'Similarity score', 'Highlighted copied text'],
    'https://ui.shadcn.com/examples/music',
    'bundles/mini/plagiarism-checker-tool.zip',
    'templates/mini/plagiarism-checker-tool-report.docx'
),
(
    'credit-card-fraud',
    'Credit Card Fraud Detection',
    'DataScience',
    'MINI',
    299,
    'Anomaly detection using Random Forest and SMOTE for highly imbalanced dataset classification.',
    'This project detects stolen credit cards in milliseconds. Every time a transaction happens, the AI analyzes the location, amount, and spending habits. If the transaction looks suspicious, it flags and blocks it before the money is lost.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, Scikit-Learn, Pandas, Dash.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'Scikit-Learn', 'Pandas', 'Dash'],
    ARRAY['SMOTE balancing', 'Precision-Recall curves', 'Live transaction simulation'],
    'https://ui.shadcn.com/examples/cards',
    'bundles/mini/credit-card-fraud.zip',
    'templates/mini/credit-card-fraud-report.docx'
),
(
    'dapp-staking',
    'DeFi Staking DApp',
    'FullStack',
    'MAJOR',
    499,
    'Users stake their ERC-20 tokens to earn yield over time based on smart contract logic.',
    'This project lets cryptocurrency holders earn passive income. Users deposit their tokens into the staking smart contract, lock them up for a period of time, and automatically earn interest payouts without a centralized bank taking a cut.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Solidity, React, Web3.js.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Solidity', 'React', 'Web3.js'],
    ARRAY['Yield farming math', 'Token minting', 'Staking dashboard'],
    'https://ui.shadcn.com/examples/forms',
    'bundles/major/dapp-staking.zip',
    'templates/major/dapp-staking-report.docx'
),
(
    'bug-tracking-system',
    'Enterprise Bug Tracking System',
    'FullStack',
    'MAJOR',
    499,
    'Jira clone for software teams to log, assign, and track the status of software bugs.',
    'This project keeps software development teams organized. Testers can log bugs, assign severity levels, and tag developers. It gives the project manager a complete dashboard of what''s broken and who is fixing it.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Vue.js, Express, MySQL, Redis.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Vue.js', 'Express', 'MySQL', 'Redis'],
    ARRAY['Issue logging', 'Priority levels', 'Developer dashboards'],
    'https://ui.shadcn.com/examples/tasks',
    'bundles/major/bug-tracking-system.zip',
    'templates/major/bug-tracking-system-report.docx'
),
(
    'keylogger-detector',
    'Heuristic Keylogger Detector',
    'Cybersecurity',
    'MINI',
    299,
    'Detects unauthorized global keyboard hooks and warns users of potential spyware.',
    'This project protects your passwords from being stolen. It constantly scans your computer''s running processes and memory to detect malicious spyware that is secretly recording your keystrokes.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: C#, .NET, Windows Forms.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['C#', '.NET', 'Windows Forms'],
    ARRAY['Hook detection', 'Process termination', 'Background scanning'],
    'https://ui.shadcn.com/examples/forms',
    'bundles/mini/keylogger-detector.zip',
    'templates/mini/keylogger-detector-report.docx'
),
(
    'crypto-portfolio-tracker',
    'Crypto Portfolio Tracker',
    'FullStack',
    'MINI',
    299,
    'Web app that connects to Binance/CoinGecko APIs to track user crypto holdings and PnL.',
    'This project gives investors a unified view of their money. Instead of logging into 5 different exchanges, users can connect their APIs and see their total crypto net worth, profit/loss charts, and live coin prices in one beautiful dashboard.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: React, Node.js, CoinGecko API, Chart.js.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['React', 'Node.js', 'CoinGecko API', 'Chart.js'],
    ARRAY['Live price feeds', 'Profit/Loss graphs', 'Portfolio distribution'],
    'https://ui.shadcn.com/examples/tasks',
    'bundles/mini/crypto-portfolio-tracker.zip',
    'templates/mini/crypto-portfolio-tracker-report.docx'
),
(
    'network-ids',
    'Intrusion Detection System (IDS)',
    'Cybersecurity',
    'MAJOR',
    499,
    'Deep learning based network packet analyzer for detecting DDoS and port scanning attacks.',
    'This project acts as a security guard for a corporate network. It sniffs all incoming and outgoing internet traffic in real-time and raises an alert if it detects the signature of a DDoS attack or a malware infection.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, Scapy, TensorFlow, React.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'Scapy', 'TensorFlow', 'React'],
    ARRAY['Live packet sniffing', 'Anomaly detection', 'Alert dashboard'],
    'https://ui.shadcn.com/examples/cards',
    'bundles/major/network-ids.zip',
    'templates/major/network-ids-report.docx'
),
(
    'password-strength-nn',
    'Neural Net Password Strength Analyzer',
    'Cybersecurity',
    'MINI',
    299,
    'RNN-based model that predicts password crackability time better than standard entropy checks.',
    'This project teaches users to make better passwords. Instead of simple rules like ''must contain a number'', it uses a neural network trained on millions of leaked passwords to determine exactly how easily a hacker could guess your input.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, Keras, FastAPI, React.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'Keras', 'FastAPI', 'React'],
    ARRAY['Sequence modeling', 'Real-time feedback', 'Dictionary attack simulation'],
    'https://ui.shadcn.com/examples/tasks',
    'bundles/mini/password-strength-nn.zip',
    'templates/mini/password-strength-nn-report.docx'
),
(
    'customer-churn-ml',
    'Telecom Customer Churn Predictor',
    'DataScience',
    'MINI',
    299,
    'Predicts which customers will leave a service based on usage patterns and billing data.',
    'This project helps businesses stop losing customers. It analyzes user activity—like how often they log in or if they complained to support—and predicts which users are about to cancel their subscription, so the company can offer them a discount.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, XGBoost, Flask, Chart.js.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'XGBoost', 'Flask', 'Chart.js'],
    ARRAY['Feature importance', 'Probability scoring', 'Retention recommendations'],
    'https://ui.shadcn.com/examples/tasks',
    'bundles/mini/customer-churn-ml.zip',
    'templates/mini/customer-churn-ml-report.docx'
),
(
    'stock-predictor-lstm',
    'Stock Market Predictor (LSTM)',
    'DataScience',
    'MAJOR',
    499,
    'Time-series forecasting using Long Short-Term Memory neural networks on historical Yahoo Finance data.',
    'This project predicts tomorrow''s stock market prices. It uses an advanced Long Short-Term Memory (LSTM) neural network to analyze years of historical stock charts and output a forecast of whether the price will go up or down.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, Keras, LSTM, Streamlit.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'Keras', 'LSTM', 'Streamlit'],
    ARRAY['Candlestick charts', 'Future trend prediction', 'Moving averages'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/major/stock-predictor-lstm.zip',
    'templates/major/stock-predictor-lstm-report.docx'
),
(
    'fake-product-identification',
    'Fake Product Identification Web3',
    'FullStack',
    'MAJOR',
    499,
    'Consumers verify luxury product authenticity by checking its cryptographic signature on the blockchain.',
    'This project stops people from buying fake sneakers or watches. The manufacturer embeds an NFC chip linking to a Web3 smart contract. The buyer simply taps their phone to the product to instantly verify its authenticity on the blockchain.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Solidity, React Native, Ethers.js.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Solidity', 'React Native', 'Ethers.js'],
    ARRAY['NFC/QR pairing', 'Ownership transfer', 'Counterfeit prevention'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/major/fake-product-identification.zip',
    'templates/major/fake-product-identification-report.docx'
),
(
    'pneumonia-xray-cnn',
    'Pneumonia Detection from X-Rays',
    'AIML',
    'MAJOR',
    499,
    'Convolutional Neural Network (CNN) to classify chest X-ray images as Normal or Pneumonia.',
    'This project helps doctors diagnose patients faster. You upload a chest X-ray image, and the Convolutional Neural Network (CNN) highlights the exact areas of the lungs that show signs of Pneumonia, acting as an AI second opinion.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, TensorFlow, OpenCV, Next.js.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'TensorFlow', 'OpenCV', 'Next.js'],
    ARRAY['Image augmentation', 'Grad-CAM visualization', 'High accuracy'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/major/pneumonia-xray-cnn.zip',
    'templates/major/pneumonia-xray-cnn-report.docx'
),
(
    'blockchain-land-registry',
    'Blockchain Land Registry System',
    'FullStack',
    'MAJOR',
    499,
    'Government portal to register land titles on a blockchain, preventing property fraud.',
    'This project solves real estate disputes and property fraud. Instead of relying on corruptible physical paper records, the ownership deeds for land are digitized and stored on a public blockchain, ensuring the true owner can always be verified.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Solidity, React, Node.js, MongoDB.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Solidity', 'React', 'Node.js', 'MongoDB'],
    ARRAY['Title transfer', 'Govt inspector approval', 'Immutable records'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/major/blockchain-land-registry.zip',
    'templates/major/blockchain-land-registry-report.docx'
),
(
    'restaurant-qr-ordering',
    'QR Code Restaurant Ordering',
    'FullStack',
    'MINI',
    299,
    'Customers scan a QR code on the table to view the digital menu and place orders to the kitchen.',
    'This project replaces physical menus and waiters. Customers scan a QR code at their table, browse the menu on their phone, and send the order directly to the kitchen display screen, significantly reducing wait times and order mistakes.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Next.js, Firebase, TailwindCSS.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Next.js', 'Firebase', 'TailwindCSS'],
    ARRAY['Digital menu', 'Kitchen display system', 'Bill calculation'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/mini/restaurant-qr-ordering.zip',
    'templates/mini/restaurant-qr-ordering-report.docx'
),
(
    'task-management-kanban',
    'Agile Kanban Task Manager',
    'FullStack',
    'MINI',
    299,
    'Trello clone with drag-and-drop boards, task assignments, and team collaboration.',
    'This project is a productivity tool similar to Trello. Users can create boards, drag and drop tasks between ''To Do'', ''In Progress'', and ''Done'' columns, and collaborate with their teammates in real-time.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: React, Node.js, MongoDB, React-Beautiful-DnD.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['React', 'Node.js', 'MongoDB', 'React-Beautiful-DnD'],
    ARRAY['Drag and drop', 'Role management', 'Deadline notifications'],
    'https://ui.shadcn.com/examples/dashboard',
    'bundles/mini/task-management-kanban.zip',
    'templates/mini/task-management-kanban-report.docx'
),
(
    'sql-injection-scanner',
    'Automated SQLi Vulnerability Scanner',
    'Cybersecurity',
    'MINI',
    299,
    'Web crawler that injects payloads into inputs to detect SQL injection vulnerabilities.',
    'This project automatically tests websites for database vulnerabilities. You input a URL, and it safely fires hundreds of test queries to see if the site is vulnerable to SQL injection, generating a security report before hackers can exploit it.\n\n**Why is this project unique?**\n• It completely automates manual workflows.\n• It provides a beautiful, clean interface that anyone can use immediately.\n• It is built with standard tools, making it very easy to defend in a Viva evaluation.',
    'How does it work under the hood?

This project is built with a highly reliable, industry-standard tech stack: Python, BeautifulSoup, Requests, SQLite.

The Workflow:
1. User Input: The user interacts with a clean, responsive frontend interface.
2. Processing: The backend securely processes the data and runs the core algorithms.
3. Storage & Output: Results are saved to the database and instantly displayed back to the user.

Because it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!',
    ARRAY['Python', 'BeautifulSoup', 'Requests', 'SQLite'],
    ARRAY['Form crawling', 'Payload injection', 'PDF Reporting'],
    'https://ui.shadcn.com/examples/cards',
    'bundles/mini/sql-injection-scanner.zip',
    'templates/mini/sql-injection-scanner-report.docx'
)
ON CONFLICT (slug) DO NOTHING;
