# VulnGPT 🛡️

VulnGPT is an AI-powered code security analyzer that helps developers identify and fix security vulnerabilities in their code. Built with Next.js and OpenAI's GPT models, it provides detailed analysis and remediation recommendations for potential security issues.

## Features

- 🔍 Real-time code analysis
- 🚨 Detailed vulnerability explanations
- ⚡️ Line-specific issue identification
- 📝 Actionable remediation steps
- 🎨 Modern, responsive UI

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vulngpt.git
cd vulngpt
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your-api-key-here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Paste your code into the text area
2. Click "Analyze Code"
3. Review the detailed security analysis
4. Implement the suggested fixes

## Technologies Used

- Next.js 13+
- OpenAI GPT
- TailwindCSS
- TypeScript

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
