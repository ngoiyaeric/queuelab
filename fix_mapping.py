with open('src/components/features.tsx', 'r') as f:
    content = f.read()

# Swap evaScreenshot and fixScreenshot in the tabs array
# Fluidity Index should have fixScreenshot
content = content.replace(
    'title: "Fluidity Index",\n    logo: logoFi,\n    description: "FIX is a signal abstraction energy based evaluation and alignment system.",\n    isNew: true,\n    image: evaScreenshot,',
    'title: "Fluidity Index",\n    logo: logoFi,\n    description: "FIX is a signal abstraction energy based evaluation and alignment system.",\n    isNew: true,\n    image: fixScreenshot,'
)

# Environment Aware should have evaScreenshot
content = content.replace(
    'title: "Environment Aware",\n    logo: logoEa,\n    description: "EVA is a vibrational interface autonomous new knowledge discovery system.",\n    isNew: false,\n    image: fixScreenshot,',
    'title: "Environment Aware",\n    logo: logoEa,\n    description: "EVA is a vibrational interface autonomous new knowledge discovery system.",\n    isNew: false,\n    image: evaScreenshot,'
)

with open('src/components/features.tsx', 'w') as f:
    f.write(content)
