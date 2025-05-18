import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function POST(request: NextRequest) {
  console.log('Received request to /api/analyze');
  
  try {
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204,
        headers: corsHeaders
      });
    }

    const { code } = await request.json().catch(error => {
      console.error('Failed to parse request JSON:', error);
      throw new Error('Invalid JSON in request body');
    });

    if (!code) {
      return NextResponse.json(
        { error: 'No code provided' },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log('Analyzing code with OpenAI...');
    console.log('API Key:', process.env.OPENAI_API_KEY?.substring(0, 10) + '...');
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a security expert analyzing code for vulnerabilities. For each vulnerability found:
1. Specify the line numbers where the vulnerability exists
2. Explain why it's a vulnerability (with severity level: HIGH/MEDIUM/LOW)
3. Show the vulnerable code snippet
4. Provide specific remediation steps with secure code examples

Format your response in markdown with the following structure for each issue:

### 🚨 Vulnerability #1: [Name]
**Location**: Lines X-Y
**Severity**: [HIGH/MEDIUM/LOW]

**Vulnerable Code**:
\`\`\`javascript
[exact vulnerable code snippet]
\`\`\`

**Description**:
[Clear explanation of why this is vulnerable]

**Remediation**:
\`\`\`javascript
[secure code example]
\`\`\`

---`
        },
        {
          role: "user",
          content: code
        }
      ],
      temperature: 0.5,
      max_tokens: 2000
    });

    if (!completion.choices[0]?.message?.content) {
      throw new Error('No response from OpenAI');
    }

    return NextResponse.json({
      analysis: completion.choices[0].message.content
    }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    
    return NextResponse.json(
      { 
        error: 'Error analyzing code',
        details: error.message 
      },
      { status: 500, headers: corsHeaders }
    );
  }
} 