/**
 * SubmitKit Extra Catalog Part 3 — 300+ More Unique & Trending Project Topics
 * Covers: AgriTech, SpaceTech, GovTech, Quantum Computing, Climate, etc.
 */

import type { TopicCard } from "./blueprint-engine";

export const TOPICS_EXTRA3: TopicCard[] = [
  // ─── AGRITECH ─────────────────────────────────────────────────────────────
  {
    id: "agritech-crop-yield-prediction-satellite",
    letter: "A",
    title: "Crop Yield Prediction from Satellite Imagery",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "4-6 days",
    trending: true,
    tagline: "Predict district-level crop yield weeks before harvest using NDVI time series from Sentinel-2.",
    whatItDoes: "Downloads Sentinel-2 satellite images for agricultural districts, computes NDVI vegetation index time series, and trains LSTM or Random Forest to predict yield. Compared against district agriculture reports.",
    realWorldUse: "ICAR, NITI Aayog, and agri-insurance companies like PMFBY use satellite yield prediction. Fasal, CropIn, and Jivabhumi are Indian startups building this. MSP policy decisions depend on crop production forecasts.",
    examinerExpects: [
      "Show NDVI time series for a crop season from sowing to harvest.",
      "Present yield prediction RMSE on held-out test districts.",
      "Demonstrate the feature importance: which growth stage NDVI matters most.",
      "Show the district-level yield map visualization."
    ],
    freeVivaQuestions: [
      "What is NDVI and what does a high NDVI value indicate about crop health?",
      "How do you handle cloud cover gaps in satellite image time series?",
      "What is the difference between C3 and C4 crops and how does it affect NDVI patterns?"
    ],
    freeStep1Title: "Register on Copernicus Open Access Hub, download Sentinel-2 tiles for Pune district, compute NDVI",
    datasetName: "ESA Sentinel-2 Level-2A imagery + ICRISAT district crop production statistics"
  },
  {
    id: "agritech-smart-irrigation-ml-soil-sensor",
    letter: "A",
    title: "ML-Powered Smart Irrigation Scheduling",
    category: "IoT",
    difficulty: 3,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Irrigate only when the crop actually needs water, saving 40% water using soil moisture sensors and ML.",
    whatItDoes: "Capacitive soil moisture sensors on ESP32 monitor root zone moisture. ML model combines weather forecast, evapotranspiration, and crop stage to decide when and how long to irrigate. Solenoid valve operates automatically.",
    realWorldUse: "Netafim, Jain Irrigation, and India's PM-KUSUM scheme fund smart irrigation. Maharashtra and Rajasthan face water scarcity — precision irrigation is a government priority.",
    examinerExpects: [
      "Show soil moisture data updating every 15 minutes on dashboard.",
      "Demonstrate automatic valve open/close decision based on ML output.",
      "Present water saving comparison: smart vs fixed-schedule irrigation.",
      "Show weather API integration adjusting schedule before rain events."
    ],
    freeVivaQuestions: [
      "What is evapotranspiration and how do you compute it using the Penman-Monteith formula?",
      "How does a capacitive soil moisture sensor work and how is it more accurate than resistive?",
      "What is crop coefficient (Kc) and how does it change during plant growth stages?"
    ],
    freeStep1Title: "Wire capacitive soil sensor to ESP32, read analog voltage, calibrate wet and dry readings",
    datasetName: "FAO Crop Water Requirements database + IMD weather historical data"
  },
  {
    id: "agritech-plant-disease-drone-survey",
    letter: "A",
    title: "Drone-Based Crop Disease Detection with Multispectral Imaging",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "6-8 days",
    trending: true,
    tagline: "Detect crop disease outbreaks across entire fields from drone imagery before visible symptoms appear.",
    whatItDoes: "Multispectral drone captures images in 5 bands (RGB + NIR + Red Edge). Deep CNN trained on labelled disease patches classifies disease type and severity per field zone. Generates prescription map.",
    realWorldUse: "Agras T30 and DJI P4 Multispectral drones are widely used. IFFCO, Mahindra Agri, and startups like Aerodyne India provide drone survey services. ₹60,000+ savings per hectare from early disease detection.",
    examinerExpects: [
      "Show multispectral false-color composite of a diseased field.",
      "Demonstrate disease classification: fungal vs bacterial vs nutrient deficiency.",
      "Present the prescription spray map output with GPS coordinates.",
      "Show detection at 7 days before visual symptoms appear using NIR data."
    ],
    freeVivaQuestions: [
      "What is the red edge band and why is it particularly sensitive to plant stress?",
      "How does multispectral imaging detect disease before it is visible to the human eye?",
      "What is precision agriculture and how does it reduce chemical use?"
    ],
    freeStep1Title: "Download PlantVillage multispectral dataset, implement 5-band CNN with attention on NIR channel",
    datasetName: "PlantVillage multispectral disease dataset + GABI global plant disease image bank"
  },
  {
    id: "agritech-market-price-prediction-mandis",
    letter: "A",
    title: "Agricultural Market Price Forecasting for Mandis",
    category: "DataScience",
    difficulty: 3,
    buildTimeDays: "2-4 days",
    trending: true,
    tagline: "Predict next-week mandi prices for 50 crops to help farmers decide when to sell.",
    whatItDoes: "Combines Agmarknet historical mandi price data, APEDA export data, MSP announcements, and weather indices into an LSTM price forecasting model. WhatsApp bot delivers weekly price alerts to farmers.",
    realWorldUse: "eNAM (National Agriculture Market), APMC mandis, and AgriPricer all track mandi prices. The price information gap causes farmers to sell at 30-40% below optimal price — this solves that.",
    examinerExpects: [
      "Show weekly price forecast with confidence interval for onion in Nashik mandi.",
      "Demonstrate MSP breach alert: when predicted price falls below MSP.",
      "Present MAPE (Mean Absolute Percentage Error) on out-of-sample test.",
      "Show WhatsApp bot delivering price alert message to farmer."
    ],
    freeVivaQuestions: [
      "What is MSP (Minimum Support Price) and why does government procurement at MSP affect market prices?",
      "How does the monsoon onset affect kharif crop prices in September-October?",
      "What is the Seasonal ARIMA (SARIMA) model and why is seasonal decomposition important for agriculture?"
    ],
    freeStep1Title: "Download Agmarknet price data via government API, clean and pivot by commodity-market combinations",
    datasetName: "Agmarknet daily mandi prices (2015-2025) + IMD monsoon zone rainfall data"
  },
  {
    id: "agritech-fishery-management-underwater-cv",
    letter: "A",
    title: "Automated Fish Count and Species Classification for Aquaculture",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "4-6 days",
    trending: true,
    tagline: "Computer vision system counts fish and classifies species in aquaculture ponds without manual intervention.",
    whatItDoes: "Underwater camera feed processed by YOLOv8 model trained on aquaculture fish species. Real-time count and biomass estimation. Alerts when mortality events or abnormal swimming patterns detected.",
    realWorldUse: "India is the second largest aquaculture producer globally. Andhra Pradesh and West Bengal shrimp farming generates ₹50,000 crore annually. eFishery (Indonesia) unicorn uses similar technology.",
    examinerExpects: [
      "Show real-time fish count from underwater video with bounding boxes.",
      "Demonstrate species classification: rohu vs catla vs tilapia.",
      "Show biomass estimation from fish length measurement via pixel calibration.",
      "Present mortality detection alert when fish remain motionless for 30 seconds."
    ],
    freeVivaQuestions: [
      "What challenges does underwater computer vision face that aerial vision does not?",
      "How do you compensate for light refraction and turbidity in underwater image processing?",
      "What is the FCR (Feed Conversion Ratio) and how does computer vision help optimize it?"
    ],
    freeStep1Title: "Collect underwater fish video dataset, annotate 500 frames with CVAT, train YOLOv8 nano model",
    datasetName: "Fish4Knowledge dataset + Roboflow public aquaculture detection dataset"
  },
  // ─── GOVTECH ─────────────────────────────────────────────────────────────
  {
    id: "govtech-rti-ai-document-retrieval",
    letter: "G",
    title: "AI-Powered RTI Document Retrieval System",
    category: "NLP",
    difficulty: 3,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Find any government document using plain language — making RTI accessible to every citizen.",
    whatItDoes: "Semantic search across lakhs of RTI responses, government orders, and circulars. User types in Hindi or English: 'show me budget allocation for road construction in Maharashtra 2023' and gets exact documents.",
    realWorldUse: "mygov.in, RTI Online, and CivicTech India are making government data accessible. India's RTI Act has 6 million+ annual applications. 80% fail because people don't know how to search.",
    examinerExpects: [
      "Search 'school budget Karnataka' and retrieve relevant government orders.",
      "Show Hindi query correctly retrieving Hindi and English documents.",
      "Demonstrate document ranking by relevance score.",
      "Show the auto-suggest feature recommending similar RTI queries."
    ],
    freeVivaQuestions: [
      "What is the Right to Information Act and what government information is exempt?",
      "How does bilingual semantic search work across Hindi and English documents?",
      "What is the PROACTIVE disclosure requirement under the RTI Act?"
    ],
    freeStep1Title: "Scrape RTI Online portal responses, chunk text, embed with IndicBERT, store in Qdrant vector DB",
    datasetName: "RTIOnline.gov.in public responses + data.gov.in open datasets catalog"
  },
  {
    id: "govtech-pothole-detection-road-quality",
    letter: "G",
    title: "Pothole Detection and Road Quality Mapping",
    category: "AIML",
    difficulty: 3,
    buildTimeDays: "2-4 days",
    trending: true,
    tagline: "Crowdsourced pothole reporting with CV verification — put roads on a quality dashboard for NHAI.",
    whatItDoes: "Mobile app records accelerometer data while driving. Pothole events detected from vibration signature. Dashboard photo auto-captured and GPS tagged. CNN model verifies it is a real pothole before reporting.",
    realWorldUse: "Mumbai's BMC, Delhi's PWD, and NHAI use similar systems. Savari.ai and FixMyStreet India are commercial platforms. India's road accident deaths (150,000/year) are partly due to poor road quality.",
    examinerExpects: [
      "Show accelerometer spike detection identifying pothole event.",
      "Demonstrate CNN classifying a dashboard photo as pothole vs speed bump vs normal road.",
      "Show the geographic heat map of reported potholes in a city.",
      "Present auto-escalation: high-density pothole zones auto-reported to municipal body."
    ],
    freeVivaQuestions: [
      "What is the g-force threshold typically used to detect potholes from accelerometer data?",
      "How do you handle false positives from speed bumps and railway crossings?",
      "What is the difference between IRI (International Roughness Index) and PCI (Pavement Condition Index)?"
    ],
    freeStep1Title: "Record accelerometer CSV during car journey, apply peak detection algorithm, verify with GPS labels",
    datasetName: "Pothole-600 image dataset (600 annotated pothole images) + COCO road objects dataset"
  },
  {
    id: "govtech-property-tax-ai-assessment",
    letter: "G",
    title: "AI-Powered Property Tax Assessment System",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "4-6 days",
    trending: true,
    tagline: "Predict fair market property values and automated tax assessment using satellite + records data.",
    whatItDoes: "Combines property registration records, floor area from satellite imagery, construction quality visual features, and market comparables to predict property value using gradient boosting + aerial image CNN.",
    realWorldUse: "Property tax is the primary revenue for Indian municipalities. Massive under-assessment leads to urban infrastructure deficits. BBMP (Bangalore), MCGM (Mumbai), and NDMC are piloting AI assessment.",
    examinerExpects: [
      "Show predicted vs assessed value for 100 properties with Gini coefficient.",
      "Demonstrate satellite image feature extraction (floor count, building footprint).",
      "Present audit report: properties assessed at <50% of predicted market value.",
      "Show the explainability layer — what drives each property's assessed value?"
    ],
    freeVivaQuestions: [
      "What is the capital value vs annual rental value system for property tax calculation?",
      "How do you use satellite imagery to estimate built-up area without ground surveys?",
      "What is hedonic pricing and how does it estimate property value from characteristics?"
    ],
    freeStep1Title: "Download Bangalore property registrations from IGR Karnataka, join with BBMP assessment records",
    datasetName: "State property registration records + ISRO CartoDEM building footprint data"
  },
  {
    id: "govtech-welfare-scheme-eligibility-chatbot",
    letter: "G",
    title: "Government Welfare Scheme Eligibility Chatbot",
    category: "NLP",
    difficulty: 3,
    buildTimeDays: "2-4 days",
    trending: true,
    tagline: "Tell citizens exactly which government schemes they qualify for in their own language.",
    whatItDoes: "Knowledge base of 500+ central and state schemes with eligibility criteria. NLP dialog system asks users key questions (age, income, caste, occupation), evaluates against rules, and outputs a personalized list of applicable schemes with application links.",
    realWorldUse: "India has 1800+ central schemes and thousands of state schemes. 60% of eligible people never apply due to unawareness. MyScheme.gov.in launched in 2023 serves this need. Aaple Sarkar (Maharashtra) uses similar tech.",
    examinerExpects: [
      "Demo conversation: 55-year-old woman farmer queries and receives 12 applicable schemes.",
      "Show eligibility rule engine: decision tree logic for PM Kisan vs PM-KISAN Maandhan.",
      "Demonstrate Hindi voice input to scheme recommendation output.",
      "Present coverage: how many of the actual eligible schemes correctly identified?"
    ],
    freeVivaQuestions: [
      "What is Direct Benefit Transfer (DBT) and why is it important for welfare delivery?",
      "What is the Aadhaar e-KYC flow and how does it verify identity for scheme enrollment?",
      "How do you handle conflicting eligibility criteria across similar central and state schemes?"
    ],
    freeStep1Title: "Scrape MyScheme.gov.in API for 200 schemes, extract eligibility JSON, build rule evaluation engine",
    datasetName: "MyScheme.gov.in API + state government scheme portals data"
  },
  {
    id: "govtech-court-case-outcome-prediction",
    letter: "G",
    title: "Court Case Outcome Prediction using NLP",
    category: "NLP",
    difficulty: 5,
    buildTimeDays: "4-6 days",
    trending: true,
    tagline: "Predict Supreme Court case outcomes from petition text using Legal-BERT classifier.",
    whatItDoes: "Fine-tunes Legal-BERT on Indian Supreme Court judgments. Given a petition, predicts outcome (allowed/dismissed) and relevant precedent cases. Extracts key legal arguments using attention visualization.",
    realWorldUse: "DoNotPay and Harvey AI are billion-dollar legal AI companies. India's judiciary faces 50 million pending cases. AI could help lawyers assess case strength and prioritize settlement vs litigation.",
    examinerExpects: [
      "Show case summary and predicted outcome probability on a test petition.",
      "Present accuracy on ILSI (Indian Legal Sentence Interaction) benchmark.",
      "Demonstrate similar case retrieval for precedent research.",
      "Show attention heatmap highlighting legally crucial sentences."
    ],
    freeVivaQuestions: [
      "What ethical concerns arise from using AI to predict court case outcomes?",
      "What is ratio decidendi and obiter dicta in legal judgments?",
      "How do you handle the imbalance between allowed and dismissed cases in training data?"
    ],
    freeStep1Title: "Download Indian Kanoon Supreme Court judgments via API, extract case metadata and outcomes",
    datasetName: "Indian Kanoon judicial dataset + InLegalBERT pre-trained model weights"
  },
  // ─── CLIMATE & SUSTAINABILITY ─────────────────────────────────────────────
  {
    id: "climate-carbon-footprint-calculator-app",
    letter: "C",
    title: "Personal Carbon Footprint Tracker and Reduction Planner",
    category: "FullStack",
    difficulty: 3,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Track your daily carbon emissions and get AI-personalized reduction actions with gamification.",
    whatItDoes: "Users log travel, diet, purchases, and electricity usage. Emission factors from IPCC/DEFRA calculate CO2e. ML suggests personalized reduction actions sorted by impact and ease. Gamified leaderboard with friends.",
    realWorldUse: "Normative, Cloverly, and Patch.io are carbon tracking startups. India's businesses need Scope 3 emissions reporting for export markets. Sustainability is a mandatory module in B-school curricula.",
    examinerExpects: [
      "Log a week of activities and show total CO2e with category breakdown pie chart.",
      "Show personalized reduction plan: 'switch from 2-wheeler to metro saves 1.2 ton/year'.",
      "Demonstrate the benchmark: compare user footprint to India average (1.9 tons vs 4.7 tons global).",
      "Show social comparison: leaderboard of friends by monthly carbon reduction."
    ],
    freeVivaQuestions: [
      "What is the difference between Scope 1, Scope 2, and Scope 3 emissions?",
      "What is a CO2 equivalent (CO2e) and why is methane worse than CO2 per unit?",
      "What is the Paris Agreement 1.5°C target and what per-capita carbon budget does it imply?"
    ],
    freeStep1Title: "Set up Next.js app, integrate DEFRA emission factors CSV, implement activity logging form",
    datasetName: "DEFRA 2024 GHG emission factors + IPCC AR6 global warming potential values"
  },
  {
    id: "climate-renewable-energy-forecasting",
    letter: "C",
    title: "Solar and Wind Energy Generation Forecasting",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Predict solar panel output and wind generation 48 hours ahead for grid load balancing.",
    whatItDoes: "Combines weather forecast data (GHI, wind speed, temperature) with historical plant generation data. Gradient Boosting and Neural Prophet models generate 48-hour probabilistic forecasts for grid operators.",
    realWorldUse: "SECI, NTPC, and MNRE mandate generation forecasting for all renewable plants above 1MW. POSOCO needs accurate forecasts to balance the national grid. Grid imbalance penalties are ₹300 crore/year.",
    examinerExpects: [
      "Show 48-hour solar generation forecast with prediction intervals.",
      "Present MAPE comparison: NWP model vs ML-enhanced vs persistence baseline.",
      "Demonstrate ramp event prediction: rapid cloud cover change causing generation drop.",
      "Show the curtailment scenario: when generation forecast exceeds grid capacity."
    ],
    freeVivaQuestions: [
      "What is Global Horizontal Irradiance (GHI) and how is it measured?",
      "Why does probabilistic forecasting outperform point forecasts for renewable energy?",
      "What is merit order dispatch and how does renewable forecasting uncertainty affect it?"
    ],
    freeStep1Title: "Download NREL NSRDB solar irradiance data for India, align with generation records from POSOCO",
    datasetName: "NREL NSRDB solar resource database + POSOCO real-time generation data API"
  },
  {
    id: "climate-plastic-waste-classification-cv",
    letter: "C",
    title: "Plastic Waste Classification Robot for Automated Recycling",
    category: "AIML",
    difficulty: 3,
    buildTimeDays: "2-4 days",
    trending: true,
    tagline: "CNN classifies plastic type (PET, HDPE, PVC, LDPE, PP, PS) from conveyor belt camera at 95%+ accuracy.",
    whatItDoes: "Camera captures waste items on conveyor belt. YOLOv8 + classifier identifies plastic resin type from visual texture, color, and shape. Triggers pneumatic ejector to sort into 7 bin categories.",
    realWorldUse: "Recykal, Hasiru Dala, and India's EPR (Extended Producer Responsibility) policy drive plastic sorting. Manual sorting at 2000 tons/day is impossible. IIT Bombay's DISHA project uses similar tech.",
    examinerExpects: [
      "Show classification of 6 plastic types from live camera with 95%+ accuracy.",
      "Demonstrate the conveyor integration: detection triggers sort signal within 50ms.",
      "Present confusion matrix: which plastics are most often misclassified?",
      "Show NIR spectroscopy integration for black plastics that fool visual systems."
    ],
    freeVivaQuestions: [
      "What are the 7 resin identification codes and what products use each?",
      "Why is black plastic particularly challenging for vision-based sorting systems?",
      "What is the difference between mechanical recycling and chemical recycling of plastics?"
    ],
    freeStep1Title: "Collect 200 images per plastic category, label with Roboflow, train YOLOv8 classification model",
    datasetName: "TrashNet plastic sorting dataset + WaDaBa waste classification benchmark"
  },
  {
    id: "climate-air-quality-prediction-lstm",
    letter: "C",
    title: "City Air Quality Index Forecasting with LSTM",
    category: "DataScience",
    difficulty: 3,
    buildTimeDays: "2-4 days",
    trending: true,
    tagline: "Predict AQI 24 hours ahead for Indian cities using LSTM on historical pollution and weather data.",
    whatItDoes: "Combines CPCB monitoring station PM2.5, PM10, NO2, SO2, CO readings with weather data. LSTM model provides 24-hour AQI forecasts. Public-facing alerts when AQI predicted to exceed severe threshold.",
    realWorldUse: "SAFAR (IIT Bombay + IMD) provides AQI forecasts for Delhi, Mumbai, Pune, Ahmedabad. Ola, Swiggy, and zomato use AQI to advise delivery workers. India has 12 of world's 15 most polluted cities.",
    examinerExpects: [
      "Show 24-hour PM2.5 forecast with confidence interval for Delhi.",
      "Compare LSTM vs SARIMA vs Prophet baseline RMSE on test set.",
      "Demonstrate Diwali spike prediction from historical patterns.",
      "Show the public alert notification system triggering when AQI>300."
    ],
    freeVivaQuestions: [
      "What is PM2.5 and why is it more dangerous to health than PM10?",
      "What is the AQI breakpoint table and how is it computed from individual pollutant concentrations?",
      "What meteorological conditions cause pollution trapping (temperature inversion)?"
    ],
    freeStep1Title: "Download CPCB station data via OpenAQ API for Delhi-NCR, merge with IMD weather data, preprocess",
    datasetName: "OpenAQ India historical data (2016-2025) + IMD surface weather observations"
  },
  {
    id: "climate-mangrove-deforestation-satellite",
    letter: "C",
    title: "Mangrove Forest Change Detection from Satellite Time Series",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "4-6 days",
    trending: true,
    tagline: "Monitor mangrove deforestation in real time using Sentinel-1 SAR and Sentinel-2 multispectral fusion.",
    whatItDoes: "Fuses SAR (Sentinel-1) and optical (Sentinel-2) data using U-Net segmentation to classify mangrove forest pixels. Change detection between annual maps identifies deforestation events with GPS coordinates.",
    realWorldUse: "India's mangroves protect 7517 km coastline, store 5x more carbon than rainforests. Sundarbans (West Bengal) loses 2% mangrove coverage annually. MoEFCC and GSI use satellite monitoring.",
    examinerExpects: [
      "Show annual mangrove extent map for Sundarbans 2019-2024.",
      "Highlight deforestation polygons with area in hectares.",
      "Compare SAR-only vs optical-only vs fusion model accuracy.",
      "Show storm surge vulnerability: areas where mangrove loss increased flood risk."
    ],
    freeVivaQuestions: [
      "Why is SAR (Synthetic Aperture Radar) particularly useful for mangrove mapping?",
      "What is the Blue Carbon concept and why are mangroves more valuable than terrestrial forests?",
      "How does cloud cover make optical-only monitoring unreliable for tropical forests?"
    ],
    freeStep1Title: "Access GEE (Google Earth Engine) account, load Sentinel-1 and Sentinel-2 collections, compute NDVI and VV/VH indices",
    datasetName: "GMW (Global Mangrove Watch) ground truth + ESA Sentinel-1/2 cloud-free composites"
  },
  // ─── SPACE TECH ──────────────────────────────────────────────────────────
  {
    id: "spacetech-orbital-debris-tracking-ml",
    letter: "S",
    title: "Space Debris Conjunction Analysis and Collision Probability",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5-7 days",
    trending: true,
    tagline: "Predict dangerous close approaches between satellites and debris using TLE orbital mechanics.",
    whatItDoes: "Downloads TLE data from Space-Track.org, propagates orbits using SGP4, identifies conjunction events within 1km, and trains ML model to classify high-risk conjunctions needing maneuver decisions.",
    realWorldUse: "India's ISRO lost contact with INSAT-2DT due to debris. SpaceX Starlink constellation must dodge debris 50+ times per day. Space situational awareness is a $1B+ US government program.",
    examinerExpects: [
      "Show conjunction report for ISS vs debris objects in next 72 hours.",
      "Present collision probability calculation using Monte Carlo orbit uncertainty.",
      "Demonstrate maneuver recommendation: Hohmann transfer delta-v to avoid conjunction.",
      "Show the miss distance distribution over 1000 simulated scenarios."
    ],
    freeVivaQuestions: [
      "What is a TLE (Two-Line Element set) and what orbital parameters does it contain?",
      "What is the Kessler Syndrome and why could it render LEO unusable?",
      "How does atmospheric drag affect LEO satellite orbit decay over time?"
    ],
    freeStep1Title: "Register on Space-Track.org, download TLE catalog, propagate sample satellite orbit with Python SGP4 library",
    datasetName: "Space-Track.org TLE catalog (25,000+ objects) + LeoLabs radar conjunction data"
  },
  {
    id: "spacetech-exoplanet-detection-transit",
    letter: "S",
    title: "Exoplanet Transit Detection from Kepler Photometry",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Find Earth-like planets in Kepler telescope data using ML anomaly detection and transit analysis.",
    whatItDoes: "Downloads Kepler light curves from NASA Exoplanet Archive. Applies box least squares (BLS) transit search, validates candidates with 1D CNN classifier trained on confirmed exoplanet light curves.",
    realWorldUse: "NASA's Google AI collaboration discovered 2 exoplanets in Kepler-90 system using neural networks. India's AstroSat satellite generates similar photometry data. This is published research territory.",
    examinerExpects: [
      "Show light curve with transit dips for a known exoplanet (WASP-17b).",
      "Demonstrate BLS period search finding the orbital period.",
      "Present CNN classifier performance vs human expert validation rate.",
      "Show the period-radius diagram with discovered candidates plotted."
    ],
    freeVivaQuestions: [
      "What is the transit method of exoplanet detection and what can it measure?",
      "What is the stellar limb darkening effect and how does it distort transit light curves?",
      "What additional observations are needed to confirm an exoplanet candidate?"
    ],
    freeStep1Title: "Access NASA Exoplanet Archive, download Kepler Q1-Q17 light curves, apply sigma-clipping for systematics",
    datasetName: "NASA Kepler Object of Interest catalog + TESS confirmed planet catalog"
  },
  {
    id: "spacetech-cubesat-attitude-control-simulation",
    letter: "S",
    title: "CubeSat Attitude Determination and Control Simulation",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5-7 days",
    trending: true,
    tagline: "Simulate 3-axis attitude control of a 1U CubeSat with PID controller and reaction wheels.",
    whatItDoes: "Python orbital mechanics simulation using poliastro. Implements quaternion-based attitude representation, PID controllers for pitch/roll/yaw, reaction wheel torque models, and disturbance torques from gravity gradient and drag.",
    realWorldUse: "IIT Kanpur's Jugnu, IIT Bombay's Pratham, and ISRO's student satellite programs all need ADCS simulation. Private satellite companies like Pixxel and Agnikul need attitude control expertise.",
    examinerExpects: [
      "Show attitude error convergence from 45-degree initial offset to <0.5 degree.",
      "Present quaternion vs Euler angle singularity comparison.",
      "Demonstrate reaction wheel saturation and desaturation maneuver.",
      "Show the ground track plot for the simulated LEO orbit."
    ],
    freeVivaQuestions: [
      "What is gimbal lock and why do quaternions solve it for 3D rotation?",
      "What is a reaction wheel and how does angular momentum conservation enable attitude control?",
      "What is the difference between nadir-pointing and sun-pointing satellite modes?"
    ],
    freeStep1Title: "Install poliastro and quaternionic libraries, define 1U CubeSat inertia tensor, propagate initial orbit",
    datasetName: "NASA CubeSat design specification + ESA ECSS attitude standards"
  },
  {
    id: "spacetech-lunar-terrain-navigation-ml",
    letter: "S",
    title: "Lunar Terrain Hazard Detection for Autonomous Rover Navigation",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5-7 days",
    trending: true,
    tagline: "Replicate Chandrayaan-3's hazard avoidance — detect safe landing zones from descent camera imagery.",
    whatItDoes: "Trains semantic segmentation model on lunar analog images and LOLA elevation data to classify crater rims, slopes >15 degrees, and boulder hazards. Generates 2D safe zone map for autonomous landing.",
    realWorldUse: "ISRO's Chandrayaan-3 successfully soft-landed on lunar south pole in August 2023 using onboard hazard detection. NASA's Artemis landers require autonomous hazard avoidance. This is frontier space technology.",
    examinerExpects: [
      "Show hazard map from simulated descent camera sequence.",
      "Demonstrate safe landing zone selection algorithm output.",
      "Present semantic segmentation accuracy on lunar analog test dataset.",
      "Show the entire autonomous landing decision flowchart."
    ],
    freeVivaQuestions: [
      "What sensors did Chandrayaan-3's Vikram lander use for hazard detection?",
      "What is the terrain relative navigation (TRN) technique used by NASA's ALHAT?",
      "Why is the lunar south pole scientifically significant and technically challenging for landing?"
    ],
    freeStep1Title: "Download LOLA lunar DEM from NASA PDS, simulate synthetic descent camera images, annotate hazard classes",
    datasetName: "NASA LOLA lunar topography + ISRO TMC-2 lunar terrain images"
  },
  // ─── QUANTUM COMPUTING ───────────────────────────────────────────────────
  {
    id: "quantum-grover-search-algorithm-qiskit",
    letter: "Q",
    title: "Grover's Quantum Search Algorithm Implementation",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Implement the algorithm that gives quantum computers quadratic speedup over classical search.",
    whatItDoes: "Implements Grover's algorithm in Qiskit on IBM Quantum cloud. Searches an unstructured database of N items in O(√N) operations vs classical O(N). Includes oracle construction for custom search problems.",
    realWorldUse: "IBM, Google, and IonQ are building quantum hardware. IIT Madras has a quantum lab. India's National Quantum Mission allocates ₹6000 crore. Grover's algorithm underpins quantum cryptography threats to AES.",
    examinerExpects: [
      "Run Grover's algorithm on 4-qubit (16 element) database on IBM Quantum.",
      "Show probability amplitude amplification visualization after each iteration.",
      "Demonstrate speedup: classical O(N) vs quantum O(√N) comparison.",
      "Present real hardware results vs ideal simulation noise comparison."
    ],
    freeVivaQuestions: [
      "What is quantum superposition and how does Grover's algorithm use it?",
      "What is the oracle in Grover's algorithm and how do you construct one?",
      "Why does Grover's algorithm provide only quadratic speedup, not exponential?"
    ],
    freeStep1Title: "Create IBM Quantum account, install Qiskit, implement 2-qubit Grover circuit, verify on simulator",
    datasetName: "IBM Quantum systems access + Qiskit textbook circuit examples"
  },
  {
    id: "quantum-variational-classifier-qml",
    letter: "Q",
    title: "Quantum Machine Learning: Variational Quantum Classifier",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "4-6 days",
    trending: true,
    tagline: "Classify data using a quantum circuit trained by gradient descent — quantum neural networks.",
    whatItDoes: "Implements a Variational Quantum Classifier (VQC) using PennyLane for binary and multiclass classification on Iris dataset. Compares quantum vs classical SVM on noise-free and noisy simulators.",
    realWorldUse: "Google, IBM, and D-Wave are commercializing quantum ML. India's National Quantum Mission funds QML research. This is the research frontier — papers on this topic appear in Nature and Science.",
    examinerExpects: [
      "Show VQC training convergence curve on Iris dataset.",
      "Compare VQC accuracy vs classical SVM on same dataset.",
      "Demonstrate the effect of hardware noise on quantum model performance.",
      "Show the quantum circuit diagram with parameterized rotation gates."
    ],
    freeVivaQuestions: [
      "What is the parameter shift rule and how does it compute gradients of quantum circuits?",
      "What is barren plateau phenomenon and why does it hinder deep quantum circuit training?",
      "What advantage (if any) do quantum classifiers have over classical SVMs today?"
    ],
    freeStep1Title: "Install PennyLane with default.qubit device, implement amplitude encoding for Iris features",
    datasetName: "UCI Iris classification dataset + PennyLane VQC tutorial implementation"
  },
  {
    id: "quantum-cryptography-bb84-simulation",
    letter: "Q",
    title: "Quantum Key Distribution: BB84 Protocol Simulation",
    category: "Cybersecurity",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Simulate the unbreakable quantum cryptography protocol used in China's 2000km quantum network.",
    whatItDoes: "Simulates BB84 Quantum Key Distribution: Alice sends qubits in random bases, Bob measures in random bases, sifting keeps matching bases, error rate detects eavesdroppers. Implements full protocol with Eve interception.",
    realWorldUse: "Toshiba's QKD systems protect financial communications. India's DRDO is testing QKD for defense communications. China's Micius satellite demonstrated satellite QKD. This is post-quantum cryptography foundation.",
    examinerExpects: [
      "Show 100 qubit BB84 protocol exchange generating a shared secret key.",
      "Demonstrate eavesdropper detection: Eve's interception raises QBER above 25% threshold.",
      "Show privacy amplification reducing remaining error bits to create final key.",
      "Present no-cloning theorem proof — why quantum eavesdropping is detectable."
    ],
    freeVivaQuestions: [
      "What is the no-cloning theorem and why does it make QKD theoretically unbreakable?",
      "What is the QBER (Quantum Bit Error Rate) and what threshold indicates eavesdropping?",
      "What is the difference between QKD and post-quantum cryptography?"
    ],
    freeStep1Title: "Implement BB84 in Python with qubit state as numpy array, simulate basis mismatch and sifting",
    datasetName: "BB84 original paper + NIST Post-Quantum Cryptography standards"
  },
  // ─── EDTECH ──────────────────────────────────────────────────────────────
  {
    id: "edtech-adaptive-quiz-irt-model",
    letter: "E",
    title: "Adaptive Quiz Engine using Item Response Theory",
    category: "DataScience",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Questions adapt to each student's ability in real time — like JEE coaching that knows exactly where you are.",
    whatItDoes: "2PL Item Response Theory model estimates student ability theta from response patterns. CAT (Computerized Adaptive Testing) selects next question maximizing Fisher information at current ability estimate.",
    realWorldUse: "GRE, GMAT, and TOEFL all use CAT. Embibe (acquired by Reliance) uses IRT for JEE preparation. Duolingo's language assessment uses CAT. This is the science behind every major standardized test.",
    examinerExpects: [
      "Show ability estimation converging after 10 questions for a student.",
      "Demonstrate information function: questions chosen near student's ability level.",
      "Present final score vs number of questions: CAT achieves same precision in half the questions.",
      "Show the test characteristic curve for a bank of 500 calibrated questions."
    ],
    freeVivaQuestions: [
      "What is the 3-parameter logistic model in IRT and what does each parameter represent?",
      "Why does CAT need a pre-calibrated item bank before it can be deployed?",
      "What is the Maximum Fisher Information item selection criterion?"
    ],
    freeStep1Title: "Install catsim library, create 100-item bank with random IRT parameters, run simulated CAT session",
    datasetName: "TIMSS science item bank + PISA 2022 released items"
  },
  {
    id: "edtech-knowledge-graph-curriculum-mapping",
    letter: "E",
    title: "Knowledge Graph for Curriculum Dependency Mapping",
    category: "DataScience",
    difficulty: 3,
    buildTimeDays: "2-4 days",
    trending: true,
    tagline: "Build a graph of learning prerequisites so students always know what to learn next.",
    whatItDoes: "Parses NCERT textbooks using NLP to extract concepts and prerequisite relationships. Neo4j stores the knowledge graph. Graph traversal recommends optimal learning paths and identifies concept gaps.",
    realWorldUse: "Khan Academy's knowledge map has 600+ interconnected skills. CBSE curriculum alignment requires understanding concept dependencies across grades. NEET and JEE toppers use concept mapping for revision.",
    examinerExpects: [
      "Show knowledge graph visualization for Physics: Kinematics → Newton's Laws → Work-Energy.",
      "Demonstrate prerequisite check: student cannot access Calculus before Trigonometry.",
      "Show Bloom's taxonomy classification of each concept node.",
      "Present personalized learning path for a student who failed integration concept."
    ],
    freeVivaQuestions: [
      "What is Bloom's Taxonomy and how does it classify educational learning objectives?",
      "How do you automatically extract prerequisite relationships from textbook text?",
      "What is the difference between a skill tree and a knowledge graph in education?"
    ],
    freeStep1Title: "Download NCERT Physics Class 11 PDF, extract chapter concepts using spaCy NER, build Neo4j graph",
    datasetName: "NCERT CBSE curriculum documents + Khan Academy knowledge map exported dataset"
  },
  {
    id: "edtech-handwriting-recognition-hindi",
    letter: "E",
    title: "Hindi Handwriting Recognition for Automated Essay Grading",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Convert handwritten Hindi student answers to text for automated grading of CBSE and UP Board exams.",
    whatItDoes: "TrOCR (Transformer OCR) fine-tuned on Hindi handwritten text dataset. Processes scanned answer sheets: text extraction → grammar check → semantic similarity scoring vs model answer.",
    realWorldUse: "CBSE marks 15 million handwritten answer sheets annually. UP Board, Maharashtra Board, and BSEB each mark millions more. Automation could eliminate exam result delays and reduce examiner fatigue bias.",
    examinerExpects: [
      "Show handwritten Hindi paragraph converted to digital text with >85% CER.",
      "Demonstrate scoring: student answer compared to model answer using semantic similarity.",
      "Show page layout detection handling multi-column answer formats.",
      "Present bias audit: scoring consistency across neat vs messy handwriting."
    ],
    freeVivaQuestions: [
      "What is CER (Character Error Rate) and how is it different from WER (Word Error Rate)?",
      "What unique challenges does Hindi script (Devanagari) present for OCR compared to English?",
      "How does the shirorekha (header line) in Devanagari complicate character segmentation?"
    ],
    freeStep1Title: "Download IIIT-HW-Dev Hindi handwriting dataset, fine-tune TrOCR with Devanagari tokenizer",
    datasetName: "IIIT-HW-Dev Hindi handwriting corpus + IIT Delhi Devanagari OCR dataset"
  },
  {
    id: "edtech-pair-programming-ai-tutor",
    letter: "E",
    title: "AI Pair Programming Tutor for CS Students",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Socratic AI tutor that guides students to find bugs themselves instead of giving answers.",
    whatItDoes: "AST analysis detects bugs in student code. Instead of providing the fix, GPT-4 generates Socratic questions guiding the student to discover the issue. Tracks misconception patterns across sessions.",
    realWorldUse: "CS50's duck debugging method scales with AI. Khanmigo (Khan Academy AI) uses Socratic tutoring. Coding bootcamps like Masai School and Newton School need scalable 1-on-1 coding help.",
    examinerExpects: [
      "Show a student submitting buggy Python code and AI asking guiding questions.",
      "Demonstrate misconception detection: student consistently confuses == and = in conditionals.",
      "Show hint escalation: if student stuck after 3 hints, reveal partial solution.",
      "Present the session summary report for the instructor."
    ],
    freeVivaQuestions: [
      "What is the Socratic method and why is it more effective than direct instruction?",
      "What is the difference between a compile-time error and a runtime error in Python?",
      "What is the Zone of Proximal Development (ZPD) and how does it apply to adaptive hints?"
    ],
    freeStep1Title: "Parse Python student submissions with ast module, identify common error types, design Socratic prompt templates",
    datasetName: "CodeWorkout student programming dataset + CSEDM 2024 student code submissions"
  },
  // ─── MEDIA TECH ──────────────────────────────────────────────────────────
  {
    id: "mediatech-deepfake-detection-efficientnet",
    letter: "M",
    title: "Deepfake Video Detection with EfficientNet",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Detect AI-generated fake videos — crucial for election integrity and news verification.",
    whatItDoes: "Frame-level EfficientNet-B4 feature extraction detects face manipulation artifacts (blending boundaries, frequency domain inconsistencies). LSTM aggregates frame features for video-level decision.",
    realWorldUse: "Election Commission of India, Press Trust of India, and Boom FactCheck need deepfake detection. Meta AI's Video Authenticator and Microsoft's deepfake detector are commercial products.",
    examinerExpects: [
      "Show detection result with heatmap highlighting manipulated face regions.",
      "Present AUC-ROC on FaceForensics++ benchmark dataset.",
      "Demonstrate frequency domain analysis: GAN fingerprints in DCT spectrum.",
      "Show adversarial robustness: detection rate after Gaussian blur post-processing."
    ],
    freeVivaQuestions: [
      "What visual artifacts do deepfake generators produce that detection models exploit?",
      "How does GAN training leave detectable fingerprints in generated images?",
      "What is the DFDC (Deepfake Detection Challenge) and what was the winning solution's approach?"
    ],
    freeStep1Title: "Download FaceForensics++ dataset, extract face crops with dlib, train EfficientNet binary classifier",
    datasetName: "FaceForensics++ manipulation dataset + DFDC (Deepfake Detection Challenge) dataset"
  },
  {
    id: "mediatech-automatic-news-verification",
    letter: "M",
    title: "Automated Fact-Checking System for News Claims",
    category: "NLP",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Automatically verify news claims against knowledge bases and trusted sources.",
    whatItDoes: "Claim extraction from news text using NLP. Evidence retrieval from Wikipedia and trusted news APIs. BERT-based NLI (Natural Language Inference) model classifies claim as Supported/Refuted/Not Enough Info.",
    realWorldUse: "Factly, Alt News, and Boom FactCheck are India's major fact-checkers. WhatsApp misinformation caused 30+ mob violence incidents in India. PIB (Press Information Bureau) runs a fact-check unit.",
    examinerExpects: [
      "Verify 5 real viral claims from India and show evidence retrieval.",
      "Present 3-class NLI accuracy on FEVER benchmark dataset.",
      "Demonstrate claim-evidence alignment visualization with attention heatmap.",
      "Show pipeline latency: end-to-end time from claim input to verdict."
    ],
    freeVivaQuestions: [
      "What is Natural Language Inference (NLI) and what are the three standard labels?",
      "What is the difference between claim verification and opinion detection?",
      "How does evidence quality affect the reliability of automated fact-checking?"
    ],
    freeStep1Title: "Download FEVER dataset, fine-tune BERT for 3-class NLI, integrate Wikipedia DPR retrieval",
    datasetName: "FEVER (Fact Extraction and VERification) dataset + TruthSeeker Twitter claims dataset"
  },
  {
    id: "mediatech-personalized-news-recommendation",
    letter: "M",
    title: "Personalized News Recommendation with Federated Learning",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5-7 days",
    trending: true,
    tagline: "Recommend news articles based on user preferences — without your reading history leaving your device.",
    whatItDoes: "MIND (Microsoft News Dataset) based news recommendation. Federated learning trains user preference models locally on device. Only model gradients (not data) uploaded to server. Privacy-preserving personalization.",
    realWorldUse: "Google News, Flipboard, and InShorts use recommendation. Privacy regulations (DPDP Act India, GDPR EU) require data minimization. Federated learning is Google's approach for keyboard prediction on Android.",
    examinerExpects: [
      "Show personalized news feed updating based on reading history.",
      "Demonstrate federated training: 10 simulated clients training locally, only gradients shared.",
      "Present AUC improvement with federated vs centralized vs non-personalized baseline.",
      "Show differential privacy noise addition preventing gradient leakage."
    ],
    freeVivaQuestions: [
      "What is federated learning and how does it differ from centralized model training?",
      "What is differential privacy and why is epsilon the key privacy parameter?",
      "What is the FedAvg algorithm and how does it aggregate model updates from clients?"
    ],
    freeStep1Title: "Download MIND news dataset from Microsoft Research, implement local user preference NRMS model",
    datasetName: "MIND (Microsoft News Dataset, 1M+ samples) + MIND-large for large-scale evaluation"
  },
  // ─── AUTO TECH ───────────────────────────────────────────────────────────
  {
    id: "autotech-lane-detection-advanced-driving",
    letter: "A",
    title: "Advanced Lane Detection and Road Condition Analysis",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Detect lane boundaries and curvature radius in complex conditions: rain, night, lane markings.",
    whatItDoes: "Bird's eye view perspective transform + polynomial lane fitting using sliding window algorithm. Handles curved roads, dashed lanes, and partial occlusion. Outputs lane curvature radius and vehicle offset.",
    realWorldUse: "Mobileye (acquired for $15.3B) powers lane keeping in 800+ car models. Tata Motors, Mahindra, and Ola Electric's scooter all use lane assist. India's CMVR regulations may mandate LDWS.",
    examinerExpects: [
      "Show lane detection on 5 different driving scenarios: straight, curve, rain, night.",
      "Present curvature radius calculation and vehicle offset from center.",
      "Demonstrate failure cases: construction zones where lanes disappear.",
      "Show the perspective warp transform and polynomial fitting steps."
    ],
    freeVivaQuestions: [
      "What is the inverse perspective mapping (IPM) transform and why is it used for lane detection?",
      "What is the difference between model-based and learning-based lane detection approaches?",
      "What is the SAE Level 2 ADAS feature requirement for lane centering?"
    ],
    freeStep1Title: "Download Tusimple or CULane dataset, implement IPM transform with OpenCV, test Sobel edge detection",
    datasetName: "TuSimple lane detection dataset + CULane complex scenarios dataset"
  },
  {
    id: "autotech-ev-battery-soh-prediction",
    letter: "A",
    title: "EV Battery State-of-Health Prediction",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Predict battery capacity fade and remaining useful life for EV battery management systems.",
    whatItDoes: "LSTM model trained on NASA Prognostics battery dataset predicts capacity fade trajectory. Features extracted from charge/discharge cycles: internal resistance, coulombic efficiency, voltage curve shape.",
    realWorldUse: "Ola Electric, Ather Energy, TVS iQube, and Ampere all need accurate battery health monitoring. EV battery degradation is the biggest consumer concern after range anxiety. Battery SoH determines resale value.",
    examinerExpects: [
      "Show capacity fade curve prediction from 100 initial charge cycles.",
      "Present remaining useful life (RUL) prediction with confidence interval.",
      "Demonstrate early degradation detection from dV/dQ curve analysis.",
      "Show the effect of fast charging on accelerated degradation prediction."
    ],
    freeVivaQuestions: [
      "What is State-of-Health (SoH) and how does it differ from State-of-Charge (SoC)?",
      "What electrochemical mechanisms cause lithium-ion battery capacity fade?",
      "What is Incremental Capacity Analysis (ICA) and what degradation modes does it reveal?"
    ],
    freeStep1Title: "Download NASA CALCE battery dataset, extract cycle features, train LSTM RUL predictor",
    datasetName: "NASA Prognostics Center of Excellence battery dataset + MIT battery degradation data"
  },
  {
    id: "autotech-traffic-flow-simulation-sumo",
    letter: "A",
    title: "City Traffic Flow Optimization with SUMO and RL",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5-7 days",
    trending: true,
    tagline: "Train RL agents to control 50 traffic signals simultaneously, reducing city average wait time 30%.",
    whatItDoes: "SUMO (Simulation of Urban MObility) microsimulates a city road network. PPO-based RL agent controls signal timings based on queue lengths and throughput. Outperforms fixed-timing and actuated baselines.",
    realWorldUse: "Siemens, Google DeepMind (London), and Waymo use RL for traffic signal control. Chennai, Hyderabad, and Mumbai spend ₹5,000 crore annually on traffic management. 20% efficiency improvement = huge savings.",
    examinerExpects: [
      "Show SUMO visualization with adaptive signals responding to congestion.",
      "Present average waiting time: RL vs actuated vs fixed-timing comparison.",
      "Demonstrate emergency vehicle preemption: green wave created ahead of ambulance.",
      "Show peak hour vs off-peak policy differences learned by the agent."
    ],
    freeVivaQuestions: [
      "What is the actuated traffic signal control algorithm and how does it differ from fixed-timing?",
      "What reward function design works well for multi-intersection traffic RL?",
      "What is the partial observability problem in multi-agent traffic control?"
    ],
    freeStep1Title: "Install SUMO, import OpenStreetMap road network for a city area, run base traffic simulation",
    datasetName: "OpenStreetMap (OSM) road network + real traffic count data from city traffic department"
  },
  // ─── MORE AI/ML ───────────────────────────────────────────────────────────
  {
    id: "aiml-knowledge-distillation-tiny-model",
    letter: "K",
    title: "Knowledge Distillation: Compress BERT into a 10x Smaller Model",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Distill a 340M-parameter BERT into a 34M student model that runs on mobile with 96% of the accuracy.",
    whatItDoes: "Task-specific knowledge distillation using soft target labels and intermediate layer mimicry. Teacher: BERT-large. Student: 6-layer BERT-tiny. Trained on SST-2 sentiment and SQuAD QA benchmarks.",
    realWorldUse: "DistilBERT (Hugging Face), TinyBERT (Huawei), and MobileBERT (Google) are all production distillation results. Every on-device NLP app on Android/iOS uses knowledge distillation for size reduction.",
    examinerExpects: [
      "Show teacher vs student accuracy on SST-2 benchmark.",
      "Present parameter count, inference speed, and memory comparison.",
      "Demonstrate temperature parameter effect on soft label entropy.",
      "Show progressive distillation: layer-by-layer vs task-specific distillation."
    ],
    freeVivaQuestions: [
      "What is soft target distribution and why does it carry more information than hard labels?",
      "What is the temperature parameter T in knowledge distillation and how does increasing T change soft targets?",
      "What is the difference between response-based, feature-based, and relation-based distillation?"
    ],
    freeStep1Title: "Load BERT-large teacher from HuggingFace, define 6-layer student, implement KL-divergence distillation loss",
    datasetName: "SST-2 sentiment benchmark + SQuAD 1.1 QA dataset"
  },
  {
    id: "aiml-anomaly-detection-time-series-iforest",
    letter: "A",
    title: "Industrial Anomaly Detection in Time Series",
    category: "DataScience",
    difficulty: 3,
    buildTimeDays: "2-4 days",
    trending: true,
    tagline: "Detect equipment failure before it happens — predict bearing failure, motor faults, and pressure leaks.",
    whatItDoes: "Isolation Forest and LSTM Autoencoder trained on normal operation data. Anomaly score spikes when sensor patterns deviate from learned normal. Generates maintenance alerts 24-72 hours before failure.",
    realWorldUse: "GE Digital's Predix, Siemens MindSphere, and ABB Ability use industrial anomaly detection. India's manufacturing sector loses ₹1.2 lakh crore annually from unplanned downtime. Predictive maintenance is transformative.",
    examinerExpects: [
      "Show anomaly score timeline with true fault events marked.",
      "Demonstrate LSTM autoencoder reconstruction error spike before bearing failure.",
      "Present precision/recall tradeoff with adjustable alert threshold.",
      "Show multivariate anomaly: temperature + vibration + current joint anomaly."
    ],
    freeVivaQuestions: [
      "What is Isolation Forest and how does it achieve anomaly detection without labels?",
      "Why is the reconstruction error of an autoencoder a good anomaly score?",
      "What is the difference between point anomaly, contextual anomaly, and collective anomaly?"
    ],
    freeStep1Title: "Download NASA bearing dataset, extract time-domain and frequency-domain features, train Isolation Forest",
    datasetName: "NASA Bearing dataset (IMS University of Cincinnati) + CWRU bearing fault dataset"
  },
  {
    id: "aiml-multimodal-medical-vqa",
    letter: "M",
    title: "Medical Visual Question Answering with BLIP-2",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "4-6 days",
    trending: true,
    tagline: "Ask natural language questions about X-rays and CT scans — AI answers like a radiologist.",
    whatItDoes: "Fine-tunes BLIP-2 on VQA-RAD medical visual question answering dataset. Given a chest X-ray and question like 'Is there cardiomegaly?', model answers yes/no with confidence and highlights relevant region.",
    realWorldUse: "PathAI, Lunit, and Qure.ai (Indian AI startup) build medical AI systems. India has 0.6 radiologists per million vs WHO recommended 22. AI assistance can multiply radiologist capacity 5x.",
    examinerExpects: [
      "Ask 5 clinical questions about chest X-ray and show correct answers.",
      "Present closed-ended and open-ended VQA accuracy on VQA-RAD test set.",
      "Show Grad-CAM attention map highlighting region relevant to the answer.",
      "Demonstrate limitation: flag when confidence is low, referring to human expert."
    ],
    freeVivaQuestions: [
      "What is the difference between closed-ended and open-ended visual question answering?",
      "What is BLIP-2 and how does it bridge vision encoder and language model?",
      "What regulatory approvals are required before deploying medical AI in India (CDSCO clearance)?"
    ],
    freeStep1Title: "Download VQA-RAD dataset from PhysioNet, fine-tune BLIP-2 ViT-G with QFormer on medical pairs",
    datasetName: "VQA-RAD radiological VQA dataset + VinDr-CXR chest X-ray Vietnamese dataset"
  },
  {
    id: "aiml-federated-learning-hospital-network",
    letter: "F",
    title: "Federated Learning for Hospital Network Diagnostics",
    category: "AIML",
    difficulty: 5,
    buildTimeDays: "5-7 days",
    trending: true,
    tagline: "Train a diagnostic model across 10 hospitals without any patient data leaving the hospital.",
    whatItDoes: "Flower federated learning framework coordinates 10 simulated hospital clients each training on their local patient data. FedAvg aggregation creates a global diagnostic model without data sharing.",
    realWorldUse: "AIIMS, Fortis, and Apollo cannot share patient records due to HIPAA/DPDPA. Federated learning enables collaboration for rare disease diagnosis. Nvidia FLARE and IBM FL are used in production hospital settings.",
    examinerExpects: [
      "Show 10 client hospitals training locally and aggregating at central server.",
      "Present global model accuracy vs local-only model: federated benefits.",
      "Demonstrate Byzantine fault tolerance when 2 clients send poisoned updates.",
      "Show communication efficiency: gradient compression reducing bandwidth 10x."
    ],
    freeVivaQuestions: [
      "What is the FedAvg aggregation algorithm and how does it handle non-IID data?",
      "What is data heterogeneity (non-IID) in federated learning and why is it challenging?",
      "What is gradient poisoning attack and how does robust aggregation prevent it?"
    ],
    freeStep1Title: "Install Flower (flwr) framework, set up 5 simulated clients with MNIST shards, run FedAvg round",
    datasetName: "MIMIC-III clinical dataset + CheXpert chest X-ray dataset (with federated data splits)"
  },
  {
    id: "aiml-protein-structure-alphafold-analysis",
    letter: "P",
    title: "Protein Structure Prediction and Binding Site Analysis with AlphaFold",
    category: "AIML",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Predict 3D protein structures and identify drug binding pockets using AlphaFold2.",
    whatItDoes: "Runs AlphaFold2 via ColabFold on novel protein sequences. Post-prediction analysis identifies binding pockets with fpocket, calculates druggability scores, and visualizes with PyMOL.",
    realWorldUse: "AlphaFold2 was awarded the Nobel Chemistry Prize in 2024. Pfizer, Moderna, and Dr. Reddy's use structure prediction for drug discovery. India's CSIR, IISc, and NCBS conduct computational drug research.",
    examinerExpects: [
      "Submit a novel protein sequence and visualize the predicted 3D structure.",
      "Identify binding pockets ranked by druggability score.",
      "Show pLDDT confidence score highlighting well-predicted vs disordered regions.",
      "Compare AlphaFold structure vs experimentally determined structure (RMSD)."
    ],
    freeVivaQuestions: [
      "What is the protein folding problem and why was it considered AI's hardest biology challenge?",
      "What is RMSD (Root Mean Square Deviation) and how is it used to compare protein structures?",
      "What is pLDDT score in AlphaFold predictions and what does a score above 90 mean?"
    ],
    freeStep1Title: "Run ColabFold on Google Colab with a 200-residue target protein, generate structure, download PDB file",
    datasetName: "UniProt protein sequences database + PDB (Protein Data Bank) experimental structures"
  },
  // ─── FINTECH BATCH 3 ─────────────────────────────────────────────────────
  {
    id: "fintech-upi-transaction-analytics",
    letter: "F",
    title: "UPI Transaction Analytics and Anomaly Detection",
    category: "Fintech",
    difficulty: 3,
    buildTimeDays: "2-4 days",
    trending: true,
    tagline: "Analyze patterns in UPI transaction data and detect unusual spending behavior.",
    whatItDoes: "Processes synthetic UPI transaction logs to compute spending patterns per user. Isolation Forest flags transactions deviating from normal behavior. Dashboard shows real-time spending analytics by category.",
    realWorldUse: "NPCI processes 10+ billion UPI transactions monthly. PhonePe, Google Pay, and Paytm all need fraud detection. UPI fraud cases rose 85% in 2023. RBI mandates transaction monitoring for all payment apps.",
    examinerExpects: [
      "Show user spending dashboard with monthly category breakdown.",
      "Demonstrate anomaly alert for a ₹50,000 transfer to an unknown merchant.",
      "Present ROC-AUC on synthetic fraud dataset with realistic imbalance (0.1% fraud rate).",
      "Show geographic anomaly: transaction from unusual PIN code at unusual hour."
    ],
    freeVivaQuestions: [
      "What is the NPCI UPI architecture and how does the 2-factor authentication work?",
      "What is the difference between first-party fraud and third-party fraud in UPI?",
      "How does velocity checking (multiple transactions in short time) detect fraud?"
    ],
    freeStep1Title: "Generate 100,000 synthetic UPI transactions with realistic merchant codes and amounts, inject 100 fraud cases",
    datasetName: "Synthetic UPI transaction dataset + PaySim mobile money simulation dataset"
  },
  {
    id: "fintech-robo-advisor-portfolio-optimization",
    letter: "F",
    title: "Robo-Advisor: Markowitz Portfolio Optimization",
    category: "Fintech",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Build a SEBI-grade robo-advisor that creates optimal stock portfolios using Modern Portfolio Theory.",
    whatItDoes: "Downloads NSE stock returns via yfinance. Scipy optimization minimizes portfolio variance subject to return target. Efficient frontier visualization. Risk tolerance questionnaire maps to optimal portfolio.",
    realWorldUse: "Scripbox, Groww, and INDmoney use MPT-based portfolio construction. SEBI's Investment Adviser regulations require robo-advisors to perform suitability assessment. This is production-grade financial engineering.",
    examinerExpects: [
      "Show efficient frontier curve with minimum variance and maximum Sharpe portfolios.",
      "Demonstrate risk tolerance questionnaire mapping to portfolio allocation.",
      "Present Sharpe ratio, Sortino ratio, and Maximum Drawdown metrics.",
      "Show rebalancing alert when portfolio drifts more than 5% from target."
    ],
    freeVivaQuestions: [
      "What is the Sharpe ratio and why is it a better metric than simple return?",
      "What are the assumptions of the Markowitz model and which real-world conditions violate them?",
      "What is the difference between systematic risk and unsystematic risk in finance?"
    ],
    freeStep1Title: "Download 5 years of NSE Nifty 50 constituent data using yfinance, compute covariance matrix",
    datasetName: "NSE historical price data via yfinance API + BSE bhavcopy daily data"
  },
  {
    id: "fintech-gstn-invoice-reconciliation-ai",
    letter: "F",
    title: "GST Invoice Reconciliation with AI",
    category: "Fintech",
    difficulty: 3,
    buildTimeDays: "2-4 days",
    trending: true,
    tagline: "Auto-reconcile supplier GSTR-2A with purchase records — eliminating 100+ hours of manual CA work.",
    whatItDoes: "Parses GSTR-2A JSON from GSTN portal and compares with company's purchase ledger. Fuzzy matching handles supplier name variations and GSTIN typos. Generates mismatch report with resolution suggestions.",
    realWorldUse: "Every Indian company with GST registration must reconcile quarterly. ClearTax, Tally, and GSTN itself are building reconciliation tools. India has 14 million active GST filers — all need this.",
    examinerExpects: [
      "Upload 100-row GSTR-2A and match against purchase ledger — show match report.",
      "Demonstrate fuzzy matching handling 'Tata Motors Ltd' vs 'Tata Motors Limited'.",
      "Show ITC (Input Tax Credit) discrepancy report with amount at risk.",
      "Present automated GSTR-3B suggestion based on reconciled data."
    ],
    freeVivaQuestions: [
      "What is the difference between GSTR-1, GSTR-2A, and GSTR-3B?",
      "What is Input Tax Credit (ITC) and why does reconciliation affect cash flow?",
      "How does the GSTN cascade work from supplier filing to buyer auto-population?"
    ],
    freeStep1Title: "Generate synthetic GSTR-2A JSON with 200 invoices, implement pandas-based reconciliation logic",
    datasetName: "Synthetic GST invoice dataset + GSTN portal schema documentation"
  },
  // ─── MORE FULLSTACK ───────────────────────────────────────────────────────
  {
    id: "fullstack-real-time-collaborative-coding",
    letter: "R",
    title: "Real-Time Collaborative Code Editor",
    category: "FullStack",
    difficulty: 5,
    buildTimeDays: "4-6 days",
    trending: true,
    tagline: "Build a Google Docs for code — multiple users editing simultaneously with instant synchronization.",
    whatItDoes: "Operational Transformation (OT) or CRDT algorithm ensures conflict-free concurrent edits. CodeMirror editor with WebSocket sync. Cursor presence showing collaborators' positions in real time.",
    realWorldUse: "Replit, CodeSandbox, and GitHub Codespaces all use collaborative editing. Every online interview tool (CoderPad, HackerRank) needs this. This is core infrastructure for remote development.",
    examinerExpects: [
      "Open same document in two browser tabs and show simultaneous editing.",
      "Demonstrate conflict resolution: two users edit same line simultaneously.",
      "Show cursor presence: collaborator avatars moving in real time.",
      "Present the CRDT tree structure maintaining document consistency."
    ],
    freeVivaQuestions: [
      "What is Operational Transformation and how does it handle concurrent edits?",
      "What is a CRDT (Conflict-free Replicated Data Type) and how does it differ from OT?",
      "What is the CAP theorem and how does it apply to distributed collaborative editors?"
    ],
    freeStep1Title: "Set up Socket.io server, implement Yjs CRDT library for document state, connect CodeMirror 6 editor",
    datasetName: "Yjs CRDT library + CodeMirror 6 collaborative editing extension"
  },
  {
    id: "fullstack-api-gateway-rate-limiting",
    letter: "A",
    title: "API Gateway with Rate Limiting and Authentication",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Build the infrastructure every microservices company uses — API gateway with JWT auth and rate limiting.",
    whatItDoes: "Custom API gateway in Node.js/Go with: JWT authentication middleware, tiered rate limiting (token bucket algorithm), request routing to microservices, response caching, and distributed tracing.",
    realWorldUse: "Kong, AWS API Gateway, and Google Cloud Endpoints are multi-billion dollar products. Every microservices architecture needs an API gateway. This is asked in senior backend engineering interviews.",
    examinerExpects: [
      "Show JWT token generation, validation, and refresh token rotation.",
      "Demonstrate rate limiting: 1000 req/hour tier being enforced per user.",
      "Show token bucket visualization: burst allowance and refill rate.",
      "Present distributed tracing: request correlation ID across 3 microservices."
    ],
    freeVivaQuestions: [
      "What is the token bucket algorithm and how does it differ from a leaky bucket for rate limiting?",
      "What is the difference between authentication and authorization?",
      "What is a JWT (JSON Web Token) and what are its three parts?"
    ],
    freeStep1Title: "Set up Express.js gateway with JWT middleware, implement Redis-based token bucket per user ID",
    datasetName: "JWT RFC 7519 specification + OAuth 2.0 RFC 6749 standard"
  },
  {
    id: "fullstack-event-driven-microservices-kafka",
    letter: "E",
    title: "Event-Driven Microservices with Apache Kafka",
    category: "FullStack",
    difficulty: 5,
    buildTimeDays: "5-7 days",
    trending: true,
    tagline: "Build a Zomato-style order management system using event-driven microservices.",
    whatItDoes: "Order, Payment, Restaurant, and Delivery services communicate via Kafka events. Saga pattern handles distributed transactions. Schema Registry enforces Avro message contracts. Dead Letter Queue handles failures.",
    realWorldUse: "Zomato, Swiggy, and Dunzo all use Kafka-based event-driven architecture. LinkedIn (invented Kafka) processes 7 trillion messages per day. This is the architecture of every modern Indian unicorn.",
    examinerExpects: [
      "Show order flow: Order created → Payment processed → Restaurant confirmed → Rider assigned.",
      "Demonstrate saga rollback: payment failure triggers order cancellation event.",
      "Show consumer group load balancing across 3 service instances.",
      "Present Kafka topic partitioning strategy for order ID-based routing."
    ],
    freeVivaQuestions: [
      "What is the Saga pattern and how does it maintain consistency in distributed transactions?",
      "What is the difference between at-least-once and exactly-once delivery semantics in Kafka?",
      "What is a Kafka consumer group and how does partition assignment work?"
    ],
    freeStep1Title: "Set up Kafka with Docker Compose, create order-events topic, implement producer and consumer services",
    datasetName: "Kafka documentation + Debezium CDC connector for database event sourcing"
  },
  {
    id: "fullstack-database-query-optimizer",
    letter: "D",
    title: "Database Query Optimizer and Performance Analyzer",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Automatically detect slow queries, suggest indexes, and rewrite inefficient SQL using AI.",
    whatItDoes: "Parses PostgreSQL EXPLAIN ANALYZE output with AST parser. ML model classifies query bottleneck type (sequential scan, sort, hash join). GPT-4 generates optimized query rewrite and index suggestions.",
    realWorldUse: "Every database-heavy application has slow queries. Percona, pganalyze, and Datadog APM provide query analytics. Avoiding N+1 queries and missing indexes is critical for any production backend.",
    examinerExpects: [
      "Input a slow SQL query and show automatic index suggestion.",
      "Demonstrate EXPLAIN ANALYZE parsing extracting cost and rows estimates.",
      "Show before/after: query execution time with and without suggested index.",
      "Present the query rewrite from subquery to JOIN for performance improvement."
    ],
    freeVivaQuestions: [
      "What is a sequential scan vs index scan in PostgreSQL and when is each chosen?",
      "What is the N+1 query problem and how do you detect it in ORM logs?",
      "What are covering indexes and why do they avoid heap fetches?"
    ],
    freeStep1Title: "Set up PostgreSQL with 1M row test table, generate slow queries, parse EXPLAIN ANALYZE with psycopg2",
    datasetName: "TPC-H benchmark SQL queries + Stack Overflow data dump PostgreSQL"
  },
  {
    id: "fullstack-observability-opentelemetry",
    letter: "O",
    title: "Full-Stack Observability with OpenTelemetry",
    category: "FullStack",
    difficulty: 4,
    buildTimeDays: "3-5 days",
    trending: true,
    tagline: "Implement tracing, metrics, and logs in a microservices app — the three pillars of observability.",
    whatItDoes: "Instruments a 3-service application with OpenTelemetry SDK. Sends spans to Jaeger for distributed tracing, metrics to Prometheus + Grafana, and logs to Loki. SLO-based alerting via Grafana.",
    realWorldUse: "Every SRE team at FAANG, Flipkart, and Paytm runs observability pipelines. Google SRE book defines SLO/SLI/SLA as the foundation of reliability. OpenTelemetry is the CNCF standard adopted by all cloud providers.",
    examinerExpects: [
      "Show a request traced across 3 services with latency breakdown per span.",
      "Present P50/P95/P99 latency percentiles dashboard for each service.",
      "Demonstrate SLO alert: error budget burned triggers PagerDuty-like notification.",
      "Show the flame graph visualization of distributed trace timing."
    ],
    freeVivaQuestions: [
      "What are the three pillars of observability and how do they differ from monitoring?",
      "What is a span in distributed tracing and how is trace context propagated across services?",
      "What is an SLO (Service Level Objective) and how is it different from an SLA?"
    ],
    freeStep1Title: "Add OpenTelemetry Python SDK to Flask app, configure OTLP exporter to Jaeger running in Docker",
    datasetName: "OpenTelemetry demo application (astronomy shop) + Grafana LGTM stack example"
  },
];
