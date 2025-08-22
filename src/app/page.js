'use client';
import React, { useState } from "react";

export default function Home() {
  const [activeProblem, setActiveProblem] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const problems = [
    {
      id: "support",
      title: "Too many customer inquiries?",
      cta: "See Support Bot",
      desc: "Reduce response time and handle FAQs 24/7 with a smart support assistant.",
    },
    {
      id: "reports",
      title: "Manual reports draining time?",
      cta: "See Reporting Automation",
      desc: "Automate daily, weekly, or monthly reports and get them in your inbox.",
    },
    {
      id: "leads",
      title: "Need leads captured instantly?",
      cta: "See Lead Bot",
      desc: "Capture and qualify leads automatically from forms and chat channels.",
    },
  ];

  const workflows = [
    {
      id: "support-bot",
      name: "Customer Support Bot",
      subtitle: "Reply to clients 24/7 with no extra staff.",
      tags: ["Chatbot", "Airtable", "Gmail"],
    },
    {
      id: "daily-reports",
      name: "Daily Report Generator",
      subtitle: "Automated reports delivered every morning.",
      tags: ["Scheduler", "Google Sheets", "Email"],
    },
    {
      id: "lead-qualifier",
      name: "Lead Qualification Bot",
      subtitle: "Qualify and route leads automatically.",
      tags: ["Forms", "CRM", "Slack"],
    },
    {
      id: "onboarding",
      name: "New Hire Onboarding",
      subtitle: "Automate onboarding tasks and welcome emails.",
      tags: ["HR", "Google Drive", "Calendar"],
    },
    {
      id: "invoice",
      name: "Invoice Automation",
      subtitle: "Generate and send invoices automatically.",
      tags: ["Accounting", "PDF", "Stripe"],
    },
    {
      id: "feedback",
      name: "Customer Feedback Collector",
      subtitle: "Collect and aggregate feedback from multiple channels.",
      tags: ["Forms", "Analytics", "Sheets"],
    },
  ];

  const testimonials = [
    { id: 1, quote: "This saved us 15 hours a week!", author: "Sarah, COO @ RetailCo" },
    { id: 2, quote: "Our support backlog disappeared.", author: "Miguel, Head of CS @ SaaSify" },
    { id: 3, quote: "Beautifully simple and effective automation.", author: "Priya, Ops Lead @ FinServe" },
  ];

  function nextTestimonial() {
    setTestimonialIndex((i) => (i + 1) % testimonials.length);
  }

  function prevTestimonial() {
    setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-blue-700 to-teal-400 flex items-center justify-center text-white font-bold">W</div>
            <div className="font-semibold text-lg">Workflow Studio</div>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <a className="hover:underline" href="#solutions">Solutions</a>
            <a className="hover:underline" href="#workflows">Workflows</a>
            <a className="hover:underline" href="#about">About</a>
            <a className="hover:underline" href="#contact">Contact</a>
          </nav>
          <div className="flex items-center space-x-3">
            <button className="hidden md:inline-block px-4 py-2 rounded-md border">Sign in</button>
            <button className="px-4 py-2 rounded-md bg-teal-500 text-white shadow">Talk to Us</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Automations that
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-400"> work for your business.</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                From customer support bots to reporting pipelines — explore ready-to-use workflows that solve real problems and save your team hours each week.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#workflows" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-blue-700 text-white font-medium shadow">Explore Workflows</a>
                <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border">Talk to Us</a>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                <div className="p-3 rounded-md bg-gray-50">
                  <div className="text-sm text-gray-500">Avg. time saved</div>
                  <div className="font-bold text-xl">15 hrs / week</div>
                </div>
                <div className="p-3 rounded-md bg-gray-50">
                  <div className="text-sm text-gray-500">Integrations</div>
                  <div className="font-bold text-xl">Airtable, Gmail...</div>
                </div>
                <div className="p-3 rounded-md bg-gray-50">
                  <div className="text-sm text-gray-500">Use cases</div>
                  <div className="font-bold text-xl">Support, Sales</div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Placeholder for an illustration or live demo embed */}
              <div className="w-full h-80 rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 border p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-32 bg-white rounded-md shadow flex items-center justify-center text-sm text-gray-400">Demo Preview</div>
                  <div className="mt-4 text-sm text-gray-500">Interactive demos live inside each workflow page.</div>
                </div>
              </div>
              {/* Decorative shapes */}
              <div className="absolute -left-8 -bottom-8 w-40 h-40 rounded-full bg-blue-100 opacity-60 blur-3xl" />
              <div className="absolute -right-12 top-8 w-28 h-28 rounded-full bg-teal-100 opacity-60 blur-2xl" />
            </div>
          </div>
        </section>

        {/* Problem -> Solution Section */}
        <section id="solutions" className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold">Pick your challenge. We’ll show you the solution.</h2>
          <p className="mt-2 text-gray-600">Select a problem to preview a recommended workflow tailored to that need.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveProblem(p.id)}
                className={`text-left p-6 rounded-lg border hover:shadow transition shadow-sm bg-white ${activeProblem === p.id ? "ring-2 ring-teal-300" : ""}`}>
                <div className="text-sm text-gray-500">{p.title}</div>
                <div className="mt-3 font-semibold">{p.desc}</div>
                <div className="mt-4 text-sm text-teal-600 font-medium">{p.cta} →</div>
              </button>
            ))}
          </div>

          <div className="mt-8">
            {activeProblem ? (
              <div className="p-6 rounded-lg bg-gradient-to-r from-white to-teal-50 border">
                <h3 className="font-semibold text-lg">Example: {problems.find((x) => x.id === activeProblem)?.cta}</h3>
                <p className="mt-2 text-gray-600">A short preview of how this workflow solves the problem. Replace this section with a live embed or short interactive demo.</p>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded bg-white border">Step 1<br /><span className="text-sm text-gray-500">Collect input</span></div>
                  <div className="p-4 rounded bg-white border">Step 2<br /><span className="text-sm text-gray-500">Process & route</span></div>
                  <div className="p-4 rounded bg-white border">Step 3<br /><span className="text-sm text-gray-500">Store & notify</span></div>
                </div>
              </div>
            ) : (
              <div className="mt-6 p-6 rounded-lg border bg-white text-gray-600">Select a problem card above to preview a workflow solution.</div>
            )}
          </div>
        </section>

        {/* Popular Workflows / Gallery */}
        <section id="workflows" className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Popular Workflows</h2>
              <p className="text-gray-600 mt-1">Browse our most requested automations — tap a workflow to view a demo.</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <button className="px-3 py-2 rounded border">All</button>
              <button className="px-3 py-2 rounded">Chatbots</button>
              <button className="px-3 py-2 rounded">Reporting</button>
              <button className="px-3 py-2 rounded">Sales</button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((w) => (
              <article key={w.id} className="rounded-lg border bg-white p-5 hover:shadow transition">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs text-gray-500">{w.tags.join(" • ")}</div>
                    <h3 className="mt-2 font-semibold text-lg">{w.name}</h3>
                    <p className="mt-1 text-gray-600 text-sm">{w.subtitle}</p>
                  </div>
                  <div className="ml-4 shrink-0">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-blue-600 to-teal-400 text-white flex items-center justify-center font-semibold">{w.name.split(" ")[0].slice(0,2)}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <a href={`#/workflows/${w.id}`} className="text-sm text-blue-700 font-medium">View Demo →</a>
                  <button className="text-sm px-3 py-2 rounded border">Get this Workflow</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="rounded-lg bg-gradient-to-r from-gray-50 to-white border p-6 md:flex items-center justify-between">
            <div className="md:flex-1">
              <h3 className="text-xl font-bold">Trusted by businesses like yours</h3>
              <p className="text-gray-600 mt-2">Real results from real clients — automation that pays back in time saved.</p>

              <div className="mt-6">
                <blockquote className="text-lg italic">“{testimonials[testimonialIndex].quote}”</blockquote>
                <div className="mt-3 text-sm text-gray-500">— {testimonials[testimonialIndex].author}</div>

                <div className="mt-4 flex items-center gap-2">
                  <button onClick={prevTestimonial} className="px-3 py-2 rounded border">◀</button>
                  <button onClick={nextTestimonial} className="px-3 py-2 rounded border">▶</button>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0 md:ml-8 md:w-80">
              <div className="grid grid-cols-3 gap-3">
                <div className="h-12 rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500">Client</div>
                <div className="h-12 rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500">Client</div>
                <div className="h-12 rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500">Client</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="rounded-xl p-8 bg-gradient-to-r from-blue-700 to-teal-400 text-white flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">Want this for your business?</h3>
              <p className="mt-1 text-sm opacity-90">We’ll customize and deploy workflows for your team — fast.</p>
            </div>
            <div>
              <a href="#contact" className="inline-block px-5 py-3 rounded-md bg-white text-blue-700 font-semibold">Get This Workflow</a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="border-t mt-8">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-6">
          <div>
            <div className="font-semibold text-lg">Workflow Studio</div>
            <p className="mt-2 text-gray-600">We build automations that save teams time and headaches. Ready to get started?</p>
          </div>

          <div className="text-sm text-gray-600">
            <div className="font-medium">Contact</div>
            <div className="mt-2">hello@workflow.studio</div>
            <div className="mt-1">+1 (555) 123-4567</div>
          </div>

          <div className="text-sm">
            <div className="font-medium text-gray-600">Links</div>
            <ul className="mt-2 space-y-2 text-gray-600">
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#workflows" className="hover:underline">Workflows</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t">
          <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500 flex items-center justify-between">
            <div>© {new Date().getFullYear()} Workflow Studio</div>
            <div>Made with ♥ for clients</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
