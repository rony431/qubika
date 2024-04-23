🔰 About
Playwright is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.
The following solution is trying to use random data with Fake.js and implementing calls to API in order to test both UI and integration test in order to understand the solution please take a look into the comments 

⚡ Usage
using following node version recommended
node 16 or above

🔌 Installation
git clone 
cd Qubika
npm install

🚀 How to run
npm run test
npm run api
npm run report


├── Qubika
│   ├── data-test
        Includes all data used for automation
│   ├── page-objects
        Pages with methods and reusable selectors
│   └── tests
│       ├── e2e.spec.js
        File with the solution for the scenarios proposed 
├── package.json
└── README.md

execute npm run report to see report details
