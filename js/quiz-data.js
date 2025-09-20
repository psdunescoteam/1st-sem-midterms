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

// General Chemistry Quiz Data - 54 Questions
const generalChemistryQuestions = [
    {
        id: 1,
        question: "According to the provided reviewer, what is the smallest unit of matter that retains the identity and properties of an element?",
        options: [
            "Molecule",
            "Atom",
            "Ion",
            "Subatomic Particle"
        ],
        correct: 1,
        explanation: "The reviewer defines an Atom as the 'smallest unit of matter' that 'retains the identity and properties of an element'."
    },
    {
        id: 2,
        question: "In the Isotopic Symbol <sup>A</sup><sub>Z</sub>X, what does the letter 'A' represent?",
        options: [
            "Atomic Number (#protons)",
            "Atomic Symbol",
            "Mass Number (#protons + #neutrons)",
            "Number of Electrons"
        ],
        correct: 2,
        explanation: "In the Isotopic Symbol, 'A' is the Mass number, which is the sum of protons and neutrons."
    },
    {
        id: 3,
        question: "Which type of subatomic particle has a relative charge of +1?",
        options: [
            "Electron",
            "Neutron",
            "Proton",
            "Ion"
        ],
        correct: 2,
        explanation: "Based on the table of subatomic particles, a proton has a relative charge of +1."
    },
    {
        id: 4,
        question: "What happens when an atom loses an electron?",
        options: [
            "It becomes a negatively charged anion.",
            "It becomes a neutrally charged atom.",
            "It becomes a positively charged cation.",
            "It becomes a molecule."
        ],
        correct: 2,
        explanation: "The reviewer states that a Cation is 'positively charged, formed when a metal loses an electron'."
    },
    {
        id: 5,
        question: "What is a group of two or more atoms that are chemically bonded called?",
        options: [
            "Ion",
            "Compound",
            "Molecule",
            "Nucleus"
        ],
        correct: 2,
        explanation: "A Molecule is defined as 'A group of two or more atoms that are chemically bonded'."
    },
    {
        id: 6,
        question: "Which of the following is NOT one of the classifications of elements mentioned in the reviewer?",
        options: [
            "Metals",
            "Nonmetals",
            "Gases",
            "Metalloids"
        ],
        correct: 2,
        explanation: "The reviewer lists three classifications of elements: Metals, Nonmetals, and Metalloids. Gases is not a primary classification."
    },
    {
        id: 7,
        question: "What determines the atomic element of an atom?",
        options: [
            "The number of neutrons",
            "The number of electrons",
            "The mass number",
            "The number of protons"
        ],
        correct: 3,
        explanation: "The reviewer explicitly states that 'Protons determine the atomic element'."
    },
    {
        id: 8,
        question: "How many elements are on the periodic table according to the reviewer?",
        options: [
            "100",
            "118",
            "92",
            "120"
        ],
        correct: 1,
        explanation: "The reviewer states there are '118 Elements' on the periodic table."
    },
    {
        id: 9,
        question: "What is the relative mass (in amu) of a neutron?",
        options: [
            "0",
            "-1",
            "1",
            "+1"
        ],
        correct: 2,
        explanation: "Based on the subatomic particles table, a neutron has a relative mass of 1 amu."
    },
    {
        id: 10,
        question: "How is a Cation formed?",
        options: [
            "When a nonmetal gains an electron.",
            "When a metal loses an electron.",
            "When an atom gains a proton.",
            "When an atom loses a neutron."
        ],
        correct: 1,
        explanation: "A Cation is a positively charged ion formed when a metal loses an electron."
    },
    {
        id: 11,
        question: "Which side of the periodic table do nonmetals primarily reside?",
        options: [
            "Left side",
            "Middle side",
            "Right side",
            "Bottom section"
        ],
        correct: 2,
        explanation: "Nonmetals are found on the 'Right Side and Hydrogen' of the periodic table."
    },
    {
        id: 12,
        question: "What is the charge of an electron?",
        options: [
            "+1",
            "-1",
            "0",
            "Varies"
        ],
        correct: 1,
        explanation: "The table of subatomic particles shows that the electron has a relative charge of -1."
    },
    {
        id: 13,
        question: "What is the relationship between the number of protons and electrons in a neutrally charged atom?",
        options: [
            "Protons are greater than electrons.",
            "Protons are less than electrons.",
            "Protons are equal to electrons.",
            "There is no relationship."
        ],
        correct: 2,
        explanation: "For a neutrally charged atom, the number of protons equals the number of electrons."
    },
    {
        id: 14,
        question: "What are the components of the nucleus of an atom?",
        options: [
            "Protons and electrons",
            "Protons and neutrons",
            "Electrons and neutrons",
            "Only protons"
        ],
        correct: 1,
        explanation: "The reviewer states that the nucleus, or 'Nucleons', consists of 'protons and neutrons'."
    },
    {
        id: 15,
        question: "Which of the following is a sign of a chemical reaction?",
        options: [
            "Boiling of water",
            "Production of heat or light",
            "Condensation",
            "Evaporation"
        ],
        correct: 1,
        explanation: "The reviewer lists 'Production of heat or light' as a sign of a chemical reaction."
    },
    {
        id: 16,
        question: "Which type of chemical reaction is represented by the general equation A + B → AB?",
        options: [
            "Decomposition",
            "Synthesis",
            "Single Replacement",
            "Double Replacement"
        ],
        correct: 1,
        explanation: "The reviewer defines Synthesis or Combination reactions as 'Two or more reactants combine to form a single product', with the general equation A + B → AB."
    },
    {
        id: 17,
        question: "In a Synthesis or Combination reaction, what happens to the reactants?",
        options: [
            "One reactant breaks down.",
            "Two or more reactants combine to form one product.",
            "An element replaces another element.",
            "Ionic compounds exchange cations and anions."
        ],
        correct: 1,
        explanation: "The definition for a Synthesis reaction is that 'Two or more reactants combine to form a single product'."
    },
    {
        id: 18,
        question: "The name for the alkane C₂H₆ is what?",
        options: [
            "Methane",
            "Butane",
            "Ethane",
            "Propane"
        ],
        correct: 2,
        explanation: "Based on the table of alkanes, C₂H₆ corresponds to the name 'Ethane'."
    },
    {
        id: 19,
        question: "What is the general equation for an Analysis or Decomposition reaction?",
        options: [
            "A + B → AB",
            "AB → A + B",
            "A + BC → AC + B",
            "AB + CD → AD + CB"
        ],
        correct: 1,
        explanation: "An Analysis or Decomposition reaction is where 'One reactant breaks to form two or more products', with the general equation AB → A + B."
    },
    {
        id: 20,
        question: "What is the name for the alkane with the chemical formula C₄H₁₀?",
        options: [
            "Propane",
            "Pentane",
            "Butane",
            "Hexane"
        ],
        correct: 2,
        explanation: "From the list of alkanes, C₄H₁₀ is named 'Butane'."
    },
    {
        id: 21,
        question: "In a Substitution or Single Replacement reaction, what is the role of the more active element?",
        options: [
            "It breaks down into two or more elements.",
            "It combines with a less active element.",
            "It replaces the less active element in a compound.",
            "It exchanges cations and anions with another element."
        ],
        correct: 2,
        explanation: "A Substitution reaction is where 'A more active element replaces the less active element in a compound'."
    },
    {
        id: 22,
        question: "What is the general equation for a Metathesis or Double Replacement Reaction?",
        options: [
            "A + B → AB",
            "AB → A + B",
            "A + BC → AC + B",
            "AB + CD → AD + CB"
        ],
        correct: 3,
        explanation: "The reviewer shows that the general equation for a Metathesis reaction is AB + CD → AD + CB."
    },
    {
        id: 23,
        question: "What is the chemical name for the alkane with one carbon atom?",
        options: [
            "Ethane",
            "Methane",
            "Propane",
            "Butane"
        ],
        correct: 1,
        explanation: "The alkane list shows that 'Methane' has 1 carbon atom, with the formula CH₄."
    },
    {
        id: 24,
        question: "What is the name of the alkane with the chemical formula C₈H₁₈?",
        options: [
            "Heptane",
            "Nonane",
            "Octane",
            "Decane"
        ],
        correct: 2,
        explanation: "Based on the alkane table, C₈H₁₈ is 'Octane'."
    },
    {
        id: 25,
        question: "What must be done to balance a chemical equation?",
        options: [
            "Make the number of reactants and products different.",
            "Ensure the amount of reactants is equal to the amount of products.",
            "Add more elements to the products side.",
            "Remove elements from the reactants side."
        ],
        correct: 1,
        explanation: "The reviewer advises that 'When balancing chemical equations, make sure that the reactant amount is equal to the product amount'."
    },
    {
        id: 26,
        question: "Which of the following is a sign of a chemical reaction?",
        options: [
            "Change in volume",
            "Change in temperature",
            "Boiling of water",
            "Sublimation"
        ],
        correct: 1,
        explanation: "The reviewer lists 'Change in temperature' as a sign of a chemical reaction."
    },
    {
        id: 27,
        question: "What is the chemical formula for Propane?",
        options: [
            "C₂H₆",
            "C₃H₈",
            "C₄H₁₀",
            "CH₄"
        ],
        correct: 1,
        explanation: "The alkane table lists 'Propane' with the chemical formula C₃H₈."
    },
    {
        id: 28,
        question: "Which of the following describes the Metathesis or Double Replacement reaction?",
        options: [
            "Two or more reactants combine.",
            "One reactant breaks down.",
            "An element replaces another in a compound.",
            "Two ionic compounds exchange cations and anions."
        ],
        correct: 3,
        explanation: "A Metathesis reaction is defined as 'Two ionic compounds exchange cations and anions with each other'."
    },
    {
        id: 29,
        question: "Which classification of elements is found in a 'Zigzag Formation' on the right side of the periodic table?",
        options: [
            "Metals",
            "Nonmetals",
            "Metalloids",
            "Noble Gases"
        ],
        correct: 2,
        explanation: "Metalloids are found on the 'Right Side' in a 'Zigzag Formation'."
    },
    {
        id: 30,
        question: "What is the name for the alkane with the chemical formula C₇H₁₆?",
        options: [
            "Heptane",
            "Hexane",
            "Octane",
            "Nonane"
        ],
        correct: 0,
        explanation: "From the provided list, C₇H₁₆ is named 'Heptane'."
    },
    {
        id: 31,
        question: "How are ions formed?",
        options: [
            "When an atom gains or loses a proton.",
            "When an atom gains or loses a neutron.",
            "When an atom gains or loses an electron.",
            "When an atom is combined with another atom."
        ],
        correct: 2,
        explanation: "The reviewer states that an 'Ion' is 'Formed when an atom gains or loses an electron'."
    },
    {
        id: 32,
        question: "The total number of protons and neutrons in an atom is its:",
        options: [
            "Atomic Number",
            "Atomic Symbol",
            "Mass Number",
            "Atomic Charge"
        ],
        correct: 2,
        explanation: "The Mass Number is the sum of the number of protons and neutrons."
    },
    {
        id: 33,
        question: "Which type of chemical reaction is characterized by a single reactant breaking down into two or more products?",
        options: [
            "Synthesis",
            "Decomposition",
            "Substitution",
            "Metathesis"
        ],
        correct: 1,
        explanation: "Analysis or Decomposition reactions involve 'One reactant break[ing] to form two or more products'."
    },
    {
        id: 34,
        question: "What are the particles in the nucleus of an atom called?",
        options: [
            "Electrons",
            "Isotopes",
            "Nucleons",
            "Cations"
        ],
        correct: 2,
        explanation: "The center of the atom, which consists of protons and neutrons, is called 'Nucleons'."
    },
    {
        id: 35,
        question: "What is a sign of a chemical reaction?",
        options: [
            "Change in odor",
            "Change in density",
            "Change in color of the container",
            "Change in mass"
        ],
        correct: 0,
        explanation: "The reviewer lists 'Change in odor' as a sign of a chemical reaction."
    },
    {
        id: 36,
        question: "Which of the following is an example of a Synthesis or Combination reaction?",
        options: [
            "CaCO₃ → CaO + CO₂",
            "2Na + 2H₂O → 2NaOH + H₂",
            "H₂ + Cl₂ → 2HCl",
            "AgNO₃ + NaCl → AgCl + NaNO₃"
        ],
        correct: 2,
        explanation: "The reaction H₂ + Cl₂ → 2HCl shows two reactants combining to form a single product, which is a Synthesis reaction."
    },
    {
        id: 37,
        question: "Which type of chemical reaction is a displacement reaction?",
        options: [
            "Metathesis or Double Replacement Reaction",
            "Synthesis or Combination Reaction",
            "Analysis or Decomposition Reaction",
            "Substitution or Single Replacement Reaction"
        ],
        correct: 3,
        explanation: "A Substitution reaction is also known as a 'Displacement Reaction'."
    },
    {
        id: 38,
        question: "What is the relative mass of a proton in amu?",
        options: [
            "0",
            "1",
            "2",
            "-1"
        ],
        correct: 1,
        explanation: "Based on the subatomic particles table, a proton has a relative mass of 1 amu."
    },
    {
        id: 39,
        question: "What does a more active element do in a Single Replacement reaction?",
        options: [
            "It is replaced by a less active element.",
            "It replaces the less active element.",
            "It breaks down the compound.",
            "It forms a new compound by combining with a less active element."
        ],
        correct: 1,
        explanation: "In a Substitution or Single Replacement reaction, a more active element replaces the less active element in a compound."
    },
    {
        id: 40,
        question: "What is the name for the alkane with 10 carbon atoms?",
        options: [
            "Nonane",
            "Decane",
            "Undecane",
            "Hexane"
        ],
        correct: 1,
        explanation: "The alkane table indicates that 'Decane' has 10 carbon atoms, with the formula C₁₀H₂₂."
    },
    {
        id: 41,
        question: "What is the symbol for an electron?",
        options: [
            "p+",
            "n^0",
            "e-",
            "A"
        ],
        correct: 2,
        explanation: "The reviewer's table shows the symbol for an electron is 'e-'."
    },
    {
        id: 42,
        question: "In the Isotopic Symbol <sup>A</sup><sub>Z</sub>X, what does the letter 'Z' represent?",
        options: [
            "Mass Number",
            "Atomic Number (#protons)",
            "Symbol of element",
            "Atomic Mass Unit"
        ],
        correct: 1,
        explanation: "The letter 'Z' in the symbol represents the Atomic Number, which is the number of protons."
    },
    {
        id: 43,
        question: "Which of the following is a sign of a chemical reaction?",
        options: [
            "Production of bubbles",
            "Change in state (liquid to solid)",
            "Production of sound",
            "Production of bubbles and sound"
        ],
        correct: 3,
        explanation: "Both 'Production of bubbles' and 'Production of sound' are listed as signs of a chemical reaction."
    },
    {
        id: 44,
        question: "What is the name for the alkane with the chemical formula C₅H₁₂?",
        options: [
            "Propane",
            "Pentane",
            "Butane",
            "Hexane"
        ],
        correct: 1,
        explanation: "From the list of alkanes, C₅H₁₂ is named 'Pentane'."
    },
    {
        id: 45,
        question: "What does it mean for an atom to be neutrally charged?",
        options: [
            "It has more protons than electrons.",
            "It has more electrons than protons.",
            "The number of protons is equal to the number of electrons.",
            "It has lost all its electrons."
        ],
        correct: 2,
        explanation: "A neutrally charged atom has an equal number of protons and electrons."
    },
    {
        id: 46,
        question: "How do you know what the products and reactants will be for a chemical reaction?",
        options: [
            "You must know each type of chemical reaction does to know its reactants and products.",
            "You can always assume the products will be different elements.",
            "The products are always the same as the reactants.",
            "You must look up the reaction in a textbook."
        ],
        correct: 0,
        explanation: "The reviewer states, 'When predicting, know what each type of chemical reaction does to know its reactants and products'."
    },
    {
        id: 47,
        question: "What is the general equation for a Substitution or Single Replacement reaction?",
        options: [
            "A + B → AB",
            "AB → A + B",
            "A + BC → AC + B",
            "AB + CD → AD + CB"
        ],
        correct: 2,
        explanation: "The general equation for this reaction is A + BC → AC + B."
    },
    {
        id: 48,
        question: "Which subatomic particle has a relative charge of 0?",
        options: [
            "Electron",
            "Proton",
            "Neutron",
            "Ion"
        ],
        correct: 2,
        explanation: "Based on the table, a neutron has a relative charge of 0."
    },
    {
        id: 49,
        question: "Which of the following is a classification of elements on the periodic table?",
        options: [
            "Gases",
            "Liquids",
            "Metals",
            "Solids"
        ],
        correct: 2,
        explanation: "The reviewer explicitly classifies elements as Metals, Nonmetals, and Metalloids."
    },
    {
        id: 50,
        question: "What does it mean for an element to be classified as a metalloid?",
        options: [
            "It is found on the left side of the periodic table.",
            "It has properties of both metals and nonmetals.",
            "It is a gas at room temperature.",
            "It has a negative charge."
        ],
        correct: 1,
        explanation: "Metalloids have properties of both metals and nonmetals, and are found in a zigzag pattern."
    },
    {
        id: 51,
        question: "What is the name for the alkane with the chemical formula C₉H₂₀?",
        options: [
            "Nonane",
            "Octane",
            "Decane",
            "Heptane"
        ],
        correct: 0,
        explanation: "According to the provided list, the alkane with 9 carbon atoms and 20 hydrogen atoms is 'Nonane'."
    },
    {
        id: 52,
        question: "Which of the following describes an Analysis or Decomposition reaction?",
        options: [
            "Two elements combine to form a compound.",
            "A compound breaks down into two or more products.",
            "Two compounds exchange components.",
            "An element replaces another in a compound."
        ],
        correct: 1,
        explanation: "A Decomposition reaction is defined as 'One reactant breaks to form two or more products'."
    },
    {
        id: 53,
        question: "How are Metathesis and Substitution reactions different?",
        options: [
            "Metathesis involves only one reactant, while Substitution involves two.",
            "Metathesis involves the exchange of cations and anions, while Substitution involves one element replacing another.",
            "Metathesis is only for metals, while Substitution is for nonmetals.",
            "They are the same type of reaction."
        ],
        correct: 1,
        explanation: "Metathesis involves the exchange of ions between two compounds (AB + CD → AD + CB), while Substitution involves one element replacing another in a compound (A + BC → AC + B)."
    },
    {
        id: 54,
        question: "Which of the following is an example of a sign of a chemical reaction?",
        options: [
            "Production of mechanical energy",
            "Melting of ice",
            "A physical change in shape",
            "Sublimation of a solid"
        ],
        correct: 0,
        explanation: "The reviewer lists 'Production of mechanical energy' as a sign of a chemical reaction."
    }
];

// Export the questions for use in the quiz system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { workImmersionQuestions, generalChemistryQuestions };
}
