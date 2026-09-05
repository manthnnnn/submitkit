const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

function generateProblemStatement(title, description, category) {
  return `${description}\n\n**Why is this project unique?**\n• It automates boring, manual workflows and saves massive amounts of time.\n• It is built with industry-standard tools so it is very easy to defend in a Viva evaluation.\n• It provides a modern, clean interface that anyone can understand immediately.`;
}

function generateArchitectureDetails(tech_stack) {
  const stackStr = tech_stack.join(', ');
  return `How does it work under the hood?\n\nThis project is built with a highly reliable, industry-standard tech stack: ${stackStr}.\n\nThe Workflow:\n1. User Input: The user interacts with a clean, responsive frontend interface.\n2. Processing: The backend securely processes the data and runs the core algorithms.\n3. Storage & Output: Results are saved to the database and instantly displayed back to the user.\n\nBecause it uses standard tools, it is very easy to explain to your professors during a Viva evaluation!`;
}

async function run() {
  const { data: projects, error } = await supabase.from('projects').select('*');
  if (error) {
    console.error('Error fetching projects:', error);
    return;
  }

  console.log(`Generating detailed content for ${projects.length} projects...`);

  for (const p of projects) {
    const problem = generateProblemStatement(p.title, p.description, p.category);
    const arch = generateArchitectureDetails(p.tech_stack);

    const { error: updateError } = await supabase
      .from('projects')
      .update({ problem_statement: problem, architecture_details: arch })
      .eq('slug', p.slug);

    if (updateError) {
      console.error(`Failed to update ${p.slug}:`, updateError);
    }
  }

  console.log('Successfully generated and injected detailed project information for all projects!');
}

run();
