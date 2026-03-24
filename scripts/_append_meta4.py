import re

path = "c:/Users/Windows11/Documents/GitHub/SimpleToolBox/public/tools-meta.js"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

new_entry = """  },
  {
    slug: 'torque-converter',
    title: 'Torque Converter — N·m, ft·lb, in·lb, kgf·m',
    description: 'Convert torque between newton-meters, foot-pounds, inch-pounds, kilogram-force meters, kilonewton-meters, and newton-centimeters. Type in any field for instant conversion.',
    category: 'convert',
    tags: ['convert'],
    relatedTools: ['force-converter', 'pressure-converter', 'energy-converter', 'unit-converter'],
    faq: [
      { q: 'How many ft·lb is 1 N·m?', a: '1 N·m = 0.7376 ft·lb (foot-pounds).' },
      { q: 'How many in·lb is 1 N·m?', a: '1 N·m = 8.851 in·lb (inch-pounds).' },
      { q: 'What is the difference between torque and force?', a: 'Force is a push or pull (measured in newtons). Torque is a rotational force — force applied at a distance from a pivot point. Torque = Force x Lever Arm length.' },
      { q: 'What is kgf·m used for?', a: 'Kilogram-force meter (kgf·m) is a legacy unit used in older engineering literature and some Asian countries. 1 kgf·m = 9.80665 N·m.' },
    ],
    useCases: [
      'Torque wrench settings for bolts and fasteners',
      'Engine torque spec comparisons (N·m vs ft·lb)',
      'Bicycle and motorcycle specifications',
      'Structural and mechanical engineering calculations',
    ],
    example: { input: '100 N·m', output: '73.76 ft·lb / 885.1 in·lb / 10.197 kgf·m' },
    seoContent: {
      whatIsTitle: 'What is a Torque Converter?',
      whatIsBody: 'A torque converter translates rotational force measurements between unit systems. Newton-meters (N·m) is the SI unit of torque. Foot-pounds (ft·lb) and inch-pounds (in·lb) are used in the US for fastener specs and engine ratings. Kilogram-force meters (kgf·m) appear in older and some Asian engineering documents. Kilonewton-meters (kN·m) are used in structural engineering.',
      howToTitle: 'How to Convert Torque',
      howToSteps: [
        'Type a torque value into any field (N·m, kN·m, ft·lb, in·lb, kgf·m, or N·cm).',
        'All other fields update instantly.',
        'Use quick example buttons for common reference torque values.',
        'Click Clear to reset all fields.',
      ],
    },
    learnMore: {
      title: 'Torque Units in Practice',
      body: 'Torque = Force x Distance. 1 N·m = a 1-newton force applied 1 meter from the pivot. Engine torque specs are given in N·m (metric) or ft·lb (US). Fastener torque specs use N·m or in·lb for smaller bolts. A typical car wheel lug nut is torqued to about 100–130 N·m (74–96 ft·lb). Always check whether a spec uses ft·lb or in·lb — confusing the two can cause over- or under-tightening by 12x.',
    },
  }
"""

pattern = re.compile(r'\n\];\n')
matches = list(pattern.finditer(content))
if not matches:
    print("ERROR: closing marker not found")
else:
    last = matches[-1]
    insert_pos = last.start()
    new_content = content[:insert_pos] + new_entry + '\n];\n' + content[last.end():]
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Done")
