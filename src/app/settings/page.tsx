import { UserProfile } from "@clerk/nextjs";
import SiteHeader from "@/components/site-header";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <SiteHeader />
      <main className="container mx-auto py-10 flex justify-center">
        <UserProfile
          routing="hash"
          appearance={{
            elements: {
              rootBox: "mx-auto shadow-2xl rounded-2xl border border-stone-200",
              card: "shadow-none border-none bg-transparent",
            }
          }}
        />
      </main>
    </div>
  );
}
