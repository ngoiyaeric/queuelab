cat << 'INNER_EOF' > src/app/globals.css
@import url('https://fonts.cdnfonts.com/css/Bellmt');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 220 20% 10%;
    --card: 0 0% 100%;
    --card-foreground: 220 20% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 220 20% 10%;
    --primary: 220 20% 10%;
    --primary-foreground: 0 0% 100%;
    --secondary: 220 10% 90%;
    --secondary-foreground: 220 20% 10%;
    --muted: 220 10% 95%;
    --muted-foreground: 220 20% 40%;
    --accent: 220 10% 90%;
    --accent-foreground: 220 20% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 100%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 220 20% 10%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
    --nature-green: 120 40% 40%;
    --nature-brown: 30 20% 30%;
    --nature-sky: 200 70% 40%;
    --computation-blue: 210 60% 40%;
    --computation-gray: 220 20% 40%;
  }
}

@layer base {
  * {
    @apply border-border;
    scrollbar-width: thin;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@media (min-width: 1024px) {
  body {
    zoom: 0.75;
  }
}

.season-font {
  font-family: 'Inter', sans-serif;
  color: hsla(0, 0%, 0%, 0.7);
  text-align: center;
  padding: 1rem 0;
  font-size: 0.8rem;
}
INNER_EOF
