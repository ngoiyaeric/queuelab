import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/40 shadow-2xl bg-white/30 backdrop-blur-xl p-8">
           <SignIn />
        </div>
      </div>
    </div>
  );
}
