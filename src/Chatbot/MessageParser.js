class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

parse(message) {
    const lowerCaseMessage = message
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .trim();
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi") || lowerCaseMessage.includes("what's up") || lowerCaseMessage.includes("hey") || lowerCaseMessage.includes("hola") || lowerCaseMessage.includes("howdy") || lowerCaseMessage.includes("greetings") || lowerCaseMessage.includes("good morning") || lowerCaseMessage.includes("good afternoon") || lowerCaseMessage.includes("good evening") || lowerCaseMessage.includes("good day") || lowerCaseMessage.includes("good night") ) {
      this.actionProvider.greet();
    } else if (lowerCaseMessage.includes("how are you" || "how are you doing" || "how are you today" || "how are you feeling")) {
      this.actionProvider.askHowAreYou();
    } else if (lowerCaseMessage.includes("course" || "courses" || "learning path" || "learning paths" || "learning" || "paths")) {
      this.actionProvider.suggestCourse();
    } else if (lowerCaseMessage.includes("learning path")) {
      this.actionProvider.showLearningPaths();
    } else if (lowerCaseMessage.includes("faq")) {
      this.actionProvider.showFAQs();
    } else if (
      lowerCaseMessage.includes("login") ||
      lowerCaseMessage.includes("authenticate")
    ) {
      this.actionProvider.authenticateUser();
    } else if (lowerCaseMessage.includes("business")) {
      // Provide the response about business development
      this.actionProvider.addMessageToBotState(
        this.actionProvider.createChatBotMessage(
          "The Business Development track refers to a career path or a set of activities within an organization that focuses on creating growth opportunities, building strategic partnerships, and expanding the business. It involves identifying and pursuing new business opportunities, developing strategies to drive growth, and fostering relationships with clients, customers, and partners.\n\nIndividuals on the Business Development track typically engage in various tasks, including:\n\n1. Market Research: Analyzing market trends, customer needs, and competitors to identify potential opportunities for growth.\n2. Lead Generation: Finding and qualifying potential leads or opportunities for partnerships, collaborations, or sales.\n3. Strategic Planning: Developing plans and strategies to enter new markets, launch new products, or expand existing services.\n4. Partnerships and Alliances: Forming strategic alliances, partnerships, or collaborations with other companies or organizations to drive mutual growth.\n5. Negotiation and Deal Making: Negotiating contracts, agreements, and deals with clients, vendors, or partners to facilitate business growth.\n6. Relationship Management: Building and maintaining relationships with clients, customers, stakeholders, and other key players in the industry.\n7. Sales Support: Collaborating with the sales team to facilitate the sales process and achieve business objectives.\n8. Metrics and Analysis: Monitoring key performance indicators (KPIs) and analyzing data to assess the effectiveness of business development strategies and initiatives.\n\nA career in Business Development often requires strong communication, negotiation, analytical, and strategic thinking skills. Professionals in this track may work across various industries and sectors, from technology and finance to healthcare and beyond. The primary goal is to drive sustainable growth and create value for the organization through strategic initiatives and partnerships."
        )
      );
    } 
    
    
    else if (lowerCaseMessage.includes("marketing")) {
      // Provide the response about business development
      this.actionProvider.addMessageToBotState(
        this.actionProvider.createChatBotMessage(
          "The digital marketing track involves leveraging online channels, strategies, and tools to promote products, services, or brands. It encompasses a wide range of activities aimed at reaching and engaging target audiences through digital mediums such as the internet, social media, search engines, email, mobile apps, and other digital platforms. The primary objective of digital marketing is to drive brand awareness, lead generation, customer acquisition, and ultimately, sales or conversions."
        )
      );
    }
    else if (lowerCaseMessage.includes("macro")) {
      // Provide the response about business development
      this.actionProvider.addMessageToBotState(
        this.actionProvider.createChatBotMessage(
          "Studying macroeconomics offers valuable insights into the fundamental building blocks of economic systems, focusing on individual decision-making by consumers, firms, and workers. Beyond theoretical concepts, the course provides practical applications for everyday life, aiding individuals in making informed financial decisions. For those interested in business, microeconomics is indispensable, shedding light on how firms navigate production choices and pricing strategies. Additionally, a grasp of microeconomic principles is essential for policy analysis, enabling individuals to evaluate the impact of economic policies on specific industries and markets. The subject explores the critical notion of resource allocation, addressing the challenge of efficiently distributing scarce resources. By delving into market behavior, microeconomics illuminates the dynamics of supply and demand, equilibrium, and the consequences of interventions like taxes or subsidies. Moreover, the discipline nurtures critical thinking skills through the analysis of economic problems and consideration of unintended outcomes. As a foundational course, microeconomics serves as a gateway for those planning advanced studies in economics or business. Its applicability spans various scales, from individual households to global markets, providing a comprehensive understanding of economic dynamics. Ultimately, a microeconomics course equips individuals with the knowledge and skills necessary for informed citizenship, enabling them to critically assess economic policies and actively participate in societal discussions."
        )
      );
    }
    else if (lowerCaseMessage.includes("management")) {
      // Provide the response about business development
      this.actionProvider.addMessageToBotState(
        this.actionProvider.createChatBotMessage(
          `
          Management is a multifaceted discipline encompassing the planning, organizing, directing, and controlling of resources to achieve organizational goals effectively and efficiently. It involves coordinating human, financial, and technological resources within an organization to optimize performance. Key components of management include strategic planning, where long-term goals are established, organizational structure design to facilitate efficient workflow, leadership to inspire and guide teams, and decision-making to address challenges and opportunities. Effective managers must possess strong communication skills, adaptability, and a strategic mindset. The field of management also incorporates areas such as human resource management, operations management, and project management, each focusing on specific aspects of organizational functioning. In essence, management plays a pivotal role in ensuring the coordinated efforts of individuals and departments to drive an organization toward success in a dynamic and competitive environment.`
        )
      );
    }
    else if (lowerCaseMessage.includes("micro")) {
      // Provide the response about business development
      this.actionProvider.addMessageToBotState(
        this.actionProvider.createChatBotMessage(
          `
          
Studying microeconomics offers valuable insights into the fundamental building blocks of economic systems, focusing on individual decision-making by consumers, firms, and workers. Beyond theoretical concepts, the course provides practical applications for everyday life, aiding individuals in making informed financial decisions. For those interested in business, microeconomics is indispensable, shedding light on how firms navigate production choices and pricing strategies. Additionally, a grasp of microeconomic principles is essential for policy analysis, enabling individuals to evaluate the impact of economic policies on specific industries and markets. The subject explores the critical notion of resource allocation, addressing the challenge of efficiently distributing scarce resources. By delving into market behavior, microeconomics illuminates the dynamics of supply and demand, equilibrium, and the consequences of interventions like taxes or subsidies. Moreover, the discipline nurtures critical thinking skills through the analysis of economic problems and consideration of unintended outcomes. As a foundational course, microeconomics serves as a gateway for those planning advanced studies in economics or business. Its applicability spans various scales, from individual households to global markets, providing a comprehensive understanding of economic dynamics. Ultimately, a microeconomics course equips individuals with the knowledge and skills necessary for informed citizenship, enabling them to critically assess economic policies and actively participate in societal discussions.
          `
        )
      );
    }
    
    else if (lowerCaseMessage.includes("design")) {
      // Provide the response about business development
      this.actionProvider.addMessageToBotState(
        this.actionProvider.createChatBotMessage(
          `
        UI-UX design refers to the combination of two critical elements in creating digital products or experiences: User Interface (UI) design and User Experience (UX) design.
1. *User Interface (UI) Design:* UI design focuses on the look and feel, layout, and interactivity of a product's interface, such as websites, mobile apps, or software. It deals with the visual aspects that users interact with when they access a digital product. UI designers aim to create visually appealing, aesthetically pleasing, and user-friendly interfaces. They work on elements like buttons, icons, typography, color schemes, and overall design elements to ensure the interface is intuitive and easy to navigate.
2. *User Experience (UX) Design:* UX design concentrates on the overall experience and satisfaction of users when interacting with a product. It involves understanding user behaviors, needs, motivations, and pain points to design a seamless and enjoyable experience. UX designers conduct user research, create user personas, develop wireframes and prototypes, and perform usability testing to ensure that the product meets user needs effectively and efficiently. They focus on enhancing usability, accessibility, and the overall satisfaction users derive from the product.
In summary, UI-UX design combines the visual and interactive elements (UI) with the overall user experience (UX) to create digital products that are not only visually appealing but also intuitive, user-friendly, and capable of meeting user needs effectively. Both UI and UX design are crucial components in creating successful and user-centered digital experiences.
        `
        )
      );
    } else if (lowerCaseMessage.includes("web")) {
      // Provide the response about business development
      this.actionProvider.addMessageToBotState(
        this.actionProvider.createChatBotMessage(
          `
          The web development track refers to the specialized field within software development that focuses on building websites, web applications, and web services. It involves the creation, maintenance, and optimization of websites and web-based software to meet specific business or user requirements. Web development encompasses various disciplines and technologies to create functional, visually appealing, and user-friendly web experiences.

          Key components of the web development track include:
          
          1. *Front-End Development:* Front-end developers focus on the client-side of web development, dealing with the visible elements that users interact with directly on web browsers. This involves writing code in languages such as HTML (Hypertext Markup Language), CSS (Cascading Style Sheets), and JavaScript. They work on creating responsive layouts, designing user interfaces, implementing interactive features, and ensuring cross-browser compatibility.
          
          2. *Back-End Development:* Back-end developers handle the server-side of web development, working behind the scenes to create the logic, databases, and server configurations necessary to power the front-end. They use server-side languages and frameworks like Python, Ruby, PHP, Node.js, and others. Back-end developers manage data storage, user authentication, server operations, and application logic to ensure the functionality and performance of web applications.
          
          3. *Full-Stack Development:* Full-stack developers are proficient in both front-end and back-end development, allowing them to work on all aspects of web application development. They have a comprehensive understanding of the entire web development process, from server-side scripting and database management to client-side scripting and user interface design.
In summary, UI-UX design combines the visual and interactive elements (UI) with the overall user experience (UX) to create digital products that are not only visually appealing but also intuitive, user-friendly, and capable of meeting user needs effectively. Both UI and UX design are crucial components in creating successful and user-centered digital experiences.
        `
        )
      );
    } else if (lowerCaseMessage.includes("video")) {
      // Provide the response about business development
      this.actionProvider.addMessageToBotState(
        this.actionProvider.createChatBotMessage(
          `
          The video editing track refers to the specialized field within the realm of multimedia production that involves manipulating and rearranging video footage to create a cohesive and engaging visual story. Video editing encompasses various processes, techniques, and software tools to transform raw footage into a polished and professional video product.

          Key components of the video editing track include:
          
          1. *Footage Selection and Organization:* Video editors begin by reviewing and selecting the best footage from the raw material captured during filming or recording. They organize the selected clips to create a structured timeline for editing.
          
          2. *Editing Software Tools:* Editors use specialized software such as Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve, and others to perform editing tasks. These tools allow for timeline-based editing, cutting and trimming footage, adding transitions, effects, text overlays, and audio enhancements.
          
          3. *Storyboarding and Sequencing:* Editors create a visual plan or storyboard outlining the sequence and structure of the video. They arrange clips in a coherent and compelling manner to convey the intended message or story effectively.
          
          4. *Color Correction and Grading:* Video editors adjust colors, contrast, brightness, and saturation to ensure consistency and enhance the visual appeal of the video. This process includes color correction to fix any inconsistencies in footage and color grading to create a specific visual style or mood.
          
          5. *Audio Editing and Mixing:* Sound design plays a crucial role in video editing. Editors synchronize audio tracks, adjust volume levels, add music, sound effects, and ensure overall audio clarity and quality.
          
          6. *Special Effects and Visual Enhancements:* Editors may incorporate special effects, animations, transitions, and visual enhancements to elevate the video's quality and storytelling. This could involve adding CGI (Computer-Generated Imagery) elements, green screen effects, or other visual enhancements.
          
          7. *Rendering and Exporting:* Once the editing process is complete, the video is rendered into its final format suitable for distribution or presentation. Video editors select appropriate settings for resolution, format, and compression to ensure optimal quality and compatibility for different platforms.
          
          Video editing requires creativity, attention to detail, and a good understanding of storytelling and visual communication. Professionals in this track work in various industries such as film, television, advertising, online content creation, and corporate video production, contributing to the creation of compelling visual narratives that resonate with audiences.
        `
        )
      );
    }  else if (lowerCaseMessage.includes("flex")) {
      // Provide the response about business development
      this.actionProvider.addMessageToBotState(
        this.actionProvider.createChatBotMessage(
          `
         flex is a good man
        `
        )
      );
    } else if (lowerCaseMessage.includes("mobile")) {
      // Provide the response about business development
      this.actionProvider.addMessageToBotState(
        this.actionProvider.createChatBotMessage(
          `
          The Mobile Development track refers to a specialized field within software development that focuses on creating applications (apps) specifically designed to operate on mobile devices like smartphones, tablets, wearables, and other portable gadgets. Mobile development involves designing, building, testing, and deploying applications tailored to function seamlessly on various mobile platforms and operating systems, such as iOS (Apple), Android (Google), and sometimes Windows or others.

          Key components of the Mobile Development track include:
          
          1. *Mobile App Development:* This involves creating applications that cater to the unique features, specifications, and user experiences associated with mobile devices. Developers can choose from various approaches like native app development (targeting a single platform using platform-specific languages and tools), cross-platform development (using frameworks that allow apps to work on multiple platforms), and hybrid app development (combining aspects of native and web applications).
          
          2. *Programming Languages and Tools:* Mobile developers use programming languages and tools specific to the targeted mobile platforms. For instance, languages like Swift or Objective-C for iOS development, Java or Kotlin for Android development, and frameworks like React Native, Flutter, Xamarin, or others for cross-platform development.
          
          3. *User Interface (UI) and User Experience (UX) Design:* Creating intuitive, visually appealing, and user-friendly interfaces optimized for smaller screens and touch-based interactions is crucial. UI/UX designers collaborate with developers to ensure the app delivers an excellent user experience.
          
          4. *API Integration:* Mobile apps often rely on integrating with external services or APIs (Application Programming Interfaces) for functionalities like data retrieval, social media logins, payment processing, geolocation, and more.
          
          5. *Testing and Quality Assurance:* Thorough testing, debugging, and quality assurance are essential to ensure the app's functionality, performance, security, and compatibility across various devices and OS versions.
          
          6. *Deployment and Maintenance:* Deploying the app on app stores (such as Apple's App Store or Google Play Store) and continual maintenance, updates, and enhancements based on user feedback and technological advancements are ongoing aspects of mobile development.
          
          Mobile development is a rapidly evolving field influenced by changing technology and user preferences. Professionals in this track need to stay updated with the latest trends, tools, and best practices to create successful and competitive mobile applications that meet the demands of today's mobile-centric world.s
        `
        )
      );
    } else {
      this.actionProvider.defaultResponse();
    }
  }
}

export default MessageParser;
