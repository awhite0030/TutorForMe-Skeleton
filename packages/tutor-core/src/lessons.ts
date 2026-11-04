import type { Lesson, SubjectId } from "./types.ts";

export const SUBJECTS: Array<{
  id: SubjectId;
  label: { en: string; ru: string };
  blurb: { en: string; ru: string };
}> = [
  {
    id: "biology",
    label: { en: "Biology", ru: "Биология" },
    blurb: {
      en: "Pathways, not slogans. Draw the arc before you name the feeling.",
      ru: "Схема пути, а не лозунг. Сначала дуга, потом ощущение.",
    },
  },
  {
    id: "chemistry",
    label: { en: "Chemistry", ru: "Химия" },
    blurb: {
      en: "Count connectivity. The formula is not the structure.",
      ru: "Считай связанность. Формула — ещё не строение.",
    },
  },
  {
    id: "mathematics",
    label: { en: "Mathematics", ru: "Математика" },
    blurb: {
      en: "One derivation, then a clean substitution. Signs included.",
      ru: "Один вывод, потом аккуратная подстановка. Знаки тоже считаются.",
    },
  },
];

export const LESSONS: Lesson[] = [
  {
    id: "bio-reflex-arc",
    subject: "biology",
    source: "guided",
    minutes: 8,
    title: { en: "The reflex arc", ru: "Рефлекторная дуга" },
    stuckPoint: {
      en: "A reflex is not the feeling of pain. It is the path the signal takes.",
      ru: "Рефлекс — это не ощущение боли. Это путь, по которому идёт сигнал.",
    },
    steps: [
      {
        id: "five-links",
        title: {
          en: "Name the five links, in order",
          ru: "Назови пять звеньев по порядку",
        },
        body: {
          en: "A reflex is a fast involuntary response. The **reflex arc** is the anatomical route of that response. On a test, write five links and do not shuffle them: **receptor → sensory (afferent) neuron → nerve center → motor (efferent) neuron → effector**. The effector is a muscle or a gland, not “the body”.",
          ru: "Рефлекс — быстрый непроизвольный ответ. **Рефлекторная дуга** — анатомический путь этого ответа. На контрольной пиши пять звеньев и не переставляй их: **рецептор → чувствительный (афферентный) нейрон → нервный центр → двигательный (эфферентный) нейрон → эффектор**. Эффектор — мышца или железа, а не «организм».",
        },
        formula: null,
        example: {
          en: "Hot stove, hand pulls back. Receptor in the skin, effector is the flexor muscle. The names in between are the part people skip.",
          ru: "Горячая плита, рука отдёргивается. Рецептор в коже, эффектор — мышца-сгибатель. Промежуточные названия как раз и пропускают.",
        },
      },
      {
        id: "direction",
        title: {
          en: "Afferent and efferent are directions",
          ru: "Афферентный и эфферентный — это направления",
        },
        body: {
          en: "**Afferent** means carrying the impulse toward the central nervous system. **Efferent** means carrying it away, out to the effector. If those two arrows are swapped, the arc is backwards and no response can be produced. Memorize the direction, not a picture from one textbook page.",
          ru: "**Афферентный** — несёт импульс к центральной нервной системе. **Эфферентный** — несёт его от центра к эффектору. Если стрелки перепутаны, дуга развёрнута наоборот, и ответа не получится. Запоминай направление, а не картинку с одной страницы.",
        },
        formula: null,
        example: {
          en: "Knee-jerk: a stretch receptor in the quadriceps tendon is the start. The tap is not the receptor. The receptor is the sensor that the tap activates.",
          ru: "Коленный рефлекс: начало — рецептор растяжения в сухожилии четырёхглавой мышцы. Удар молоточком — не рецептор. Рецептор — датчик, который этот удар включает.",
        },
      },
      {
        id: "center",
        title: {
          en: "The center is not a decision",
          ru: "Центр — это не «решение»",
        },
        body: {
          en: "The knee-jerk is **monosynaptic**: in the spinal cord the sensory neuron synapses directly on the motor neuron. The brain is not required for the jerk. A withdrawal reflex (hand off a hot object) is **polysynaptic**: an interneuron sits in the center, so more than one muscle can be recruited. Pain is a separate ascending message. The hand moves before you feel it.",
          ru: "Коленный рефлекс **моносинаптический**: в спинном мозге чувствительный нейрон напрямую синапсирует на двигательный. Мозг для самого рывка не нужен. Рефлекс отдёргивания (рука с горячего) **полисинаптический**: в центре есть вставочный нейрон, поэтому можно включить не одну мышцу. Боль — отдельное восходящее сообщение. Рука двигается раньше, чем ты её чувствуешь.",
        },
        formula: null,
        example: {
          en: "If a question says “unconditional reflex”, do not add a cortex step called “the person decides”. The arc can run without that.",
          ru: "Если в вопросе «безусловный рефлекс», не добавляй шаг коры «человек решил». Дуга может сработать без этого.",
        },
      },
      {
        id: "draw",
        title: {
          en: "What to draw when the wording is vague",
          ru: "Что рисовать, если формулировка расплывчатая",
        },
        body: {
          en: "Draw five boxes in one row. One arrow only, left to right. Label the two ends first: receptor and effector. Then mark afferent and efferent on the neurons, and write where the center is (spinal cord for these textbook jerks and withdrawals). If you cannot point to the stuck box, you do not have a stuck point yet — you only have a word.",
          ru: "Нарисуй пять прямоугольников в один ряд. Одна стрелка, слева направо. Сначала подпиши концы: рецептор и эффектор. Потом пометь афферентный и эфферентный нейроны и где центр (для этих учебниковых рывков и отдёргиваний — спинной мозг). Если не можешь показать пальцем застрявший прямоугольник, у тебя ещё нет места застревания — есть только слово.",
        },
        formula: null,
        example: null,
      },
    ],
    check: {
      prompt: {
        en: "The knee-jerk is monosynaptic. Which link does a withdrawal reflex add inside the center?",
        ru: "Коленный рефлекс моносинаптический. Какое звено рефлекс отдёргивания добавляет внутри центра?",
      },
      choices: [
        { en: "A second receptor", ru: "Второй рецептор" },
        { en: "An interneuron", ru: "Вставочный нейрон" },
        { en: "A second effector only", ru: "Только второй эффектор" },
        { en: "The cerebral cortex as a required synapse", ru: "Кору мозга как обязательный синапс" },
      ],
      answerIndex: 1,
      why: {
        en: "Withdrawal is polysynaptic: an interneuron in the spinal center sits between the sensory and motor neurons. The knee-jerk skips that synapse. The cortex is not a required link of either arc.",
        ru: "Отдёргивание полисинаптическое: вставочный нейрон в спинном центре стоит между чувствительным и двигательным. Коленный рефлекс этот синапс пропускает. Кора не обязательное звено ни одной из этих дуг.",
      },
    },
  },
  {
    id: "chem-c4h10",
    subject: "chemistry",
    source: "guided",
    minutes: 7,
    title: {
      en: "Structural isomers of C₄H₁₀",
      ru: "Структурные изомеры C₄H₁₀",
    },
    stuckPoint: {
      en: "Same molecular formula is not the same substance. C₄H₁₀ has two connectivities, not four.",
      ru: "Одинаковая молекулярная формула — ещё не одно вещество. У C₄H₁₀ две связности, не четыре.",
    },
    steps: [
      {
        id: "definition",
        title: {
          en: "Isomer means different connectivity",
          ru: "Изомер — это другая связность",
        },
        body: {
          en: "**Structural isomers** share a molecular formula and differ in which atoms are bonded to which. For an alkane, C₄H₁₀ is saturated: no double bond and no ring, or the hydrogen count would drop. There are exactly two skeletons: an unbranched chain of four carbons, and a chain of three with one carbon as a branch.",
          ru: "**Структурные изомеры** имеют одну молекулярную формулу и разный порядок связей. Для алкана C₄H₁₀ насыщен: нет двойной связи и нет цикла, иначе водородов было бы меньше. Скелета ровно два: неразветвлённая цепь из четырёх углеродов и цепь из трёх с одним углеродом в ответвлении.",
        },
        formula: "\\mathrm{C_4H_{10}}",
        example: {
          en: "Writing the formula four times with the atoms in a different reading order does not create four isomers.",
          ru: "Четыре раза переписать формулу «в другом порядке чтения» — это не четыре изомера.",
        },
      },
      {
        id: "count",
        title: {
          en: "Count by shortening the chain",
          ru: "Считай, укорачивая цепь",
        },
        body: {
          en: "Start with the longest chain: four carbons in a row, **n-butane**. Then move one carbon off the end and attach it to an inner carbon. The longest chain is now three, and the branch is a methyl group: **2-methylpropane**. A “chain of two” cannot hold the leftover carbons without collapsing back into one of these two drawings. So the count stops at 2.",
          ru: "Начни с самой длинной цепи: четыре углерода подряд, **н-бутан**. Потом сними один углерод с конца и посади его на внутренний. Самая длинная цепь теперь из трёх, ответвление — метил: **2-метилпропан**. «Цепь из двух» не удержит оставшиеся углероды, не схлопнувшись обратно в один из этих двух рисунков. Поэтому счёт останавливается на 2.",
        },
        formula: "\\mathrm{CH_3CH_2CH_2CH_3} \\quad \\text{and} \\quad (\\mathrm{CH_3})_3\\mathrm{CH}",
        example: {
          en: "2-methylpropane is also drawn as (CH₃)₃CH. That is the same connectivity, not a third isomer.",
          ru: "2-метилпропан рисуют и как (CH₃)₃CH. Это та же связность, а не третий изомер.",
        },
      },
      {
        id: "names",
        title: {
          en: "Name them so the chain length is obvious",
          ru: "Назови так, чтобы длина цепи была видна",
        },
        body: {
          en: "n-butane has no branch. 2-methylpropane has the branch on carbon 2 of a three-carbon chain. Do not call the branched isomer “2-methylbutane”: that name is a five-carbon chain. The straight chain packs against its neighbors better, so n-butane boils higher (about −0.5 °C) than 2-methylpropane (about −12 °C). The fact you want is the order, not a memorized tenth of a degree.",
          ru: "н-Бутан без ответвления. У 2-метилпропана ответвление на втором углероде цепи из трёх. Не называй разветвлённый изомер «2-метилбутаном»: это имя цепи из пяти углеродов. Прямая цепь лучше прилегает к соседям, поэтому н-бутан кипит выше (около −0,5 °C), чем 2-метилпропан (около −12 °C). Нужен порядок, а не десятая градуса наизусть.",
        },
        formula: null,
        example: null,
      },
      {
        id: "trap",
        title: {
          en: "The usual trap is a different formula",
          ru: "Обычная ловушка — другая формула",
        },
        body: {
          en: "C₄H₈ is not this question. A double bond or a ring changes the hydrogen count, and the isomer list gets longer. If the formula still says H₁₀, stay inside alkanes. Also refuse mirror images here: neither isomer has a carbon with four different substituents, so there is no optical isomerism to add.",
          ru: "C₄H₈ — это другой вопрос. Двойная связь или цикл меняют число водородов, и список изомеров длиннее. Если в формуле всё ещё H₁₀, оставайся внутри алканов. Зеркальные изомеры тут не добавляй: ни у одного изомера нет углерода с четырьмя разными заместителями, оптической изомерии нет.",
        },
        formula: null,
        example: {
          en: "If your sketch has a double bond, recount the hydrogens before you call it C₄H₁₀.",
          ru: "Если на рисунке появилась двойная связь, пересчитай водороды, прежде чем называть это C₄H₁₀.",
        },
      },
    ],
    check: {
      prompt: {
        en: "How many structural isomers does C₄H₁₀ have?",
        ru: "Сколько структурных изомеров у C₄H₁₀?",
      },
      choices: [
        { en: "1", ru: "1" },
        { en: "2", ru: "2" },
        { en: "3", ru: "3" },
        { en: "4", ru: "4" },
      ],
      answerIndex: 1,
      why: {
        en: "Only n-butane and 2-methylpropane. Different drawings of the same branched skeleton are still one isomer. C₄H₈ would be a different count.",
        ru: "Только н-бутан и 2-метилпропан. Разные рисунки одного и того же разветвлённого скелета — всё ещё один изомер. У C₄H₈ был бы другой счёт.",
      },
    },
  },
  {
    id: "math-quadratic",
    subject: "mathematics",
    source: "guided",
    minutes: 9,
    title: { en: "The quadratic formula", ru: "Квадратное уравнение" },
    stuckPoint: {
      en: "The formula is the end of completing the square, not a spell to memorize past the signs.",
      ru: "Формула — это конец выделения полного квадрата, а не заклинание, в котором можно потерять знаки.",
    },
    steps: [
      {
        id: "statement",
        title: {
          en: "What it claims",
          ru: "Что она утверждает",
        },
        body: {
          en: "For \\(ax^2 + bx + c = 0\\) with \\(a \\neq 0\\), the solutions are the two values (or one, or none in the reals) given by the formula below. It does not invent new roots. It is what remains after you complete the square and clear the denominator.",
          ru: "Для \\(ax^2 + bx + c = 0\\) при \\(a \\neq 0\\) решения — это два значения (или одно, или ни одного в вещественных), которые даёт формула ниже. Новых корней она не изобретает. Это то, что остаётся, когда выделили полный квадрат и убрали знаменатель.",
        },
        formula: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        example: {
          en: "If a is zero, this is not a quadratic. Do not plug a = 0 into the formula.",
          ru: "Если a равно нулю, это уже не квадратное уравнение. Не подставляй a = 0 в формулу.",
        },
      },
      {
        id: "square",
        title: {
          en: "The line people skip",
          ru: "Строка, которую пропускают",
        },
        body: {
          en: "Divide by a first. Move the constant. Half of the new linear coefficient is \\(b/(2a)\\). Add the square of that number to both sides. The left side becomes one perfect square. Everything ugly on the right is bookkeeping you can simplify — it is not a new idea.",
          ru: "Сначала раздели на a. Перенеси свободный член. Половина нового коэффициента при x — это \\(b/(2a)\\). Прибавь квадрат этого числа к обеим частям. Слева получится один полный квадрат. Всё неприятное справа — это аккуратная запись, её можно упростить. Это не новая идея.",
        },
        formula: "\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}",
        example: null,
      },
      {
        id: "discriminant",
        title: {
          en: "Where the discriminant shows up",
          ru: "Откуда берётся дискриминант",
        },
        body: {
          en: "Take square roots. The denominator contributes \\(2a\\), with a sign you must not drop. The numerator contributes \\(\\sqrt{b^2 - 4ac}\\). That expression under the root is the **discriminant**. Negative: no real root. Zero: the two ± branches are the same root. Positive: two real roots.",
          ru: "Извлеки корень. Знаменатель даёт \\(2a\\), и знак терять нельзя. Числитель даёт \\(\\sqrt{b^2 - 4ac}\\). Выражение под корнем — **дискриминант**. Отрицательный: вещественных корней нет. Ноль: две ветки ± схлопываются в один корень. Положительный: два вещественных корня.",
        },
        formula: "D = b^2 - 4ac",
        example: {
          en: "People lose a root by writing only the “+” branch. The ± is the whole point of the square root.",
          ru: "Корень теряют, когда пишут только ветку с «+». Знак ± — это и есть смысл квадратного корня.",
        },
      },
      {
        id: "substitute",
        title: {
          en: "Substitute with the signs still attached",
          ru: "Подставляй, не отрывая знаки",
        },
        body: {
          en: "Write a, b, and c before any arithmetic, including minus signs. For \\(x^2 - 5x + 6 = 0\\): a = 1, b = −5, c = 6. Then D = 25 − 24 = 1, and \\(x = (5 \\pm 1)/2\\), so x = 3 or x = 2. Check by factoring: (x − 2)(x − 3). If those disagree, the substitution is wrong, not the factoring.",
          ru: "Выпиши a, b и c до всякой арифметики, вместе с минусами. Для \\(x^2 - 5x + 6 = 0\\): a = 1, b = −5, c = 6. Тогда D = 25 − 24 = 1 и \\(x = (5 \\pm 1)/2\\), то есть x = 3 или x = 2. Проверка разложением: (x − 2)(x − 3). Если не сошлось, ошибка в подстановке, а не в разложении.",
        },
        formula: "x^2 - 5x + 6 = 0",
        example: {
          en: "b is −5, so −b is +5. The two minuses are the usual place the answer flips.",
          ru: "b равен −5, значит −b равен +5. Два минуса — обычное место, где ответ переворачивается.",
        },
      },
    ],
    check: {
      prompt: {
        en: "Which pair solves x² − 5x + 6 = 0?",
        ru: "Какая пара является решением x² − 5x + 6 = 0?",
      },
      choices: [
        { en: "1 and 6", ru: "1 и 6" },
        { en: "2 and 3", ru: "2 и 3" },
        { en: "−2 and −3", ru: "−2 и −3" },
        { en: "5 and 6", ru: "5 и 6" },
      ],
      answerIndex: 1,
      why: {
        en: "D = (−5)² − 4·1·6 = 1, so x = (5 ± 1)/2, which is 3 and 2. The negative pair would solve x² + 5x + 6 = 0, a different sign on b.",
        ru: "D = (−5)² − 4·1·6 = 1, значит x = (5 ± 1)/2, то есть 3 и 2. Пара с минусами решает x² + 5x + 6 = 0 — там другой знак у b.",
      },
    },
  },
];

export function lessonsFor(subject: SubjectId): Lesson[] {
  return LESSONS.filter((lesson) => lesson.subject === subject);
}

export function getLesson(id: string): Lesson | undefined {
  return LESSONS.find((lesson) => lesson.id === id);
}
