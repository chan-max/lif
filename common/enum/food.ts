

export const foodCompositions = [
    // 宏量营养素 (Macronutrients)
    {
        key: "water",
        name: "Water",
        chineseName: "水",
        unit: "g",
        description: "水是生命的基本组成部分，支持所有生理功能，包括体温调节、营养输送和代谢废物排出。"
    },
    {
        key: "total_carbohydrates",
        name: "Total Carbohydrates",
        chineseName: "总碳水化合物",
        unit: "g",
        description: "碳水化合物是提供能量的主要来源，包括简单糖和复杂的多糖。"
    },
    {
        key: "sugars",
        name: "Sugars",
        chineseName: "糖分",
        unit: "g",
        description: "简单糖是碳水化合物的主要形式，提供快速能量。"
    },
    {
        key: "fiber",
        name: "Dietary Fiber",
        chineseName: "膳食纤维",
        unit: "g",
        description: "纤维分为可溶性和不可溶性，支持消化健康和胆固醇控制。"
    },
    {
        key: "starch",
        name: "Starch",
        chineseName: "淀粉",
        unit: "g",
        description: "淀粉是复杂碳水化合物，由植物储存的能量，消化后提供持久能量。"
    },
    {
        key: "total_fats",
        name: "Total Fats",
        chineseName: "总脂肪",
        unit: "g",
        description: "脂肪是能量密集的营养素，为细胞膜提供结构，并在某些情况下保护器官。"
    },
    {
        key: "saturated_fats",
        name: "Saturated Fats",
        chineseName: "饱和脂肪",
        unit: "g",
        description: "饱和脂肪在动物脂肪中常见，过量可能对心血管健康有害。"
    },
    {
        key: "monounsaturated_fats",
        name: "Monounsaturated Fats",
        chineseName: "单不饱和脂肪",
        unit: "g",
        description: "单不饱和脂肪有益于心血管健康，降低坏胆固醇。"
    },
    {
        key: "polyunsaturated_fats",
        name: "Polyunsaturated Fats",
        chineseName: "多不饱和脂肪",
        unit: "g",
        description: "多不饱和脂肪包括 Omega-3 和 Omega-6，支持脑部发育和抗炎。"
    },
    {
        key: "cholesterol",
        name: "Cholesterol",
        chineseName: "胆固醇",
        unit: "mg",
        description: "胆固醇是细胞膜的组成部分，过量摄入可能导致心血管疾病。"
    },
    {
        key: "total_proteins",
        name: "Total Proteins",
        chineseName: "总蛋白质",
        unit: "g",
        description: "蛋白质是细胞修复、生长和酶生成的重要成分，由氨基酸组成。"
    },

    // 维生素 (Vitamins)
    { key: "vitamin_a", name: "Vitamin A", chineseName: "维生素 A", unit: "mcg", description: "支持视力健康、细胞生长和免疫功能。" },
    { key: "vitamin_c", name: "Vitamin C", chineseName: "维生素 C", unit: "mg", description: "水溶性维生素，增强免疫力，促进胶原蛋白生成。" },
    { key: "vitamin_d", name: "Vitamin D", chineseName: "维生素 D", unit: "mcg", description: "脂溶性维生素，促进钙吸收，维护骨骼健康。" },
    { key: "vitamin_e", name: "Vitamin E", chineseName: "维生素 E", unit: "mg", description: "抗氧化剂，保护细胞免受自由基损害。" },
    { key: "vitamin_k", name: "Vitamin K", chineseName: "维生素 K", unit: "mcg", description: "促进血液凝固和骨骼代谢。" },

    // B族维生素 (Vitamin B Complex)
    { key: "vitamin_b1", name: "Vitamin B1 (Thiamine)", chineseName: "维生素 B1（硫胺素）", unit: "mg", description: "参与能量代谢，维持神经系统健康。" },
    { key: "vitamin_b2", name: "Vitamin B2 (Riboflavin)", chineseName: "维生素 B2（核黄素）", unit: "mg", description: "支持能量生产，促进皮肤和视力健康。" },
    { key: "vitamin_b3", name: "Vitamin B3 (Niacin)", chineseName: "维生素 B3（烟酸）", unit: "mg", description: "支持代谢和DNA修复，改善胆固醇水平。" },
    { key: "vitamin_b5", name: "Vitamin B5 (Pantothenic Acid)", chineseName: "维生素 B5（泛酸）", unit: "mg", description: "参与脂肪酸代谢，支持激素合成和神经健康。" },
    { key: "vitamin_b6", name: "Vitamin B6 (Pyridoxine)", chineseName: "维生素 B6（吡哆醇）", unit: "mg", description: "支持神经递质的生成和蛋白质代谢。" },
    { key: "vitamin_b7", name: "Vitamin B7 (Biotin)", chineseName: "维生素 B7（生物素）", unit: "mcg", description: "支持脂肪和碳水化合物代谢，维护皮肤和头发健康。" },
    { key: "vitamin_b9", name: "Vitamin B9 (Folate)", chineseName: "维生素 B9（叶酸）", unit: "mcg", description: "促进细胞分裂和红细胞生成，对孕妇尤为重要。" },
    { key: "vitamin_b12", name: "Vitamin B12 (Cobalamin)", chineseName: "维生素 B12（钴胺素）", unit: "mcg", description: "支持神经系统功能和红细胞生成。" },

    // 矿物质 (Minerals)
    { key: "calcium", name: "Calcium", chineseName: "钙", unit: "mg", description: "支持骨骼和牙齿健康，参与肌肉收缩和神经传递。" },
    { key: "iron", name: "Iron", chineseName: "铁", unit: "mg", description: "帮助输送氧气，是血红蛋白的重要成分。" },
    { key: "magnesium", name: "Magnesium", chineseName: "镁", unit: "mg", description: "支持能量代谢、肌肉功能和骨骼健康。" },
    { key: "potassium", name: "Potassium", chineseName: "钾", unit: "mg", description: "调节体液平衡，支持神经功能和肌肉收缩。" },
    { key: "sodium", name: "Sodium", chineseName: "钠", unit: "mg", description: "维持体液平衡，支持神经传递和肌肉功能。" },
    { key: "zinc", name: "Zinc", chineseName: "锌", unit: "mg", description: "支持免疫功能，促进伤口愈合和细胞分裂。" },
    { key: "copper", name: "Copper", chineseName: "铜", unit: "mg", description: "支持红细胞生成和抗氧化功能。" },
    { key: "selenium", name: "Selenium", chineseName: "硒", unit: "mcg", description: "抗氧化剂，保护细胞免受氧化损伤。" },
    { key: "phosphorus", name: "Phosphorus", chineseName: "磷", unit: "mg", description: "支持骨骼和牙齿健康，是能量代谢的重要组成部分。" },
    { key: "manganese", name: "Manganese", chineseName: "锰", unit: "mg", description: "参与骨骼发育、能量代谢和抗氧化过程。" },
    { key: "iodine", name: "Iodine", chineseName: "碘", unit: "mcg", description: "支持甲状腺功能，调节新陈代谢。" },
    { key: "fluoride", name: "Fluoride", chineseName: "氟", unit: "mg", description: "有助于牙齿和骨骼健康。" }
];
