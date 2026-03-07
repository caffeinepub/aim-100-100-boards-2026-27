export interface FAQEntry {
  keywords: string[];
  subject: string;
  question: string;
  answer: string;
}

export const faqData: FAQEntry[] = [
  // Physics
  {
    keywords: ["newton", "law", "motion", "force", "inertia"],
    subject: "Physics",
    question: "What are Newton's Laws of Motion?",
    answer:
      "**Newton's Three Laws of Motion:**\n\n**1st Law (Inertia):** An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.\n\n**2nd Law (F = ma):** Force equals mass times acceleration. The acceleration of an object is directly proportional to the net force and inversely proportional to its mass.\n\n**3rd Law (Action-Reaction):** For every action, there is an equal and opposite reaction.\n\n📝 **Board Tip:** Always draw free body diagrams and resolve forces along axes for numerical problems.",
  },
  {
    keywords: ["ohm", "resistance", "current", "voltage", "electric"],
    subject: "Physics",
    question: "What is Ohm's Law?",
    answer:
      "**Ohm's Law:** V = IR\n\nWhere:\n- V = Voltage (Volts)\n- I = Current (Amperes)\n- R = Resistance (Ohms)\n\n**Key Points:**\n- Ohm's law applies to ohmic conductors at constant temperature\n- Resistance R = ρL/A (where ρ = resistivity, L = length, A = cross-section area)\n- In series: R_total = R₁ + R₂ + R₃\n- In parallel: 1/R_total = 1/R₁ + 1/R₂ + 1/R₃\n\n📝 **Board Tip:** Draw circuit diagrams clearly and label all components.",
  },
  {
    keywords: ["electromagnetic", "induction", "faraday", "lenz", "flux"],
    subject: "Physics",
    question: "What is Electromagnetic Induction?",
    answer:
      "**Electromagnetic Induction** is the production of EMF (voltage) in a conductor when it experiences a changing magnetic flux.\n\n**Faraday's Laws:**\n1. EMF is induced whenever magnetic flux through a circuit changes\n2. Magnitude of EMF = Rate of change of magnetic flux: ε = -dΦ/dt\n\n**Lenz's Law:** The induced current opposes the change causing it (negative sign in Faraday's law)\n\n**Applications:** Generators, transformers, induction cooktops\n\n📝 **Board Tip:** Remember the formula ε = -N(dΦ/dt) for N turns.",
  },
  {
    keywords: [
      "photoelectric",
      "effect",
      "photon",
      "work function",
      "einstein",
    ],
    subject: "Physics",
    question: "What is the Photoelectric Effect?",
    answer:
      "**Photoelectric Effect:** Emission of electrons from a metal surface when light of sufficient frequency falls on it.\n\n**Einstein's Equation:** KE_max = hν - φ\n\nWhere:\n- h = Planck's constant (6.626 × 10⁻³⁴ J·s)\n- ν = frequency of incident light\n- φ = work function of metal\n\n**Key Observations:**\n- No emission below threshold frequency\n- KE of electrons depends on frequency, not intensity\n- Number of electrons depends on intensity\n\n📝 **Board Tip:** This proved the particle nature of light — Nobel Prize to Einstein!",
  },
  {
    keywords: ["lens", "mirror", "optics", "focal", "refraction", "reflection"],
    subject: "Physics",
    question: "What are the lens and mirror formulas?",
    answer:
      "**Mirror Formula:** 1/f = 1/v + 1/u\n\n**Lens Formula:** 1/f = 1/v - 1/u\n\n**Magnification:**\n- Mirror: m = -v/u\n- Lens: m = v/u\n\n**Sign Convention (New Cartesian):**\n- Distances measured from pole/optical center\n- Along incident ray direction = positive\n- Against incident ray = negative\n\n**Lens Maker's Formula:** 1/f = (n-1)[1/R₁ - 1/R₂]\n\n📝 **Board Tip:** Always mention sign convention before solving numericals!",
  },
  // Chemistry
  {
    keywords: ["ionic", "bond", "covalent", "bonding", "electronegativity"],
    subject: "Chemistry",
    question: "What is the difference between ionic and covalent bonds?",
    answer:
      "**Ionic Bond:**\n- Formed by complete transfer of electrons\n- Between metals and non-metals\n- High melting/boiling points\n- Conducts electricity in molten/aqueous state\n- Example: NaCl, MgO\n\n**Covalent Bond:**\n- Formed by sharing of electrons\n- Between non-metals\n- Lower melting/boiling points\n- Generally poor conductors\n- Example: H₂O, CO₂, CH₄\n\n**Electronegativity difference:**\n- > 1.7 → Ionic\n- 0.4–1.7 → Polar covalent\n- < 0.4 → Non-polar covalent\n\n📝 **Board Tip:** Draw Lewis structures for covalent compounds.",
  },
  {
    keywords: ["equilibrium", "le chatelier", "kc", "kp", "reaction"],
    subject: "Chemistry",
    question: "What is Le Chatelier's Principle?",
    answer:
      "**Le Chatelier's Principle:** When a system at equilibrium is disturbed, it shifts to counteract the disturbance and re-establish equilibrium.\n\n**Effects:**\n- **Concentration increase** of reactant → shifts forward\n- **Temperature increase** → shifts in endothermic direction\n- **Pressure increase** → shifts toward fewer moles of gas\n- **Catalyst** → no shift, only speeds up reaching equilibrium\n\n**Equilibrium Constants:**\n- Kc = [products]/[reactants] (concentration)\n- Kp = Kc(RT)^Δn\n\n📝 **Board Tip:** Haber process (N₂ + 3H₂ ⇌ 2NH₃) is a classic application!",
  },
  {
    keywords: [
      "electrochemistry",
      "cell",
      "electrode",
      "oxidation",
      "reduction",
      "galvanic",
    ],
    subject: "Chemistry",
    question: "What is electrochemistry?",
    answer:
      "**Electrochemistry** studies the relationship between chemical energy and electrical energy.\n\n**Galvanic Cell:** Converts chemical energy → electrical energy\n- Anode: Oxidation (negative electrode)\n- Cathode: Reduction (positive electrode)\n- EMF = E°cathode - E°anode\n\n**Electrolytic Cell:** Converts electrical energy → chemical energy\n\n**Nernst Equation:** E = E° - (RT/nF)ln Q\n\n**Faraday's Laws:**\n1. Mass deposited ∝ charge passed\n2. Mass deposited ∝ equivalent weight\n\n📝 **Board Tip:** Remember OILRIG — Oxidation Is Loss, Reduction Is Gain!",
  },
  {
    keywords: [
      "organic",
      "carbon",
      "alkane",
      "alkene",
      "alkyne",
      "functional group",
    ],
    subject: "Chemistry",
    question: "What are the basics of organic chemistry?",
    answer:
      "**Organic Chemistry** is the study of carbon compounds.\n\n**Homologous Series:**\n- Alkanes: CₙH₂ₙ₊₂ (single bonds)\n- Alkenes: CₙH₂ₙ (one double bond)\n- Alkynes: CₙH₂ₙ₋₂ (one triple bond)\n\n**Important Functional Groups:**\n- -OH (Alcohol)\n- -CHO (Aldehyde)\n- -CO- (Ketone)\n- -COOH (Carboxylic acid)\n- -NH₂ (Amine)\n\n**IUPAC Naming Rules:**\n1. Find longest carbon chain\n2. Number from end nearest substituent\n3. Name substituents alphabetically\n\n📝 **Board Tip:** Practice IUPAC naming daily — it's guaranteed marks!",
  },
  // Mathematics
  {
    keywords: [
      "derivative",
      "differentiation",
      "calculus",
      "dy/dx",
      "rate of change",
    ],
    subject: "Mathematics",
    question: "What is differentiation?",
    answer:
      "**Differentiation** finds the rate of change of a function.\n\n**Basic Rules:**\n- d/dx(xⁿ) = nxⁿ⁻¹\n- d/dx(sin x) = cos x\n- d/dx(cos x) = -sin x\n- d/dx(eˣ) = eˣ\n- d/dx(ln x) = 1/x\n\n**Chain Rule:** d/dx[f(g(x))] = f'(g(x)) · g'(x)\n\n**Product Rule:** d/dx(uv) = u'v + uv'\n\n**Quotient Rule:** d/dx(u/v) = (u'v - uv')/v²\n\n**Applications:** Maxima/minima, rate of change, tangent/normal equations\n\n📝 **Board Tip:** Always check second derivative to confirm max/min!",
  },
  {
    keywords: ["integration", "integral", "antiderivative", "area", "definite"],
    subject: "Mathematics",
    question: "What is integration?",
    answer:
      "**Integration** is the reverse of differentiation (antiderivative).\n\n**Basic Formulas:**\n- ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n- ∫sin x dx = -cos x + C\n- ∫cos x dx = sin x + C\n- ∫eˣ dx = eˣ + C\n- ∫1/x dx = ln|x| + C\n\n**Methods:**\n- Substitution: u = g(x)\n- Integration by parts: ∫u dv = uv - ∫v du (ILATE rule)\n- Partial fractions\n\n**Definite Integral:** ∫ₐᵇ f(x)dx = F(b) - F(a)\n\n📝 **Board Tip:** ILATE = Inverse trig, Logarithm, Algebraic, Trig, Exponential",
  },
  {
    keywords: ["matrix", "matrices", "determinant", "inverse", "transpose"],
    subject: "Mathematics",
    question: "What are matrices and determinants?",
    answer:
      "**Matrix:** Rectangular array of numbers arranged in rows and columns.\n\n**Types:** Row, Column, Square, Identity (I), Zero, Diagonal, Symmetric\n\n**Operations:**\n- Addition: Add corresponding elements\n- Multiplication: (AB)ᵢⱼ = Σ aᵢₖ bₖⱼ\n- Transpose: (Aᵀ)ᵢⱼ = Aⱼᵢ\n\n**Determinant (2×2):** |A| = ad - bc\n\n**Inverse:** A⁻¹ = adj(A)/|A| (exists only if |A| ≠ 0)\n\n**Properties:**\n- |AB| = |A||B|\n- |Aᵀ| = |A|\n- |kA| = kⁿ|A| for n×n matrix\n\n📝 **Board Tip:** Cramer's rule is useful for solving linear equations!",
  },
  {
    keywords: ["probability", "bayes", "conditional", "event", "sample space"],
    subject: "Mathematics",
    question: "What is probability?",
    answer:
      "**Probability** measures the likelihood of an event occurring.\n\n**Basic Formula:** P(A) = Favorable outcomes / Total outcomes\n\n**Key Rules:**\n- 0 ≤ P(A) ≤ 1\n- P(A') = 1 - P(A)\n- P(A∪B) = P(A) + P(B) - P(A∩B)\n- P(A∩B) = P(A) × P(B) [if independent]\n\n**Conditional Probability:** P(A|B) = P(A∩B)/P(B)\n\n**Bayes' Theorem:** P(A|B) = P(B|A)·P(A) / P(B)\n\n**Distributions:**\n- Binomial: P(X=r) = ⁿCᵣ pʳ qⁿ⁻ʳ\n\n📝 **Board Tip:** Draw tree diagrams for conditional probability problems!",
  },
  // Biology
  {
    keywords: [
      "photosynthesis",
      "chlorophyll",
      "light reaction",
      "dark reaction",
      "calvin",
    ],
    subject: "Biology",
    question: "What is photosynthesis?",
    answer:
      "**Photosynthesis:** 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂\n\n**Two Stages:**\n\n**1. Light Reactions (Thylakoid):**\n- Photolysis of water: 2H₂O → 4H⁺ + 4e⁻ + O₂\n- ATP and NADPH produced\n- Photosystems I and II involved\n\n**2. Dark Reactions/Calvin Cycle (Stroma):**\n- CO₂ fixation by RuBisCO\n- 3 CO₂ + 3 RuBP → 6 G3P\n- Glucose synthesis\n\n**C3 vs C4 Plants:**\n- C3: First product is 3-carbon (3-PGA) — wheat, rice\n- C4: First product is 4-carbon (OAA) — maize, sugarcane\n\n📝 **Board Tip:** CAM plants (cacti) open stomata at night!",
  },
  {
    keywords: [
      "dna",
      "rna",
      "replication",
      "transcription",
      "translation",
      "protein synthesis",
    ],
    subject: "Biology",
    question: "What is DNA replication and protein synthesis?",
    answer:
      "**DNA Replication (Semi-conservative):**\n- Helicase unwinds DNA\n- Primase adds RNA primer\n- DNA Polymerase III adds nucleotides (5'→3')\n- Leading strand: continuous; Lagging strand: Okazaki fragments\n- DNA Ligase joins fragments\n\n**Transcription (DNA → mRNA):**\n- RNA Polymerase reads template strand\n- mRNA carries genetic code\n\n**Translation (mRNA → Protein):**\n- Ribosome reads codons (3 nucleotides)\n- tRNA brings amino acids\n- Start codon: AUG (Methionine)\n- Stop codons: UAA, UAG, UGA\n\n📝 **Board Tip:** Central Dogma: DNA → RNA → Protein",
  },
  {
    keywords: [
      "mendelian",
      "genetics",
      "dominant",
      "recessive",
      "allele",
      "genotype",
      "phenotype",
    ],
    subject: "Biology",
    question: "What are Mendel's Laws of Inheritance?",
    answer:
      "**Gregor Mendel** — Father of Genetics\n\n**Law 1 — Law of Dominance:**\nIn a cross between pure lines, the dominant trait appears in F1 generation.\n\n**Law 2 — Law of Segregation:**\nAlleles separate during gamete formation. Each gamete carries one allele.\n\n**Law 3 — Law of Independent Assortment:**\nGenes for different traits assort independently during gamete formation.\n\n**Monohybrid Cross (Tt × Tt):**\n- Genotype ratio: 1TT : 2Tt : 1tt\n- Phenotype ratio: 3 Tall : 1 Short\n\n**Dihybrid Cross:**\n- Phenotype ratio: 9:3:3:1\n\n📝 **Board Tip:** Draw Punnett squares for all genetics problems!",
  },
  {
    keywords: [
      "evolution",
      "darwin",
      "natural selection",
      "adaptation",
      "species",
    ],
    subject: "Biology",
    question: "What is Darwin's Theory of Evolution?",
    answer:
      "**Charles Darwin's Theory of Natural Selection:**\n\n**Key Points:**\n1. **Variation:** Individuals in a population vary\n2. **Overproduction:** More offspring than can survive\n3. **Struggle for Existence:** Competition for resources\n4. **Survival of the Fittest:** Best adapted individuals survive\n5. **Inheritance:** Favorable traits passed to offspring\n\n**Evidence for Evolution:**\n- Fossil record\n- Comparative anatomy (homologous/analogous organs)\n- Embryology\n- Molecular biology (DNA similarity)\n\n**Hardy-Weinberg Principle:** Allele frequencies remain constant in absence of evolutionary forces.\n\n📝 **Board Tip:** Miller-Urey experiment showed origin of life!",
  },
  // English
  {
    keywords: ["last lesson", "alphonse daudet", "franz", "french"],
    subject: "English",
    question: "What is 'The Last Lesson' about?",
    answer:
      "**'The Last Lesson'** by Alphonse Daudet\n\n**Summary:** Set during the Franco-Prussian War (1870-71), the story is narrated by Franz, a young French boy. The Germans have ordered that only German be taught in schools of Alsace and Lorraine. M. Hamel gives his last French lesson with great emotion.\n\n**Themes:**\n- Love for one's language and culture\n- Patriotism and national identity\n- Regret and realization\n- The importance of education\n\n**Key Characters:**\n- Franz: The narrator, initially careless about studies\n- M. Hamel: The French teacher, devoted to his language\n\n**Important Quote:** 'When a people are enslaved, as long as they hold fast to their language it is as if they had the key to their prison.'\n\n📝 **Board Tip:** Focus on the symbolism of language as identity!",
  },
  {
    keywords: ["deep water", "william douglas", "fear", "swimming", "overcome"],
    subject: "English",
    question: "What is 'Deep Water' about?",
    answer:
      "**'Deep Water'** by William O. Douglas\n\n**Summary:** An autobiographical account of how Douglas overcame his fear of water. He nearly drowned at age 3-4 at a beach, and again at age 10-11 at the YMCA pool. He hired an instructor and learned to swim, finally conquering his fear.\n\n**Themes:**\n- Overcoming fear through determination\n- The power of will and perseverance\n- Man vs. self (internal conflict)\n\n**Key Message:** Fear can be conquered through systematic effort and determination. The author's experience teaches us that we must face our fears head-on.\n\n**Literary Devices:** Flashback, first-person narrative, vivid imagery\n\n📝 **Board Tip:** The story is a metaphor for conquering any fear in life!",
  },
  // General Study Tips
  {
    keywords: [
      "study",
      "tips",
      "how to study",
      "board exam",
      "preparation",
      "score",
    ],
    subject: "General",
    question: "How to prepare for board exams?",
    answer:
      "**Top Board Exam Preparation Tips:**\n\n**📚 Study Strategy:**\n1. Complete NCERT textbooks thoroughly — boards are NCERT-based\n2. Make short notes and mind maps for each chapter\n3. Solve previous 10 years' question papers\n4. Practice sample papers in exam conditions\n\n**⏰ Time Management:**\n- Study 6-8 hours daily with breaks\n- Use Pomodoro technique (25 min study + 5 min break)\n- Prioritize weak subjects\n\n**📝 Exam Tips:**\n- Read questions carefully\n- Attempt all questions\n- Write neat, structured answers\n- Draw diagrams wherever applicable\n- Revise 3 times before exam\n\n**🎯 Target:** Aim for 100/100 — it's achievable with consistent effort!",
  },
  {
    keywords: [
      "pomodoro",
      "time management",
      "focus",
      "concentration",
      "productivity",
    ],
    subject: "General",
    question: "What is the Pomodoro technique?",
    answer:
      "**Pomodoro Technique** — Developed by Francesco Cirillo\n\n**How it works:**\n1. Choose a task to work on\n2. Set timer for **25 minutes** (one Pomodoro)\n3. Work with full focus until timer rings\n4. Take a **5-minute break**\n5. After 4 Pomodoros, take a **15-30 minute long break**\n\n**Why it works:**\n- Breaks large tasks into manageable chunks\n- Reduces mental fatigue\n- Creates urgency and focus\n- Tracks productivity\n\n**For Board Exam Students:**\n- Morning: 4 Pomodoros (2 hours) on difficult subjects\n- Afternoon: 4 Pomodoros on practice problems\n- Evening: 2 Pomodoros on revision\n\n📝 **Use the Pomodoro timer in this app for best results!**",
  },
  {
    keywords: ["stress", "anxiety", "exam fear", "nervous", "relax"],
    subject: "General",
    question: "How to deal with exam stress?",
    answer:
      "**Managing Exam Stress:**\n\n**🧘 Immediate Relief:**\n- Deep breathing: 4-7-8 technique (inhale 4s, hold 7s, exhale 8s)\n- 5-minute meditation\n- Light stretching or walk\n\n**📅 Long-term Strategies:**\n- Maintain regular sleep (7-8 hours)\n- Exercise 30 minutes daily\n- Eat nutritious food — avoid junk\n- Stay hydrated\n- Talk to friends/family\n\n**📚 Study-related:**\n- Break study into small goals\n- Celebrate small wins\n- Avoid comparing with others\n- Focus on effort, not just results\n\n**💪 Mindset:**\n- 'I am prepared and I will do my best'\n- Visualization: Imagine yourself succeeding\n- Remember: One exam doesn't define your life!\n\n🌟 **You've got this! Aim 100/100!**",
  },
];
