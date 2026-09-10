/**
 * SubmitKit Extra Catalog Part 2 — 400+ More Unique & Trending Project Topics
 * Covers: More AI/ML, Systems, GameDev, AR/VR, Robotics, Accessibility,
 *         ClimateTech, EdTech, MediaTech, AutoTech, and emerging categories.
 */

import type { TopicCard } from "./blueprint-engine";

export const TOPICS_EXTRA2: TopicCard[] = [
  // ─── ROBOTICS / EMBEDDED ──────────────────────────────────────────────────
  {
    id: "ros2-autonomous-robot-navigation-slam",
    letter: "R",
    title: "ROS2 Autonomous Robot Navigation with SLAM",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "7–10 days",
    trending: true,
    tagline: "Build a self-navigating robot that maps unknown environments using SLAM algorithms.",
    whatItDoes: "Uses ROS2 Navigation2 stack with SLAM Toolbox to enable a TurtleBot or simulated robot to create a map of its environment, localize itself, and plan optimal paths to goals autonomously.",
    realWorldUse: "Amazon Robotics, Boston Dynamics, and Addverb Technologies (Indian warehouse robotics startup) all use ROS-based navigation. India's robot automation market is growing at 30% annually.",
    examinerExpects: [
      "Show robot building a 2D occupancy grid map of a simulated room in Gazebo.",
      "Demonstrate autonomous navigation to a goal point avoiding obstacles.",
      "Show the AMCL particle filter localizing the robot on a pre-built map.",
      "Present the costmap showing inflation around obstacles for safe path planning."
    ],
    freeVivaQuestions: [
      "What is SLAM and why is it fundamentally harder than localization-only or mapping-only?",
      "What is the difference between global planner and local planner in ROS Navigation Stack?",
      "How does the AMCL particle filter estimate robot position uncertainty?"
    ],
    freeStep1Title: "Install ROS2 Humble, launch TurtleBot3 Gazebo simulation, and verify sensor topics",
    datasetName: "Gazebo warehouse simulation world + TurtleBot3 URDF model"
  },
  {
    id: "pid-control-inverted-pendulum-arduino",
    letter: "P",
    title: "Self-Balancing Robot with PID Control",
    category: "IoT",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Build a two-wheeled balancing robot using MPU-6050 IMU and PID feedback control.",
    whatItDoes: "Arduino reads 6-axis IMU data at 200Hz, applies Kalman filter for noise reduction, runs PID controller to drive L298N motor driver maintaining upright balance in real time.",
    realWorldUse: "Segway, Ninebot, and EV-traction control systems all use PID-based balance control. This is the most impressive hardware project in any final year exhibition.",
    examinerExpects: [
      "Show the physical robot balancing when nudged.",
      "Plot the PID error signal and control output over time.",
      "Demonstrate Kp, Ki, Kd tuning effect on stability vs oscillation.",
      "Show Kalman filter output vs raw gyroscope data comparison."
    ],
    freeVivaQuestions: [
      "What is a PID controller and what does each of the three terms contribute?",
      "Why is the Kalman filter preferred over a complementary filter for sensor fusion?",
      "What is integral windup and how do you prevent it in your PID implementation?"
    ],
    freeStep1Title: "Wire MPU-6050 to Arduino, read raw accelerometer and gyroscope data, verify via Serial Plotter",
    datasetName: "Arduino PID library + MPU-6050 calibration dataset"
  },
  {
    id: "computer-vision-pick-and-place-robotic-arm",
    letter: "C",
    title: "Computer Vision Guided Robotic Arm Pick-and-Place",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "6-DOF robot arm uses overhead camera to detect, pick, and sort colored objects autonomously.",
    whatItDoes: "YOLOv8 detects object position and class from overhead camera. Inverse kinematics computes joint angles. Arduino or STM32 drives servo motors to pick the object and place it in the correct bin.",
    realWorldUse: "Fanuc, KUKA, and Universal Robots power automated assembly lines. India's manufacturing sector is deploying cobots (collaborative robots) for SME automation.",
    examinerExpects: [
      "Show live object detection updating joint angle targets in real time.",
      "Demonstrate picking 5 different colored objects and sorting into correct bins.",
      "Show inverse kinematics calculation step by step for a given target coordinate.",
      "Present cycle time and placement accuracy metrics."
    ],
    freeVivaQuestions: [
      "What is the difference between forward kinematics and inverse kinematics?",
      "Why is YOLOv8 preferred over traditional blob detection for this task?",
      "What is a Denavit-Hartenberg (DH) parameter table and how does it describe robot geometry?"
    ],
    freeStep1Title: "Calibrate overhead camera using OpenCV checkerboard, establish pixel-to-robot-coordinate mapping",
    datasetName: "LINEMOD 6DOF object detection dataset + custom colored object detection dataset"
  },
  {
    id: "swarm-robotics-multi-agent-coordination",
    letter: "S",
    title: "Swarm Robotics: Multi-Robot Coordination Simulation",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Simulate 20+ robots that collectively solve navigation problems using stigmergy and emergence.",
    whatItDoes: "Using ARGoS or Webots simulator, implements swarm behaviors: flocking, foraging, aggregation, and task allocation without central control. Each robot only uses local sensor information.",
    realWorldUse: "Amazon's swarm robots in Kiva warehouses, ETH Zurich's Crazyflie drone swarms, and agricultural robots from EarthRobotics all use swarm principles.",
    examinerExpects: [
      "Show 20+ simulated robots aggregating around a virtual light source.",
      "Demonstrate emergent flocking behavior using only local neighbor distances.",
      "Show task allocation: robots self-organize to cover all target zones.",
      "Present scalability: swarm effectiveness as N increases from 5 to 50 robots."
    ],
    freeVivaQuestions: [
      "What is stigmergy and how do ant colonies use it for path optimization?",
      "Why is decentralized swarm control more robust than centralized control?",
      "What is emergence in complex systems and give an example from your simulation?"
    ],
    freeStep1Title: "Install ARGoS3 simulator, create arena XML, and implement first random walk behavior in C++",
    datasetName: "ARGoS3 benchmark scenarios + Boids flocking algorithm reference implementation"
  },
  {
    id: "embedded-rtos-real-time-control-freertos",
    letter: "E",
    title: "Real-Time Operating System for Embedded Control with FreeRTOS",
    category: "IoT",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Implement a multi-task real-time control system on ESP32 using FreeRTOS scheduling.",
    whatItDoes: "Multiple FreeRTOS tasks run concurrently: sensor reading at 100Hz, PID control at 50Hz, display update at 10Hz, and WiFi telemetry at 1Hz — all with guaranteed timing via priority scheduling.",
    realWorldUse: "All automotive ECUs, industrial PLCs, and medical devices use RTOS. Tesla, Bosch, and ST Microelectronics ship billions of FreeRTOS-powered chips annually.",
    examinerExpects: [
      "Show task timing analysis: demonstrate each task meets its deadline.",
      "Present priority inversion scenario and mutex-based prevention.",
      "Show semaphore-based producer-consumer between sensor and control tasks.",
      "Demonstrate watchdog timer resetting system if any task blocks unexpectedly."
    ],
    freeVivaQuestions: [
      "What is priority inversion and why is it catastrophic in real-time systems?",
      "What is the difference between preemptive and cooperative scheduling?",
      "How does a counting semaphore differ from a binary semaphore?"
    ],
    freeStep1Title: "Create FreeRTOS project on ESP32 using PlatformIO, create 3 tasks with different priorities and stacks",
    datasetName: "FreeRTOS reference manual + ESP-IDF FreeRTOS documentation"
  },
  // ─── AI/ML BATCH 2 ───────────────────────────────────────────────────────
  {
    id: "graph-attention-network-citation-classification",
    letter: "G",
    title: "Graph Attention Network for Citation Network Classification",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Classify academic papers using their citation relationships with Graph Attention Networks.",
    whatItDoes: "Implements GAT (Graph Attention Network) on the Cora and CiteSeer citation datasets. Each node is a paper, edges are citations. GAT learns which neighboring papers are most relevant for classification.",
    realWorldUse: "Google Scholar uses similar graph ML for research recommendation. Drug-protein interaction networks, social network analysis, and knowledge graphs all use GNNs for classification.",
    examinerExpects: [
      "Show node classification accuracy on Cora dataset beating GCN baseline.",
      "Visualize attention weights — which citations the model focuses on.",
      "Compare GAT vs GCN vs GraphSAGE on the same benchmark.",
      "Demonstrate t-SNE plot of learned node embeddings showing topic clusters."
    ],
    freeVivaQuestions: [
      "How does the attention mechanism in GAT differ from standard graph convolution?",
      "What is the semi-supervised learning setup in citation classification?",
      "Why does multi-head attention improve stability in GAT?"
    ],
    freeStep1Title: "Install PyTorch Geometric, load Cora dataset, and implement 2-layer GAT architecture",
    datasetName: "Cora citation dataset (2708 nodes, 5429 edges) + CiteSeer dataset"
  },
  {
    id: "neural-architecture-search-darts",
    letter: "N",
    title: "Neural Architecture Search with DARTS",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Let AI design its own neural network architecture — automated deep learning.",
    whatItDoes: "Implements DARTS (Differentiable ARchiTecture Search) to automatically discover optimal network structures for image classification, searching over operations like convolutions, pooling, and skip connections.",
    realWorldUse: "Google's NasNet, EfficientNet, and MobileNet were all discovered via NAS. AutoML platforms (Google AutoML, AWS AutoGluon) use NAS at scale for production model design.",
    examinerExpects: [
      "Show the architecture search phase discovering cell structures on CIFAR-10.",
      "Present the final discovered architecture diagram and parameter count.",
      "Compare DARTS-found architecture vs manually designed ResNet of similar size.",
      "Explain the continuous relaxation trick that makes architecture search differentiable."
    ],
    freeVivaQuestions: [
      "What is the core computational challenge of Neural Architecture Search (NAS)?",
      "How does DARTS convert discrete architecture choices into a continuous optimization problem?",
      "What is the weight-sharing trick in One-Shot NAS and how does it reduce search cost?"
    ],
    freeStep1Title: "Clone DARTS codebase, set up CIFAR-10 pipeline, and run first 50-epoch search phase on GPU",
    datasetName: "CIFAR-10 architecture search dataset + DARTS original codebase"
  },
  {
    id: "continual-learning-catastrophic-forgetting",
    letter: "C",
    title: "Continual Learning: Preventing Catastrophic Forgetting in Neural Networks",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Train a network on sequential tasks without it forgetting previous knowledge.",
    whatItDoes: "Implements EWC (Elastic Weight Consolidation) and Progressive Neural Networks to train a model sequentially on MNIST, Fashion-MNIST, and SVHN without forgetting the first tasks.",
    realWorldUse: "Autonomous vehicles need to learn new road conditions without forgetting old ones. NVIDIA, Waymo, and Tesla require continual learning in production. AI safety researchers consider catastrophic forgetting a fundamental unsolved problem.",
    examinerExpects: [
      "Show accuracy on Task 1 maintained after training on Task 2 (EWC vs naive fine-tuning).",
      "Plot forgetting curve: how much accuracy drops per sequential task.",
      "Explain Fisher information matrix role in EWC penalty computation.",
      "Compare EWC, Replay, and PackNet approaches."
    ],
    freeVivaQuestions: [
      "What is catastrophic forgetting and why is it a fundamental problem for neural networks?",
      "How does EWC use the Fisher information matrix to protect important weights?",
      "What is the plasticity-stability dilemma in continual learning?"
    ],
    freeStep1Title: "Set up PyTorch with Split-MNIST task benchmark and implement naive sequential fine-tuning baseline",
    datasetName: "Permuted-MNIST + Split-CIFAR-100 continual learning benchmarks"
  },
  {
    id: "reinforcement-learning-trading-agent-gymnasium",
    letter: "R",
    title: "Reinforcement Learning Trading Agent using Gymnasium",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Train a PPO agent to trade stocks by maximizing portfolio returns over historical data.",
    whatItDoes: "Custom Gymnasium trading environment with OHLCV observation space. PPO agent learns to hold, buy, or sell positions. Reward function based on portfolio return with Sharpe ratio bonus.",
    realWorldUse: "Two Sigma, DE Shaw, and WorldQuant use RL for systematic trading. Indian quant funds like Quadeye and AlphaGrep research RL trading strategies. This is cutting-edge quantitative finance.",
    examinerExpects: [
      "Show agent learning curve with cumulative reward increasing over training.",
      "Present backtest: agent vs buy-and-hold strategy on 1-year test set.",
      "Show the observation space design with technical indicators as features.",
      "Demonstrate reward shaping: how you prevented the agent from taking 100% position risk."
    ],
    freeVivaQuestions: [
      "Why is RL for trading episodic rather than a simple supervised regression problem?",
      "What is the exploration-exploitation tradeoff in a trading agent?",
      "How do you prevent the agent from overfitting to historical data?"
    ],
    freeStep1Title: "Install FinRL library, build custom TradingEnv with NSE data, and run first PPO training loop",
    datasetName: "NSE historical daily OHLCV 2015–2025 + FinRL stock trading environment"
  },
  {
    id: "image-segmentation-satellite-unet",
    letter: "I",
    title: "Satellite Image Segmentation with U-Net",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Pixel-wise semantic segmentation of satellite images for land use classification.",
    whatItDoes: "U-Net with ResNet-34 encoder segments satellite imagery into: urban, forest, agricultural, water, and road classes. Used for urban planning, flood zone mapping, and deforestation monitoring.",
    realWorldUse: "ISRO's Bhuvan, NRSC, and startups like SkyServe and GalaxEye use satellite image segmentation for Indian government and commercial applications.",
    examinerExpects: [
      "Show side-by-side: satellite image vs segmentation mask.",
      "Present per-class IoU (Intersection over Union) scores on test set.",
      "Demonstrate the skip connections in U-Net and why they improve boundary accuracy.",
      "Show class imbalance handling for rare water body pixels."
    ],
    freeVivaQuestions: [
      "What is the encoder-decoder architecture and why is it effective for segmentation?",
      "Why does U-Net use skip connections between encoder and decoder layers?",
      "What is the difference between semantic segmentation and instance segmentation?"
    ],
    freeStep1Title: "Download DeepGlobe Land Cover dataset and implement U-Net with segmentation_models_pytorch library",
    datasetName: "DeepGlobe Land Cover Classification dataset + ISPRS Potsdam dataset"
  },
  {
    id: "transformers-time-series-forecasting-patchtst",
    letter: "T",
    title: "Long-Term Time Series Forecasting with PatchTST Transformer",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Outperform LSTM and ARIMA on long-range time series using patch-based Transformer.",
    whatItDoes: "Implements PatchTST — segments time series into subseries patches treated as tokens, uses Transformer self-attention for long-range dependency capture. Benchmarks on ETTh1 energy dataset.",
    realWorldUse: "Microsoft, Google, and Amazon use Transformer-based forecasting for cloud resource planning. India's power grid operators need 7-day ahead electricity demand forecasts for load balancing.",
    examinerExpects: [
      "Show 336-step ahead forecasting on ETTh1 dataset.",
      "Compare PatchTST vs LSTM vs N-BEATS vs ARIMA baseline.",
      "Explain the patching mechanism and channel independence strategies.",
      "Present ablation: patching vs no patching, effect on performance."
    ],
    freeVivaQuestions: [
      "Why do Transformers outperform LSTMs on very long time series sequences?",
      "What is patching in PatchTST and why does it reduce computational cost?",
      "What is the channel mixing vs channel independence design choice?"
    ],
    freeStep1Title: "Clone Time-Series-Library repo, set up ETTh1 dataset pipeline, and run PatchTST baseline training",
    datasetName: "ETT (Electricity Transformer Temperature) dataset + Exchange Rate financial time series"
  },
  {
    id: "stable-diffusion-controlnet-pose-generation",
    letter: "S",
    title: "Human Pose-Conditioned Image Generation with ControlNet",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Generate fashion photos of any clothing on any body pose using ControlNet OpenPose.",
    whatItDoes: "Extracts human pose skeleton using OpenPose/DWPose from a reference image. ControlNet conditions Stable Diffusion on this skeleton to generate photorealistic images of different people in the same pose.",
    realWorldUse: "Zalando, ASOS, and Myntra use virtual try-on technology. Adobe Firefly's Generate Similar feature uses pose conditioning. This eliminates expensive fashion photoshoots.",
    examinerExpects: [
      "Show pose skeleton extracted from reference image.",
      "Generate 3 different people in the same exact pose.",
      "Demonstrate outfit swapping: same pose, different clothing description.",
      "Show FID score comparison: pose-conditioned vs unconditioned generation."
    ],
    freeVivaQuestions: [
      "What is OpenPose and how does it detect 18 body keypoints from a single image?",
      "How does ControlNet inject pose conditioning without modifying the base UNet weights?",
      "What is CLIP text encoder doing in Stable Diffusion pipeline?"
    ],
    freeStep1Title: "Install ControlNet extension in Automatic1111 WebUI and test OpenPose preprocessor on sample image",
    datasetName: "DeepFashion2 dataset + MPII Human Pose dataset"
  },
  {
    id: "llm-code-generation-evaluation-humaneval",
    letter: "L",
    title: "LLM Code Generation Evaluation on HumanEval Benchmark",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–4 days",
    trending: true,
    tagline: "Evaluate and compare code generation ability of different LLMs using OpenAI's HumanEval.",
    whatItDoes: "Runs Codex, CodeLlama, DeepSeek-Coder, and GPT-4 against 164 Python programming problems. Compares pass@k metrics, analyzes failure categories, and visualizes capability differences.",
    realWorldUse: "GitHub Copilot, Amazon CodeWhisperer, and Google Duet Code all compete on coding benchmarks. This is the standard evaluation methodology for all code-generating AI systems.",
    examinerExpects: [
      "Show pass@1 and pass@10 metrics for each model on HumanEval.",
      "Categorize error types: syntax errors, logic errors, missing edge cases.",
      "Show that temperature affects pass@k tradeoff between accuracy and diversity.",
      "Present the most common failure patterns across all models."
    ],
    freeVivaQuestions: [
      "What is pass@k metric and why is it better than a simple accuracy measure?",
      "Why does temperature sampling improve pass@k but harm pass@1?",
      "What types of programming problems are hardest for current LLMs?"
    ],
    freeStep1Title: "Clone HumanEval repository, set up OpenAI/Ollama API connections, and run first evaluation loop",
    datasetName: "HumanEval 164 programming problems + MBPP (Mostly Basic Programming Problems) dataset"
  },
  {
    id: "audio-source-separation-demucs",
    letter: "A",
    title: "AI Music Source Separation with Demucs",
    category: "AIML",
    difficulty: 3,
    buildTimeDays: "2–3 days",
    trending: true,
    tagline: "Separate any song into drums, bass, vocals, and other instruments using Meta's Demucs.",
    whatItDoes: "Applies Facebook Research's Demucs model to separate mixed audio into individual stems. Builds a web interface where users upload songs and download separated tracks.",
    realWorldUse: "Lalal.ai, Moises.ai, and LANDR use source separation commercially. Music producers, karaoke apps, and DJ software all need stem separation. This is a $2B TAM.",
    examinerExpects: [
      "Upload a copyrighted song (use royalty-free test track) and play back separated stems.",
      "Show signal-to-distortion ratio (SDR) metric on MUSDB18 benchmark.",
      "Explain the hybrid Transformer-U-Net architecture of Demucs v4.",
      "Demonstrate the remix application: recombine stems with different volume ratios."
    ],
    freeVivaQuestions: [
      "What is blind source separation and why is it a hard problem?",
      "How does Demucs use both waveform and spectrogram domains simultaneously?",
      "What is the SDR (Signal-to-Distortion Ratio) metric and what score is considered excellent?"
    ],
    freeStep1Title: "Install demucs package, run inference on royalty-free test track, listen to separated stems",
    datasetName: "MUSDB18 benchmark dataset (150 full-length songs with stems)"
  },
  {
    id: "video-object-tracking-bytetrack",
    letter: "V",
    title: "Multi-Object Tracking in Video using ByteTrack",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Track every person and vehicle in a crowded video with unique IDs across occlusions.",
    whatItDoes: "ByteTrack assigns persistent IDs to detected objects across video frames. Uses YOLO detection + Kalman filter trajectory prediction + IoU matching. Handles occlusions robustly by keeping low-confidence detections.",
    realWorldUse: "Smart city surveillance, stadium crowd analytics, sports performance analysis, and retail foot traffic counting all use multi-object tracking. Nvidia DeepStream uses ByteTrack in production.",
    examinerExpects: [
      "Show crowd video with each person maintaining unique colored ID box across frames.",
      "Demonstrate ID re-association after complete occlusion behind a pillar.",
      "Present HOTA (Higher Order Tracking Accuracy) metric on MOT17 benchmark.",
      "Show people counting zone: count persons entering/leaving a defined region."
    ],
    freeVivaQuestions: [
      "What is the Hungarian algorithm and how does it solve the data association problem?",
      "How does ByteTrack differ from SORT and why does it handle low-confidence detections better?",
      "What is the MOTA metric and what do ID switches tell us about tracker quality?"
    ],
    freeStep1Title: "Install ByteTrack repository, download MOT17 test video, run YOLOX detection + tracking pipeline",
    datasetName: "MOT17 Multi-Object Tracking benchmark + DanceTrack dataset"
  },
  {
    id: "image-super-resolution-real-esrgan",
    letter: "I",
    title: "AI Image Super Resolution with Real-ESRGAN",
    category: "AIML",
    difficulty: 3,
    buildTimeDays: "2–3 days",
    trending: true,
    tagline: "Upscale blurry low-resolution images to 4x sharp quality using Real-ESRGAN.",
    whatItDoes: "Applies Real-ESRGAN (Real-World Enhanced Super Resolution GAN) to upscale images 4x while restoring details, removing JPEG artifacts, and enhancing textures. Builds a before/after comparison web app.",
    realWorldUse: "Adobe Photoshop's Super Resolution, Gigapixel AI, and Topaz Photo AI are commercial products. Forensics departments, old photo restoration, and satellite imagery enhancement all use ESRGAN.",
    examinerExpects: [
      "Show before/after comparison on a 128x128 input upscaled to 512x512.",
      "Present PSNR and SSIM metrics on DIV2K test set.",
      "Demonstrate face restoration bonus using GFPGAN combined with Real-ESRGAN.",
      "Show failure cases: extreme noise or very old scans where ESRGAN hallucinates details."
    ],
    freeVivaQuestions: [
      "What is the perceptual loss and why does it produce sharper outputs than MSE loss?",
      "What is the difference between bicubic interpolation and deep learning super-resolution?",
      "How does the discriminator in ESRGAN enforce photorealistic texture generation?"
    ],
    freeStep1Title: "Clone Real-ESRGAN repository, download model weights, run inference on test image batch",
    datasetName: "DIV2K high-resolution image dataset + Set14 and BSD100 benchmark datasets"
  },
  {
    id: "pose-estimation-3d-human-motion-capture",
    letter: "P",
    title: "3D Human Motion Capture from Single Camera with MediaPipe",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Extract full-body 3D pose from a single webcam for gesture control and animation.",
    whatItDoes: "MediaPipe Holistic extracts 33 body landmarks, 21 hand landmarks per hand, and 468 face landmarks from each frame. Builds a virtual avatar animation system and gesture-controlled presentation remote.",
    realWorldUse: "Snap, Instagram Reels, and TikTok use pose tracking for AR filters. Motion capture for game character animation traditionally requires expensive suits — single-camera approaches democratize this.",
    examinerExpects: [
      "Show skeleton overlay with 3D joint positions rendered in real time.",
      "Demonstrate gesture recognition controlling presentation slides.",
      "Show animation driving: 3D avatar mirroring user movements.",
      "Present latency benchmark: end-to-end processing time per frame."
    ],
    freeVivaQuestions: [
      "How does MediaPipe achieve real-time 33-landmark body detection on a CPU?",
      "What is the BlazePose model architecture and how is it different from OpenPose?",
      "How do you convert 2D pixel landmarks into 3D world coordinates?"
    ],
    freeStep1Title: "Install mediapipe, run holistic model on webcam, verify all 33 body landmarks are detected",
    datasetName: "Human3.6M 3D pose dataset + MPI-INF-3DHP benchmark"
  },
  // ─── FULLSTACK BATCH 2 ───────────────────────────────────────────────────
  {
    id: "webrtc-video-calling-app-nextjs",
    letter: "W",
    title: "WebRTC Video Calling App with Screen Share",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Build a Zoom-like video calling app with screen sharing using WebRTC and Socket.io.",
    whatItDoes: "Peer-to-peer video/audio calls using WebRTC. Socket.io handles signaling (SDP offer/answer, ICE candidates). Features include screen sharing, mute/unmute, room creation with shareable links.",
    realWorldUse: "Jitsi Meet (open-source), Daily.co, and Whereby are commercial WebRTC products. Post-COVID, video calling infrastructure is critical for every enterprise and education platform.",
    examinerExpects: [
      "Show two browser tabs video calling each other with audio.",
      "Demonstrate screen sharing switch mid-call.",
      "Show the STUN/TURN server role when NAT traversal fails.",
      "Present bandwidth adaptation: quality degrades gracefully on slow connections."
    ],
    freeVivaQuestions: [
      "What is the SDP handshake in WebRTC and what information does it exchange?",
      "What is ICE (Interactive Connectivity Establishment) and why does NAT make it necessary?",
      "When is a TURN server required and what are the bandwidth implications?"
    ],
    freeStep1Title: "Set up Next.js Socket.io server, implement WebRTC signaling room, test basic peer connection",
    datasetName: "Coturn STUN/TURN server + WebRTC adapter.js polyfill library"
  },
  {
    id: "ecommerce-recommendation-a-b-test-pipeline",
    letter: "E",
    title: "E-Commerce Recommendation System with A/B Testing",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "4–5 days",
    trending: true,
    tagline: "Full-stack product recommendation engine with built-in experiment framework.",
    whatItDoes: "Collaborative filtering + content-based hybrid recommender. Users are bucketed into control (rule-based) and treatment (ML) groups. Click-through rates are tracked per variant to measure impact.",
    realWorldUse: "Amazon's recommendation engine drives 35% of revenue. Every e-commerce platform from Flipkart to Meesho runs 10+ simultaneous recommendation experiments at any time.",
    examinerExpects: [
      "Show personalized product feed updating as user interaction data accumulates.",
      "Present A/B test results: CTR comparison between rule-based and ML recommender.",
      "Demonstrate the feature store: user embedding and item embedding lookup.",
      "Show cold-start fallback for new users with no interaction history."
    ],
    freeVivaQuestions: [
      "What is the explore-exploit tradeoff in recommendation systems?",
      "How do you detect selection bias in A/B testing for recommendation systems?",
      "What is item embedding and how is it different from bag-of-words representation?"
    ],
    freeStep1Title: "Set up Next.js with Redis for session bucketing and implement matrix factorization recommender",
    datasetName: "Amazon product reviews dataset (McAuley) + MovieLens for cold-start testing"
  },
  {
    id: "nextjs-saas-subscription-billing-stripe",
    letter: "N",
    title: "SaaS Subscription Billing with Stripe and Next.js",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Complete subscription management: plans, upgrades, downgrades, billing portal, and usage metering.",
    whatItDoes: "Stripe integration with Next.js handling: customer creation, subscription lifecycle, payment method management, invoice generation, usage-based billing for API credits, and a self-serve billing portal.",
    realWorldUse: "Every SaaS company uses Stripe. Understanding Stripe's subscription model is essential for any startup engineer. This is asked in every SaaS engineer interview.",
    examinerExpects: [
      "Show plan upgrade flow with proration calculation.",
      "Demonstrate Stripe webhook handling for payment_intent.succeeded event.",
      "Show usage-based billing: API calls metered and billed monthly.",
      "Present the customer billing portal for self-service subscription management."
    ],
    freeVivaQuestions: [
      "What is proration and how does Stripe calculate it for mid-cycle plan changes?",
      "What is a Stripe webhook and why is idempotency important for webhook handlers?",
      "What is the difference between Stripe Subscriptions and Payment Intents?"
    ],
    freeStep1Title: "Create Stripe account, install stripe-js, implement customer creation and first subscription checkout",
    datasetName: "Stripe test mode API + Stripe CLI for local webhook testing"
  },
  {
    id: "search-engine-from-scratch-inverted-index",
    letter: "S",
    title: "Search Engine from Scratch: Inverted Index and BM25",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Build a mini Google: crawl, index, and rank 100,000+ documents with BM25 scoring.",
    whatItDoes: "Web crawler downloads pages, tokenizer processes text, inverted index stores term→document mappings, BM25 ranker scores documents for relevance. Boolean operators, phrase search, and query expansion supported.",
    realWorldUse: "Elasticsearch, Solr, and Tantivy are all built on inverted index principles. Understanding search internals is essential for backend engineers at any company with a search feature.",
    examinerExpects: [
      "Show search query returning results with BM25 relevance scores.",
      "Demonstrate phrase query searching for exact word sequences.",
      "Show the inverted index data structure with term frequency and position lists.",
      "Present index size and query latency at 100K document scale."
    ],
    freeVivaQuestions: [
      "What is an inverted index and how does it enable fast keyword search?",
      "How does BM25 improve over TF-IDF for document ranking?",
      "What is query expansion and how does WordNet enable it?"
    ],
    freeStep1Title: "Build tokenizer and inverted index in Python, index 10,000 Wikipedia abstracts, verify search works",
    datasetName: "Wikipedia article abstracts dump + MS MARCO web passage dataset"
  },
  {
    id: "ci-cd-pipeline-github-actions-docker",
    letter: "C",
    title: "CI/CD Pipeline with GitHub Actions, Docker, and Kubernetes",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Build the DevOps pipeline every professional team uses: test, build, and deploy automatically.",
    whatItDoes: "GitHub Actions pipeline: runs unit tests on PR, builds Docker image, pushes to registry, deploys to Kubernetes with zero-downtime rolling update. Includes Prometheus monitoring and Grafana dashboards.",
    realWorldUse: "Every tech company uses CI/CD. Flipkart deploys 100+ times per day. Zomato, CRED, and Urban Company all run Kubernetes-based microservices. This is the #1 DevOps skill in demand.",
    examinerExpects: [
      "Show pipeline running: commit triggers test → build → push → deploy sequence.",
      "Demonstrate zero-downtime deployment: old pods terminate only after new ones are healthy.",
      "Show Prometheus alert firing when service error rate exceeds threshold.",
      "Present rollback procedure when deployment fails health check."
    ],
    freeVivaQuestions: [
      "What is the difference between rolling update and blue-green deployment?",
      "What is a Kubernetes liveness probe vs readiness probe and when does each matter?",
      "What is the purpose of a Helm chart in Kubernetes deployments?"
    ],
    freeStep1Title: "Create .github/workflows/ci.yml, add test and docker build steps, verify on first PR push",
    datasetName: "Kubernetes kind local cluster + Docker Hub container registry"
  },
  {
    id: "distributed-systems-raft-consensus",
    letter: "D",
    title: "Raft Consensus Algorithm Implementation",
    category: "FullStack",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Implement the algorithm behind etcd, CockroachDB, and TiKV for distributed consensus.",
    whatItDoes: "Implements the full Raft consensus protocol: leader election, log replication, and log compaction. A 5-node cluster maintains consistency through leader failures and network partitions.",
    realWorldUse: "etcd (used by all Kubernetes clusters), CockroachDB, TiKV (TikTok's database), and Consul all use Raft. Understanding distributed consensus is required for senior backend roles at FAANG.",
    examinerExpects: [
      "Show cluster electing a new leader when the current leader is killed.",
      "Demonstrate that writes are rejected during leader election (no split-brain).",
      "Show log replication: write on leader appears on all followers consistently.",
      "Present network partition handling: minority partition cannot commit writes."
    ],
    freeVivaQuestions: [
      "What is the split-brain problem in distributed systems and how does Raft prevent it?",
      "What is a term in Raft and how does it help detect stale leaders?",
      "What is the difference between strong consistency, eventual consistency, and causal consistency?"
    ],
    freeStep1Title: "Set up 5 Python/Go processes communicating via gRPC, implement RequestVote RPC for leader election",
    datasetName: "Raft extended paper implementation guide + MIT 6.824 lab starter code"
  },
  // ─── DATA SCIENCE BATCH 2 ─────────────────────────────────────────────────
  {
    id: "survival-analysis-customer-churn-cox",
    letter: "S",
    title: "Survival Analysis for Customer Churn with Cox Proportional Hazard",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Predict not just whether a customer will churn, but exactly when — enabling timely intervention.",
    whatItDoes: "Cox Proportional Hazard model estimates hazard rates for customer churn. Kaplan-Meier curves visualize survival by customer segment. Output: probability of churning within next 7/30/90 days per customer.",
    realWorldUse: "Airtel, Jio, and Ola use survival analysis for churn prediction. It's more powerful than binary classification because it accounts for censored data (customers who haven't churned yet).",
    examinerExpects: [
      "Show Kaplan-Meier curves for different customer segments.",
      "Present partial log-likelihood and concordance index for model validation.",
      "Demonstrate individual survival curve prediction for a specific customer profile.",
      "Compare Cox model vs XGBoost binary classifier on time-to-event accuracy."
    ],
    freeVivaQuestions: [
      "What is censored data in survival analysis and why does it occur?",
      "What is the proportional hazards assumption and how do you test if it holds?",
      "Why is binary churn classification less informative than survival analysis?"
    ],
    freeStep1Title: "Install lifelines library, load Telco Churn dataset, compute Kaplan-Meier survival curve",
    datasetName: "IBM Telco Customer Churn dataset + KDD CUP 2009 churn dataset"
  },
  {
    id: "nlp-document-clustering-bertopic",
    letter: "N",
    title: "Topic Modeling on News Articles with BERTopic",
    category: "DataScience",
    difficulty: 3,
    buildTimeDays: "2–4 days",
    trending: true,
    tagline: "Automatically discover and label topics in thousands of news articles using BERTopic.",
    whatItDoes: "BERTopic pipeline: BERT sentence embeddings → UMAP dimensionality reduction → HDBSCAN clustering → c-TF-IDF topic representation. Dynamic topic modeling shows how topics evolve over time.",
    realWorldUse: "News aggregators (Flipboard, Google News), social media monitoring, and customer feedback analysis all use topic modeling. This replaces outdated LDA with BERT-powered quality.",
    examinerExpects: [
      "Show top 20 discovered topics with representative keywords.",
      "Visualize topic map in 2D: similar topics cluster together.",
      "Demonstrate dynamic topic modeling: 'COVID' topic trends over months.",
      "Compare BERTopic coherence score vs LDA baseline."
    ],
    freeVivaQuestions: [
      "What is the c-TF-IDF formula in BERTopic and how does it differ from standard TF-IDF?",
      "Why does UMAP+HDBSCAN outperform K-Means for document clustering?",
      "What is topic coherence and how is it measured?"
    ],
    freeStep1Title: "Install BERTopic, download 20 Newsgroups or AllTheNews dataset, run first topic extraction",
    datasetName: "All the News 2.0 (202,000 articles) + 20 Newsgroups dataset"
  },
  {
    id: "explainable-ai-lime-shap-comparison",
    letter: "E",
    title: "Explainable AI: LIME vs SHAP Deep Comparison",
    category: "DataScience",
    difficulty: 3,
    buildTimeDays: "2–3 days",
    trending: true,
    tagline: "Build an XAI dashboard explaining ML predictions with both LIME and SHAP, comparing their outputs.",
    whatItDoes: "Trains XGBoost on a credit scoring dataset. Builds an interactive Streamlit dashboard where users select any prediction and see both LIME (local linear approximation) and SHAP (game theory) explanations side-by-side.",
    realWorldUse: "RBI mandates explainability for AI-based credit decisions under FAIR AI guidelines. European Union's AI Act requires high-risk AI systems to explain decisions. This is mandatory for deployed ML.",
    examinerExpects: [
      "Show SHAP waterfall plot for a credit approval with each feature's contribution.",
      "Show LIME explanation for the same prediction — do they agree?",
      "Demonstrate SHAP global feature importance vs LIME's local approximation.",
      "Show where LIME and SHAP disagree and explain why."
    ],
    freeVivaQuestions: [
      "What is the mathematical foundation of SHAP values (Shapley values from game theory)?",
      "Why can LIME give different explanations for the same prediction on different runs?",
      "When would you prefer LIME over SHAP in a production system?"
    ],
    freeStep1Title: "Train XGBoost on HELOC credit dataset, install shap and lime, generate first explanation plot",
    datasetName: "FICO HELOC credit scoring dataset + UCI German Credit dataset"
  },
  {
    id: "data-pipeline-apache-airflow-etl",
    letter: "D",
    title: "Automated Data Pipeline with Apache Airflow",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Build the ETL pipeline that powers every data warehouse: extract, transform, load with scheduling.",
    whatItDoes: "Airflow DAGs orchestrate: daily API data extraction, pandas/dbt transformations, loading to BigQuery/Snowflake/PostgreSQL, and triggering dbt model runs. Includes SLA monitoring and failure alerting.",
    realWorldUse: "Airbnb (invented Airflow), Uber, and every data engineering team uses workflow orchestration. This is the most in-demand Data Engineering skill in India — all top companies use Airflow.",
    examinerExpects: [
      "Show Airflow UI with DAG running on schedule and task dependency graph.",
      "Demonstrate failed task sending Slack/email alert with error details.",
      "Show dbt transformation model running as Airflow task.",
      "Present SLA breach detection for tasks taking longer than expected."
    ],
    freeVivaQuestions: [
      "What is a DAG in Airflow and why must it be acyclic?",
      "What is idempotency in data pipelines and why is it critical for retry safety?",
      "What is the difference between push and pull task communication in Airflow?"
    ],
    freeStep1Title: "Install Apache Airflow via pip, initialize SQLite metadata DB, create first DAG with 3 dependent tasks",
    datasetName: "Open Government Data India API + World Bank economic indicators API"
  },
  // ─── NLP BATCH 2 ─────────────────────────────────────────────────────────
  {
    id: "document-qa-rag-pdf-langchain",
    letter: "D",
    title: "Document Q&A System with RAG over PDFs",
    category: "NLP",
    difficulty: 3,
    buildTimeDays: "2–3 days",
    trending: true,
    tagline: "Upload any PDF and ask questions in plain language — AI reads and answers instantly.",
    whatItDoes: "PDF text is chunked, embedded with all-MiniLM, and stored in ChromaDB/FAISS vector store. User questions retrieve relevant chunks via similarity search, which are fed to GPT-4 or local Llama-3 for answer generation.",
    realWorldUse: "Notion AI, ChatPDF, and Humata.ai are million-user products built on this exact pattern. Law firms use it for contract review, students use it for textbooks, and companies use it for knowledge management.",
    examinerExpects: [
      "Upload a 50-page engineering textbook PDF and answer 10 questions from it.",
      "Show that the answer includes the page number reference.",
      "Demonstrate that a question outside the PDF is answered with 'I don't know'.",
      "Show chunk retrieval: which paragraphs were retrieved to answer the question."
    ],
    freeVivaQuestions: [
      "What is the difference between RAG and fine-tuning for domain-specific Q&A?",
      "How do you choose the optimal chunk size for PDF document retrieval?",
      "What is the 'lost in the middle' problem in LLM context windows?"
    ],
    freeStep1Title: "Install LangChain, pypdf, and ChromaDB, load a PDF and test first chunk embedding and retrieval",
    datasetName: "NCERT textbook PDFs + SEC financial filings corpus"
  },
  {
    id: "named-entity-recognition-biomedical-ner",
    letter: "N",
    title: "Biomedical Named Entity Recognition with BioBERT",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "3–4 days",
    trending: true,
    tagline: "Extract drug names, disease names, and gene mentions from medical literature automatically.",
    whatItDoes: "Fine-tunes BioBERT on NCBI Disease and BC5CDR biomedical NER datasets. Extracts medical entities from PubMed abstracts: drugs, diseases, genes, proteins, and symptoms with high precision.",
    realWorldUse: "Pharmaceutical companies use biomedical NER for drug discovery literature mining. IBM Watson for Oncology, Elsevier, and Springer Nature use this for automated medical knowledge extraction.",
    examinerExpects: [
      "Show entity extraction on a PubMed abstract with drug and disease spans highlighted.",
      "Present F1 score on BC5CDR Chemical-Disease test set.",
      "Demonstrate nested entity handling (disease as modifier of another entity).",
      "Compare BioBERT vs general BERT F1 on medical text."
    ],
    freeVivaQuestions: [
      "Why does BioBERT outperform BERT on biomedical NER despite same architecture?",
      "What is IOB tagging scheme and how does it handle multi-token entity spans?",
      "How do you evaluate NER — what constitutes a true positive at the span level?"
    ],
    freeStep1Title: "Download BioBERT model, load BC5CDR dataset via HuggingFace datasets, configure token classification head",
    datasetName: "BC5CDR Chemical-Disease corpus + NCBI Disease corpus + DrugProt dataset"
  },
  {
    id: "semantic-textual-similarity-siamese-bert",
    letter: "S",
    title: "Sentence Similarity Search with Sentence-BERT",
    category: "NLP",
    difficulty: 3,
    buildTimeDays: "2–3 days",
    trending: true,
    tagline: "Find semantically similar sentences 1000x faster than standard BERT using SBERT pooling.",
    whatItDoes: "Sentence-BERT produces fixed-size sentence embeddings via mean pooling that can be compared with cosine similarity. Builds a semantic search engine for a Q&A knowledge base.",
    realWorldUse: "Stack Overflow, Quora, and GitHub Issues all use semantic similarity for duplicate question detection. Customer support systems use it for FAQ matching. Semantic search is in every modern product.",
    examinerExpects: [
      "Show semantic search: 'how to iterate a list in python' finding similar questions.",
      "Demonstrate cross-lingual search: Hindi query finding English answers.",
      "Show embedding visualization: related questions cluster in 2D UMAP space.",
      "Present inference time: SBERT 1000x faster than cross-encoder BERT for large-scale retrieval."
    ],
    freeVivaQuestions: [
      "Why can't you use standard BERT for semantic similarity without Siamese training?",
      "What is the difference between a bi-encoder and a cross-encoder for sentence similarity?",
      "When is a cross-encoder preferred over a bi-encoder despite its slower speed?"
    ],
    freeStep1Title: "Install sentence-transformers, load all-MiniLM-L6-v2, embed 10K Quora question pairs",
    datasetName: "Quora Question Pairs dataset + STS Benchmark for evaluation"
  },
  {
    id: "grammar-correction-seq2seq-t5",
    letter: "G",
    title: "Grammatical Error Correction with T5 Transformer",
    category: "NLP",
    difficulty: 3,
    buildTimeDays: "2–4 days",
    trending: true,
    tagline: "Correct English grammar errors using a fine-tuned T5 sequence-to-sequence model.",
    whatItDoes: "Fine-tunes T5-small on the CoNLL-2014 Grammatical Error Correction dataset. Corrects spelling, grammar, punctuation, and style errors. Useful for ESL (English as Second Language) students.",
    realWorldUse: "Grammarly has 30 million daily users. Microsoft Word's grammar check, Google Docs suggestions, and Quillbot all use GEC models. This is a $2.4B market.",
    examinerExpects: [
      "Show 10 erroneous sentences corrected accurately by the model.",
      "Present F0.5 score on CoNLL-2014 test set (precision-weighted metric).",
      "Demonstrate beam search vs greedy decoding quality comparison.",
      "Show error type breakdown: grammar, spelling, punctuation, word choice."
    ],
    freeVivaQuestions: [
      "Why is F0.5 used instead of F1 for grammatical error correction evaluation?",
      "How does T5 frame GEC as a text-to-text problem differently from a classification task?",
      "What is beam search and why does it typically outperform greedy decoding for text generation?"
    ],
    freeStep1Title: "Download CoNLL-2014 GEC dataset, configure T5-small tokenizer with source-target prefix, train 3 epochs",
    datasetName: "CoNLL-2014 Grammatical Error Correction dataset + W&I+L dataset"
  },
  {
    id: "conversational-ai-memory-persistent-langchain",
    letter: "C",
    title: "Persistent Memory Conversational AI with LangChain",
    category: "NLP",
    difficulty: 3,
    buildTimeDays: "2–4 days",
    trending: true,
    tagline: "Build a ChatGPT that actually remembers who you are across sessions — persistent AI companion.",
    whatItDoes: "LangChain ConversationSummaryMemory + Zep/Mem0 long-term memory store. Remembers user preferences, past topics, and personal details across days/weeks of conversation without context window limits.",
    realWorldUse: "Character.ai has 100M users. Replika, Pi AI, and Inflection all compete in persistent AI companions. Every enterprise chatbot needs memory to avoid repeating itself every session.",
    examinerExpects: [
      "Show new session where AI remembers user's name and preferences from yesterday.",
      "Demonstrate memory compression: 100-message history summarized into dense representation.",
      "Show forgetting mechanism: outdated information replaced by newer preferences.",
      "Present privacy controls: user can view and delete stored memories."
    ],
    freeVivaQuestions: [
      "What is the context window limitation problem in LLM memory?",
      "How does conversation summarization memory differ from buffer memory?",
      "What are the privacy implications of long-term AI memory storage?"
    ],
    freeStep1Title: "Set up Zep memory server, configure LangChain ConversationSummaryMemory, test session persistence",
    datasetName: "PersonaChat conversational dataset + ConvAI2 multi-turn dialogue dataset"
  },
  // ─── BLOCKCHAIN BATCH 2 ──────────────────────────────────────────────────
  {
    id: "defi-flash-loan-arbitrage-bot",
    letter: "D",
    title: "DeFi Flash Loan Arbitrage Bot",
    category: "Blockchain",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Execute zero-capital arbitrage across DeFi protocols using Aave flash loans.",
    whatItDoes: "Smart contract borrows tokens via Aave flash loan, swaps on Uniswap, counter-swaps on SushiSwap to capture price difference, and repays loan + fee — all in a single atomic transaction.",
    realWorldUse: "Flash loan arbitrage generates $50-200M daily on Ethereum. Understanding MEV (Miner Extractable Value) and flash loans is essential for any DeFi protocol developer or security researcher.",
    examinerExpects: [
      "Show a profitable arbitrage transaction on forked mainnet.",
      "Demonstrate the atomicity: if price gap disappears, entire transaction reverts.",
      "Show gas cost analysis: profit must exceed gas + flash loan fee.",
      "Present mempool monitoring for identifying arbitrage opportunities."
    ],
    freeVivaQuestions: [
      "What is a flash loan and why does it require atomicity within a single transaction?",
      "What is MEV (Maximal Extractable Value) and how do sandwich attacks work?",
      "Why is frontrunning protection important for DEX users?"
    ],
    freeStep1Title: "Set up Hardhat with Mainnet fork using Alchemy, write flash loan receiver contract, test on forked state",
    datasetName: "Aave V3 Flash Loan documentation + Uniswap V3 SDK pricing data"
  },
  {
    id: "ethereum-gas-optimization-patterns",
    letter: "E",
    title: "Ethereum Gas Optimization: 15 Solidity Patterns",
    category: "Blockchain",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Learn and implement the gas optimization patterns used by top DeFi protocols to cut costs 60%+.",
    whatItDoes: "Implements 15 gas optimization patterns in Solidity: storage packing, calldata vs memory, assembly for tight loops, custom errors, SSTORE2 for bulk data, and ERC-1167 minimal proxy (Clone Factory).",
    realWorldUse: "Uniswap V3 saves users $8M monthly through gas optimization. Every DeFi protocol must optimize gas or users will choose cheaper alternatives. This is a critical production skill.",
    examinerExpects: [
      "Show gas cost comparison for each optimization with Hardhat gas reporter.",
      "Demonstrate storage packing: 3 uint128 in one slot vs 3 separate slots.",
      "Show custom error vs require string saving 50% gas on reverts.",
      "Present the assembly optimized loop vs Solidity loop benchmark."
    ],
    freeVivaQuestions: [
      "What is an EVM storage slot and why does packing variables in one slot save gas?",
      "What is the difference between memory and calldata in Solidity and when do you use each?",
      "What is a minimal proxy (EIP-1167) and how does it reduce deployment cost for many instances?"
    ],
    freeStep1Title: "Set up Hardhat with gas reporter plugin, create baseline contract, measure gas for each operation",
    datasetName: "Ethereum Yellow Paper opcodes gas table + Foundry gas snapshots"
  },
  {
    id: "substrate-custom-blockchain-polkadot",
    letter: "S",
    title: "Custom Blockchain with Substrate Framework",
    category: "Blockchain",
    difficulty: 5,
    buildTimeDays: "7–10 days",
    trending: true,
    tagline: "Build your own blockchain with custom consensus, governance, and tokens using Polkadot's SDK.",
    whatItDoes: "Creates a Substrate parachain with custom pallets: a token standard, simple DEX, and governance module. The chain runs with AURA consensus and can connect to Polkadot as a parachain.",
    realWorldUse: "Polkadot, Kusama, and Parachain projects (Moonbeam, Acala, Astar) are built on Substrate. India's Polygon Labs contributes to Substrate-based zkEVM development.",
    examinerExpects: [
      "Show custom chain running locally with block production in Polkadot.js.",
      "Demonstrate token transfer between two accounts using custom pallet.",
      "Show governance proposal vote execution changing runtime parameter.",
      "Explain the FRAME pallet structure and how pallets compose."
    ],
    freeVivaQuestions: [
      "What is the difference between a parachain and a parathread in Polkadot?",
      "What is FRAME and how do pallets compose to build a blockchain runtime?",
      "Why does Substrate use WASM runtime for on-chain upgrades?"
    ],
    freeStep1Title: "Install Rust toolchain, clone Substrate node-template, compile and run local dev chain",
    datasetName: "Substrate tutorials repository + Polkadot.js interface reference"
  },
  // ─── IOT BATCH 2 ─────────────────────────────────────────────────────────
  {
    id: "iot-smart-home-automation-matter-protocol",
    letter: "I",
    title: "Smart Home Automation with Matter Protocol",
    category: "IoT",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Build a truly interoperable smart home using Matter — the standard backed by Apple, Google, Amazon.",
    whatItDoes: "ESP32 implements Matter device (light, sensor, plug). Pairs with Apple Home, Google Home, and Amazon Alexa simultaneously. Custom automation rules triggered by sensor conditions.",
    realWorldUse: "Matter launched in 2022 by Amazon, Apple, Google, Samsung, and 220+ companies. Every smart home device shipped after 2023 must support Matter. This is the future of IoT interoperability.",
    examinerExpects: [
      "Show ESP32 Matter device pairing with both Google Home and Apple Home simultaneously.",
      "Demonstrate automation: temperature drops below 20°C triggers heater switch.",
      "Show Matter's Thread networking for long-range mesh connectivity.",
      "Present the commissioning QR code flow from fresh device to configured network."
    ],
    freeVivaQuestions: [
      "What problems does the Matter standard solve that WiFi-only IoT doesn't?",
      "What is Thread networking and how does it differ from Zigbee and Z-Wave?",
      "Why does Matter use IPv6 as its network layer?"
    ],
    freeStep1Title: "Install ESP-Matter SDK, compile example light device, commission to Google Home via Matter QR code",
    datasetName: "Matter SDK specification + ESP-Matter example applications"
  },
  {
    id: "edge-ai-tflite-object-detection-raspberry-pi",
    letter: "E",
    title: "Edge AI Object Detection on Raspberry Pi with TFLite",
    category: "IoT",
    difficulty: 3,
    buildTimeDays: "3–4 days",
    trending: true,
    tagline: "Run real-time object detection on a $35 Raspberry Pi with TensorFlow Lite and Coral TPU.",
    whatItDoes: "EfficientDet-Lite or MobileNet-SSD TFLite model runs at 10-30 FPS on Raspberry Pi Camera Module. Detects faces, vehicles, and custom objects without cloud dependency.",
    realWorldUse: "Edge AI is the fastest growing IoT segment. AWS Greengrass, Azure IoT Edge, and Google Coral all focus on ML at the edge. India's CCTV surveillance market is ₹12,000 crore.",
    examinerExpects: [
      "Show live camera feed with bounding boxes at 15+ FPS on Raspberry Pi.",
      "Compare inference speed: CPU vs Coral TPU acceleration.",
      "Demonstrate model quantization reducing EfficientDet size from 10MB to 4MB.",
      "Show trigger-on-detection: LED lights when a person is detected."
    ],
    freeVivaQuestions: [
      "What is model quantization and how does INT8 quantization differ from FP32?",
      "What is the Coral TPU and how does it accelerate TFLite inference?",
      "Why is edge inference preferred over cloud inference for privacy-sensitive cameras?"
    ],
    freeStep1Title: "Install TFLite runtime on Raspberry Pi, test EfficientDet-Lite on sample image, measure latency",
    datasetName: "COCO detection dataset + custom face detection dataset"
  },
  {
    id: "vehicle-telematics-gps-obd2-tracker",
    letter: "V",
    title: "Vehicle Telematics System with OBD-II and GPS",
    category: "IoT",
    difficulty: 3,
    buildTimeDays: "3–4 days",
    trending: true,
    tagline: "Real-time vehicle monitoring: speed, fuel efficiency, engine faults, and live location tracking.",
    whatItDoes: "OBD-II Bluetooth adapter reads ECU data (RPM, speed, coolant temp, fault codes). GPS module provides location. ESP32 aggregates and sends to cloud dashboard via MQTT.",
    realWorldUse: "Ola, Uber, and Rapido use telematics for insurance pricing and driver behavior scoring. India's commercial vehicle tracking is mandatory under AIS-140 standard. Fleet management is ₹8,000 crore market.",
    examinerExpects: [
      "Show live dashboard with RPM, speed, and fuel efficiency updating in real time.",
      "Demonstrate DTC (Diagnostic Trouble Code) reading and decoding.",
      "Show GPS track visualization on Google Maps over a 10-minute trip.",
      "Present harsh driving detection: sudden acceleration/braking events."
    ],
    freeVivaQuestions: [
      "What is OBD-II and what is the J1979 standard it implements?",
      "What is a PID (Parameter ID) in OBD-II and how do you request specific vehicle data?",
      "What is geofencing and how would you implement a vehicle departure alert?"
    ],
    freeStep1Title: "Connect ELM327 OBD-II adapter to car, read basic PIDs using python-OBD library",
    datasetName: "OBD-II PID reference database + GPS NMEA sentence specification"
  },
  {
    id: "aiml-weather-forecasting-numerical-hybrid",
    letter: "A",
    title: "Hybrid Numerical-ML Weather Forecasting System",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Combine physics-based NWP with deep learning to outperform traditional weather models.",
    whatItDoes: "Downloads ERA5 atmospheric reanalysis data, trains a U-Net++ model on pressure-level variables, and generates 24-hour weather forecasts. Compares against ECMWF's NWP baseline.",
    realWorldUse: "Google DeepMind's GraphCast and Huawei Pangu-Weather beat ECMWF traditional NWP in 2023. India's IMD is evaluating ML-based forecasting for monsoon prediction.",
    examinerExpects: [
      "Show 24-hour temperature forecast map for India generated by the model.",
      "Compare RMSE against ECMWF ERA5 analysis on held-out test period.",
      "Demonstrate monsoon onset prediction for June 2024.",
      "Show the atmospheric variable inputs: geopotential, wind, humidity, temperature."
    ],
    freeVivaQuestions: [
      "What is ERA5 reanalysis data and how is it different from actual weather observations?",
      "Why do neural weather models outperform NWP at medium-range (3-10 day) forecasts?",
      "What is the butterfly effect and why is 10-day forecast the practical limit of predictability?"
    ],
    freeStep1Title: "Register for ERA5 CDS API access, download 5 years of pressure-level data, build data loading pipeline",
    datasetName: "ECMWF ERA5 atmospheric reanalysis + NOAA GFS forecast comparison data"
  },
  // ─── MOBILE BATCH 2 ──────────────────────────────────────────────────────
  {
    id: "react-native-biometric-auth-expo",
    letter: "R",
    title: "Biometric Authentication App with React Native Expo",
    category: "Mobile",
    difficulty: 3,
    buildTimeDays: "2–3 days",
    trending: true,
    tagline: "Implement Face ID, Touch ID, and Iris authentication in a cross-platform mobile app.",
    whatItDoes: "Expo LocalAuthentication API enables Face ID/Touch ID unlock, biometric-protected vault for secrets, fallback to PIN code, and FIDO2 WebAuthn for passwordless server authentication.",
    realWorldUse: "NPCI mandates biometric authentication for UPI payments. All banking apps (HDFC, SBI, ICICI) and Paytm use biometric auth. India's Aadhaar biometric verification is mandatory for Jan Dhan accounts.",
    examinerExpects: [
      "Show Face ID unlock animation on iOS simulator.",
      "Demonstrate biometric-protected secret vault storing encrypted sensitive data.",
      "Show FIDO2 WebAuthn passkey creation and authentication flow.",
      "Present fallback to PIN when biometric fails 3 times."
    ],
    freeVivaQuestions: [
      "What is FIDO2 and how does it eliminate passwords from the authentication flow?",
      "What is a passkey and how does it use public key cryptography?",
      "How does TouchID's Secure Enclave prevent biometric data from leaving the device?"
    ],
    freeStep1Title: "Create Expo managed project, add expo-local-authentication, test fingerprint prompt on device",
    datasetName: "FIDO Alliance FIDO2 specification + Apple CryptoKit biometric documentation"
  },
  {
    id: "mobile-app-crash-analytics-firebase",
    letter: "M",
    title: "Mobile App Performance Monitoring with Firebase",
    category: "Mobile",
    difficulty: 3,
    buildTimeDays: "2–3 days",
    trending: true,
    tagline: "Instrument a React Native app with crash reporting, performance traces, and A/B testing.",
    whatItDoes: "Firebase Crashlytics captures JavaScript and native crashes with stack traces. Performance SDK measures network latency, screen render time, and custom trace duration. Remote Config enables A/B testing.",
    realWorldUse: "Every production mobile app uses Crashlytics or Sentry for crash monitoring. Google and Apple's App Store reject apps with high crash rates. This is production engineering knowledge.",
    examinerExpects: [
      "Trigger a test crash and show it appearing in Crashlytics with full stack trace.",
      "Show screen trace performance data for 3 different screens.",
      "Demonstrate Remote Config flag enabling/disabling a UI feature without app update.",
      "Present crash-free user rate calculation and target SLA definition."
    ],
    freeVivaQuestions: [
      "What is a symbolication file and why is it needed to read crash stack traces?",
      "What is ANR (Application Not Responding) and how do you detect it programmatically?",
      "What is a Feature Flag and why is it safer than a full app release for A/B testing?"
    ],
    freeStep1Title: "Create Firebase project, add react-native-firebase/crashlytics, trigger test crash, verify in console",
    datasetName: "Firebase open source sample apps + Google Play Console performance benchmarks"
  },
  {
    id: "flutter-machine-learning-on-device-tflite",
    letter: "F",
    title: "On-Device ML Flutter App with TensorFlow Lite",
    category: "Mobile",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Run AI models directly on phone for offline image classification, object detection, and OCR.",
    whatItDoes: "Flutter app with TFLite plugin runs MobileNet for image classification, EfficientDet for object detection, and Tesseract for OCR — all without any internet connection or cloud API.",
    realWorldUse: "Google Lens, Apple's on-device Siri, and Samsung's Bixby all run ML on-device for privacy and speed. AIIMS and government health apps need offline ML for use in rural areas without connectivity.",
    examinerExpects: [
      "Demonstrate plant disease detection working with WiFi disabled.",
      "Show inference latency: <200ms on a mid-range Android phone.",
      "Present model size before and after quantization (INT8 vs FP32).",
      "Show the Flutter UI with real-time detection bounding box overlay."
    ],
    freeVivaQuestions: [
      "What is the difference between GPU delegate and CPU inference in TFLite?",
      "How does model quantization affect both model size and inference accuracy?",
      "Why is on-device inference preferred over cloud API for medical or banking applications?"
    ],
    freeStep1Title: "Create Flutter project, add tflite_flutter plugin, load MobileNet model from assets, test classification",
    datasetName: "PlantVillage TFLite model + COCO SSD MobileNet detection model"
  },
  // ─── CYBERSECURITY BATCH 2 ───────────────────────────────────────────────
  {
    id: "network-packet-analysis-ml-wireshark",
    letter: "N",
    title: "Network Intrusion Detection with ML on PCAP Files",
    category: "Cybersecurity",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Detect DDoS, port scans, and malware communication from raw network traffic packets.",
    whatItDoes: "Scapy parses PCAP files into flow features (duration, packet count, byte count, flag counts). XGBoost classifier trained on NSL-KDD detects 23 attack types including DoS, U2R, R2L, and Probe attacks.",
    realWorldUse: "Every enterprise network runs IDS systems like Snort, Suricata, and Cisco Stealthwatch. India's banking sector mandates IDS under RBI's Cyber Security Framework.",
    examinerExpects: [
      "Show PCAP analysis extracting flow features from raw packet capture.",
      "Demonstrate classification of known attack patterns.",
      "Present precision/recall per attack category on KDD test set.",
      "Show real-time packet analysis streaming from a live network interface."
    ],
    freeVivaQuestions: [
      "What is a network flow and how does it differ from individual packets?",
      "What is the difference between signature-based IDS and anomaly-based IDS?",
      "Why is NSL-KDD preferred over the original KDD Cup 99 dataset?"
    ],
    freeStep1Title: "Install Scapy, download NSL-KDD dataset, extract flow features from sample PCAP file",
    datasetName: "NSL-KDD network intrusion dataset + CICIDS2018 realistic traffic dataset"
  },
  {
    id: "blockchain-privacy-zero-knowledge-proof",
    letter: "B",
    title: "Zero-Knowledge Proof Authentication System",
    category: "Cybersecurity",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Prove you know a secret without revealing it — the cryptography behind Zcash and Ethereum L2s.",
    whatItDoes: "Implements zk-SNARK circuit using Circom for age verification: prove you are over 18 without revealing your actual age. Solidity verifier contract validates the proof on-chain.",
    realWorldUse: "Tornado Cash (controversial), Zcash, and Ethereum Rollups (Polygon zkEVM, StarkNet) all use ZKPs. Privacy-preserving identity verification is a massive use case for India's ABHA system.",
    examinerExpects: [
      "Show proof generation (prover knows secret) and verification (verifier accepts without seeing secret).",
      "Demonstrate that proof is invalid if the circuit constraint is violated.",
      "Show the Groth16 proof: only 128 bytes regardless of computation size.",
      "Explain the trusted setup ceremony and why it matters for security."
    ],
    freeVivaQuestions: [
      "What is a zero-knowledge proof and what are its three properties (completeness, soundness, zero-knowledge)?",
      "What is the difference between zk-SNARKs and zk-STARKs?",
      "What is a trusted setup ceremony and why is it a potential weakness of Groth16?"
    ],
    freeStep1Title: "Install circom and snarkjs, write first R1CS circuit for multiplication, generate test proof",
    datasetName: "Circom2 circuit library + Hermez ZKP ceremony reference implementation"
  },
  {
    id: "cloud-security-posture-management-cspm",
    letter: "C",
    title: "Cloud Security Posture Management (CSPM) Tool",
    category: "Cybersecurity",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Scan AWS/Azure cloud configurations for misconfigurations that cause 99% of cloud breaches.",
    whatItDoes: "Uses boto3 (AWS SDK) to scan S3 buckets for public access, IAM policies for overpermission, security group rules for 0.0.0.0/0, and CloudTrail for disabled monitoring. Generates CIS Benchmark compliance report.",
    realWorldUse: "99% of cloud security failures are misconfigurations (Gartner). Capital One's $80M breach was an S3 misconfiguration. Wiz, Orca Security, and Prisma Cloud are billion-dollar CSPM companies.",
    examinerExpects: [
      "Scan a sample AWS account and show all critical misconfigurations found.",
      "Generate a CIS AWS Foundations Benchmark compliance report.",
      "Show auto-remediation: close publicly accessible S3 bucket automatically.",
      "Present risk scoring: CRITICAL > HIGH > MEDIUM > LOW severity classification."
    ],
    freeVivaQuestions: [
      "What is the principle of least privilege and how does it apply to IAM policies?",
      "What are the top 3 most common AWS misconfigurations that lead to data breaches?",
      "What is the shared responsibility model in cloud security?"
    ],
    freeStep1Title: "Set up AWS CLI with read-only IAM role, scan S3 bucket ACLs using boto3, generate first report",
    datasetName: "CIS AWS Foundations Benchmark checklist + OWASP Cloud Security guide"
  },
  // ─── STARTUP IDEAS BATCH 2 ───────────────────────────────────────────────
  {
    id: "startup-vernacular-video-learning-platform",
    letter: "V",
    title: "Vernacular Video Learning Platform for Rural India",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Byju's competitor for Bharat — video lessons in Hindi, Tamil, Telugu, Marathi with AI dubbing.",
    whatItDoes: "AI-dubbs English education videos into 12 regional languages using Whisper + AI voice cloning. Adaptive learning selects next video based on quiz performance. Offline download for low-connectivity areas.",
    realWorldUse: "150 million students in rural India have no quality education content in their mother tongue. Vedantu, Byju's, and Unacademy are English-first. Vernacular is an untapped $3B opportunity.",
    examinerExpects: [
      "Demo an English math video auto-dubbed in Telugu with lip-sync.",
      "Show the adaptive quiz system selecting easier questions after 2 wrong answers.",
      "Demonstrate offline video caching for 7 days of content.",
      "Present the teacher dashboard for creating and uploading lessons."
    ],
    freeVivaQuestions: [
      "How does AI dubbing maintain lip-sync with the translated audio?",
      "What are the challenges of building adaptive learning for rural students with intermittent internet?",
      "How do you monetize an education platform targeting low-income rural users?"
    ],
    freeStep1Title: "Set up Next.js video player with HLS.js, implement Whisper transcription + TTS dubbing pipeline",
    datasetName: "AI4Bharat multilingual TTS models + NPTEL educational video corpus"
  },
  {
    id: "startup-ev-charging-management-platform",
    letter: "E",
    title: "EV Charging Network Management Platform",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Smart EV charging station network with OCPP protocol, load balancing, and payment integration.",
    whatItDoes: "Implements OCPP 2.0.1 (Open Charge Point Protocol) server. Charging stations report status, start/stop sessions on command. Load balancing prevents grid overload. Payment via Razorpay.",
    realWorldUse: "India's EV charging network is growing 200% annually. Tata Power, Ather Grid, and ChargeZone are deploying thousands of stations. OCPP implementation expertise is critically needed.",
    examinerExpects: [
      "Show charger registering with OCPP server and status updates in real time.",
      "Demonstrate remote start/stop via management dashboard.",
      "Show load balancing: 3 chargers share 22kW capacity dynamically.",
      "Present the usage analytics dashboard for charging network operators."
    ],
    freeVivaQuestions: [
      "What is OCPP and why is it important for EV charging interoperability?",
      "How does smart charging (V1G) reduce peak demand on the grid?",
      "What is Vehicle-to-Grid (V2G) and how does it transform EVs into grid assets?"
    ],
    freeStep1Title: "Set up OCPP WebSocket server using ocpp-j library, simulate charger client connecting and sending heartbeat",
    datasetName: "OCPP 2.0.1 specification + Open Charge Alliance test cases"
  },
  {
    id: "startup-micro-insurance-sachet-platform",
    letter: "M",
    title: "Sachet Micro-Insurance Platform for Gig Workers",
    category: "Fintech",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "₹10/day accident and health insurance for delivery agents, auto drivers, and construction workers.",
    whatItDoes: "Gig workers buy daily micro-insurance via WhatsApp or SMS. AI underwriting approves instantly based on occupation type and location risk. Claim filing via photo upload with automated OCR validation.",
    realWorldUse: "IRDAI's sandbox regulations enable micro-insurance innovation. Onsurity, Acko, and Digit Insurance are building this. India has 90 million uninsured informal workers — the largest uninsured population in the world.",
    examinerExpects: [
      "Show insurance purchase flow via WhatsApp bot with UPI payment.",
      "Demonstrate AI claim assessment: hospital bill OCR → validity check → auto-approval.",
      "Show risk pooling analytics across 10,000 simulated policy holders.",
      "Present fraud detection flagging suspicious claim patterns."
    ],
    freeVivaQuestions: [
      "What is the difference between life insurance, health insurance, and accident insurance?",
      "How does micro-insurance differ from traditional insurance in underwriting and distribution?",
      "What is IRDAI's regulatory sandbox and how does it enable insurance innovation?"
    ],
    freeStep1Title: "Set up WhatsApp Business API with Twilio, implement insurance plan selection chatbot flow",
    datasetName: "IRDAI micro-insurance regulatory framework + Twilio WhatsApp API sandbox"
  },
  {
    id: "startup-water-atm-iot-management",
    letter: "W",
    title: "Smart Water ATM Network Management System",
    category: "IoT",
    difficulty: 3,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "IoT-connected water kiosks for rural India with prepaid card system and real-time monitoring.",
    whatItDoes: "ESP32-based water dispensing system with RFID card reader, flow meter, and solenoid valve. Customers top up cards at shops; server tracks consumption. Dashboard shows kiosk health and revenue.",
    realWorldUse: "Jal Jeevan Mission funds water ATM installation across 600,000 villages. Drinqup, WaterHealth, and Nakshatra Water are commercial operators. Each kiosk serves 200+ families.",
    examinerExpects: [
      "Show RFID card tap triggering water dispensing with balance deduction.",
      "Demonstrate remote kiosk monitoring: flow rate, tank level, malfunction alerts.",
      "Show revenue analytics dashboard for kiosk operator.",
      "Present offline operation: kiosk works without internet, syncs when connected."
    ],
    freeVivaQuestions: [
      "What is a flow meter and how does it measure liquid volume accurately?",
      "How does an RFID system work at the hardware level?",
      "How do you handle the case where internet is unavailable but customers need water?"
    ],
    freeStep1Title: "Wire RFID-RC522 reader to ESP32, read card UID, verify against mock balance database",
    datasetName: "Jal Jeevan Mission water kiosk specification + WHO water access standards"
  },
  {
    id: "ai-recruitment-screening-platform",
    letter: "A",
    title: "AI Recruitment Screening Platform with Video Interviews",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "AI-powered first-round interview screening that analyzes answers, confidence, and communication.",
    whatItDoes: "Candidates record video answers to preset questions. Speech-to-text transcribes answers. GPT-4 evaluates content quality. Facial emotion analysis scores confidence and engagement. Generates screening report.",
    realWorldUse: "HireVue, Talview, and Mercer Mettl are commercial AI interview platforms. India's placement season in IITs and NITs is adopting AI screening to handle millions of applicants.",
    examinerExpects: [
      "Record a 2-minute video answer and show the AI evaluation report.",
      "Demonstrate keyword extraction from answer transcript.",
      "Show confidence score from facial landmark analysis.",
      "Present bias audit: does the model score consistently across genders?"
    ],
    freeVivaQuestions: [
      "What are the ethical concerns with AI video interview screening?",
      "How do you ensure your scoring model is not biased against certain accents or appearances?",
      "What is differential item functioning (DIF) in fair assessment?"
    ],
    freeStep1Title: "Set up Next.js with browser MediaRecorder API, implement video upload to S3, run Whisper transcription",
    datasetName: "MIT-IV (Interview Video) corpus + MPII facial action unit dataset"
  },
  // ─── EMERGING CATEGORIES ─────────────────────────────────────────────────
  {
    id: "game-development-3d-unity-ml-agents",
    letter: "G",
    title: "Game AI: Train NPC Enemies with Unity ML-Agents",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Train game enemies using reinforcement learning so they actually adapt to player strategies.",
    whatItDoes: "Unity ML-Agents trains a PPO agent to control enemy NPCs that learn to outflank players, take cover, and coordinate team attacks — creating genuinely challenging and unpredictable game AI.",
    realWorldUse: "Unity ML-Agents is used by game studios worldwide. ISRO uses Unity for mission simulation. Indian gaming market is ₹22,000 crore and growing 25% annually.",
    examinerExpects: [
      "Show NPC agent training learning to dodge player projectiles over 1M steps.",
      "Demonstrate emergent behavior: agents learn to cooperate without explicit programming.",
      "Show reward shaping: how you designed the reward function for tactical behavior.",
      "Present Elo rating: trained agent vs random agent vs heuristic agent comparison."
    ],
    freeVivaQuestions: [
      "What is the difference between Proximal Policy Optimization (PPO) and DDPG for game AI?",
      "What is reward hacking and give an example from game AI?",
      "How do multi-agent competitive environments affect convergence stability?"
    ],
    freeStep1Title: "Install Unity 2022, import ML-Agents package, set up basic 3D arena with agent and target",
    datasetName: "Unity ML-Agents example environments + OpenAI Gym-Unity interface"
  },
  {
    id: "digital-twin-smart-factory-simulation",
    letter: "D",
    title: "Digital Twin for Smart Factory Process Optimization",
    category: "IoT",
    difficulty: 5,
    buildTimeDays: "6–8 days",
    trending: true,
    tagline: "Create a virtual replica of a factory that mirrors real sensors and optimizes production in real time.",
    whatItDoes: "Siemens MindSphere or custom MQTT + InfluxDB stack creates a digital twin. Sensor data streams update a 3D Unity/Three.js visualization. ML model predicts bottlenecks and suggests rescheduling.",
    realWorldUse: "Siemens, Bosch, and GE use digital twins in all their factories. India's Industry 4.0 policy mandates digital twin adoption for PLI (Production Linked Incentive) scheme beneficiaries.",
    examinerExpects: [
      "Show 3D factory visualization updating in sync with sensor data.",
      "Demonstrate what-if scenario: simulate adding one more machine to reduce bottleneck.",
      "Show predictive maintenance alert triggered by digital twin anomaly.",
      "Present OEE (Overall Equipment Effectiveness) calculation from twin data."
    ],
    freeVivaQuestions: [
      "What is a digital twin and how does it differ from a simulation?",
      "What is OEE (Overall Equipment Effectiveness) and what is world-class OEE?",
      "How does the digital twin synchronization frequency affect accuracy vs bandwidth?"
    ],
    freeStep1Title: "Set up InfluxDB time series database, write MQTT sensor data publisher, build Three.js 3D visualization",
    datasetName: "Open Industrial IoT Dataset (Kaggle) + Siemens NX Digital Twin reference model"
  },
  {
    id: "accessibility-screen-reader-ai-description",
    letter: "A",
    title: "AI Image Description for Screen Readers",
    category: "AIML",
    difficulty: 3,
    buildTimeDays: "2–4 days",
    trending: true,
    tagline: "Generate detailed, context-aware alt text for images to make the web accessible to visually impaired users.",
    whatItDoes: "Browser extension uses GPT-4V to generate detailed, screen-reader-friendly alt text for all images on any webpage, including complex charts, diagrams, and product photos.",
    realWorldUse: "India has 12 million visually impaired individuals. Only 3% of websites have proper image alt text. This directly impacts accessibility for millions of Indians using JAWS, NVDA, and VoiceOver.",
    examinerExpects: [
      "Show the browser extension generating alt text for 10 images on a news site.",
      "Demonstrate chart description: bar graph alt text includes all data values.",
      "Show product photo description for e-commerce including color, pattern, and fabric.",
      "Present latency optimization: background generation while page loads."
    ],
    freeVivaQuestions: [
      "What is WCAG 2.1 and what does it say about image alt text requirements?",
      "How does a screen reader use alt text to communicate image content to a blind user?",
      "What makes a good alt text versus a bad one for a complex technical diagram?"
    ],
    freeStep1Title: "Create Chrome extension with content script, detect img elements, call GPT-4V API for alt text",
    datasetName: "COCO image captions dataset + VizWiz visual question answering dataset"
  },
  {
    id: "metaverse-virtual-classroom-webxr",
    letter: "M",
    title: "Metaverse Virtual Classroom with WebXR",
    category: "FullStack",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "3D virtual classroom where students attend class as avatars in a browser — no VR headset needed.",
    whatItDoes: "Three.js + WebXR builds a 3D classroom accessible in any browser (and optional VR headset). Students control avatars, teacher shares screen, spatial audio positions voices in 3D space.",
    realWorldUse: "Meta Horizon Worlds, Gather.town, and VirBELA run virtual offices and classrooms. India's NIT Calicut and IIT Bombay are piloting metaverse education. This is the future of remote learning.",
    examinerExpects: [
      "Show 5 avatars attending a class simultaneously in 3D space.",
      "Demonstrate spatial audio: voice gets louder as you approach the speaker's avatar.",
      "Show screen sharing on a virtual whiteboard in the 3D classroom.",
      "Present WebXR mode: same experience in VR headset vs browser."
    ],
    freeVivaQuestions: [
      "What is WebXR and how does it abstract across VR headsets and mobile AR?",
      "What is HRTF (Head-Related Transfer Function) and how does it create 3D spatial audio?",
      "What is the Uncanny Valley effect and how do you design avatars to avoid it?"
    ],
    freeStep1Title: "Set up Three.js scene with WebXR polyfill, add 3D avatar from ReadyPlayerMe, test in WebXR emulator",
    datasetName: "ReadyPlayerMe avatar library + WebXR Sample Repository"
  },
  {
    id: "supply-chain-optimization-google-or-tools",
    letter: "S",
    title: "Supply Chain Optimization with Google OR-Tools",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Solve Vehicle Routing Problems to minimize last-mile delivery cost across 1000+ locations.",
    whatItDoes: "Google OR-Tools CVRP solver optimizes delivery route assignments for a fleet of vehicles with capacity constraints, time windows, and multi-depot configurations.",
    realWorldUse: "Amazon Logistics, Flipkart Ekart, and Delhivery solve millions of VRP instances daily. Last-mile logistics is ₹1.4 trillion annually in India. 15-20% cost reduction is possible with optimization.",
    examinerExpects: [
      "Show route optimization for 100 delivery locations with 5 vehicles.",
      "Compare optimized route vs nearest-neighbor heuristic total distance.",
      "Demonstrate time window constraints: deliveries only accepted between 9AM-5PM.",
      "Present re-optimization when a vehicle breaks down mid-route."
    ],
    freeVivaQuestions: [
      "What is the Vehicle Routing Problem and why is it NP-hard?",
      "What is the difference between exact methods (branch-and-bound) and heuristics (LKH) for VRP?",
      "How do time window constraints change the complexity of VRP?"
    ],
    freeStep1Title: "Install ortools Python library, set up basic TSP instance with distance matrix, verify solution",
    datasetName: "CVRPLIB benchmark instances + India pin code latitude/longitude geocoding database"
  },
  {
    id: "brain-computer-interface-eeg-signal",
    letter: "B",
    title: "EEG Brain-Computer Interface Signal Classification",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Control a computer cursor using brain signals — EEG motor imagery classification with deep learning.",
    whatItDoes: "EEGNet or ShallowConvNet processes EEG motor imagery signals (left hand vs right hand imagination) from 22-electrode data. Classified signals map to cursor control commands.",
    realWorldUse: "BCIs help paralyzed patients communicate. Neuralink, BrainGate, and MindMaze are frontier companies. IIT Bombay and AIIMS Delhi have BCI research labs. This is Nobel Prize caliber research territory.",
    examinerExpects: [
      "Show 22-channel EEG time series visualization with artifact removal.",
      "Present classification accuracy on BCI Competition IV Dataset 2a.",
      "Demonstrate real-time cursor control simulation from classification output.",
      "Compare EEGNet vs DeepConvNet vs linear SVM baseline accuracy."
    ],
    freeVivaQuestions: [
      "What is motor imagery and why does imagining movement produce EEG signals?",
      "What is the common spatial pattern (CSP) algorithm for EEG feature extraction?",
      "What are the ethical implications of neural data collection and BCI commercial use?"
    ],
    freeStep1Title: "Download BCI Competition IV Dataset 2a, implement EEG preprocessing with MNE library",
    datasetName: "BCI Competition IV Dataset 2a (motor imagery) + OpenBCI sample recordings"
  },
  {
    id: "generative-3d-model-point-e-shap-e",
    letter: "G",
    title: "Text-to-3D Model Generation with Point-E",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Generate 3D objects from text prompts — 'a ceramic coffee mug' becomes a downloadable 3D model.",
    whatItDoes: "OpenAI's Point-E model generates 3D point clouds from text descriptions. Builds a web interface where users type descriptions and receive downloadable .OBJ files for printing or use in games.",
    realWorldUse: "Luma AI, CSM.ai, and Meshy are commercial text-to-3D companies. 3D content creation for games, AR/VR, and e-commerce product visualization is a $5B market.",
    examinerExpects: [
      "Generate 3 different objects from text prompts and render them in the browser.",
      "Show the 3D point cloud visualization rotating in real time.",
      "Demonstrate mesh conversion from point cloud using ball-pivoting algorithm.",
      "Present comparison: Point-E vs Shap-E quality on same prompts."
    ],
    freeVivaQuestions: [
      "What is a point cloud and how does it differ from a mesh representation of 3D objects?",
      "How does Point-E condition the diffusion process on CLIP text embeddings?",
      "What is the Chamfer Distance metric for evaluating 3D generation quality?"
    ],
    freeStep1Title: "Clone Point-E repository from OpenAI, install dependencies, generate first test point cloud",
    datasetName: "ShapeNet 3D model dataset + Objaverse 3D object dataset"
  },
  {
    id: "legal-nlp-contract-clause-classification",
    letter: "L",
    title: "Contract Clause Classification for Legal AI",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Automatically identify and classify 41 types of contract clauses from legal agreements.",
    whatItDoes: "Fine-tunes Legal-BERT on CUAD (Contract Understanding Atticus Dataset) to identify 41 types of contract clauses: indemnification, governing law, IP ownership, non-compete, limitation of liability.",
    realWorldUse: "SpotDraft and Kira Systems help law firms review thousands of contracts. India's 9 million-plus annual business contracts need clause extraction to reduce review time from days to minutes.",
    examinerExpects: [
      "Upload an NDA and show all 41 clause types classified correctly.",
      "Present F1 score per clause type on CUAD test set.",
      "Show that the model flags unusual or missing clauses as risks.",
      "Demonstrate multi-label classification: one paragraph can contain multiple clause types."
    ],
    freeVivaQuestions: [
      "What is multi-label text classification and how does it differ from multi-class classification?",
      "Why is legal domain BERT better than general BERT for contract understanding?",
      "What is an indemnification clause and why is its presence or absence legally significant?"
    ],
    freeStep1Title: "Download CUAD contract dataset from Zenodo, configure Legal-BERT for multi-label token classification",
    datasetName: "CUAD (Contract Understanding Atticus Dataset, 510 contracts) + EDGAR financial contracts"
  },
  {
    id: "3d-printing-gcode-optimizer-ml",
    letter: "3",
    title: "3D Printing G-Code Optimizer with Machine Learning",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Reduce 3D print time by 20% using ML-optimized temperature, speed, and infill parameters.",
    whatItDoes: "Trains a Bayesian Optimization model on print quality vs parameter combinations. Predicts optimal settings for new STL models minimizing print time while maintaining structural integrity.",
    realWorldUse: "3D printing is used in aerospace, medical, and automotive. India's defense research labs (DRDO) and medical device startups use 3D printing. Markforged and Stratasys use ML for print optimization.",
    examinerExpects: [
      "Show parameter optimization reducing print time from 4 hours to 3.2 hours.",
      "Demonstrate tensile strength prediction from infill pattern and percentage.",
      "Show Gaussian Process uncertainty estimates for unexplored parameter regions.",
      "Present the layer adhesion failure prediction model."
    ],
    freeVivaQuestions: [
      "What is Bayesian Optimization and why is it better than grid search for expensive experiments?",
      "What is the G-code format and what machine commands does it contain?",
      "How does infill percentage affect both material cost and structural strength in FDM printing?"
    ],
    freeStep1Title: "Install PrusaSlicer with CLI, generate G-code for test model at 5 different settings, measure print time",
    datasetName: "3DPrintFarm parameter-quality dataset + Open3DBench benchmark models"
  },
  {
    id: "social-network-analysis-twitter-reddit",
    letter: "S",
    title: "Social Network Analysis: Influence and Community Detection",
    category: "DataScience",
    difficulty: 3,
    buildTimeDays: "2–4 days",
    trending: true,
    tagline: "Identify influencers, echo chambers, and viral content patterns in Twitter/Reddit networks.",
    whatItDoes: "Builds a graph of user interactions from Twitter Academic API or Reddit pushshift. NetworkX computes centrality measures (PageRank, Betweenness). Louvain algorithm detects communities. Visualizes with Gephi.",
    realWorldUse: "Political campaigns, marketing agencies, and CERT-In all analyze social networks for influence operations, sentiment, and misinformation spread detection.",
    examinerExpects: [
      "Show the social graph visualization with communities color-coded.",
      "Identify top 10 influencers by eigenvector centrality and follower count comparison.",
      "Demonstrate echo chamber detection: two politically isolated communities.",
      "Show information cascade: how a piece of content spreads through the network."
    ],
    freeVivaQuestions: [
      "What is the difference between degree centrality, betweenness centrality, and PageRank?",
      "What is the Louvain algorithm and what does it optimize to detect communities?",
      "What is an echo chamber in social networks and how do you quantify it?"
    ],
    freeStep1Title: "Collect Twitter data using Academic API, build networkx graph from retweet relationships",
    datasetName: "Twitter 1% public stream archive + Reddit Pushshift dataset"
  },
  {
    id: "ai-powered-content-moderation-multilabel",
    letter: "A",
    title: "AI Content Moderation System for Social Media",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Multi-label toxicity classifier detecting hate speech, harassment, and NSFW content in real time.",
    whatItDoes: "Fine-tunes RoBERTa on Jigsaw Toxic Comment dataset for 6 toxicity categories. Handles multilingual content, adversarial text evasion, and provides explainable decisions with token attribution.",
    realWorldUse: "ShareChat, Koo (India), and Sharechat moderate 400 million Indian users' content. IT Rules 2021 mandates content moderation for large platforms. Meta employs 15,000 content moderators.",
    examinerExpects: [
      "Show real-time moderation of 100 comments with toxicity scores.",
      "Demonstrate adversarial evasion resistance: l33tspeak and unicode tricks.",
      "Show multilingual moderation: Hindi and English toxic content correctly classified.",
      "Present false positive analysis: satire and news discussion not flagged."
    ],
    freeVivaQuestions: [
      "What is the precision-recall tradeoff for content moderation and which matters more?",
      "How do you handle context-dependent toxicity: the same word is offensive or not depending on speaker?",
      "What is the human-in-the-loop approach for edge cases in content moderation?"
    ],
    freeStep1Title: "Download Jigsaw Toxic Comment dataset from Kaggle, fine-tune RoBERTa for multi-label classification",
    datasetName: "Jigsaw Toxic Comment Classification dataset + HatEval multilingual hate speech dataset"
  },
  {
    id: "low-code-platform-visual-builder-react",
    letter: "L",
    title: "Low-Code Platform: Visual App Builder",
    category: "FullStack",
    difficulty: 5,
    buildTimeDays: "7–10 days",
    trending: true,
    tagline: "Build a Webflow/Bubble competitor: drag-and-drop UI that generates working React code.",
    whatItDoes: "A drag-and-drop canvas where users place components (buttons, forms, charts). The platform generates React JSX code in real time. One-click deployment to Vercel. Connects to Supabase for data.",
    realWorldUse: "Bubble raised $100M, Webflow raised $140M, Appsmith is open-source with 15K GitHub stars. India's IT services companies need rapid app delivery. The low-code market is $26B globally.",
    examinerExpects: [
      "Drag 3 components onto canvas and show generated React code in real time.",
      "Demonstrate data binding: connect a table component to a Supabase query.",
      "Show one-click deploy generating a live URL.",
      "Present the component prop system: customize colors, labels, and events."
    ],
    freeVivaQuestions: [
      "What is an Abstract Syntax Tree (AST) and how does your code generator use it?",
      "How do you handle component state management in generated React code?",
      "What is the difference between a low-code and a no-code platform?"
    ],
    freeStep1Title: "Set up Next.js with react-dnd drag-and-drop library, implement basic canvas with 3 component types",
    datasetName: "Open Web Components Registry + TailwindUI component documentation"
  },
  {
    id: "computer-architecture-risc-v-simulator",
    letter: "C",
    title: "RISC-V Processor Simulator in Python",
    category: "FullStack",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Build a working CPU in software — implement the RISC-V instruction set architecture in Python.",
    whatItDoes: "Python implementation of RISC-V RV32I ISA. Simulates registers, ALU operations, memory, and the 5-stage pipeline (Fetch, Decode, Execute, Memory, Writeback). Runs real RISC-V assembly programs.",
    realWorldUse: "RISC-V is the open-source ISA backed by Google, NVIDIA, and Western Digital. India's SiFive, Ather Energy, and DRDO are deploying RISC-V chips. CDAC's VEGA chip is RISC-V based.",
    examinerExpects: [
      "Run a Fibonacci sequence RISC-V assembly program and show correct output.",
      "Show pipeline stages with stall detection for data hazards.",
      "Demonstrate branch prediction reducing pipeline flushes.",
      "Present CPI (Cycles Per Instruction) with and without pipeline hazards."
    ],
    freeVivaQuestions: [
      "What is a pipeline hazard and describe structural, data, and control hazards?",
      "What is the difference between CISC and RISC instruction set architectures?",
      "Why did RISC-V succeed as an open ISA while other open ISAs failed?"
    ],
    freeStep1Title: "Implement RISC-V register file and ALU in Python, pass first ADD/SUB instruction test cases",
    datasetName: "RISC-V RV32I specification + RISC-V Tests official test suite"
  },
  {
    id: "music-emotion-tagging-mel-spectrogram",
    letter: "M",
    title: "Music Emotion Tagging with Mel Spectrogram CNN",
    category: "AIML",
    difficulty: 3,
    buildTimeDays: "2–3 days",
    trending: true,
    tagline: "Classify music mood (happy, sad, energetic, calm) from audio using CNN on mel spectrograms.",
    whatItDoes: "Converts audio files to mel spectrograms treated as images. 2D CNN (ResNet-50 pretrained) classifies into Russell's arousal-valence quadrant. Builds a playlist generator grouping songs by mood.",
    realWorldUse: "Spotify's mood-based playlists (Chill, Focus, Workout), Apple Music Radio, and JioSaavn use audio emotion tagging for content discovery. This is standard feature engineering in music recommendation.",
    examinerExpects: [
      "Play a sad Kishore Kumar song and show correct sad/low valence classification.",
      "Show mel spectrogram visualization with temporal and frequency features.",
      "Present Russell's 2D arousal-valence emotion space visualization with songs plotted.",
      "Demonstrate playlist generation grouping 50 songs by detected mood."
    ],
    freeVivaQuestions: [
      "What is a mel spectrogram and how does it differ from a regular Fourier transform spectrogram?",
      "What is Russell's circumplex model of emotion and how does it define music mood?",
      "Why do CNNs trained on ImageNet transfer well to mel spectrogram classification?"
    ],
    freeStep1Title: "Install librosa, convert 100 MP3 files to mel spectrograms, verify shapes with matplotlib",
    datasetName: "DEAM (Mediaeval Emotional Analysis in Music) dataset + MagnaTagATune dataset"
  },
  {
    id: "ai-essay-scoring-automated-grading",
    letter: "A",
    title: "Automated Essay Scoring with BERT",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Score student essays on a 1-6 scale using content quality, coherence, and grammar metrics.",
    whatItDoes: "Fine-tunes BERT on the ASAP (Automated Student Assessment Prize) dataset. Regression head predicts essay scores. Features include linguistic complexity, discourse coherence, and domain vocabulary.",
    realWorldUse: "ETS (makers of TOEFL/GRE), NBTE, and Turnitin have deployed AES. India's UPSC, CAT, and CLAT entrance exams could benefit from automated essay pre-scoring to handle millions of applicants.",
    examinerExpects: [
      "Input a student essay and show score prediction with confidence interval.",
      "Present Quadratic Weighted Kappa (QWK) score on ASAP test set.",
      "Show feature importance: what linguistic features most predict high scores.",
      "Demonstrate that the model correctly penalizes off-topic essays."
    ],
    freeVivaQuestions: [
      "What is Quadratic Weighted Kappa and why is it used for essay scoring?",
      "How do you handle the ordinal nature of essay scores in your loss function?",
      "What is prompt-specific vs prompt-agnostic AES and which is harder?"
    ],
    freeStep1Title: "Download ASAP AES dataset from Kaggle, preprocess essays with tokenizer, train BERT regression head",
    datasetName: "ASAP Automated Student Assessment Prize dataset (12,976 essays) + Feedback Prize dataset"
  },
  {
    id: "geospatial-analysis-flood-prediction-gis",
    letter: "G",
    title: "Flood Risk Prediction with Geospatial ML",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "4–6 days",
    trending: true,
    tagline: "Predict flood-prone zones using DEM, rainfall, soil, and land cover data with ML.",
    whatItDoes: "Combines elevation (SRTM DEM), land use (ESA WorldCover), soil type, and historical rainfall to train Random Forest/XGBoost that predicts flood susceptibility at 30m resolution across Indian river basins.",
    realWorldUse: "NDMA (National Disaster Management Authority), IMD, and ISRO use geospatial ML for flood forecasting. Kerala's 2018 and 2022 floods showed the urgent need for better prediction systems.",
    examinerExpects: [
      "Show flood susceptibility map for a river basin in Kerala.",
      "Present ROC-AUC score validated against historical flood extent records.",
      "Demonstrate the impact of land use change on flood susceptibility.",
      "Show early warning output: 48-hour flood probability forecast from rainfall forecast."
    ],
    freeVivaQuestions: [
      "What is a DEM (Digital Elevation Model) and how is it created from satellite data?",
      "What is the SCS Curve Number method for estimating runoff from rainfall?",
      "How do you validate a flood susceptibility map when historical flood data is sparse?"
    ],
    freeStep1Title: "Download SRTM DEM via USGS Earth Explorer, install GDAL/rasterio, compute slope and flow accumulation",
    datasetName: "SRTM 30m DEM + ESA WorldCover land use + CWC India historical flood records"
  },
  {
    id: "protein-drug-interaction-molecular-docking",
    letter: "P",
    title: "AI-Accelerated Molecular Docking for Drug Discovery",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5–7 days",
    trending: true,
    tagline: "Screen 10,000 drug candidates against a disease protein to find potential treatments in hours.",
    whatItDoes: "DiffDock (deep learning docking) predicts how drug molecules bind to target proteins. Virtual screening ranks 10,000 compounds from ZINC database by predicted binding affinity against COVID-19 protease.",
    realWorldUse: "Pfizer, AstraZeneca, and Insilico Medicine use AI docking to reduce drug discovery from 12 years to 4 years. India's Sun Pharma and Cipla are investing in computational drug discovery.",
    examinerExpects: [
      "Show top 10 drug candidates ranked by binding affinity for a target protein.",
      "Visualize the drug-protein binding pose in 3D using PyMOL.",
      "Compare DiffDock vs AutoDock Vina accuracy on known drug-protein pairs.",
      "Present the hit rate: how many DiffDock top-10 predictions match experimental data?"
    ],
    freeVivaQuestions: [
      "What is molecular docking and what does a binding affinity score represent?",
      "How does DiffDock use diffusion models differently from traditional AutoDock?",
      "What is ADMET and why must drug candidates pass all 5 criteria to be viable?"
    ],
    freeStep1Title: "Install DiffDock dependencies, download 6LU7 COVID protease structure from PDB, run test docking",
    datasetName: "ZINC drug-like molecules database + PDB Bind binding affinity database"
  },
  {
    id: "nlu-intent-classification-dialogue-system",
    letter: "N",
    title: "Multi-Intent NLU System for Enterprise Chatbots",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "3–5 days",
    trending: true,
    tagline: "Handle complex multi-intent utterances: 'Book a flight and also reserve a hotel in Mumbai.'",
    whatItDoes: "Fine-tunes BERT for multi-label intent classification and NER-based slot filling simultaneously. Handles multi-intent requests in a single utterance, outperforming single-intent systems.",
    realWorldUse: "Haptik (acquired by Reliance for $100M), Kore.ai, and Yellow.ai all build enterprise chatbot platforms. Every banking, telecom, and e-commerce chatbot needs robust NLU.",
    examinerExpects: [
      "Show utterance classified into 2 simultaneous intents with entity extraction.",
      "Present F1 score on SNIPS and ATIS multi-intent benchmarks.",
      "Demonstrate dialogue state tracking across a 5-turn booking conversation.",
      "Show confusion matrix for out-of-scope intent detection."
    ],
    freeVivaQuestions: [
      "What is the difference between intent classification and entity extraction?",
      "How do you handle ambiguous utterances that could match multiple intents?",
      "What is dialogue state tracking and why is it needed beyond single-turn NLU?"
    ],
    freeStep1Title: "Fine-tune BERT on SNIPS NLU dataset, implement joint intent+slot training with multi-task learning",
    datasetName: "SNIPS NLU benchmark + ATIS airline travel dialogue dataset + MixATIS multi-intent dataset"
  },
];
