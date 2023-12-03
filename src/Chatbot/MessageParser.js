class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hello')) {
      this.actionProvider.greet();
    } else if (lowerCaseMessage.includes('how are you')) {
      this.actionProvider.askHowAreYou();
    } else if (lowerCaseMessage.includes('course')) {
      this.actionProvider.suggestCourse();
    } else if (lowerCaseMessage.includes('learning path')) {
      this.actionProvider.showLearningPaths();
    } else if (lowerCaseMessage.includes('faq')) {
      this.actionProvider.showFAQs();
    } else if (lowerCaseMessage.includes('login') || lowerCaseMessage.includes('authenticate')) {
      this.actionProvider.authenticateUser();
    } else {
      this.actionProvider.defaultResponse();
    }
  }
}

export default MessageParser;
