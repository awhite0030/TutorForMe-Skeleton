import { LESSONS } from "../../packages/tutor-core/src/lessons.ts";
import type { Lesson, SubjectId, Text } from "../../packages/tutor-core/src/types.ts";

function line(en: string): Text {
  return { en, ru: en };
}

const stations: Lesson[] = [
  {
    id: "bio-afferent",
    subject: "biology",
    source: "guided",
    minutes: 5,
    title: line("Afferent means toward the center"),
    stuckPoint: line("The arrows on the reflex drawing point the wrong way."),
    steps: [
      {
        id: "toward",
        title: line("Direction is relative to the center"),
        body: line(
          "Afferent fibers carry the signal into the central nervous system. Efferent fibers carry the command out to a muscle or a gland. The words name a direction, not a mood. “Sensory” and “motor” are the jobs. Afferent and efferent say which way the signal travels.",
        ),
        formula: null,
        example: line("A touch on the skin travels afferent. The order to pull the hand back travels efferent."),
      },
      {
        id: "drawing",
        title: line("Read the drawing as a path"),
        body: line(
          "Start at the receptor and follow one arrow into the spinal cord. That arrow is afferent. Leave the cord on a second arrow that ends on the effector. That arrow is efferent. If both arrows leave the cord, or both arrive from the skin, the arc is drawn backwards.",
        ),
        formula: null,
        example: null,
      },
    ],
    check: {
      prompt: line("In a reflex arc, the sensory neuron is"),
      choices: [
        line("afferent: it brings the signal in"),
        line("efferent: it brings the signal in"),
        line("the effector"),
        line("the part that decides you are in pain"),
      ],
      answerIndex: 0,
      why: line(
        "The sensory neuron runs from receptor to center, so it is afferent. Efferent is the way out. The effector is the muscle or gland, and pain is not required for the arc to fire.",
      ),
    },
  },
  {
    id: "bio-center",
    subject: "biology",
    source: "guided",
    minutes: 5,
    title: line("The center is a switch, not a thought"),
    stuckPoint: line("The arc gets described as a circle of feeling, and the center disappears."),
    steps: [
      {
        id: "five",
        title: line("Five parts, in order"),
        body: line(
          "Receptor, afferent neuron, center, efferent neuron, effector. The center — often a synapse in the spinal cord — is where the incoming neuron hands the signal to the outgoing one. Skip it and you no longer have an arc. You have two loose wires.",
        ),
        formula: null,
        example: line("The knee-jerk can close in the spinal cord before the cortex has a say."),
      },
      {
        id: "not-circle",
        title: line("It is not a circle because the body “reacts”"),
        body: line(
          "A reaction is the result. The arc is the route. Calling it a loop of thought hides the only place the signal changes direction: the center. Interneurons may sit there. They do not turn the arc into an idea.",
        ),
        formula: null,
        example: null,
      },
    ],
    check: {
      prompt: line("What does the center do in the arc?"),
      choices: [
        line("It connects the afferent neuron to the efferent neuron"),
        line("It is the muscle that moves"),
        line("It stores the feeling of pain"),
        line("It sends the signal back into the receptor"),
      ],
      answerIndex: 0,
      why: line(
        "The center is the junction. The muscle is the effector. Pain is not a part of the arc, and the signal does not return to the receptor.",
      ),
    },
  },
  {
    id: "chem-four-bonds",
    subject: "chemistry",
    source: "guided",
    minutes: 6,
    title: line("Each carbon still has four bonds"),
    stuckPoint: line("The formula C₄H₁₀ is treated as if it were already a structure."),
    steps: [
      {
        id: "count",
        title: line("Finish the sticks"),
        body: line(
          "In an alkane every carbon makes four single bonds. A drawing that shows a carbon with two sticks and no implied hydrogens is unfinished. Count bonds before you name the molecule.",
        ),
        formula: "\\mathrm{C_4H_{10}}",
        example: line("A carbon drawn with only two bonds is not “simplified butane”. It is not a finished carbon."),
      },
      {
        id: "two-graphs",
        title: line("Same formula, two connectivities"),
        body: line(
          "C₄H₁₀ has two isomer skeletons. n-Butane is a chain of four carbons. 2-Methylpropane has a chain of three, with the fourth carbon bonded to the middle one. Same atoms, different neighbor lists. That difference is the isomerism, not a different handwriting of one picture.",
        ),
        formula: null,
        example: null,
      },
    ],
    check: {
      prompt: line("Two molecules are structural isomers when they have"),
      choices: [
        line("the same atoms and a different connectivity"),
        line("the same drawing and a different name"),
        line("the same boiling point"),
        line("a different number of carbon atoms"),
      ],
      answerIndex: 0,
      why: line(
        "Isomers share a molecular formula and differ in which atom is bonded to which. A new name for the same drawing is not an isomer, and a different carbon count is a different formula.",
      ),
    },
  },
  {
    id: "chem-longest-chain",
    subject: "chemistry",
    source: "guided",
    minutes: 5,
    title: line("The name follows the longest chain"),
    stuckPoint: line("2-Methylpropane gets called butane because four carbons are visible."),
    steps: [
      {
        id: "parent",
        title: line("Parent chain, then the branch"),
        body: line(
          "Find the longest continuous carbon chain and name that as the parent. Then name what is left as a branch and give the number of the carbon it sits on. In 2-methylpropane the longest chain has three carbons, so the parent is propane. The fourth carbon is the methyl branch on carbon 2.",
        ),
        formula: null,
        example: line("Four carbons in the molecule does not mean the parent name is butane."),
      },
      {
        id: "nickname",
        title: line("“Iso” is a nickname"),
        body: line(
          "Isobutane is a common name for 2-methylpropane. It does not prove the structure. If you cannot point at the branch carbon, you have recalled a word, not drawn the isomer.",
        ),
        formula: null,
        example: null,
      },
    ],
    check: {
      prompt: line("In 2-methylpropane the longest chain has"),
      choices: [line("3 carbons"), line("4 carbons"), line("2 carbons"), line("5 carbons")],
      answerIndex: 0,
      why: line(
        "The parent is propane: three carbons in a row. The fourth carbon is a branch, so it is not counted as part of the longest chain.",
      ),
    },
  },
  {
    id: "math-discriminant",
    subject: "mathematics",
    source: "guided",
    minutes: 6,
    title: line("The discriminant is the fork"),
    stuckPoint: line("The quadratic formula is used even when it does not apply, or the sign of D is ignored."),
    steps: [
      {
        id: "cases",
        title: line("Three cases, before any root"),
        body: line(
          "For ax² + bx + c = 0 with a ≠ 0, compute D = b² − 4ac first. D > 0 means two distinct real roots. D = 0 means one real root, a double root. D < 0 means no real root. The formula is the next line, not a replacement for this fork.",
        ),
        formula: "D=b^{2}-4ac",
        example: line("x² + 1 = 0 has D = −4. Stop. There is no real x."),
      },
      {
        id: "not-quadratic",
        title: line("If a is zero, stop"),
        body: line(
          "The formula divides by 2a. When a = 0 the equation is linear, or it is not an equation in x at all. Do not paste the quadratic formula onto it.",
        ),
        formula: null,
        example: null,
      },
    ],
    check: {
      prompt: line("If D < 0, the quadratic equation has"),
      choices: [
        line("no real roots"),
        line("two distinct real roots"),
        line("one real root"),
        line("a root at x = 0"),
      ],
      answerIndex: 0,
      why: line(
        "A negative discriminant means the square root is not real, so neither branch of the formula yields a real root. Two real roots need D > 0. One real root needs D = 0.",
      ),
    },
  },
  {
    id: "math-sign",
    subject: "mathematics",
    source: "guided",
    minutes: 6,
    title: line("The ± sign is two substitutions"),
    stuckPoint: line("One root is written down and the minus branch is treated as optional."),
    steps: [
      {
        id: "twice",
        title: line("Write the line twice"),
        body: line(
          "x = (−b ± √D) / (2a) means two evaluations when D > 0: one with the plus, one with the minus. The symbol is not decoration you may drop after the first root looks familiar.",
        ),
        formula: "x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}",
        example: line("For x² − 5x + 6 = 0 the two branches are x = 3 and x = 2, not “x = 3, and the minus is obvious.”"),
      },
      {
        id: "bar",
        title: line("The bar covers the whole numerator"),
        body: line(
          "The denominator is 2a, not 2. A fraction bar that sits only over −b, with ± √D written beside it, is a different expression. So is a denominator of 2 when a is not 1.",
        ),
        formula: null,
        example: null,
      },
    ],
    check: {
      prompt: line("The denominator of the quadratic formula is"),
      choices: [line("2a"), line("2"), line("a"), line("b")],
      answerIndex: 0,
      why: line(
        "Completing the square divides by a and then by 2, so the finished denominator is 2a. Using 2 is only right when a happens to be 1.",
      ),
    },
  },
];

const order: Record<SubjectId, string[]> = {
  biology: ["bio-reflex-arc", "bio-afferent", "bio-center"],
  chemistry: ["chem-c4h10", "chem-four-bonds", "chem-longest-chain"],
  mathematics: ["math-quadratic", "math-discriminant", "math-sign"],
};

export function pathFor(subject: SubjectId): Lesson[] {
  const all = [...LESSONS, ...stations];
  return order[subject].map((id) => {
    const lesson = all.find((item) => item.id === id);
    if (!lesson) throw new Error(`Missing path station ${id}`);
    return lesson;
  });
}

export function lessonById(id: string): Lesson | undefined {
  return [...LESSONS, ...stations].find((item) => item.id === id);
}
