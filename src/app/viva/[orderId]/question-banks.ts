import type { ProjectCategory } from '@/lib/types';

export interface VivaQuestion {
  q: string;
  a: string;
}

export interface VivaSection {
  title: string;
  color: string; // tailwind-compatible hex or class token
  questions: VivaQuestion[];
}

export type VivaSections = VivaSection[];

// ─────────────────────────────────────────────────────────────────────────────
// AIML — Artificial Intelligence & Machine Learning
// ─────────────────────────────────────────────────────────────────────────────
const AIML_SECTIONS: VivaSections = [
  {
    title: 'Architecture & Model Design',
    color: '#818cf8',
    questions: [
      {
        q: 'What type of machine learning model did you use and why?',
        a: 'We selected a supervised learning model (e.g., a deep neural network / Random Forest / XGBoost) because the problem involves labelled training data and a clear output target. The choice was driven by dataset size, interpretability requirements, and benchmark performance on similar tasks in research literature.',
      },
      {
        q: 'Explain the overall architecture of your AI system.',
        a: 'The system follows a pipeline architecture: raw data is ingested into a preprocessing module, passed through feature engineering, fed into the trained model for inference, and the prediction result is served via a REST API to the frontend. Offline, we have a training pipeline that stores artefacts in a model registry.',
      },
      {
        q: 'Why did you choose a neural network over a classical ML algorithm?',
        a: 'Neural networks excel when the input data is high-dimensional (images, text, audio) or when latent feature relationships are complex and non-linear. Classical algorithms like SVM or Logistic Regression are preferred for tabular data with fewer features, but our problem required learning hierarchical representations, justifying the neural approach.',
      },
      {
        q: 'What is the difference between a shallow and a deep neural network?',
        a: 'A shallow network has one hidden layer and can approximate simple functions. A deep network has multiple hidden layers, allowing it to learn increasingly abstract representations — edges → shapes → objects in vision, or tokens → phrases → semantics in NLP. Depth dramatically increases model capacity but also the risk of overfitting.',
      },
      {
        q: 'How did you handle the cold-start problem or lack of initial data?',
        a: 'We addressed data scarcity through transfer learning — starting from a pre-trained model (e.g., ResNet / BERT) and fine-tuning on our domain-specific dataset. Additionally, data augmentation and synthetic data generation (SMOTE for tabular imbalance) helped expand the effective training set.',
      },
    ],
  },
  {
    title: 'Training & Evaluation',
    color: '#34d399',
    questions: [
      {
        q: 'What train/validation/test split did you use and why?',
        a: 'We used a 70/15/15 split. The training set builds model weights, the validation set guides hyperparameter tuning and early stopping, and the test set provides an unbiased final evaluation. A held-out test set is critical — evaluating on training data inflates accuracy metrics.',
      },
      {
        q: 'How did you prevent overfitting in your model?',
        a: 'We applied Dropout layers (randomly zeroing neurons during training), L2 regularization on weight matrices, and early stopping monitored on validation loss. Data augmentation further acted as a regularizer by exposing the model to diverse transformations of the training examples.',
      },
      {
        q: 'What evaluation metrics did you use and why are accuracy alone insufficient?',
        a: 'We used Precision, Recall, F1-Score, and AUC-ROC in addition to accuracy. Accuracy is misleading on imbalanced datasets — a model predicting the majority class 95% of the time appears 95% accurate despite being useless. F1 balances precision and recall, making it a better single-metric proxy for imbalanced classification.',
      },
      {
        q: 'What is cross-validation and did you use it?',
        a: 'K-Fold cross-validation partitions the dataset into K folds, trains on K-1 and validates on the remaining fold, rotating K times. It gives a less biased performance estimate by ensuring every sample is in the validation set exactly once. We used 5-fold CV during hyperparameter search to avoid overfitting to a single validation split.',
      },
      {
        q: 'Explain the loss function you used and why.',
        a: 'For multi-class classification we used Categorical Cross-Entropy, which penalizes confident wrong predictions heavily via the log term. For regression, we used Mean Squared Error. The choice of loss directly shapes what the optimizer minimizes, so it must match the problem type — using MSE for classification would produce incorrect gradient signals.',
      },
    ],
  },
  {
    title: 'Data & Feature Engineering',
    color: '#f59e0b',
    questions: [
      {
        q: 'How did you handle missing values in your dataset?',
        a: 'Depending on the feature, we applied mean/median imputation for numerical columns with low missingness, mode imputation for categorical columns, and KNN imputation for features with moderate missingness that showed correlations with other features. Rows with >40% missing values were dropped to avoid noise propagation.',
      },
      {
        q: 'What feature scaling technique did you apply?',
        a: 'We used StandardScaler (z-score normalization) to ensure features have zero mean and unit variance, preventing features with larger numeric ranges from dominating gradient updates. For tree-based models, scaling is less critical since splits are rank-based, but we applied it universally for consistency across the pipeline.',
      },
      {
        q: 'How did you handle class imbalance in your dataset?',
        a: 'We combined SMOTE (Synthetic Minority Oversampling Technique) to synthetically generate minority class samples, and set class_weight="balanced" in the model to up-weight minority class errors in the loss. We also ensured our evaluation metrics were F1 and AUC-ROC rather than raw accuracy.',
      },
      {
        q: 'What feature selection or dimensionality reduction technique did you use?',
        a: 'We applied PCA (Principal Component Analysis) to reduce high-dimensional feature spaces while retaining 95% of explained variance. For feature selection, we used Recursive Feature Elimination (RFE) with the base model to identify the top K most impactful features, reducing overfitting and inference latency.',
      },
      {
        q: 'How did you source and preprocess your dataset?',
        a: 'The dataset was sourced from [Kaggle / UCI ML Repository / a real-world API]. Preprocessing steps included: removing duplicate rows, normalizing date formats, encoding categorical variables (one-hot for nominal, label encoding for ordinal), and splitting the data before any transformation to prevent data leakage from the test set.',
      },
    ],
  },
  {
    title: 'AI-Specific Technical Concepts',
    color: '#f87171',
    questions: [
      {
        q: 'What is the vanishing gradient problem and how did you address it?',
        a: 'In deep networks, gradients shrink exponentially during backpropagation through many layers, making early layers learn very slowly. We addressed this by using ReLU activation functions (which have a constant gradient for positive inputs), Batch Normalization to stabilize activations, and residual connections (skip connections) that provide gradient highways.',
      },
      {
        q: 'Explain the concept of transfer learning as applied in your project.',
        a: 'Transfer learning reuses a model pre-trained on a large dataset (e.g., ImageNet for vision, Wikipedia for NLP) as a starting point. We froze the early layers (which capture generic features) and only fine-tuned the top layers on our domain-specific data. This drastically reduced training time and data requirements while achieving better performance than training from scratch.',
      },
      {
        q: 'What is the role of the optimizer and which one did you choose?',
        a: 'The optimizer determines how model weights are updated based on gradients. We used Adam (Adaptive Moment Estimation), which maintains per-parameter learning rates and momentum estimates. Adam converges faster than vanilla SGD, handles sparse gradients well, and requires less learning rate tuning, making it the standard choice for most deep learning tasks.',
      },
      {
        q: 'How does your model generalize to unseen data?',
        a: 'Generalization is achieved through regularization techniques (Dropout, L2), proper train/test isolation, diverse data augmentation, and cross-validation. We also monitored the gap between training and validation loss — a widening gap signals overfitting. The final model was evaluated exclusively on the held-out test set, which was never seen during training or hyperparameter tuning.',
      },
      {
        q: 'What are the ethical concerns with AI and how did your project address them?',
        a: 'Key ethical concerns include algorithmic bias, privacy, and lack of explainability. We addressed bias by auditing model performance across demographic subgroups and rebalancing training data. For explainability, we used SHAP values to identify which features drove each prediction. We ensured no personally identifiable information was used without anonymization.',
      },
    ],
  },
  {
    title: 'General CS Theory & Soft Questions',
    color: '#a78bfa',
    questions: [
      {
        q: 'What were the biggest limitations of your project?',
        a: 'Our primary limitations were dataset size and domain specificity — the model performs well on data similar to training distribution but may degrade on edge cases. Compute constraints limited our hyperparameter search space. Additionally, the model is a black box in certain configurations, making it harder to explain predictions to non-technical stakeholders.',
      },
      {
        q: 'How would you scale this system to production for millions of users?',
        a: 'We would containerize the model with Docker and deploy on Kubernetes for horizontal scaling. Model serving would use TensorFlow Serving or TorchServe behind a load balancer. Inference results for common inputs would be cached in Redis. A feature store would pre-compute features at ingest time rather than at query time, reducing latency.',
      },
      {
        q: 'What future enhancements would you make to the AI model?',
        a: 'Future improvements include: continuous learning with incoming production data, an A/B testing framework to safely deploy new model versions, model distillation to create a lighter inference model, and multi-modal inputs (combining text + image + structured data) for richer representations.',
      },
      {
        q: 'How did you deploy your AI model and serve predictions?',
        a: 'The trained model was serialized using joblib/pickle (scikit-learn) or ONNX format (for framework portability), loaded at application startup, and exposed via a FastAPI/Next.js API endpoint. Prediction requests are batched where possible to maximise GPU utilization. Model versioning is tracked via MLflow.',
      },
      {
        q: 'Explain the concept of a confusion matrix with an example from your project.',
        a: 'A confusion matrix is a table showing TP (correctly predicted positives), TN (correctly predicted negatives), FP (false alarms), and FN (missed positives). In our project, a FN (missing a positive case) was more costly than a FP, so we tuned the classification threshold to maximize Recall at an acceptable Precision level — a trade-off made explicit by the confusion matrix.',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FullStack — Web Application Development
// ─────────────────────────────────────────────────────────────────────────────
const FULLSTACK_SECTIONS: VivaSections = [
  {
    title: 'Architecture & System Design',
    color: '#818cf8',
    questions: [
      {
        q: 'Describe the overall architecture of your full-stack application.',
        a: 'The application follows a three-tier architecture: a React/Next.js frontend for the presentation layer, a Node.js/Express (or Next.js API routes) backend handling business logic, and a PostgreSQL/MongoDB database for persistence. The frontend communicates with the backend exclusively through RESTful APIs over HTTPS, ensuring a clean separation of concerns.',
      },
      {
        q: 'Why did you choose Next.js over a plain React app?',
        a: 'Next.js provides Server-Side Rendering (SSR) and Static Site Generation (SSG) out of the box, improving SEO and initial page load performance. It also unifies the frontend and API layer in a single project, simplifying deployment. Features like file-based routing, image optimization, and built-in TypeScript support further reduced boilerplate.',
      },
      {
        q: 'What is the difference between SSR, SSG, and CSR?',
        a: 'CSR (Client-Side Rendering) generates HTML in the browser using JavaScript — fast interactions but poor SEO. SSR (Server-Side Rendering) generates HTML per request on the server — great SEO, always fresh data. SSG (Static Site Generation) pre-renders HTML at build time — fastest delivery but data is static until rebuild. We used SSR for dynamic data-heavy pages and SSG for marketing/static pages.',
      },
      {
        q: 'How did you structure your database schema?',
        a: 'The schema was designed using Entity-Relationship modelling in 3rd Normal Form (3NF) to eliminate redundancy. Key tables include Users, Projects, Orders, and Payments, connected via foreign keys. Indexes were added on frequently queried columns (e.g., user_id, status) to optimize lookup performance. Soft deletes use a deleted_at timestamp rather than hard deletes.',
      },
      {
        q: 'How does your application handle state management?',
        a: 'Local UI state (form inputs, modals) is managed with React useState/useReducer. Shared application state (user session, cart) uses React Context or Zustand. Server state (data from APIs) is managed with React Query / SWR, which provides automatic caching, background refetching, and loading/error states without manual fetch boilerplate.',
      },
    ],
  },
  {
    title: 'API Design & Backend',
    color: '#34d399',
    questions: [
      {
        q: 'What REST conventions did you follow in your API design?',
        a: 'We followed standard REST conventions: GET for reads, POST for creates, PATCH for partial updates, DELETE for removal. Routes are resource-oriented (e.g., /api/orders, /api/orders/:id). HTTP status codes are used semantically — 201 for creation, 404 for not found, 422 for validation errors. All responses are JSON with consistent shape: { data, error, meta }.',
      },
      {
        q: 'How did you implement authentication and authorization?',
        a: 'Authentication uses JWT tokens stored in HTTP-only cookies (preventing XSS access). On login, the server signs a JWT with the user ID and role, and verifies it on protected routes via middleware. Authorization is role-based — middleware checks the decoded role claim before allowing access to admin or user-specific resources.',
      },
      {
        q: 'How did you validate incoming request data?',
        a: 'All incoming data is validated using Zod schemas before reaching business logic. Zod provides type-safe runtime validation with descriptive error messages. On validation failure, we return a 422 Unprocessable Entity with field-level error details. This prevents malformed data from reaching the database and provides clear feedback to API consumers.',
      },
      {
        q: 'How did you handle database transactions in your backend?',
        a: 'For multi-table writes (e.g., creating an order and decrementing stock simultaneously), we wrapped operations in a database transaction. If any step fails, the entire transaction rolls back, preserving data consistency. This implements the ACID property of Atomicity — all-or-nothing execution.',
      },
      {
        q: 'How did you prevent SQL injection and other injection attacks?',
        a: 'We used parameterized queries (via Prisma ORM or pg library\'s query parameters) exclusively, ensuring user input is never interpolated into SQL strings. ORMs automatically parameterize queries. Additionally, input validation with Zod rejects unexpected data types before they reach the database layer.',
      },
    ],
  },
  {
    title: 'Frontend & UX',
    color: '#f59e0b',
    questions: [
      {
        q: 'How did you implement responsive design?',
        a: 'Responsive design was implemented using Tailwind CSS utility classes with mobile-first breakpoints (sm:, md:, lg:). The layout uses CSS Grid and Flexbox for adaptive arrangements. We tested across Chrome DevTools device presets and on real mobile devices to ensure touch target sizes, font scales, and layout stacking behaved correctly.',
      },
      {
        q: 'Explain how you optimized the frontend performance.',
        a: 'Performance optimizations include: code splitting via Next.js dynamic imports (loading heavy components only when needed), image optimization with the Next.js <Image> component (WebP format, lazy loading, size hints), font loading with font-display: swap, and minimizing JavaScript bundle size by tree-shaking unused library exports.',
      },
      {
        q: 'How does your application handle loading and error states in the UI?',
        a: 'Every data-fetching operation has three states: loading (skeleton loaders or spinners maintain layout stability and prevent CLS), error (friendly error messages with a retry action), and success (rendered content). We used React Query\'s isLoading/isError flags to conditionally render these states, ensuring the UI never silently fails.',
      },
      {
        q: 'What accessibility (a11y) considerations did you implement?',
        a: 'We ensured all interactive elements have proper ARIA roles and labels. Color contrast meets WCAG AA (4.5:1 for normal text). All images have descriptive alt attributes. Forms have associated label elements. Keyboard navigation works throughout — modals trap focus and return it on close. We tested with the axe DevTools browser extension.',
      },
      {
        q: 'How did you handle form validation on the frontend?',
        a: 'Client-side validation provides instant feedback using React Hook Form with Zod resolver — errors appear inline below each field in real time. We also perform server-side validation as a security layer because client validation can be bypassed. The submit button is disabled until all required fields pass validation, preventing premature submissions.',
      },
    ],
  },
  {
    title: 'Deployment & DevOps',
    color: '#f87171',
    questions: [
      {
        q: 'How did you deploy your application and what services did you use?',
        a: 'The Next.js application is deployed on Vercel, which provides automatic CI/CD from the Git repository — every push to main triggers a production deployment. The PostgreSQL database is hosted on Supabase (managed Postgres with row-level security). Static assets and user uploads are stored on Cloudflare R2 (S3-compatible object storage) for global CDN delivery.',
      },
      {
        q: 'How does your CI/CD pipeline work?',
        a: 'On every git push, GitHub Actions triggers a workflow that runs TypeScript type checking, ESLint, and the test suite. If all checks pass, the build artifact is deployed to Vercel via its GitHub integration. Preview deployments are created for every pull request, allowing review of UI changes before merging to main.',
      },
      {
        q: 'What environment variable management strategy did you use?',
        a: 'Secrets are stored in environment variables, never committed to source control. We maintain .env.local for local development (gitignored), and configure production secrets in Vercel\'s encrypted environment variable store. Variables prefixed NEXT_PUBLIC_ are exposed to the browser; all others remain server-only, ensuring API keys and database URLs never leak to the client.',
      },
      {
        q: 'How did you implement logging and error monitoring?',
        a: 'Server-side errors are logged via console.error and are visible in Vercel\'s function logs. For production monitoring, we integrated Sentry to capture uncaught exceptions with stack traces, user context, and deployment release tagging. Client-side errors are caught by a React Error Boundary that renders a fallback UI and reports to Sentry.',
      },
      {
        q: 'How would you scale this application to handle 100x traffic?',
        a: 'Vercel automatically scales serverless functions horizontally under load. Database scaling would involve read replicas for heavy read workloads, connection pooling via PgBouncer, and caching frequently read data in Redis. A CDN (already via Vercel/Cloudflare) handles static asset delivery. For extreme scale, migrating to a dedicated PostgreSQL cluster on RDS or Neon would be the next step.',
      },
    ],
  },
  {
    title: 'General CS Theory & Soft Questions',
    color: '#a78bfa',
    questions: [
      {
        q: 'What was the most challenging technical problem you faced?',
        a: 'The most challenging issue was preventing duplicate payment processing when both the client-side payment verification and the Razorpay webhook fired simultaneously. We solved this with an atomic database update using an optimistic lock — only updating the order status if it was still PENDING, ensuring exactly-once email delivery and preventing double credits.',
      },
      {
        q: 'How did you use Git in this project?',
        a: 'We maintained a main branch for production-ready code and created feature branches for each new feature or bug fix. Commits are atomic and descriptive. Pull requests required review before merging. We used git stash for work-in-progress saves and git bisect to trace regressions. The repository is hosted on GitHub with branch protection rules on main.',
      },
      {
        q: 'Explain the difference between cookies, localStorage, and sessionStorage.',
        a: 'Cookies are sent with every HTTP request (useful for authentication tokens) and can be HTTP-only (inaccessible to JS). localStorage persists across sessions until explicitly cleared — suitable for user preferences. sessionStorage clears when the tab closes — suitable for temporary session data. We use HTTP-only cookies for auth tokens (prevents XSS theft) and localStorage for UI preferences.',
      },
      {
        q: 'What is CORS and how did you handle it?',
        a: 'Cross-Origin Resource Sharing (CORS) is a browser security mechanism that blocks requests to a different origin unless the server explicitly allows it via Access-Control-Allow-Origin headers. In our Next.js app, API routes and the frontend share the same origin, eliminating CORS issues. For third-party integrations (Razorpay, Supabase), requests are made server-side from API routes, bypassing browser CORS entirely.',
      },
      {
        q: 'What future features would you add to this project?',
        a: 'Priority enhancements include: real-time notifications via WebSockets (Socket.io), a mobile app built with React Native sharing the same API layer, an admin analytics dashboard with revenue charts and funnel analysis, A/B testing for pricing experiments, and internationalization (i18n) support for regional language variants.',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cybersecurity
// ─────────────────────────────────────────────────────────────────────────────
const CYBERSECURITY_SECTIONS: VivaSections = [
  {
    title: 'Architecture & Security Design',
    color: '#f87171',
    questions: [
      {
        q: 'What is the overall security architecture of your system?',
        a: 'The system follows a defence-in-depth model: a WAF (Web Application Firewall) at the perimeter, TLS 1.3 for all transport, strict input validation at the application layer, parameterized queries at the data layer, and audit logging throughout. No single control failure can lead to a complete breach — each layer independently limits damage.',
      },
      {
        q: 'Explain the principle of least privilege and where you applied it.',
        a: 'Least privilege means every component has only the minimum permissions required to function. In our system: database users have only SELECT/INSERT/UPDATE (no DROP/CREATE), API service accounts cannot access unrelated tables, and frontend tokens carry only read scopes. This limits the blast radius if any credential is compromised.',
      },
      {
        q: 'What threat modelling methodology did you use?',
        a: 'We used the STRIDE model (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) to enumerate threats against each component. For each identified threat, we documented a mitigation control. A data flow diagram mapped all trust boundaries where data crosses privilege levels.',
      },
      {
        q: 'How did you implement secure communications in your project?',
        a: 'All communication uses TLS 1.3 (configured to reject older protocols). HSTS headers force browsers to only connect over HTTPS. API keys and secrets are transmitted exclusively in Authorization headers, never in URLs (which appear in server logs). Certificates are managed via Let\'s Encrypt with automated renewal.',
      },
      {
        q: 'What is zero-trust security and does your project implement it?',
        a: 'Zero-trust means "never trust, always verify" — no entity inside or outside the network is trusted by default. Our system implements key zero-trust principles: mutual authentication on all service-to-service calls, short-lived JWTs requiring frequent re-validation, micro-segmented database access, and continuous logging of all access decisions for audit.',
      },
    ],
  },
  {
    title: 'Vulnerability Assessment & Penetration Testing',
    color: '#34d399',
    questions: [
      {
        q: 'What OWASP Top 10 vulnerabilities did you test for?',
        a: 'We systematically tested for the OWASP Top 10: Injection (SQL, command, LDAP), Broken Authentication, Sensitive Data Exposure, XML External Entities, Broken Access Control, Security Misconfiguration, XSS, Insecure Deserialization, Using Components with Known Vulnerabilities, and Insufficient Logging. Each was tested with a combination of automated scanners and manual verification.',
      },
      {
        q: 'Explain SQL injection and how you prevented it.',
        a: 'SQL injection occurs when user input is concatenated directly into SQL queries, allowing an attacker to modify query logic (e.g., \' OR 1=1 --). We prevented it through parameterized queries (the database driver escapes input before execution), ORM usage (Prisma auto-parameterizes), and input validation rejecting unexpected characters at the API boundary before they reach SQL.',
      },
      {
        q: 'What is Cross-Site Scripting (XSS) and how did you mitigate it?',
        a: 'XSS occurs when malicious scripts are injected into web pages and executed in other users\' browsers, allowing session theft or content manipulation. Mitigations: React\'s JSX automatically HTML-encodes output, preventing reflected/stored XSS. We set Content-Security-Policy headers to whitelist script sources. HTTP-only cookies prevent session token theft even if XSS occurs.',
      },
      {
        q: 'What tools did you use to scan for vulnerabilities?',
        a: 'We used: OWASP ZAP (active scanning for web vulnerabilities), Nmap (port/service enumeration), Nikto (web server misconfiguration scanning), Burp Suite Community Edition (manual request interception and manipulation), npm audit (checking JavaScript dependencies for known CVEs), and Semgrep (static analysis for common code patterns associated with vulnerabilities).',
      },
      {
        q: 'What is CSRF and how did you protect against it?',
        a: 'Cross-Site Request Forgery tricks authenticated users\' browsers into sending unintended requests to our server. Protection: we use SameSite=Strict cookies (browser only sends them for same-origin requests), and validate the Origin/Referer header on state-changing requests. For forms, we also implement per-session CSRF tokens that must match a server-side value.',
      },
    ],
  },
  {
    title: 'Cryptography & Data Protection',
    color: '#f59e0b',
    questions: [
      {
        q: 'How did you store passwords securely?',
        a: 'Passwords are never stored in plaintext or with reversible encryption. We use bcrypt with a work factor of 12, which applies a salt (preventing rainbow table attacks) and runs an intentionally slow hashing algorithm (making brute force computationally expensive). Even a full database compromise reveals only salted bcrypt hashes, not original passwords.',
      },
      {
        q: 'Explain the difference between symmetric and asymmetric encryption.',
        a: 'Symmetric encryption (AES-256) uses the same key for encryption and decryption — fast, suitable for bulk data. Asymmetric encryption (RSA, ECC) uses a public key to encrypt and a private key to decrypt — solves key distribution (share public key freely). In practice, TLS uses asymmetric encryption to securely exchange a symmetric session key, then uses symmetric encryption for actual data transfer.',
      },
      {
        q: 'How do JWTs work and what are their security considerations?',
        a: 'A JWT is a Base64-encoded JSON payload signed with HMAC-SHA256 or RSA. The signature prevents tampering — any modification invalidates the token. Security considerations: use short expiry (15 min access tokens), store in HTTP-only cookies (not localStorage), validate the algorithm header (reject "none"), and maintain a token revocation list (Redis blocklist) for immediate invalidation on logout.',
      },
      {
        q: 'What data did you encrypt at rest and how?',
        a: 'Sensitive fields (PII like full names, emails, phone numbers) are encrypted at the database column level using AES-256-GCM before insertion. The encryption key is stored in an environment variable separate from the database credentials. In case of a database dump leak, the attacker only obtains ciphertext without access to the decryption key.',
      },
      {
        q: 'What is a Public Key Infrastructure (PKI) and how is it relevant to your project?',
        a: 'PKI is the system of digital certificates, certificate authorities (CAs), and revocation mechanisms that enable trusted public key exchange. Our HTTPS certificate is issued by Let\'s Encrypt CA, which browsers trust. Users connecting to our domain receive a certificate proving ownership, enabling encrypted communication without prior key exchange — the browser verifies the CA chain.',
      },
    ],
  },
  {
    title: 'Incident Response & Monitoring',
    color: '#818cf8',
    questions: [
      {
        q: 'What logging and monitoring did you implement for security events?',
        a: 'We log all authentication events (success, failure, account lockout), authorization denials, and input validation rejections with timestamps, IP addresses, and user agents. Logs are shipped to a centralized SIEM (or Vercel\'s log drain). Anomaly detection alerts trigger on: >5 failed logins per minute from one IP, unexpected geographic access, or privilege escalation attempts.',
      },
      {
        q: 'How would you respond to a detected SQL injection attack in production?',
        a: 'Immediate response (contain): block the attacking IP at the WAF/load balancer level. Short-term (investigate): analyze access logs to determine which endpoints were targeted and what data was potentially exfiltrated. Remediation: identify and patch the vulnerable query, rotate database credentials, and audit adjacent code for similar vulnerabilities. Long-term: add parameterized query enforcement to CI pipeline.',
      },
      {
        q: 'What is rate limiting and where did you implement it?',
        a: 'Rate limiting restricts the number of requests an IP/user can make in a time window, preventing brute force attacks and DDoS. We implemented rate limiting on authentication endpoints (10 attempts per 15 minutes per IP), API endpoints (100 requests per minute), and payment processing routes. Exceeded limits return 429 Too Many Requests with a Retry-After header.',
      },
      {
        q: 'How did you implement audit logging to ensure non-repudiation?',
        a: 'Every sensitive action (login, privilege change, data export, payment) creates an immutable audit log entry with: actor ID, action type, target resource, timestamp, IP address, and before/after state snapshots for mutations. Logs are write-only (no update/delete permissions on the audit table) and are periodically archived to tamper-evident cold storage.',
      },
      {
        q: 'What is your data breach notification plan?',
        a: 'Under GDPR/IT Act obligations, if we detect a breach involving personal data: within 72 hours notify the supervisory authority; affected users notified without undue delay with details of what was exposed, likely impact, and protective steps they can take. We maintain an incident register documenting the nature, effects, and remediation steps of every breach.',
      },
    ],
  },
  {
    title: 'General CS Theory & Soft Questions',
    color: '#a78bfa',
    questions: [
      {
        q: 'What is the CIA triad and how does your project address it?',
        a: 'CIA stands for Confidentiality, Integrity, and Availability. Confidentiality: data encrypted in transit (TLS) and at rest (AES), access controlled by RBAC. Integrity: database transactions, HMAC signatures on API responses, input validation. Availability: horizontal scaling, DDoS protection via Cloudflare, graceful degradation when dependencies fail.',
      },
      {
        q: 'What is the difference between a vulnerability, an exploit, and an attack?',
        a: 'A vulnerability is a weakness in the system (e.g., unsanitized input). An exploit is code or technique that takes advantage of the vulnerability. An attack is the act of using an exploit against a target. Vulnerability scanning finds the weakness; penetration testing verifies it is exploitable; hardening removes or mitigates it before attackers can execute an attack.',
      },
      {
        q: 'What future security enhancements would you make?',
        a: 'Planned enhancements: implement hardware security keys (FIDO2/WebAuthn) for admin authentication, deploy Runtime Application Self-Protection (RASP) to detect and block attacks from within the application, add automated dependency scanning in CI (Dependabot/Snyk), and conduct quarterly third-party penetration testing.',
      },
      {
        q: 'What is the difference between black-box, white-box, and grey-box testing?',
        a: 'Black-box testing: tester has no knowledge of internals — simulates an external attacker. White-box testing: full source code and architecture access — maximally thorough, finds logic flaws. Grey-box testing: partial knowledge (e.g., API schema, role types) — the most common in real engagements. We primarily used grey-box testing, armed with API documentation but no source access.',
      },
      {
        q: 'How did you ensure compliance with data privacy regulations?',
        a: 'We comply with India\'s DPDP Act and GDPR principles: users explicitly consent to data collection, PII is collected minimally (only what is needed), data is retained only as long as necessary with automated purge policies, users can request deletion of their data, and all third-party processors (Supabase, Brevo) are GDPR-compliant.',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Healthcare
// ─────────────────────────────────────────────────────────────────────────────
const HEALTHCARE_SECTIONS: VivaSections = [
  {
    title: 'Architecture & System Design',
    color: '#34d399',
    questions: [
      {
        q: 'Describe the overall architecture of your healthcare application.',
        a: 'The system is a three-tier web application: a React/Next.js frontend for clinicians and patients, a Node.js backend API for business logic, and a PostgreSQL database secured with row-level security. HIPAA-aligned security controls are implemented at every layer — TLS for transit, AES-256 for data at rest, and audit logging for every data access event.',
      },
      {
        q: 'How does your system handle patient data management and privacy?',
        a: 'Patient records are stored with field-level encryption for PII (name, DOB, contact). Access is role-based — doctors see only their assigned patients, nurses see ward-specific records, and administrators see anonymized aggregates. All data exports are de-identified using HIPAA Safe Harbor method (18 identifiers removed). Consent is recorded for every data processing activity.',
      },
      {
        q: 'What database schema design did you use for patient records?',
        a: 'The schema separates identity data (patients table) from clinical data (encounters, diagnoses, prescriptions) using foreign keys. This allows applying different security controls to each table. Clinical data uses SNOMED CT / ICD-10 coding standards for diagnoses. Audit tables record every INSERT/UPDATE/DELETE with actor, timestamp, and before/after snapshots.',
      },
      {
        q: 'How did you design the appointment scheduling module?',
        a: 'Appointments are modelled as time-bounded slot reservations linked to doctor and patient entities. Conflict detection uses database-level range constraints (PostgreSQL tsrange) to prevent double-booking. Real-time availability updates are pushed via Server-Sent Events (SSE). Automated SMS/email reminders are sent 24 hours before appointments via a scheduled background job.',
      },
      {
        q: 'How does your system integrate with existing hospital infrastructure?',
        a: 'Integration uses HL7 FHIR R4 APIs as the interoperability standard, allowing data exchange with existing EMR systems regardless of vendor. For legacy systems using HL7 v2 (HL7 pipes-and-hats format), we implemented a translation middleware that converts v2 messages to FHIR JSON. All integrations use OAuth 2.0 SMART on FHIR for authorization.',
      },
    ],
  },
  {
    title: 'Compliance & Regulatory Standards',
    color: '#f59e0b',
    questions: [
      {
        q: 'What is HIPAA and what technical safeguards did you implement?',
        a: 'HIPAA (Health Insurance Portability and Accountability Act) mandates protection of Protected Health Information (PHI). Technical safeguards we implemented: unique user identification (no shared logins), automatic session timeout after 15 minutes inactivity, encryption for PHI in transit and at rest, audit controls logging all PHI access, and emergency access procedures.',
      },
      {
        q: 'What is the difference between HIPAA and HITECH?',
        a: 'HIPAA establishes the foundational privacy and security rules for healthcare data. HITECH (Health Information Technology for Economic and Clinical Health Act) strengthened HIPAA by extending obligations to business associates, increasing breach notification requirements, and significantly raising civil monetary penalties for violations. HITECH also promoted EHR adoption through the Meaningful Use program.',
      },
      {
        q: 'How did you implement the minimum necessary standard?',
        a: 'The minimum necessary standard requires disclosing only the PHI required for the specific purpose. We implemented this through role-based views — a billing role sees only insurance and payment data (not clinical notes), a prescribing doctor sees only their own patients\' medication history. API responses are filtered server-side by role before transmission.',
      },
      {
        q: 'What is a Business Associate Agreement (BAA) and why is it needed?',
        a: 'A BAA is a required contract between a covered entity (hospital) and any third party that processes PHI on its behalf. It establishes the permitted uses of PHI, security obligations, breach notification timelines, and data disposal procedures. In our project, any cloud service storing PHI (database provider, email service) must sign a BAA before integration.',
      },
      {
        q: 'How does your system handle data breach notification requirements?',
        a: 'Under HIPAA Breach Notification Rule: within 60 days of discovery, notify affected individuals and the HHS. Breaches affecting >500 individuals in a state also require notification to prominent media. Our system has an automated breach detection pipeline (anomaly detection on access logs) and a documented incident response playbook with assigned roles and communication templates.',
      },
    ],
  },
  {
    title: 'Clinical Features & Data Accuracy',
    color: '#818cf8',
    questions: [
      {
        q: 'How did you implement clinical decision support features?',
        a: 'Clinical decision support alerts are triggered at point-of-care entry. Drug-drug interaction checks run against the RxNorm/DrugBank database. Allergy cross-referencing alerts before prescribing. Dosage validation checks against patient weight/renal function. Alerts are tiered (hard stops for critical interactions, soft stops requiring acknowledgment for moderate interactions) to avoid alert fatigue.',
      },
      {
        q: 'How does your system handle medication management?',
        a: 'The medication module implements the "five rights" (right patient, right drug, right dose, right route, right time). Prescriptions are electronically signed, transmitted to pharmacy, and verified against the patient\'s allergy list and current medications. Administration records are documented with barcode scanning (eMAR) to create an auditable medication administration record.',
      },
      {
        q: 'What coding systems did you use for medical data standardization?',
        a: 'ICD-10-CM for diagnoses, CPT codes for procedures, SNOMED CT for clinical concepts, LOINC for lab observations, and RxNorm for medications. Standardized coding enables interoperability, accurate billing, and meaningful analytics. Free-text clinical notes are stored separately and can be processed with NLP to suggest codes.',
      },
      {
        q: 'How did you ensure data integrity in clinical records?',
        a: 'Clinical records are append-only — once created, entries are never deleted or edited (to prevent tampering with clinical history). Amendments create a new record with a reference to the original and the reason for amendment, preserving the original. Database transactions ensure that related records (encounter + diagnosis + prescription) are committed atomically.',
      },
      {
        q: 'How does your reporting and analytics module work?',
        a: 'The analytics module runs queries against a read-only replica to avoid impacting the transactional system. Reports include: patient census, bed occupancy, readmission rates, average length of stay, and prescription patterns. All reports are generated with de-identified data for quality management use. Role-based access controls separate operational reports from compliance reports.',
      },
    ],
  },
  {
    title: 'Security in Healthcare Context',
    color: '#f87171',
    questions: [
      {
        q: 'How did you secure the healthcare API against unauthorized access?',
        a: 'All API endpoints require OAuth 2.0 Bearer token authentication. Tokens are short-lived (15 minutes) with refresh tokens stored HTTP-only. Authorization uses Attribute-Based Access Control (ABAC) — doctors can access only their assigned patients, not all patients in the system. Rate limiting prevents credential stuffing. All failed authentication attempts are logged and alert on threshold breach.',
      },
      {
        q: 'What is audit logging and why is it critical in healthcare?',
        a: 'Audit logging creates an immutable record of every access to PHI — who accessed what, when, from where, and what action was taken. In healthcare it is both a HIPAA requirement and essential for detecting insider threats (a nurse accessing a celebrity\'s records without clinical need). Our audit log cannot be modified or deleted by any user, including administrators.',
      },
      {
        q: 'How would you handle a ransomware attack on your healthcare system?',
        a: 'Immediate containment: isolate affected systems from the network. Recovery: restore from the most recent air-gapped backup (we maintain daily encrypted backups stored offline). Incident response: engage CISA, notify HHS within 60 days if PHI was exfiltrated. Post-incident: patch the exploited vulnerability, conduct staff security training, and implement endpoint detection and response (EDR) tooling.',
      },
      {
        q: 'What is the difference between de-identification and anonymization in healthcare data?',
        a: 'De-identification removes or transforms the 18 HIPAA identifiers (name, DOB, zip code, dates, etc.) to produce data that cannot reasonably re-identify an individual. Anonymization is an irreversible process producing data with no re-identification risk. De-identified data retains research utility and is no longer subject to HIPAA; anonymized data is used for public datasets. Re-identification risk must be formally assessed using statistical methods.',
      },
      {
        q: 'How did you implement role-based access control for different healthcare staff roles?',
        a: 'Roles defined: Patient (self-records only), Nurse (ward patients — read/create, no prescribe), Doctor (assigned patients — full clinical access), Pharmacist (medication orders only), Billing (financial data, de-identified clinical), Admin (system config, no PHI). Roles are assigned at user creation and changes are logged. All API middleware checks the JWT role claim before processing the request.',
      },
    ],
  },
  {
    title: 'General CS Theory & Soft Questions',
    color: '#a78bfa',
    questions: [
      {
        q: 'What challenges are unique to building software for healthcare?',
        a: 'Healthcare software faces: strict regulatory compliance (HIPAA, CE marking for medical devices), life-safety implications demanding 99.99% uptime, complex interoperability requirements (HL7, FHIR), high resistance to change from clinical staff, extreme sensitivity of data, long software certification cycles, and the need for fail-safe behaviour (system failures must not result in patient harm).',
      },
      {
        q: 'How did you test the clinical workflows in your system?',
        a: 'Testing included: unit tests for business logic (dosage calculations, date arithmetic for age), integration tests for API endpoints, and end-to-end tests simulating real clinical workflows (patient registration → appointment → encounter → prescription → discharge). UAT (User Acceptance Testing) was conducted with clinical staff to validate workflow accuracy and usability.',
      },
      {
        q: 'What is a Clinical Document Architecture (CDA) and is it relevant?',
        a: 'CDA is an HL7 standard for the structure and semantics of clinical documents (discharge summaries, referral letters). It defines XML-based documents that carry patient context, coded clinical data, and human-readable narrative. Our system generates CDA documents for patient referrals and discharge summaries, enabling receiving institutions to auto-import structured data into their EMR.',
      },
      {
        q: 'What future enhancements would make your system more impactful?',
        a: 'Key future enhancements: AI-assisted diagnosis suggestions (ML on symptom patterns and lab results), patient-facing mobile app with appointment booking and test result access, integration with wearable devices (ECG, glucose monitors) for remote patient monitoring, predictive analytics for readmission risk scoring, and telemedicine video consultation capability.',
      },
      {
        q: 'How does your project benefit patients and healthcare providers?',
        a: 'For patients: reduced wait times through optimized scheduling, fewer medication errors through computerized physician order entry (CPOE), better care continuity through accessible complete health records. For providers: eliminated paper-based workflows, instant access to patient history at point-of-care, automated billing code suggestions, and population health dashboards for quality improvement initiatives.',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FinTech — Financial Technology
// ─────────────────────────────────────────────────────────────────────────────
const FINTECH_SECTIONS: VivaSections = [
  {
    title: 'Architecture & System Design',
    color: '#f59e0b',
    questions: [
      {
        q: 'Describe the overall architecture of your FinTech application.',
        a: 'The system uses a microservices-inspired monolith with separate bounded contexts: User Management, Account Management, Transaction Processing, and Reporting. Each context has its own database schema. The frontend (Next.js) communicates through API routes. The payment processing module integrates with Razorpay/Stripe via server-side webhooks, ensuring payment events are processed reliably even if the user closes their browser.',
      },
      {
        q: 'How did you design the transaction ledger in your system?',
        a: 'The ledger follows double-entry bookkeeping — every transaction creates two entries: a debit on one account and an equal credit on another. This ensures the sum of all entries always equals zero, making accidental fund creation or destruction detectable. Entries are immutable; corrections are new reversing transactions with a reference to the original. The ledger is append-only.',
      },
      {
        q: 'How did you ensure eventual consistency in distributed transactions?',
        a: 'For multi-step financial operations (e.g., transfer between accounts), we use the Saga pattern — each step in the sequence is independently committed with a compensating transaction ready to rollback. If step 3 fails, compensating transactions for steps 1 and 2 execute. This avoids distributed transactions while maintaining business-level consistency.',
      },
      {
        q: 'What database design considerations are specific to financial applications?',
        a: 'Financial databases require: DECIMAL type (never FLOAT) for monetary values to avoid floating-point rounding errors, explicit currency column on every monetary field, immutable transaction records (no UPDATE/DELETE on committed transactions), strict foreign key enforcement, and row-level locking for balance updates to prevent race conditions in concurrent transactions.',
      },
      {
        q: 'How does your payment processing flow work end to end?',
        a: 'Order creation → Razorpay order initiation (returns order_id) → payment form presented to user → user pays → Razorpay sends webhook to our server → server verifies HMAC signature on webhook payload → atomic status update (PENDING → PAID) → confirmation email sent. The atomic update with status check prevents duplicate processing if both client-side verify and webhook fire simultaneously.',
      },
    ],
  },
  {
    title: 'Security & Compliance',
    color: '#f87171',
    questions: [
      {
        q: 'What PCI-DSS requirements are relevant to your application?',
        a: 'PCI-DSS (Payment Card Industry Data Security Standard) applies to systems handling card data. Our approach: we do not store, process, or transmit raw card data — we use a PCI-compliant payment gateway (Razorpay/Stripe) that handles card capture in an iframe. This scopes us to SAQ-A (the lowest compliance level), as our servers never see card numbers, CVV, or magnetic stripe data.',
      },
      {
        q: 'How did you verify payment signatures to prevent fraud?',
        a: 'Payment webhooks are verified using HMAC-SHA256 signatures. The payment gateway signs the webhook payload with a shared secret. Our server recomputes the HMAC and compares using a constant-time comparison function (preventing timing attacks). Any webhook with a non-matching signature is rejected with 400 and logged for investigation. This prevents replay attacks and spoofed payment confirmations.',
      },
      {
        q: 'How did you implement fraud detection in your system?',
        a: 'We implemented rule-based fraud signals: flagging transactions above a threshold, multiple orders from the same IP in a short window, mismatched billing/shipping country, and velocity checks (>N transactions per hour per account). Flagged transactions are held for manual review. High-risk transactions trigger 3DS (3D Secure) authentication, adding an additional customer verification step.',
      },
      {
        q: 'What is KYC and AML and how do they apply to your project?',
        a: 'KYC (Know Your Customer) requires verifying customer identity before high-value transactions to prevent fraud and money laundering. AML (Anti-Money Laundering) involves monitoring for suspicious transaction patterns (structuring, unusually large transactions, dormant account activation). Our project implements basic KYC (email + phone verification) and logs transaction patterns for AML review at thresholds defined by RBI guidelines.',
      },
      {
        q: 'How did you secure API keys and financial credentials?',
        a: 'All API keys (Razorpay key/secret, database credentials) are stored as environment variables in Vercel\'s encrypted secret store, never in source code or version control. Server-side API routes make all payment API calls — the client never has access to the Razorpay secret key. Keys are rotated quarterly and immediately upon any suspected compromise.',
      },
    ],
  },
  {
    title: 'Database & Data Management',
    color: '#34d399',
    questions: [
      {
        q: 'Why should you never use floating-point types for monetary values?',
        a: 'IEEE 754 floating-point arithmetic cannot precisely represent many decimal fractions (e.g., 0.1 + 0.2 ≠ 0.3 in binary). In financial systems, these rounding errors accumulate across millions of transactions, producing incorrect balances. We store monetary values as integers (paise/cents) or use the SQL DECIMAL(19, 4) type, which stores exact decimal representations.',
      },
      {
        q: 'How did you handle concurrent balance updates to prevent race conditions?',
        a: 'Concurrent withdrawals without locking can allow two transactions to read the same balance, both see sufficient funds, and both deduct — resulting in a negative balance. We prevent this using SELECT FOR UPDATE (pessimistic locking) which locks the row until the transaction commits, or using optimistic concurrency control with a version column that increments on each update.',
      },
      {
        q: 'How are refunds handled in your ledger?',
        a: 'Refunds are represented as new transactions (not modifications to the original). A refund creates a credit entry on the customer\'s account and a debit entry on the business account — reversing the original payment\'s flow. The original transaction is marked as "refunded" with a reference to the refund transaction. This maintains a complete, auditable financial history.',
      },
      {
        q: 'How did you design the reconciliation process?',
        a: 'Daily reconciliation compares our internal ledger totals with the payment gateway settlement report. Any discrepancy triggers an automated alert. The reconciliation script runs as a scheduled job, categorizing differences as: timing differences (transactions processed at midnight boundary), genuine discrepancies (requiring investigation), and fees (gateway charges). An unreconciled exception report goes to the finance team.',
      },
      {
        q: 'What backup and disaster recovery strategy did you implement for financial data?',
        a: 'Financial data is backed up continuously via Supabase\'s point-in-time recovery (PITR), which allows restoring to any second within the retention window. Daily full backups are exported to Cloudflare R2 in a different region. We test recovery quarterly. The RPO (Recovery Point Objective) is <1 minute; RTO (Recovery Time Objective) is <1 hour. Financial records are retained for 7 years per regulatory requirement.',
      },
    ],
  },
  {
    title: 'FinTech-Specific Features',
    color: '#818cf8',
    questions: [
      {
        q: 'What payment gateway did you integrate and how?',
        a: 'We integrated Razorpay. The flow: server creates a Razorpay order via their API (POST /v1/orders), returns the order_id to the frontend. Razorpay\'s JavaScript SDK opens the payment modal. On completion, Razorpay calls our verify endpoint with razorpay_payment_id, razorpay_order_id, and razorpay_signature. We verify the HMAC signature, then mark the order as paid. All sensitive operations are server-side.',
      },
      {
        q: 'How did you implement the transaction history and statement generation feature?',
        a: 'Transaction history is paginated (cursor-based pagination for performance on large datasets) and filterable by date range, type (credit/debit), and amount. Statement generation exports filtered transactions to PDF using a server-side rendering approach (Puppeteer or React PDF), formatted as per regulatory requirements with running balance column, transaction IDs, and merchant details.',
      },
      {
        q: 'How does your notification system work for payment events?',
        a: 'Payment events (initiated, succeeded, failed, refunded) trigger notifications via multiple channels: email (Brevo transactional), SMS (Twilio/MSG91), and push notifications (Firebase FCM). Notifications are queued in a background job system to avoid blocking the payment processing flow. Each notification includes the transaction amount, reference ID, and a deep link to the transaction detail page.',
      },
      {
        q: 'How did you implement spending analytics for users?',
        a: 'Analytics are computed from the transaction ledger using aggregation queries (GROUP BY category, month). Results are cached in Redis for 1 hour to avoid repeated expensive queries. The UI shows monthly spending trends (bar chart), category breakdown (pie chart), and budget utilization. Users can set spending limits per category; notifications fire when they reach 80% and 100% of the limit.',
      },
      {
        q: 'What is an idempotency key and where did you use it?',
        a: 'An idempotency key is a unique identifier included in API requests to ensure that retrying a failed request does not create duplicate operations. We generate a UUID for each payment attempt and pass it as the Idempotency-Key header to Razorpay. If the network fails mid-request and the client retries, Razorpay returns the result of the original request rather than charging the customer twice.',
      },
    ],
  },
  {
    title: 'General CS Theory & Soft Questions',
    color: '#a78bfa',
    questions: [
      {
        q: 'What regulatory bodies govern FinTech operations in India?',
        a: 'RBI (Reserve Bank of India) regulates payment systems, digital lending, and NBFCs. SEBI regulates investment and securities platforms. IRDAI governs insurance tech. For payment aggregators: RBI\'s Payment Aggregator guidelines require PA registration, minimum net worth of ₹25 Cr, escrow account requirements, and data localisation (payment data must be stored in India). PPI wallets require separate RBI licensing.',
      },
      {
        q: 'How would you handle a payment processing outage?',
        a: 'Immediate response: switch to a backup payment gateway (we maintain Stripe as a secondary processor). Show clear user messaging ("Payment processing temporarily unavailable"). Queue failed payment attempts for retry. Communicate status via status page. Post-incident: reconcile queued transactions, verify no duplicate charges, and send affected users confirmation emails. Root cause analysis within 24 hours.',
      },
      {
        q: 'What is Open Banking and how could it enhance your project?',
        a: 'Open Banking (mandated by RBI\'s Account Aggregator framework) allows customers to securely share financial data across institutions via consent-based APIs. For our project, it could enable: automatic bank account verification (replacing manual IFSC entry), AI-driven creditworthiness assessment using transaction history, and one-click payment via UPI integration using the customer\'s primary bank.',
      },
      {
        q: 'What future enhancements would you add to the FinTech platform?',
        a: 'Priority enhancements: ML-based credit scoring for BNPL (Buy Now Pay Later) features, integration with India\'s UPI AutoPay for subscription billing, a merchant dashboard for B2B payments analytics, multi-currency support for international transactions, and a rules engine for customers to configure automated transfers (e.g., salary day savings automation).',
      },
      {
        q: 'How did you test the payment flows to ensure correctness?',
        a: 'We used Razorpay\'s test mode (with test card numbers that simulate various success/failure scenarios) to test all payment states: successful payment, card declined, network timeout, 3DS flow. Integration tests mock the Razorpay API to test our server-side logic. Webhook delivery was tested using ngrok to expose localhost to Razorpay\'s test webhook delivery. End-to-end tests cover the full payment → confirmation → download flow.',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Cloud — Cloud Computing & DevOps
// ─────────────────────────────────────────────────────────────────────────────
const CLOUD_SECTIONS: VivaSections = [
  {
    title: 'Architecture & Cloud Design',
    color: '#38bdf8',
    questions: [
      {
        q: 'Describe the cloud architecture of your project.',
        a: 'The application is deployed on a cloud-native stack: Next.js serverless functions on Vercel (auto-scaling, edge-distributed), PostgreSQL on Supabase (managed, with connection pooling via PgBouncer), object storage on Cloudflare R2 (S3-compatible, zero-egress-cost CDN), and DNS/WAF on Cloudflare. This architecture requires zero server management and scales to zero cost at idle while handling traffic spikes automatically.',
      },
      {
        q: 'What is the difference between IaaS, PaaS, and SaaS?',
        a: 'IaaS (Infrastructure as a Service) provides raw compute, storage, and networking — you manage OS upwards (AWS EC2, Azure VMs). PaaS (Platform as a Service) provides the runtime environment — you manage only your application code (Heroku, Vercel, Elastic Beanstalk). SaaS (Software as a Service) is fully managed software — you consume it as a service (Supabase, Brevo). Our project uses PaaS (Vercel) and SaaS components (Supabase, Cloudflare).',
      },
      {
        q: 'Explain the microservices architecture and how it compares to your approach.',
        a: 'Microservices decompose an application into small, independently deployable services each with its own database and codebase. Benefits: independent scaling, technology diversity, isolated failures. Drawbacks: network latency between services, distributed transaction complexity, operational overhead. Our project uses a modular monolith — logically separated modules within one codebase — which provides most of microservices\' organizational benefits without the operational complexity, appropriate for our scale.',
      },
      {
        q: 'What is a CDN and how does it improve your application?',
        a: 'A CDN (Content Delivery Network) is a geographically distributed network of edge servers that caches content close to users. Cloudflare\'s global CDN serves static assets (JS, CSS, images) from the nearest PoP (Point of Presence), reducing latency from hundreds of milliseconds to single digits. Our file downloads also go through Cloudflare R2, benefiting from the same CDN without egress fees.',
      },
      {
        q: 'What is serverless computing and what are its trade-offs?',
        a: 'Serverless executes functions on-demand without managing servers — the platform scales from zero to millions of invocations automatically. Benefits: no idle cost, automatic scaling, reduced operational burden. Trade-offs: cold starts add latency for infrequently called functions, maximum execution time limits (Vercel: 60s on Pro), limited persistent in-memory state (each invocation is stateless). For our use case (API request-response workloads), serverless is ideal.',
      },
    ],
  },
  {
    title: 'DevOps & CI/CD',
    color: '#818cf8',
    questions: [
      {
        q: 'Describe your CI/CD pipeline.',
        a: 'On every git push to a feature branch, GitHub Actions triggers: TypeScript compilation check (tsc --noEmit), ESLint linting, and unit test execution. Passing builds on main auto-deploy to Vercel production. Feature branch pushes create Vercel preview deployments with unique URLs for PR review. Secrets are never in code — stored in GitHub Secrets (for Actions) and Vercel encrypted env vars (for deployments).',
      },
      {
        q: 'What is Docker and how would it benefit your project?',
        a: 'Docker containerizes an application and its runtime dependencies into an image, ensuring it runs identically in development, CI, and production. Benefits: eliminates "works on my machine" issues, enables container orchestration with Kubernetes, and makes the application stack self-documenting. Our Next.js app can be Dockerized using the official Next.js Dockerfile for deployment to any container platform.',
      },
      {
        q: 'What is Infrastructure as Code (IaC) and what tools support it?',
        a: 'IaC provisions and manages cloud infrastructure through machine-readable configuration files rather than manual UI actions. Tools: Terraform (cloud-agnostic, declarative), AWS CDK (programmatic, AWS-specific), Pulumi (general-purpose programming languages). IaC enables version-controlled infrastructure, reproducible environments, and automated provisioning. For our project, Vercel\'s project config and GitHub Actions workflows serve as a lightweight form of IaC.',
      },
      {
        q: 'What is blue-green deployment and why is it valuable?',
        a: 'Blue-green deployment maintains two identical production environments (blue = current live, green = new version). The new version is deployed to green and tested; once validated, traffic is switched instantly from blue to green. Benefits: zero-downtime deployments, instant rollback (switch back to blue if green has issues). Vercel implements this automatically — deployments are atomic and the previous deployment is kept for instant rollback.',
      },
      {
        q: 'How do you handle database migrations in a CI/CD pipeline?',
        a: 'Database migrations are version-controlled SQL scripts (or using a migration tool like Flyway/Liquibase). In CI/CD: migrations run automatically before the new application version is deployed, ensuring the schema is always ahead of the code. We use expand/contract pattern — additive changes (new columns with defaults) are safe to deploy before code; destructive changes (dropping columns) deploy after the new code is stable.',
      },
    ],
  },
  {
    title: 'Scalability & Performance',
    color: '#34d399',
    questions: [
      {
        q: 'What is horizontal vs vertical scaling?',
        a: 'Vertical scaling adds more resources to an existing server (bigger CPU, more RAM) — limited by hardware maximums, requires downtime. Horizontal scaling adds more server instances behind a load balancer — theoretically unlimited, no single point of failure. Cloud-native applications are designed for horizontal scaling: stateless services (session state in Redis, not in-process memory) that can be replicated to any number of instances.',
      },
      {
        q: 'How did you implement caching in your application?',
        a: 'Multi-layer caching strategy: at the CDN level (Vercel Edge Cache for static assets, long-lived Cache-Control headers), at the API level (Redis for database query results with 5-minute TTL), and at the browser level (HTTP cache headers on GET responses). Cache invalidation triggers on data mutations. We use stale-while-revalidate headers for near-real-time pages that can tolerate brief staleness.',
      },
      {
        q: 'What are the CAP theorem\'s implications for your distributed system?',
        a: 'CAP theorem states a distributed system can guarantee at most two of: Consistency (all nodes see same data), Availability (every request gets a response), and Partition Tolerance (system works despite network splits). Since network partitions are unavoidable, the real choice is CP vs AP. Our database (PostgreSQL) is CP — it sacrifices availability under partition to maintain consistency, appropriate for financial and order data.',
      },
      {
        q: 'How did you optimize database queries for performance?',
        a: 'Query optimization steps: added composite indexes on (status, created_at) for the most common admin queries, used EXPLAIN ANALYZE to identify sequential scans, converted to indexed lookups. Pagination uses cursor-based (WHERE id > last_seen_id) rather than OFFSET to avoid full-table scans. N+1 query problems are avoided by using JOIN queries or ORMs\' include/eager-loading.',
      },
      {
        q: 'What observability tools did you use for your cloud application?',
        a: 'Observability follows the three pillars: Logs (Vercel log drains → structured logs with trace IDs), Metrics (Vercel Analytics for web vitals, custom metrics via Prometheus/Grafana for a self-hosted option), and Traces (distributed request tracing with OpenTelemetry). Alerting on p99 latency, error rate thresholds, and queue depth ensures proactive incident detection.',
      },
    ],
  },
  {
    title: 'Cloud Services & Storage',
    color: '#f59e0b',
    questions: [
      {
        q: 'Why did you choose Cloudflare R2 over AWS S3?',
        a: 'R2 is S3-compatible (same API, minimal code changes) but has zero egress fees — AWS S3 charges per GB of data transferred out. For a platform distributing large ZIP files to students, egress costs on S3 would scale linearly with downloads. R2 eliminates this. Additionally, R2 is served through Cloudflare\'s global CDN automatically, providing low-latency downloads worldwide.',
      },
      {
        q: 'What is an S3 presigned URL and how did you use it?',
        a: 'A presigned URL is a time-limited, cryptographically signed URL that grants temporary access to a specific S3/R2 object without exposing the bucket publicly. We generate 10-minute presigned URLs server-side when a verified purchase is confirmed. The URL embeds credentials in the signature — after 10 minutes it expires and cannot be reused. This protects the file from unauthorized distribution while providing seamless download UX.',
      },
      {
        q: 'How did you handle file storage security?',
        a: 'The R2 bucket is completely private — no public access. All object access goes through presigned URLs with 10-minute expiry generated by our server after verifying purchase status. The AWS credentials used to generate URLs are stored in Vercel environment variables with minimal IAM permissions (only s3:GetObject on the specific bucket). Download count limits are enforced in the database before URL generation.',
      },
      {
        q: 'What is a message queue and would it benefit your project?',
        a: 'A message queue (RabbitMQ, SQS, BullMQ) decouples asynchronous work — instead of doing it synchronously in the request handler, tasks are queued and processed by background workers. Benefits for our project: sending confirmation emails, generating PDF reports, and processing webhooks could be queued, improving API response times and adding retry logic for transient failures. High-volume scenarios definitely warrant a queue.',
      },
      {
        q: 'How does serverless function cold start affect user experience and how do you mitigate it?',
        a: 'Cold start occurs when a serverless function hasn\'t run recently — the platform must provision a container, load the runtime, and initialize the application before handling the request, adding 200ms-1s of latency. Mitigations: minimize bundle size (tree-shaking, avoid heavy dependencies at module level), use edge functions for latency-critical routes (they start in <10ms), and implement lazy loading of modules used only in specific code paths.',
      },
    ],
  },
  {
    title: 'General CS Theory & Soft Questions',
    color: '#a78bfa',
    questions: [
      {
        q: 'What is the difference between cloud-native and cloud-enabled applications?',
        a: 'Cloud-enabled applications are traditional monoliths "lifted and shifted" to the cloud — they run on cloud VMs but don\'t leverage cloud-native capabilities. Cloud-native applications are designed specifically for cloud environments: stateless, containerized, using managed services (databases, queues, caches as a service), automatically scalable, and resilient to failure by design. Our application is cloud-native — it uses managed services exclusively and scales to zero.',
      },
      {
        q: 'What is site reliability engineering (SRE)?',
        a: 'SRE applies software engineering principles to infrastructure and operations. Key concepts: SLOs (Service Level Objectives — measurable reliability targets like 99.9% uptime), SLIs (the metrics that measure SLOs — request success rate, latency), error budgets (acceptable unreliability — if 0.1% downtime is allowed, that\'s the "budget" for risky deployments), and eliminating toil (manual, repetitive operational work) through automation.',
      },
      {
        q: 'How would you conduct a disaster recovery drill for your application?',
        a: 'DR drill procedure: in a separate environment, simulate failure scenarios — delete the production database (restoring from backup is the test), terminate all running instances (verify auto-restart), simulate a region outage (test failover to secondary region), and revoke all API keys (test key rotation procedure). Document actual RTO/RPO measured during drills vs target. Fix gaps and repeat quarterly.',
      },
      {
        q: 'What cloud cost optimization strategies did you implement?',
        a: 'Cost optimizations: serverless functions scale to zero (no idle compute cost), Cloudflare R2 eliminates S3 egress fees, database connection pooling (PgBouncer) reduces Supabase compute load, aggressive CDN caching reduces function invocations for static content, and Vercel Hobby tier covers our traffic scale. We monitor costs via provider dashboards with budget alerts set at 80% of monthly allocation.',
      },
      {
        q: 'What future cloud enhancements would improve your project?',
        a: 'Planned cloud enhancements: edge computing for personalization (serve region-specific content from Cloudflare Workers), a Redis cache layer for database query results reducing Supabase load by ~60%, a job queue (BullMQ on Redis) for async email/PDF processing, a staging environment that mirrors production (deployed from a staging branch), and OpenTelemetry distributed tracing to identify performance bottlenecks across the stack.',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Fallback (generic, for unknown categories)
// ─────────────────────────────────────────────────────────────────────────────
const GENERIC_SECTIONS: VivaSections = [
  {
    title: 'Architecture & System Design',
    color: '#818cf8',
    questions: [
      { q: "What is the main objective of this project?", a: "The main objective is to automate and streamline the existing manual process by providing a scalable, secure, and user-friendly digital solution that reduces errors and increases efficiency." },
      { q: "Which Software Development Life Cycle (SDLC) model did you follow and why?", a: "We followed the Agile methodology. It allowed us to iterate quickly, incorporate feedback continuously, and adapt to changing requirements during the development phases." },
      { q: "Explain the architecture of your system.", a: "The system uses a modern client-server architecture. The frontend handles the UI/UX and state management, communicating via REST APIs to a backend server, which then processes business logic and interacts with a relational database." },
      { q: "Why did you choose this specific technology stack?", a: "We chose this stack for its high performance, massive community support, and rapid development capabilities. It also ensures excellent scalability for future enhancements." },
      { q: "What is the difference between frontend and backend in your project?", a: "The frontend is the presentation layer where users interact with the interface. The backend is the data access layer that handles business logic, security, and database operations securely." },
    ],
  },
  {
    title: 'Database & Data Management',
    color: '#34d399',
    questions: [
      { q: "How does your database handle concurrent requests?", a: "The database uses ACID properties and connection pooling. It relies on row-level locking and transaction isolation levels to ensure data integrity when multiple users access the system simultaneously." },
      { q: "How is your database schema designed?", a: "It is designed using Entity-Relationship modelling in 3rd Normal Form (3NF) to eliminate data redundancy and ensure data integrity through primary and foreign key constraints." },
      { q: "What is the difference between SQL and NoSQL? Which did you use?", a: "SQL databases are relational and structured with predefined schemas, while NoSQL databases are non-relational and document-oriented. We chose based on the specific structured data needs of this project." },
      { q: "What is a foreign key and give an example from your database?", a: "A foreign key is a field in one table that uniquely identifies a row in another table, creating a relationship. For example, a user_id in the orders table linking back to the users table." },
      { q: "What is the time complexity (Big O) of your core algorithm?", a: "Our core data processing algorithm runs in O(N log N) time complexity due to the optimized sorting and searching mechanisms, making it highly efficient even for large datasets." },
    ],
  },
  {
    title: 'Security & Performance',
    color: '#f59e0b',
    questions: [
      { q: "Explain the authentication and authorization mechanism used.", a: "We implemented token-based authentication (JWT or Sessions). Upon login, a secure token is generated and passed in HTTP-only cookies or headers for subsequent requests to authorize access to protected routes." },
      { q: "How did you ensure the security of user data?", a: "We ensured security by hashing passwords using robust algorithms (like bcrypt), sanitizing inputs to prevent SQL Injection, and using HTTPS to encrypt data in transit." },
      { q: "How do you prevent Cross-Site Scripting (XSS) attacks?", a: "We prevent XSS by escaping and sanitizing all user inputs before rendering them in the browser, ensuring malicious scripts cannot be executed as part of the HTML." },
      { q: "How did you optimize the performance of your application?", a: "Performance was optimized by minifying CSS/JS assets, lazy loading images, implementing database indexing, and utilizing a Content Delivery Network (CDN) for static assets." },
      { q: "What is an API and how is it used in your project?", a: "An API (Application Programming Interface) is a set of rules that allows the frontend to communicate with the backend. We used RESTful APIs to send and retrieve JSON data seamlessly." },
    ],
  },
  {
    title: 'Testing & Deployment',
    color: '#f87171',
    questions: [
      { q: "How did you test your application?", a: "We conducted unit testing for individual components, integration testing for API endpoints, and manual end-to-end testing to ensure the entire user flow works as expected under various scenarios." },
      { q: "How did you handle errors and exceptions?", a: "We implemented global error handling mechanisms that catch exceptions gracefully, log them for debugging, and display user-friendly error messages without crashing the application." },
      { q: "Can you explain the deployment process for this project?", a: "The project is deployed using cloud infrastructure. Code is pushed to a repository, built into production-ready assets, and hosted on a scalable server environment with continuous integration." },
      { q: "How did you use version control in this project?", a: "We used Git for version control, maintaining a main branch for production code and creating separate feature branches for development. This allowed tracking of every code change safely." },
      { q: "What is Object-Oriented Programming (OOP) and how is it applied here?", a: "OOP is a paradigm based on objects containing data and methods. We applied concepts like encapsulation, inheritance, and polymorphism to write modular, reusable, and maintainable code." },
    ],
  },
  {
    title: 'General CS Theory & Soft Questions',
    color: '#a78bfa',
    questions: [
      { q: "What were the major challenges you faced during development?", a: "One major challenge was handling asynchronous state management and ensuring the API responded within acceptable latency limits under load. We solved this by optimizing database queries and implementing caching." },
      { q: "What future enhancements can be made to this project?", a: "Future enhancements could include adding real-time WebSocket notifications, integrating Machine Learning for predictive analytics, and deploying a native mobile app version." },
      { q: "Explain the concept of State Management in your frontend.", a: "State management involves tracking data that changes over time and ensuring the UI automatically updates to reflect the current state consistently across all components." },
      { q: "What is responsive design and how is it implemented?", a: "Responsive design ensures the application looks and functions perfectly across all devices by using fluid grids, flexible images, and CSS media queries." },
      { q: "What is the role of a web server in your project?", a: "The web server listens for incoming HTTP requests, routes them to the appropriate application logic, and returns the generated HTTP responses back to the client." },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Registry
// ─────────────────────────────────────────────────────────────────────────────
export function getVivaSections(category: ProjectCategory | null | undefined): VivaSections {
  switch (category) {
    case 'AIML':           return AIML_SECTIONS;
    case 'FullStack':      return FULLSTACK_SECTIONS;
    case 'Cybersecurity':  return CYBERSECURITY_SECTIONS;
    case 'Healthcare':     return HEALTHCARE_SECTIONS;
    case 'FinTech':        return FINTECH_SECTIONS;
    case 'Cloud':          return CLOUD_SECTIONS;
    default:               return GENERIC_SECTIONS;
  }
}

export function getCategoryLabel(category: ProjectCategory | null | undefined): string {
  switch (category) {
    case 'AIML':           return 'AI & Machine Learning';
    case 'FullStack':      return 'Full Stack Web Development';
    case 'Cybersecurity':  return 'Cybersecurity';
    case 'Healthcare':     return 'Healthcare IT';
    case 'FinTech':        return 'Financial Technology';
    case 'Cloud':          return 'Cloud Computing & DevOps';
    default:               return 'Software Engineering';
  }
}
