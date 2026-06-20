"use client";

import { KnowledgeCard } from "@/components/knowledge-card";
import { KnowledgeCardData } from "@/types/knowledge";

const mockData: KnowledgeCardData = {
  title: "Global Supply Chain Resilience",
  cost: 1450.50,
  duration: "4m 20s",
  messages: [
    {
      id: "1",
      role: "user",
      content: "Analyze the current bottleneck in the Red Sea and its impact on electronics manufacturing.",
      timestamp: "10:00 AM"
    },
    {
      id: "2",
      role: "assistant",
      content: "I've analyzed real-time shipping data and manufacturer inventory. The current disruption is causing a 15-day delay in component arrival for European assembly plants.",
      timestamp: "10:01 AM"
    },
    {
      id: "3",
      role: "user",
      content: "What are the alternative routing options?",
      timestamp: "10:02 AM"
    },
    {
      id: "4",
      role: "assistant",
      content: "Rerouting via the Cape of Good Hope adds ~10 days but ensures safety. Alternatively, air freight for critical components could maintain production schedules but increases costs by 300%.",
      timestamp: "10:03 AM"
    },
    {
      id: "5",
      role: "user",
      content: "Provide a cost-benefit analysis for air freighting the next batch of processors.",
      timestamp: "10:04 AM"
    },
    {
      id: "6",
      role: "assistant",
      content: "Based on your margins, air freighting 50,000 units prevents a $5M revenue loss from production downtime, outweighing the $1.2M additional shipping cost.",
      timestamp: "10:04 AM"
    }
  ]
};

export default function KnowledgeCardDemo() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">KnowledgeCard Component Demo</h1>
        <p className="text-white/60 max-w-lg mx-auto">
          Interactive intelligence reports with 3D flip functionality and scrollable chat history.
        </p>
      </div>

      <KnowledgeCard data={mockData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-12">
         <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h2 className="text-xl font-semibold text-white">Design Features</h2>
            <ul className="text-white/60 space-y-2 list-disc list-inside">
              <li>Framer Motion 3D rotation</li>
              <li>Glassmorphic UI elements</li>
              <li>Gradient background system</li>
              <li>Custom scrollable message history</li>
            </ul>
         </div>
         <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h2 className="text-xl font-semibold text-white">Data Structure</h2>
            <code className="text-xs text-emerald-400 block bg-black/40 p-3 rounded-lg">
              {JSON.stringify({
                title: "string",
                cost: "number",
                duration: "string",
                messages: "KnowledgeMessage[]"
              }, null, 2)}
            </code>
         </div>
      </div>
    </div>
  );
}
