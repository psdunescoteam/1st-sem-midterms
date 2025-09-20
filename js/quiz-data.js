// Work Immersion Quiz Data - 54 Questions
const workImmersionQuestions = [
    {
        id: 1,
        question: "What is the primary purpose of Work Immersion in the K-12 curriculum?",
        options: [
            "To provide students with real workplace experience",
            "To replace traditional classroom learning",
            "To help students earn money while studying",
            "To reduce the number of academic subjects"
        ],
        correct: 0,
        explanation: "Work Immersion is designed to expose students to actual workplace settings and help them develop work-readiness skills."
    },
    {
        id: 2,
        question: "How many hours are typically required for Work Immersion in Senior High School?",
        options: [
            "40 hours",
            "60 hours",
            "80 hours",
            "100 hours"
        ],
        correct: 2,
        explanation: "The standard requirement for Work Immersion is 80 hours of actual workplace exposure."
    },
    {
        id: 3,
        question: "Which document serves as the agreement between the school and the partner institution for Work Immersion?",
        options: [
            "Student Contract",
            "Memorandum of Agreement (MOA)",
            "Work Permit",
            "Internship Letter"
        ],
        correct: 1,
        explanation: "A Memorandum of Agreement (MOA) formalizes the partnership between educational institutions and industry partners."
    },
    {
        id: 4,
        question: "What is the role of the Work Immersion Coordinator?",
        options: [
            "To evaluate student performance only",
            "To manage and oversee the entire Work Immersion program",
            "To provide transportation for students",
            "To replace workplace supervisors"
        ],
        correct: 1,
        explanation: "The Work Immersion Coordinator manages all aspects of the program including partnerships, student placement, and monitoring."
    },
    {
        id: 5,
        question: "During Work Immersion, students are expected to:",
        options: [
            "Work as regular employees with full responsibilities",
            "Observe workplace activities and participate in guided tasks",
            "Focus only on academic learning",
            "Take over management roles"
        ],
        correct: 1,
        explanation: "Work Immersion involves structured learning through observation and guided participation, not full employment."
    },
    {
        id: 6,
        question: "What is the minimum age requirement for students to participate in Work Immersion?",
        options: [
            "15 years old",
            "16 years old",
            "17 years old",
            "18 years old"
        ],
        correct: 1,
        explanation: "Students must be at least 16 years old to participate in Work Immersion programs for safety and legal reasons."
    },
    {
        id: 7,
        question: "Which of the following is NOT a valid Work Immersion venue?",
        options: [
            "Government offices",
            "Private companies",
            "Non-government organizations",
            "Entertainment establishments with age restrictions"
        ],
        correct: 3,
        explanation: "Work Immersion venues must be appropriate and safe for students, excluding establishments with age restrictions."
    },
    {
        id: 8,
        question: "The Work Immersion portfolio should include:",
        options: [
            "Daily time records only",
            "Reflection papers, accomplishment reports, and certificates",
            "Personal photos and social media posts",
            "Academic grades from other subjects"
        ],
        correct: 1,
        explanation: "The portfolio documents the learning experience through reflections, reports, and official certificates."
    },
    {
        id: 9,
        question: "What is the primary role of the Industry Partner Supervisor?",
        options: [
            "To grade the student's academic performance",
            "To guide and mentor the student during workplace exposure",
            "To replace school teachers",
            "To handle student discipline issues"
        ],
        correct: 1,
        explanation: "Industry supervisors provide guidance, mentorship, and workplace-specific learning opportunities."
    },
    {
        id: 10,
        question: "Work Immersion helps students develop which of the following skills?",
        options: [
            "Academic research skills only",
            "21st-century skills and work-readiness competencies",
            "Sports and recreation abilities",
            "Artistic and creative talents exclusively"
        ],
        correct: 1,
        explanation: "Work Immersion focuses on developing practical workplace skills, communication, teamwork, and professional competencies."
    },
    {
        id: 11,
        question: "The Work Immersion program is typically conducted during which grade level?",
        options: [
            "Grade 10",
            "Grade 11",
            "Grade 12",
            "Grade 11 and 12"
        ],
        correct: 2,
        explanation: "Work Immersion is primarily conducted during Grade 12, the final year of Senior High School."
    },
    {
        id: 12,
        question: "Which document tracks the student's daily activities during Work Immersion?",
        options: [
            "Academic transcript",
            "Daily Time Record (DTR)",
            "Report card",
            "Attendance sheet"
        ],
        correct: 1,
        explanation: "The Daily Time Record documents the student's presence and activities during each day of Work Immersion."
    },
    {
        id: 13,
        question: "Students are required to submit which type of reflection during Work Immersion?",
        options: [
            "Academic essays on theoretical concepts",
            "Daily learning reflections and insights",
            "Creative writing pieces",
            "Mathematical problem solutions"
        ],
        correct: 1,
        explanation: "Reflection papers help students process their workplace experiences and connect them to their learning."
    },
    {
        id: 14,
        question: "The Work Immersion program aligns with which educational philosophy?",
        options: [
            "Theoretical learning only",
            "Experiential and contextual learning",
            "Rote memorization",
            "Competitive academic achievement"
        ],
        correct: 1,
        explanation: "Work Immersion emphasizes learning through real-world experience and practical application."
    },
    {
        id: 15,
        question: "Which safety measure is most important during Work Immersion?",
        options: [
            "Wearing school uniforms daily",
            "Following workplace safety protocols and guidelines",
            "Bringing personal protective equipment from home",
            "Working overtime to show dedication"
        ],
        correct: 1,
        explanation: "Following established workplace safety protocols ensures student protection during Work Immersion."
    },
    {
        id: 16,
        question: "Work Immersion evaluation typically includes assessment from:",
        options: [
            "School teachers only",
            "Industry supervisors only",
            "Both school coordinators and industry supervisors",
            "Students themselves only"
        ],
        correct: 2,
        explanation: "Comprehensive evaluation involves both educational institutions and industry partners."
    },
    {
        id: 17,
        question: "The main goal of pre-immersion orientation is to:",
        options: [
            "Test student academic knowledge",
            "Prepare students for workplace expectations and requirements",
            "Assign work schedules",
            "Collect student fees"
        ],
        correct: 1,
        explanation: "Orientation prepares students for professional workplace behavior and expectations."
    },
    {
        id: 18,
        question: "Which behavior is expected from Work Immersion students?",
        options: [
            "Casual and relaxed attitude",
            "Professional demeanor and positive work ethic",
            "Competitive behavior with other students",
            "Independent decision-making without supervision"
        ],
        correct: 1,
        explanation: "Students must demonstrate professionalism and positive work attitudes during their immersion."
    },
    {
        id: 19,
        question: "Work Immersion certificates are issued by:",
        options: [
            "The Department of Education only",
            "The partner industry/organization",
            "Student organizations",
            "Local government units"
        ],
        correct: 1,
        explanation: "Partner organizations issue certificates recognizing student participation and completion."
    },
    {
        id: 20,
        question: "The post-immersion phase typically involves:",
        options: [
            "Immediate return to regular classes",
            "Reflection, portfolio completion, and presentation of learnings",
            "Extended vacation period",
            "Advanced workplace training"
        ],
        correct: 1,
        explanation: "Post-immersion activities help students reflect on and consolidate their learning experiences."
    },
    {
        id: 21,
        question: "Which track benefits most from Work Immersion in hospitality and tourism?",
        options: [
            "STEM",
            "ABM",
            "TVL",
            "HUMSS"
        ],
        correct: 2,
        explanation: "Technical-Vocational-Livelihood (TVL) track directly prepares students for specific industry sectors."
    },
    {
        id: 22,
        question: "Work Immersion helps bridge the gap between:",
        options: [
            "Elementary and high school",
            "School and the workplace/higher education",
            "Public and private education",
            "Urban and rural schools"
        ],
        correct: 1,
        explanation: "Work Immersion connects classroom learning with real-world application and career preparation."
    },
    {
        id: 23,
        question: "Students are prohibited from doing which activity during Work Immersion?",
        options: [
            "Observing workplace operations",
            "Participating in guided tasks",
            "Handling hazardous materials without proper training",
            "Interacting with workplace personnel"
        ],
        correct: 2,
        explanation: "Student safety is paramount; they cannot engage in dangerous activities without proper training and supervision."
    },
    {
        id: 24,
        question: "The Work Immersion program duration is typically:",
        options: [
            "1 week",
            "2 weeks",
            "1 month",
            "3 months"
        ],
        correct: 1,
        explanation: "Most Work Immersion programs span approximately 2 weeks to complete the required 80 hours."
    },
    {
        id: 25,
        question: "Which document serves as proof of student insurance during Work Immersion?",
        options: [
            "School ID",
            "Medical certificate",
            "Insurance policy or coverage certificate",
            "Parent consent form"
        ],
        correct: 2,
        explanation: "Proper insurance coverage is required to protect students during workplace exposure."
    },
    {
        id: 26,
        question: "Work Immersion placement should be based on:",
        options: [
            "Student's home address proximity",
            "Parent's workplace preference",
            "Student's track/strand and career interests",
            "Random assignment by school"
        ],
        correct: 2,
        explanation: "Placement should align with the student's academic track and career aspirations for meaningful learning."
    },
    {
        id: 27,
        question: "The ideal ratio of students to industry supervisor during Work Immersion is:",
        options: [
            "1:1 (one supervisor per student)",
            "5:1 (five students per supervisor)",
            "10:1 (ten students per supervisor)",
            "No specific ratio required"
        ],
        correct: 1,
        explanation: "Ideally, each student should have dedicated supervision for personalized guidance and mentoring."
    },
    {
        id: 28,
        question: "Work Immersion students should dress according to:",
        options: [
            "School uniform requirements",
            "Personal fashion preferences",
            "Workplace dress code and safety requirements",
            "Latest fashion trends"
        ],
        correct: 2,
        explanation: "Students must follow workplace dress codes and safety requirements, which may differ from school uniforms."
    },
    {
        id: 29,
        question: "Which communication skill is most emphasized during Work Immersion?",
        options: [
            "Academic writing",
            "Professional workplace communication",
            "Social media interaction",
            "Casual conversation"
        ],
        correct: 1,
        explanation: "Professional communication skills are essential for workplace success and are emphasized during immersion."
    },
    {
        id: 30,
        question: "The Work Immersion program helps students understand:",
        options: [
            "Theoretical concepts only",
            "Industry standards and workplace culture",
            "Academic research methods",
            "Historical perspectives"
        ],
        correct: 1,
        explanation: "Students gain insight into professional standards, workplace expectations, and industry culture."
    },
    {
        id: 31,
        question: "Which type of feedback is most valuable during Work Immersion?",
        options: [
            "Academic grades from tests",
            "Constructive feedback on workplace performance",
            "Peer evaluation from classmates",
            "Self-assessment only"
        ],
        correct: 1,
        explanation: "Constructive feedback from workplace supervisors helps students improve their professional skills."
    },
    {
        id: 32,
        question: "Work Immersion contributes to career readiness by:",
        options: [
            "Guaranteeing job placement after graduation",
            "Providing networking opportunities and industry exposure",
            "Replacing the need for college education",
            "Eliminating competition in job markets"
        ],
        correct: 1,
        explanation: "Work Immersion builds professional networks and provides valuable industry insights for career development."
    },
    {
        id: 33,
        question: "Students should handle confidential workplace information by:",
        options: [
            "Sharing it with classmates for discussion",
            "Posting about it on social media",
            "Maintaining strict confidentiality as required",
            "Including it in school presentations"
        ],
        correct: 2,
        explanation: "Professional ethics require maintaining confidentiality of sensitive workplace information."
    },
    {
        id: 34,
        question: "The Work Immersion schedule should:",
        options: [
            "Conflict with regular school hours",
            "Be flexible according to student preferences",
            "Follow the agreed-upon schedule with the partner organization",
            "Be determined solely by parents"
        ],
        correct: 2,
        explanation: "Scheduled commitments with industry partners must be respected and followed consistently."
    },
    {
        id: 35,
        question: "Which attitude is most important for Work Immersion success?",
        options: [
            "Competitive spirit against other students",
            "Willingness to learn and adapt",
            "Desire to challenge workplace rules",
            "Focus on personal entertainment"
        ],
        correct: 1,
        explanation: "A positive learning attitude and adaptability are crucial for maximizing the Work Immersion experience."
    },
    {
        id: 36,
        question: "Work Immersion helps students develop:",
        options: [
            "Academic research skills exclusively",
            "Emotional intelligence and interpersonal skills",
            "Mathematical computation abilities",
            "Foreign language proficiency"
        ],
        correct: 1,
        explanation: "Workplace exposure helps develop emotional intelligence, teamwork, and interpersonal communication skills."
    },
    {
        id: 37,
        question: "The most appropriate response to workplace conflict during Work Immersion is:",
        options: [
            "Immediately leave the workplace",
            "Argue with supervisors or coworkers",
            "Report to school coordinator and seek guidance",
            "Handle it independently without informing anyone"
        ],
        correct: 2,
        explanation: "School coordinators should be informed of workplace conflicts to ensure proper resolution and student support."
    },
    {
        id: 38,
        question: "Work Immersion portfolios are evaluated based on:",
        options: [
            "Quantity of pages only",
            "Quality of reflection and documentation of learning",
            "Artistic design and creativity",
            "Personal opinions about the workplace"
        ],
        correct: 1,
        explanation: "Portfolios demonstrate learning through thoughtful reflection and comprehensive documentation of experiences."
    },
    {
        id: 39,
        question: "Which technology skill is often developed during Work Immersion?",
        options: [
            "Gaming proficiency",
            "Industry-specific software and digital tools",
            "Social media management for personal use",
            "Academic presentation software only"
        ],
        correct: 1,
        explanation: "Students learn to use professional software and digital tools relevant to their chosen industry."
    },
    {
        id: 40,
        question: "The primary benefit of Work Immersion for career decision-making is:",
        options: [
            "Guaranteed job offers",
            "Higher starting salaries",
            "Informed career choices based on real experience",
            "Elimination of need for further education"
        ],
        correct: 2,
        explanation: "Real workplace exposure helps students make informed decisions about their future career paths."
    },
    {
        id: 41,
        question: "Work Immersion students should demonstrate:",
        options: [
            "Complete independence from supervision",
            "Initiative while following workplace guidelines",
            "Casual approach to work responsibilities",
            "Preference for individual work only"
        ],
        correct: 1,
        explanation: "Students should show initiative and proactive engagement while respecting workplace protocols."
    },
    {
        id: 42,
        question: "Which type of learning objective is emphasized in Work Immersion?",
        options: [
            "Memorization of theoretical concepts",
            "Application of knowledge in real-world contexts",
            "Competitive academic achievement",
            "Individual creative expression"
        ],
        correct: 1,
        explanation: "Work Immersion emphasizes practical application of classroom learning in authentic workplace settings."
    },
    {
        id: 43,
        question: "The role of parents/guardians in Work Immersion includes:",
        options: [
            "Daily workplace supervision of their child",
            "Providing consent and support for the program",
            "Determining workplace policies",
            "Evaluating student performance"
        ],
        correct: 1,
        explanation: "Parents provide necessary consent and emotional support while trusting the school-industry partnership."
    },
    {
        id: 44,
        question: "Work Immersion contributes to the development of:",
        options: [
            "Academic competition skills",
            "Global competitiveness and employability",
            "Individual artistic talents",
            "Sports and physical abilities"
        ],
        correct: 1,
        explanation: "The program develops skills that enhance students' competitiveness in the global job market."
    },
    {
        id: 45,
        question: "Which assessment method is commonly used in Work Immersion?",
        options: [
            "Multiple choice examinations",
            "Performance-based assessment and observation",
            "Essay writing competitions",
            "Mathematical problem solving"
        ],
        correct: 1,
        explanation: "Assessment focuses on observing student performance and workplace competency development."
    },
    {
        id: 46,
        question: "The Work Immersion experience should help students:",
        options: [
            "Avoid workplace responsibilities",
            "Understand the value of work and professional ethics",
            "Develop negative attitudes toward employment",
            "Focus solely on personal benefits"
        ],
        correct: 1,
        explanation: "Students develop appreciation for work, professional ethics, and understanding of workplace responsibilities."
    },
    {
        id: 47,
        question: "Industry partners benefit from Work Immersion by:",
        options: [
            "Getting free labor from students",
            "Contributing to youth development and potential talent identification",
            "Reducing their regular workforce",
            "Avoiding corporate social responsibility"
        ],
        correct: 1,
        explanation: "Partners contribute to education while potentially identifying future talent for their organizations."
    },
    {
        id: 48,
        question: "The most important preparation for Work Immersion is:",
        options: [
            "Purchasing expensive equipment",
            "Developing positive attitude and basic workplace skills",
            "Memorizing company history",
            "Learning advanced technical skills independently"
        ],
        correct: 1,
        explanation: "Positive attitude, basic professional skills, and work readiness are fundamental preparations."
    },
    {
        id: 49,
        question: "Work Immersion documentation should include:",
        options: [
            "Personal social activities only",
            "Professional learning experiences and skill development",
            "Criticism of workplace practices",
            "Comparison with other students' experiences"
        ],
        correct: 1,
        explanation: "Documentation focuses on professional learning, skill development, and meaningful workplace experiences."
    },
    {
        id: 50,
        question: "The success of Work Immersion is measured by:",
        options: [
            "Number of work hours completed only",
            "Student's professional growth and skill development",
            "Financial compensation received",
            "Popularity with workplace staff"
        ],
        correct: 1,
        explanation: "Success is measured by meaningful learning, skill development, and professional growth achieved."
    },
    {
        id: 51,
        question: "Which workplace skill is considered most transferable across different industries?",
        options: [
            "Technical equipment operation",
            "Effective communication and teamwork",
            "Industry-specific knowledge",
            "Physical strength and endurance"
        ],
        correct: 1,
        explanation: "Communication and teamwork skills are valuable and applicable across all industries and career paths."
    },
    {
        id: 52,
        question: "Work Immersion helps students understand the importance of:",
        options: [
            "Academic grades only",
            "Punctuality, reliability, and professional behavior",
            "Personal social media presence",
            "Individual achievement over teamwork"
        ],
        correct: 1,
        explanation: "Students learn the importance of professional behaviors that are essential for workplace success."
    },
    {
        id: 53,
        question: "The long-term impact of Work Immersion on students includes:",
        options: [
            "Guaranteed career success",
            "Better preparation for future educational and career choices",
            "Immediate job placement",
            "Higher academic grades in all subjects"
        ],
        correct: 1,
        explanation: "Work Immersion provides valuable experience that helps students make informed future decisions."
    },
    {
        id: 54,
        question: "Which aspect of Work Immersion contributes most to personal development?",
        options: [
            "Earning academic credits",
            "Building self-confidence and professional identity",
            "Completing required documentation",
            "Meeting new people casually"
        ],
        correct: 1,
        explanation: "The experience builds self-confidence, professional identity, and personal maturity through real-world exposure."
    }
];

// Export the questions for use in the quiz system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = workImmersionQuestions;
}
