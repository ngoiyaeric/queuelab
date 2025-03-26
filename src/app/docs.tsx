import React from 'react';
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const Docs = () => {
  return (
    <>
      <SiteHeader />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Documentation</h1>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            Welcome to the QCX documentation. Here you will find all the information you need to get started with our platform.
          </p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <p>
            To get started with QCX, follow these steps:
          </p>
          <ul>
            <li>Step 1: Sign up for an account</li>
            <li>Step 2: Explore the features</li>
            <li>Step 3: Start using the platform</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <p>
            QCX offers a wide range of features to help you with your tasks:
          </p>
          <ul>
            <li>Feature 1: Advanced search capabilities</li>
            <li>Feature 2: Real-time data analysis</li>
            <li>Feature 3: Customizable dashboards</li>
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
          <p>
            Here are some frequently asked questions:
          </p>
          <ul>
            <li>Question 1: How do I reset my password?</li>
            <li>Question 2: How do I contact support?</li>
            <li>Question 3: Where can I find the API documentation?</li>
          </ul>
        </section>
      </div>
      <SiteFooter />
    </>
  );
};

export default Docs;
