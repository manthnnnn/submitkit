import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import { GraduationCap, ChevronDown, CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';

const VIVA_QUESTIONS = [
  { q: "What is the main objective of this project?", a: "The main objective is to automate and streamline the existing manual process by providing a scalable, secure, and user-friendly digital solution that reduces errors and increases efficiency." },
  { q: "Which Software Development Life Cycle (SDLC) model did you follow and why?", a: "We followed the Agile methodology. It allowed us to iterate quickly, incorporate feedback continuously, and adapt to changing requirements during the development phases." },
  { q: "Explain the architecture of your system.", a: "The system uses a modern client-server architecture. The frontend handles the UI/UX and state management, communicating via REST APIs to a backend server, which then processes business logic and interacts with a relational database." },
  { q: "Why did you choose this specific technology stack?", a: "We chose this stack for its high performance, massive community support, and rapid development capabilities. It also ensures excellent scalability for future enhancements." },
  { q: "What is the difference between frontend and backend in your project?", a: "The frontend is the presentation layer where users interact with the interface. The backend is the data access layer that handles business logic, security, and database operations securely out of the user's reach." },
  { q: "How does your database handle concurrent requests?", a: "The database uses ACID properties and connection pooling. It relies on row-level locking and transaction isolation levels to ensure data integrity when multiple users access the system simultaneously." },
  { q: "Explain the authentication and authorization mechanism used.", a: "We implemented token-based authentication (JWT or Sessions). Upon login, a secure token is generated and passed in HTTP-only cookies or headers for subsequent requests to authorize access to protected routes." },
  { q: "What is the time complexity (Big O) of your core algorithm?", a: "Our core data processing algorithm runs in O(N log N) time complexity due to the optimized sorting and searching mechanisms, making it highly efficient even for large datasets." },
  { q: "How did you ensure the security of user data?", a: "We ensured security by hashing passwords using robust algorithms (like bcrypt), sanitizing inputs to prevent SQL Injection, and using HTTPS to encrypt data in transit." },
  { q: "What were the major challenges you faced during development?", a: "One major challenge was handling asynchronous state management and ensuring the API responded within acceptable latency limits under load. We solved this by optimizing our database queries and implementing caching." },
  { q: "How is your database schema designed?", a: "It is designed using Entity-Relationship modeling in 3rd Normal Form (3NF) to eliminate data redundancy and ensure data integrity through primary and foreign key constraints." },
  { q: "What is an API, and how is it used in your project?", a: "An API (Application Programming Interface) is a set of rules that allows the frontend to communicate with the backend. We used RESTful APIs to send and retrieve JSON data seamlessly." },
  { q: "Explain the concept of responsive design in your UI.", a: "Responsive design ensures the application looks and functions perfectly across all devices (desktops, tablets, mobile phones) by using fluid grids, flexible images, and CSS media queries." },
  { q: "How did you test your application?", a: "We conducted unit testing for individual components, integration testing for API endpoints, and manual end-to-end testing to ensure the entire user flow works as expected under various scenarios." },
  { q: "What is the difference between SQL and NoSQL? Which did you use?", a: "SQL databases are relational and structured with predefined schemas, while NoSQL databases are non-relational and document-oriented. We chose our database based on the specific structured data needs of this project." },
  { q: "How does your application handle errors and exceptions?", a: "We implemented global error handling mechanisms that catch exceptions gracefully, log them for debugging, and display user-friendly error messages without crashing the application." },
  { q: "What future enhancements can be made to this project?", a: "Future enhancements could include adding real-time WebSocket notifications, integrating Machine Learning for predictive analytics, and deploying a native mobile app version." },
  { q: "Explain how version control was used in this project.", a: "We used Git for version control, maintaining a main branch for production code and creating separate feature branches for development. This allowed tracking of every code change safely." },
  { q: "What is the role of a web server in your project?", a: "The web server listens for incoming HTTP requests, routes them to the appropriate application logic, and returns the generated HTTP responses back to the client." },
  { q: "How did you optimize the performance of your application?", a: "Performance was optimized by minifying CSS/JS assets, lazy loading images, implementing database indexing, and utilizing a Content Delivery Network (CDN) for static assets." },
  { q: "What is Object-Oriented Programming (OOP) and how is it applied here?", a: "OOP is a paradigm based on 'objects' containing data and methods. We applied concepts like encapsulation, inheritance, and polymorphism to write modular, reusable, and maintainable code." },
  { q: "Explain the concept of 'State Management' in your frontend.", a: "State management involves tracking data that changes over time (like user login status or cart items) and ensuring the UI automatically updates to reflect the current state consistently across all components." },
  { q: "How do you prevent Cross-Site Scripting (XSS) attacks?", a: "We prevent XSS by escaping and sanitizing all user inputs before rendering them in the browser, ensuring malicious scripts cannot be executed as part of the HTML." },
  { q: "What is a 'foreign key' and give an example from your database.", a: "A foreign key is a field in one table that uniquely identifies a row in another table, creating a relationship. For example, a 'user_id' in the 'orders' table linking back to the 'users' table." },
  { q: "Can you explain the deployment process for this project?", a: "The project is deployed using cloud infrastructure. Code is pushed to a repository, built into production-ready assets, and hosted on a scalable server environment with continuous integration." }
];

export default async function VivaPortalPage({ params }: { params: Promise<{ orderId: string }> }) {
  const orderId = (await params).orderId;
  const supabase = createAdminClient();

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, projects(*)')
    .eq('id', orderId)
    .single();

  if (error || !order || order.status !== 'PAID') {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 font-sans pb-32">
      {/* Header */}
      <div className="bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <GraduationCap className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">Viva Q&A Portal</h1>
              <p className="text-xs text-zinc-400">{order.projects?.title}</p>
            </div>
          </div>
          <Link href="/order/success?order_id=" as={`/order/success?order_id=${orderId}`} className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors">
            &larr; Back to Order
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl pt-8">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">Master Your Viva Defense</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            These are the 25 most frequently asked examiner questions for software projects. Reviewing these will guarantee you are fully prepared to defend your architecture, database, and logic.
          </p>
        </div>

        <div className="space-y-4">
          {VIVA_QUESTIONS.map((item, idx) => (
            <details key={idx} className="group glass-card rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer select-none">
                <div className="flex gap-4 items-start">
                  <span className="text-purple-400 font-mono font-bold text-sm mt-0.5">Q{idx + 1}.</span>
                  <span className="text-white font-medium text-sm md:text-base pr-4 leading-snug">{item.q}</span>
                </div>
                <ChevronDown className="w-5 h-5 text-zinc-500 group-open:rotate-180 transition-transform shrink-0" />
              </summary>
              <div className="px-5 pb-5 pt-1 pl-12">
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-100 text-sm leading-relaxed">
                  <span className="font-bold text-purple-300 mr-2">A:</span>
                  {item.a}
                </div>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-4">
            <CheckCircle2 className="w-4 h-4" /> All 25 Questions Unlocked
          </div>
          <p className="text-zinc-500 text-xs">
            Best of luck with your presentation! You've got this.
          </p>
        </div>
      </div>
    </div>
  );
}
