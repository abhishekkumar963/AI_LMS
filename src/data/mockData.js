// Mock courses data
export const mockCourses = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    description: "Learn the fundamentals of machine learning algorithms and their applications in real-world scenarios.",
    teacher: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
    modules: [
      "Introduction to ML",
      "Supervised Learning",
      "Unsupervised Learning",
      "Neural Networks",
      "Deep Learning Basics"
    ],
    progress: 65
  },
  {
    id: 2,
    title: "Web Development Fundamentals",
    description: "Master HTML, CSS, and JavaScript to build modern, responsive web applications.",
    teacher: "Prof. Michael Chen",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
    modules: [
      "HTML Basics",
      "CSS Styling",
      "JavaScript Fundamentals",
      "React.js Introduction",
      "API Integration"
    ],
    progress: 40
  },
  {
    id: 3,
    title: "Data Structures and Algorithms",
    description: "Explore essential data structures and algorithms to solve complex programming problems.",
    teacher: "Dr. Emily Rodriguez",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    modules: [
      "Arrays and Linked Lists",
      "Stacks and Queues",
      "Trees and Graphs",
      "Sorting Algorithms",
      "Dynamic Programming"
    ],
    progress: 80
  },
  {
    id: 4,
    title: "Database Management Systems",
    description: "Learn SQL, database design, and management of relational and NoSQL databases.",
    teacher: "Prof. James Wilson",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
    modules: [
      "SQL Fundamentals",
      "Database Design",
      "Normalization",
      "Query Optimization",
      "NoSQL Databases"
    ],
    progress: 30
  },
  {
    id: 5,
    title: "Cloud Computing Essentials",
    description: "Understand cloud services, AWS, Azure, and deployment strategies for modern applications.",
    teacher: "Dr. Lisa Anderson",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    modules: [
      "Cloud Basics",
      "AWS Services",
      "Azure Fundamentals",
      "Containerization",
      "DevOps Practices"
    ],
    progress: 50
  },
  {
    id: 6,
    title: "Cybersecurity Fundamentals",
    description: "Learn about network security, encryption, and protecting systems from cyber threats.",
    teacher: "Prof. Robert Taylor",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=250&fit=crop",
    modules: [
      "Network Security",
      "Cryptography",
      "Ethical Hacking",
      "Security Protocols",
      "Incident Response"
    ],
    progress: 20
  }
];

// Mock AI response generator
export const mockAIResponse = (prompt, type = "study") => {
  const responses = {
    study: `Here are AI-generated study notes for "${prompt}":

**Key Concepts:**
1. **Introduction**: ${prompt} is a fundamental concept that forms the foundation of modern technology. Understanding this topic requires a comprehensive approach.

2. **Main Principles**: 
   - Core principle one: This involves understanding the basic mechanisms and how they interact with each other.
   - Core principle two: Advanced applications require deep knowledge of underlying systems.
   - Core principle three: Practical implementation involves following best practices and industry standards.

3. **Examples and Applications**:
   - Real-world application 1: Many companies use this in production environments.
   - Real-world application 2: Educational institutions incorporate this into their curriculum.
   - Real-world application 3: Research institutions explore advanced variations.

4. **Key Takeaways**:
   - Important point 1: Always consider the context when applying these concepts.
   - Important point 2: Practice is essential for mastery.
   - Important point 3: Stay updated with the latest developments in the field.

**Additional Resources:**
- Recommended reading materials
- Online tutorials and documentation
- Practice exercises and projects

These notes were generated using AI to help you understand ${prompt} more effectively.`,

    quiz: [
      {
        question: `What is the primary purpose of ${prompt}?`,
        options: [
          "To solve complex problems efficiently",
          "To simplify existing processes",
          "To enhance system performance",
          "All of the above"
        ],
        correct: 3
      },
      {
        question: `Which of the following is NOT a key component of ${prompt}?`,
        options: [
          "Core functionality",
          "Implementation details",
          "Unrelated technology",
          "Best practices"
        ],
        correct: 2
      },
      {
        question: `How does ${prompt} impact modern technology?`,
        options: [
          "Minimal impact",
          "Significant positive impact",
          "Negative impact",
          "No impact at all"
        ],
        correct: 1
      },
      {
        question: `What skills are essential for mastering ${prompt}?`,
        options: [
          "Basic understanding only",
          "Advanced technical skills",
          "Theoretical knowledge",
          "Practical experience and understanding"
        ],
        correct: 3
      },
      {
        question: `In which industries is ${prompt} commonly used?`,
        options: [
          "Technology only",
          "Healthcare and Finance",
          "Multiple industries",
          "Education only"
        ],
        correct: 2
      }
    ],

    flashcards: [
      {
        front: `What is ${prompt}?`,
        back: `${prompt} is a fundamental concept that involves understanding core principles, applications, and best practices in the field. It plays a crucial role in modern technology and is widely used across various industries.`
      },
      {
        front: `Why is ${prompt} important?`,
        back: `${prompt} is important because it provides a structured approach to solving complex problems, enables efficient system design, and supports innovation in technology development.`
      },
      {
        front: `How does ${prompt} work?`,
        back: `${prompt} works by implementing core principles, following established methodologies, and utilizing best practices to achieve desired outcomes. It involves systematic processes and careful planning.`
      },
      {
        front: `What are the main applications of ${prompt}?`,
        back: `The main applications of ${prompt} include system development, problem-solving, process optimization, and technological innovation across various domains such as software, hardware, and services.`
      }
    ]
  };

  return responses[type] || responses.study;
};

// Mock chatbot responses
export const mockChatbotResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes("help") || lowerMessage.includes("how")) {
    return "I'm here to help! I can assist you with generating study materials, creating quizzes, making flashcards, and answering questions about your courses. What would you like to know?";
  }
  
  if (lowerMessage.includes("course") || lowerMessage.includes("learn")) {
    return "Great question! Our platform offers various courses on topics like Machine Learning, Web Development, Data Structures, and more. You can browse all available courses on the Courses page. Would you like me to recommend a course for you?";
  }
  
  if (lowerMessage.includes("quiz") || lowerMessage.includes("test")) {
    return "I can help you create AI-generated quizzes! Simply go to the AI Tools page or visit any course detail page and click on 'Start Quiz'. I'll generate multiple-choice questions based on your topic.";
  }
  
  if (lowerMessage.includes("flashcard") || lowerMessage.includes("card")) {
    return "Flashcards are a great way to study! I can generate interactive flashcards for any topic. Visit the AI Tools page or Course Detail page and click 'Create Flashcards' to get started.";
  }
  
  if (lowerMessage.includes("study") || lowerMessage.includes("material")) {
    return "I can generate comprehensive study materials for any topic! Just enter your topic in the Study Material Generator on the AI Tools page, and I'll create detailed notes to help you learn.";
  }
  
  return "That's an interesting question! I'm an AI assistant designed to help you with your learning journey. I can generate study materials, create quizzes, make flashcards, and answer questions about courses. How can I assist you today?";
};

