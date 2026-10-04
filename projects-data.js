window.PORTFOLIO_PROJECTS = [
  {
    "id": "red-palm-weevil",
    "number": "01",
    "title": "Early Detection of the Red Palm Weevil",
    "summary": "An acoustic sensing and wireless network design for early detection of Red Palm Weevil infestations.",
    "categories": [
      "Embedded Systems",
      "Research"
    ],
    "stack": [
      "ESP32",
      "LoRa"
    ],
    "tools": "ESP32 · LoRa · Acoustic sensing · Cloud classification",
    "context": "Senior design · wireless networking and cloud platform",
    "status": "Design phase; implementation planned",
    "contribution": "",
    "details": [
      "A proposed low-cost IoT acoustic system uses trunk-mounted piezoelectric sensors to capture vibrations associated with larval feeding. The design is minimally invasive and aims to support earlier inspection decisions."
    ],
    "image": "assets/projects/rpw-architecture.jpeg",
    "imageAlt": "Early Detection of the architecture",
    "featured": false,
    "href": "projects/red-palm-weevil.html",
    "github": "",
    "resources": []
  },
  {
    "id": "home-lab",
    "number": "02",
    "title": "Self-Hosted Home Lab Infrastructure",
    "summary": "A self-hosted infrastructure lab with Proxmox, isolated networking, Active Directory, and Docker services.",
    "categories": [
      "Networks & Security"
    ],
    "stack": [
      "Proxmox VE",
      "Linux",
      "Windows Server",
      "Docker"
    ],
    "tools": "Proxmox VE · Linux · Windows Server · Docker",
    "context": "Personal infrastructure project · 2026",
    "status": "Deployed lab",
    "contribution": "",
    "details": [
      "Built a virtualization platform from bare metal using Proxmox VE on repurposed hardware, provisioning and managing multiple LXC containers and QEMU/KVM virtual machines.",
      "Designed a segmented network using a secondary consumer router in NAT/router mode, separating lab addressing from the primary home network while preserving internet access.",
      "Deployed Windows Server 2022 as an AD DS domain controller with integrated DNS; configured the forest/domain, NetBIOS naming, and DSRM recovery."
    ],
    "image": "assets/projects/home-lab-visual-architecture.png",
    "imageAlt": "Self-Hosted Home Lab architecture",
    "featured": true,
    "href": "projects/home-lab.html",
    "github": "",
    "resources": []
  },
  {
    "id": "smartexpense",
    "number": "03",
    "title": "SmartExpense",
    "summary": "A full-stack expense tracker with spending analytics, budgets, and secure user authentication.",
    "categories": [
      "Software Development"
    ],
    "stack": [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "Docker"
    ],
    "tools": "Next.js · FastAPI · PostgreSQL · Docker",
    "context": "Full-stack application",
    "status": "Implemented application",
    "contribution": "",
    "details": [
      "SmartExpense connects a Next.js interface to a FastAPI application and PostgreSQL database. It supports recording expenses, categorizing transactions, and comparing monthly spending against a budget."
    ],
    "image": "assets/projects/smartexpense-dashboard-concept.png",
    "imageAlt": "Generated SmartExpense dashboard concept: sample data, not a running application screenshot",
    "featured": true,
    "href": "projects/smartexpense.html",
    "github": "https://github.com/MrCtrlAltDefeat/smartexpense",
    "resources": []
  },
  {
    "id": "splitpriloc",
    "number": "04",
    "title": "SplitPriLoc",
    "summary": "Split learning for privacy-preserving indoor localization using Wi-Fi signals.",
    "categories": [
      "Research",
      "Networks & Security"
    ],
    "stack": [
      "PyTorch",
      "Hydra",
      "MATLAB",
      "Split learning"
    ],
    "tools": "PyTorch · Hydra · MATLAB · Split learning",
    "context": "Wireless localization research",
    "status": "Single-machine training simulation",
    "contribution": "Helped design the machine-learning algorithm.",
    "details": [
      "I helped design the machine-learning algorithm for the split-learning localization approach.",
      "The main reported result was comparable 90th-percentile localization error to the rerun FedWiLoc baseline: 6.53 versus 6.75 in the July 28 scenario, and 7.06 versus 6.75 in the August 16 scenario. SplitPriLoc performed slightly better in the first scenario and slightly worse in the second; the report does not specify a distance unit for these figures."
    ],
    "image": "assets/projects/splitpriloc-model.png",
    "imageAlt": "SplitPriLoc system model from the report: access points, device, and cloud server",
    "featured": true,
    "href": "projects/splitpriloc.html",
    "github": "https://github.com/MrCtrlAltDefeat/SplitPriLoc",
    "resources": [
      {
        "label": "Research report PDF ↓",
        "href": "assets/resources/splitpriloc/splitpriloc-1.pdf"
      }
    ]
  },
  {
    "id": "dark-pattern-detector",
    "number": "05",
    "title": "Dark Pattern Detector",
    "summary": "A browser extension that identifies deceptive interface patterns and explains what it flags.",
    "categories": [
      "Software Development",
      "Networks & Security"
    ],
    "stack": [
      "JavaScript",
      "Chrome Extension APIs"
    ],
    "tools": "JavaScript · Chrome Extension APIs",
    "context": "Browser extension project",
    "status": "Heuristic detector implementation",
    "contribution": "",
    "details": [
      "Consent prompts, scarcity messages, and misleading opt-outs can steer people into choices they did not intend to make. This course team project explores a lightweight browser extension that flags suspicious interface elements and explains what triggered the warning."
    ],
    "image": "assets/projects/dark-pattern-demo.png",
    "imageAlt": "Original extension screenshot showing flagged consent and urgency patterns.",
    "featured": false,
    "href": "projects/dark-pattern-detector.html",
    "github": "https://github.com/MrCtrlAltDefeat/darkpattern-extension",
    "resources": [
      {
        "label": "Progress report PDF ↓",
        "href": "assets/resources/dark-pattern-detector/dark-pattern-detector-1.pdf"
      }
    ]
  },
  {
    "id": "foodo",
    "number": "06",
    "title": "Foodo",
    "summary": "An Odoo module connecting surplus food inventory with receivers, pickups, and impact records.",
    "categories": [
      "Software Development"
    ],
    "stack": [
      "Python",
      "Odoo",
      "PostgreSQL"
    ],
    "tools": "Python · Odoo · PostgreSQL",
    "context": "ERP software project",
    "status": "Implemented module; dashboard planned",
    "contribution": "",
    "details": [
      "Foodo is an Odoo module for organizing surplus-food redistribution. It connects food batches, inventory, receivers, and pickup requests inside the same ERP environment."
    ],
    "image": "assets/projects/foodo-logo.png",
    "imageAlt": "Foodo logo",
    "featured": false,
    "href": "projects/foodo.html",
    "github": "https://github.com/MrCtrlAltDefeat/odoo-food-rescue-module",
    "resources": []
  },
  {
    "id": "producer-consumer",
    "number": "07",
    "title": "Producer–Consumer System",
    "summary": "A multithreaded bounded-buffer system using POSIX threads, semaphores, and mutex synchronization.",
    "categories": [
      "Software Development"
    ],
    "stack": [
      "C",
      "POSIX threads",
      "Semaphores",
      "Mutex"
    ],
    "tools": "C · POSIX threads · Semaphores · Mutex",
    "context": "Concurrent systems project",
    "status": "Bounded-buffer implementation",
    "contribution": "",
    "details": [
      "Multiple producers and consumers share a bounded circular buffer. Producers must wait for space; consumers must wait for data. The program uses POSIX threads, two semaphores, and a mutex to coordinate access."
    ],
    "image": "assets/projects/producer-consumer-flow.svg",
    "imageAlt": "Diagram showing threads coordinating access to a shared circular buffer.",
    "featured": false,
    "href": "projects/producer-consumer.html",
    "github": "https://github.com/MrCtrlAltDefeat/multithreaded-producer-consumer",
    "resources": []
  },
  {
    "id": "nfs-security-lab",
    "number": "08",
    "title": "NFS Security Lab",
    "summary": "A controlled security lab exploring exposed NFS services, access control, and privilege escalation.",
    "categories": [
      "Networks & Security"
    ],
    "stack": [
      "Kali Linux",
      "Nmap",
      "NFS",
      "Metasploitable"
    ],
    "tools": "Kali Linux · Nmap · NFS · Metasploitable",
    "context": "Controlled security lab",
    "status": "Documented lab exercise",
    "contribution": "",
    "details": [
      "This demonstration uses Kali and an intentionally vulnerable Metasploitable VM on a NAT network. It examines how exposed file shares can become the starting point for unauthorized access and local privilege escalation inside a controlled lab."
    ],
    "image": "assets/projects/nfs-scan.png",
    "imageAlt": "Original Nmap scan excerpt from the vulnerable virtual machine.",
    "featured": false,
    "href": "projects/nfs-security-lab.html",
    "github": "",
    "resources": []
  },
  {
    "id": "drowning-detection",
    "number": "09",
    "title": "Drowning Detection Wristband",
    "summary": "A wearable prototype combining motion and pulse sensing to explore drowning detection.",
    "categories": [
      "Embedded Systems",
      "Research"
    ],
    "stack": [
      "Seeeduino XIAO",
      "NRF24L01"
    ],
    "tools": "Seeeduino XIAO · Motion and pulse sensors · NRF24L01",
    "context": "Team of four · software and coding",
    "status": "Wearable prototype; validation not reported",
    "contribution": "",
    "details": [
      "A wearable prototype project designed to combine motion and pulse sensing, recognize possible distress, and transmit an alert to a computer at the lifeguard station. The intended role is an added layer of protection alongside lifeguards."
    ],
    "image": "assets/projects/wristband-3d-model.png",
    "imageAlt": "Original 3D wristband model and component layout from the project report",
    "featured": false,
    "href": "projects/drowning-detection.html",
    "github": "",
    "resources": [
      {
        "label": "Project implementation plan PDF ↓",
        "href": "assets/resources/drowning-detection/drowning-detection-1.pdf"
      }
    ]
  },
  {
    "id": "smart-ecg",
    "number": "10",
    "title": "Smart ECG Monitor",
    "summary": "An ESP32 and FreeRTOS simulation for ECG processing, heart-rate monitoring, and alerts.",
    "categories": [
      "Embedded Systems"
    ],
    "stack": [
      "ESP32",
      "FreeRTOS",
      "Wokwi",
      "C"
    ],
    "tools": "ESP32 · FreeRTOS · Wokwi · C",
    "context": "Embedded signal-processing project",
    "status": "Synthetic ECG simulation",
    "contribution": "",
    "details": [
      "The simulator generates ECG-like signals using a McSharry dynamical model. A 200 Hz acquisition task feeds a queue; a filtering and detection task applies a Pan–Tompkins-style pipeline, identifies beats, and estimates heart rate from RR intervals."
    ],
    "image": "assets/projects/ecg-wokwi-circuit.jpeg",
    "imageAlt": "Original Wokwi circuit layout for the ESP32 Smart ECG Monitor simulation",
    "featured": false,
    "href": "projects/smart-ecg.html",
    "github": "https://github.com/MrCtrlAltDefeat/smart-ecg-monitor",
    "resources": []
  },
  {
    "id": "ameen",
    "number": "11",
    "title": "Ameen",
    "summary": "A cybersecurity startup concept offering accessible security tools for SMEs and individuals.",
    "categories": [
      "Networks & Security",
      "Management & Entrepreneurship"
    ],
    "stack": [],
    "tools": "Business model · Customer segments · Security services",
    "context": "Cybersecurity entrepreneurship project",
    "status": "Startup concept",
    "contribution": "",
    "details": [
      "A startup concept for affordable, approachable cybersecurity aimed at UAE SMEs, freelancers, remote workers, and individuals. The proposal responds to limited security expertise, budget constraints, password reuse, and concern about data breaches."
    ],
    "image": "assets/projects/ameen-concept.svg",
    "imageAlt": "Concept overview created from the supplied business presentations, which spell the name “Amen”.",
    "featured": false,
    "href": "projects/ameen.html",
    "github": "",
    "resources": [
      {
        "label": "Startup concept: Part A PDF ↓",
        "href": "https://mrctrlaltdefeat.github.io/assets/resources/ameen/ameen-1.pdf"
      },
      {
        "label": "Startup concept: Part B PDF ↓",
        "href": "assets/resources/ameen/ameen-2.pdf"
      }
    ]
  },
  {
    "id": "salat-research",
    "number": "12",
    "title": "Representations of “الصلاة”",
    "summary": "Arabic corpus research comparing representations of “الصلاة” in the Quran and Hadith.",
    "categories": [
      "Research"
    ],
    "stack": [
      "AntConc",
      "Excel"
    ],
    "tools": "AntConc · Excel · Arabic text analysis",
    "context": "Arabic digital humanities research",
    "status": "Comparative corpus study",
    "contribution": "",
    "details": [
      "A comparative study of how prayer-related word forms and contexts appear in the Quran and the supplied Sahih Al-Albani corpus. The project combines frequency analysis, collocations, and contextual interpretation."
    ],
    "image": "assets/projects/salat-source-3.png",
    "imageAlt": "Original keyword grouping figure from the research report.",
    "featured": false,
    "href": "projects/salat-research.html",
    "github": "",
    "resources": []
  },
  {
    "id": "kkia",
    "number": "13",
    "title": "King Khalid International Airport",
    "summary": "An academic airport-expansion plan covering scope, scheduling, budgets, resources, and risks.",
    "categories": [
      "Management & Entrepreneurship"
    ],
    "stack": [
      "WBS",
      "MS Project"
    ],
    "tools": "WBS · MS Project · Risk and cost planning",
    "context": "EGM 362 · Engineering management",
    "status": "Academic planning study",
    "contribution": "",
    "details": [
      "An academic planning case for a proposed KKIA expansion, covering scope, schedule, cost, resources, quality, risk, project controls, and handover. The study uses an approximately SAR 850 million budget and a five-million-passenger capacity increase by 2030 as planning assumptions."
    ],
    "image": "assets/projects/kkia-wbs.png",
    "imageAlt": "Work breakdown structure from the supplied presentation.",
    "featured": false,
    "href": "projects/kkia.html",
    "github": "",
    "resources": [
      {
        "label": "Project presentation PDF ↓",
        "href": "assets/resources/kkia/kkia-1.pdf"
      },
      {
        "label": "Final project report PDF ↓",
        "href": "assets/resources/kkia/kkia-2.pdf"
      }
    ]
  },
  {
    "id": "guess-my-color",
    "number": "14",
    "title": "Guess My Color",
    "summary": "An Arduino color-memory game with RGB mixing, five rounds, LCD scores, and buzzer feedback.",
    "categories": [
      "Embedded Systems"
    ],
    "stack": [
      "Arduino",
      "PlatformIO",
      "Wokwi",
      "C++"
    ],
    "tools": "Arduino · PlatformIO · Wokwi · C++",
    "context": "Hardware simulation project",
    "status": "Arduino game implementation",
    "contribution": "",
    "details": [
      "The player memorizes a random target color, recreates it with red, green, and blue potentiometers, and presses a button to submit. Two RGB LEDs show the target and the player’s mix; a 16 × 2 I²C LCD shows timing and scores."
    ],
    "image": "assets/projects/color-game.svg",
    "imageAlt": "Illustrated flow based on the supplied game source.",
    "featured": false,
    "href": "projects/guess-my-color.html",
    "github": "https://github.com/MrCtrlAltDefeat/guess-my-color",
    "resources": []
  },
  {
    "id": "text-rpg",
    "number": "15",
    "title": "Text-Based RPG: Escape A.U.S.",
    "summary": "A Java campus escape game featuring threaded professor patrols and event-driven interactions.",
    "categories": [
      "Software Development"
    ],
    "stack": [
      "Java",
      "Threads",
      "Observer pattern"
    ],
    "tools": "Java · Threads · Observer pattern",
    "context": "COE421L · Spring 2026",
    "status": "Text-based game implementation",
    "contribution": "",
    "details": [
      "A student navigates a university controlled by AI impostor professors. The five-room world links the Lobby, Library, Lab, Server Room, and Exit Gate. Collect the ID Card and USB Drive, disable the server, and escape before health runs out."
    ],
    "image": "assets/projects/rpg-map.svg",
    "imageAlt": "Game progression illustrated from the supplied source and README.",
    "featured": false,
    "href": "projects/text-rpg.html",
    "github": "https://github.com/MrCtrlAltDefeat/text-based-rpg",
    "resources": []
  }
];
