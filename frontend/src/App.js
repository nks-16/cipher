import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from './components/FirstPage.js';
import MainPage from './components/MainPage.js';
import EmailPage from './components/EmailPage.js';
import SentPage from './components/SentPage.js';
import DraftsPage from './components/DraftsPage.js';
import EmailDetailPage from './components/EmailDetailPage.js';
import EmailContext from "./context/EmailContext";
import PortfolioPasswordPage from './components/PortfolioPasswordPage.js';
import PortfolioContentPage from './components/PortfolioContentPage.js';
import ProjectA from './components/ProjectA.js';
import ProjectB from './components/ProjectB.js';
import ProjectC from './components/ProjectC.js';
import TemplatePage from './components/TemplatePage.js';
import ReportPage from './components/ReportPage.js';
import ThankYouPage from './components/ThankYouPage.js';
import './App.css';

function App() {
    const emails = [
        {
            id: "g1",
            sender: "Promethean Dynamics",
            recipient: "You",
            subject: "Welcome to Aether – Secure Communication Guidelines",
            timestamp: "17th January, 5:00 pm",
            preview: "Welcome to the Aether Project communication system. All project-related discussions must comply with the Tier-3 security protocol.",
            cc: [],
            body: `Welcome to the Aether Project communication system. All project-related discussions must comply with the <strong>Tier-3 security protocol</strong>.

<strong>Important reminders:</strong>
- Avoid explicit references to proprietary technology in emails.
- Use <strong>pre-approved encryption protocols</strong> for sensitive communication.
- Any suspected security breach should be <strong>immediately reported to Internal Security.</strong>`,
        },
        {
            id: "g2",
            sender: "Harper Brown",
            recipient: "You",
            subject: "Energy Redistribution Metrics – Immediate Validation Required",
            timestamp: "30th June, 7:08 pm",
            preview: "Don't forget about the meeting tomorrow at 10 AM.",
            cc: [],
            body: `Ava,

The <strong>latest redistribution tables</strong> have been finalised. <strong>Energy priority adjustments</strong> have been implemented per protocol.

<strong>Urgent Checks Needed:</strong>

</strong>Ensure stability ratios remain within safe thresholds.</strong>
<strong>Some nodes require extra load balancing</strong> - we cannot afford miscalculations at this stage.
<strong>Sync all frequency markers</strong> before the next scheduled validation.`,
        },
        {
            id: "e1",
            sender: "Howlen Smith",
            recipient: "You",
            subject: " Critical Update on Project Timeline.",
            timestamp: "1st July, 8:03 PM",
            preview: "Here's the latest update on the project.",
            cc: ["charlie@example.com"],
            body: `Esteemed colleagues, this is to inform you that all schedules are final. 
Having cross-checked data, the window is narrowing…this is the common belief. 
Prior knowledge suggests we must use the methods of Caesar. 
We need to ensure the plan is completely foolproof. 
Gaze at the letters, first and last, respectively…of the first and last words, for time has been keyed. 
Planning ahead will make the launch fully achievable.`,
        },
        {
            id: "g3",
            sender: "Lily Jones",
            recipient: "You",
            subject: " Weekly Progress Report - Aether Deployment",
            timestamp: "2nd July, 9:35 am",
            preview: "Weekly Progress Report - Aether Deployment",
            cc: [],
            body: `Team, 

We are on track for the final phase of Aether’s deployment. The recent <strong>power distribution tests</strong> showed a <strong>4.7% efficiency increase</strong> in target zones. 

However, I have concerns regarding <strong>frequency fluctuations</strong> in <strong>Section 5</strong>. The recent surge could indicate a <strong>misalignment in the transmission nodes.</strong> I’ll run additional diagnostics today. 

Let's discuss this in our next checkpoint meeting.`,
        },
        {
            id: "g4",
            sender: "Dr. Rohan Malhotra",
            recipient: "You",
            subject: "Cross-Team Collaboration - Aether Signal Stability",
            timestamp: "2nd July, 2:10 pm",
            preview: "Cross-Team Collaboration - Aether Signal Stability",
            cc: [],
            body: `Hey Ava, 
            
I’ve been reviewing the latest data logs, and I need your insights on the recent fluctuations in signal transmission. The patterns we’re seeing are… unusual. At first, I assumed it was an alignment issue, but after running multiple simulations, I think something else might be at play. 

I heard from Sumedha last week that she was testing alternative frequency harmonics. Did she happen to share any preliminary findings with you? If so, I’d love to compare notes before we finalise next week’s report. 

Let me know when you’re free for a quick sync.`,
        },
        {
            id: "g5",
            sender: "Harper Brown.",
            recipient: "You",
            subject: "Urgent: Confidential Alignment Meeting - Mandatory Attendance",
            timestamp: "2nd July, 5:09 pm",
            preview: "Urgent: Confidential Alignment Meeting - Mandatory Attendance",
            cc: [],
            body: `Dear Ava, 
A mandatory alignment session has been scheduled for Thursday at 2200 hours in the lower-level conference room, Section 5. All Tier-3 personnel must be present. 

Agenda: 

    -Reviewing critical last-phase adjustments
    -Finalising redundancies for energy stabilisation
    -Access control confirmations and system oversight

Attendance is not optional. Ensure your credentials are up to date before entry. If you have any conflicts, contact your reporting manager immediately.`,
        },
        {
            id: "g6",
            sender: "HR Department - Promethean Dynamics",
            recipient: "You",
            subject: "Quarterly Performance Review - Schedule Confirmation",
            timestamp: "2nd July, 6:30 pm",
            preview: "Quarterly Performance Review  Schedule Confirmation",
            cc: [],
            body: `Dear Ava,

As part of our regular performance evaluations, we would like to schedule your quarterly review session. The available slots for next week are:
    
    -Monday, 11:00 AM – 12:00 PM
    -Wednesday, 3:00 PM – 4:00 PM
    -Friday, 2:00 PM – 3:00 PM

Please confirm your preferred timing at your earliest convenience. If you require any adjustments, feel free to reach out.`,
        },
        {
            id: "e2",
            sender: "Lily Jones",
            recipient: "You",
            subject: "A small shift will take us two steps closer.",
            timestamp: "3rd July, 9:55 am",
            preview: "A small shift will take us two steps closer.",
            cc: [],
            body: `<strong>Mo</strong>mentum is building as we appr<strong>o</strong>ach the final p<strong>h</strong>ase, but we must proceed with caution.
Our calculations indicate <strong>m</strong>inor <strong>o</strong>ptimisations are still necessary for efficiency.
Observing trends, we see that some factors <strong>s</strong>cale predictably, while ot<strong>h</strong>ers require careful tuning.
Having r<strong>e</strong>viewed the latest simulati<strong>o</strong>ns, I bel<strong>i</strong>eve t<strong>h</strong>e most st<strong>a</strong>ble and <strong>s</strong>trong a<strong>p</strong>proach aligns with an affine transformation—where one constant defines the entire structure.
 
St<strong>r</strong>ategic pl<strong>a</strong>ceme<strong>n</strong>t of comp<strong>o</strong>nents is key—precision in mapping will determine success.
Perh<strong>a</strong>ps a secondary check would ensure our <strong>p</strong>rojections remain robust, especially since the multiplier is already set to this date.

Recalibrations aside, one constant <strong>h</strong>olds—our foundation is <strong>o</strong>ptimal, and <strong>p</strong>recise adjustments will only perfect it further.`,
        },
        {
            id: "e3",
            sender: "David Rooster",
            recipient: "You",
            subject: " Auto-Key Alignments - Benchmarking 4 Essential Nodes",
            timestamp: "3rd July, 10:10 am",
            preview: " Auto-Key Alignments - Benchmarking 4 Essential Nodes",
            cc: [],
            body: `We Will Get Vital Breakthroughs via better Workflow Before 5.
Guidelines Need Precise Evaluation Regarding Viable Hypotheses.
Ensure Thorough analysis.
X-factors eXist—Review.
Xenon Projections Keep priority.
`,
        },
        {
            id: "g7",
            sender: "Harper Brown",
            recipient: "You",
            subject: "Transition Protocols and Site Security Measures",
            timestamp: "3rd July, 10:15 am",
            preview: "Transition Protocols and Site Security Measures",
            cc: [],
            body: `As we proceed with Phase III, all active workstations have been relocated to Section 3. Effective immediately, Section 5 is to remain undisturbed—no further activities, testing, or modifications are permitted within its premises. Access will be restricted, and necessary measures are being put in place to ensure its integrity.

All project components should now align with the updated configurations in Section 3. Any adjustments required due to this transition must be documented and reviewed before implementation. If existing dependencies on previous setups arise, report them through the designated channel for reassessment.

Maintain discretion in all communications regarding site changes. The transition is critical, and adherence to protocol will ensure continuity without disruption.`,
        },
    ];

    return (
        <EmailContext.Provider value={emails}>
            <BrowserRouter>
                <Routes>
                <Route path="/" element={<FirstPage />} />
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/email" element={<EmailPage />} />
                    <Route path="/sent" element={<SentPage />} />
                    <Route path="/drafts" element={<DraftsPage />} />
                    <Route path="/sent/:id" element={<EmailDetailPage />} />
                    <Route path="/portfolio" element={<PortfolioPasswordPage />} />
                    <Route path="/portfolio-content" element={<PortfolioContentPage />} />
                    <Route path="/portfolio/project-a" element={<ProjectA />} />
                    <Route path="/portfolio/project-b" element={<ProjectB />} />
                    <Route path="/portfolio/project-c" element={<ProjectC />} />
                    <Route path="/template-page" element={<TemplatePage />} />
                    <Route path="/report-page" element={<ReportPage />} />
                    <Route path="/thank-you" element={<ThankYouPage />} />
                    <Route path="/inbox" element={<EmailPage />} />
                    <Route path="/inbox/:id" element={<EmailDetailPage />} />
                </Routes>
            </BrowserRouter>
        </EmailContext.Provider>
    );
}

export default App;