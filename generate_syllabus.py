import json

syllabus = [
    {
        "className": "Class 8",
        "subjects": [
            {
                "name": "Science",
                "chapters": [
                    {"name": "Crop Production and Management", "modules": ["Agricultural Practices", "Preparation of Soil", "Sowing", "Adding Manure and Fertilisers", "Irrigation", "Protection from Weeds", "Harvesting", "Storage", "Food from Animals"]},
                    {"name": "Microorganisms: Friend and Foe", "modules": ["Microorganisms", "Where do Microorganisms Live?", "Microorganisms and Us", "Harmful Microorganisms", "Food Preservation", "Nitrogen Fixation", "Nitrogen Cycle"]},
                    {"name": "Coal and Petroleum", "modules": ["Coal", "Petroleum", "Natural Gas", "Some Natural Resources are Limited"]},
                    {"name": "Combustion and Flame", "modules": ["What is Combustion?", "How Do We Control Fire?", "Types of Combustion", "Flame", "Structure of a Flame", "What is a Fuel?", "Fuel Efficiency"]},
                    {"name": "Conservation of Plants and Animals", "modules": ["Deforestation and Its Causes", "Consequences of Deforestation", "Conservation of Forest and Wildlife", "Biosphere Reserve", "Flora and Fauna", "Endemic Species", "Wildlife Sanctuary", "National Park", "Red Data Book", "Migration", "Recycling of Paper", "Reforestation"]},
                    {"name": "Reproduction in Animals", "modules": ["Modes of Reproduction", "Sexual Reproduction", "Asexual Reproduction"]},
                    {"name": "Reaching the Age of Adolescence", "modules": ["Adolescence and Puberty", "Changes at Puberty", "Secondary Sexual Characters", "Role of Hormones in Initiating Reproductive Function", "Reproductive Phase of Life in Humans", "How is the Sex of the Baby Determined?", "Hormones other than Sex Hormones", "Role of Hormones in Completing the Life History of Insects and Frogs", "Reproductive Health"]},
                    {"name": "Force and Pressure", "modules": ["Force - A Push or a Pull", "Forces are due to an Interaction", "Exploring Forces", "A Force can Change the State of Motion", "Force can Change the Shape of an Object", "Contact Forces", "Non-contact Forces", "Pressure", "Pressure Exerted by Liquids and Gases", "Atmospheric Pressure"]},
                    {"name": "Friction", "modules": ["Force of Friction", "Factors affecting Friction", "Friction: A Necessary Evil", "Increasing and Reducing Friction", "Wheels Reduce Friction", "Fluid Friction"]},
                    {"name": "Sound", "modules": ["Sound is Produced by a Vibrating Body", "Sound Produced by Humans", "Sound Needs a Medium for Propagation", "We Hear Sound through Our Ears", "Amplitude, Time Period and Frequency of a Vibration", "Audible and Inaudible Sounds", "Noise and Music", "Noise Pollution"]},
                    {"name": "Chemical Effects of Electric Current", "modules": ["Do Liquids Conduct Electricity?", "Chemical Effects of Electric Current", "Electroplating"]},
                    {"name": "Some Natural Phenomena", "modules": ["Lightning", "Charging by Rubbing", "Transfer of Charge", "The Story of Lightning", "Lightning Safety", "Earthquakes"]},
                    {"name": "Light", "modules": ["What makes Things Visible", "Laws of Reflection", "Regular and Diffused Reflection", "Reflected Light Can be Reflected Again", "Multiple Images", "Sunlight - White or Coloured", "What is inside Our Eyes?", "Care of the Eyes", "Visually Impaired Persons Can Read and Write", "What is the Braille System?"]}
                ]
            },
            {
                "name": "Mathematics",
                "chapters": [
                    {"name": "Rational Numbers", "modules": ["Properties of Rational Numbers", "Representation of Rational Numbers on the Number Line", "Rational Numbers between Two Rational Numbers"]},
                    {"name": "Linear Equations in One Variable", "modules": ["Solving Equations which have Linear Expressions on one Side and Numbers on the other Side", "Some Applications", "Solving Equations having the Variable on both Sides", "Some More Applications", "Reducing Equations to Simpler Form", "Equations Reducible to the Linear Form"]},
                    {"name": "Understanding Quadrilaterals", "modules": ["Polygons", "Sum of the Measures of the Exterior Angles of a Polygon", "Kinds of Quadrilaterals", "Some Special Parallelograms"]},
                    {"name": "Data Handling", "modules": ["Looking for Information", "Organising Data", "Grouping Data", "Circle Graph or Pie Chart", "Chance and Probability"]},
                    {"name": "Squares and Square Roots", "modules": ["Properties of Square Numbers", "Some More Interesting Patterns", "Finding the Square of a Number", "Square Roots", "Square Roots of Decimals", "Estimating Square Root"]},
                    {"name": "Cubes and Cube Roots", "modules": ["Cubes", "Cube Roots"]},
                    {"name": "Comparing Quantities", "modules": ["Recalling Ratios and Percentages", "Finding the Increase or Decrease Per cent", "Finding Discounts", "Prices Related to Buying and Selling (Profit and Loss)", "Sales Tax/Value Added Tax", "Compound Interest", "Deducing a Formula for Compound Interest", "Rate Compounded Annually or Half Yearly", "Applications of Compound Interest Formula"]},
                    {"name": "Algebraic Expressions and Identities", "modules": ["What are Expressions?", "Terms, Factors and Coefficients", "Monomials, Binomials and Polynomials", "Like and Unlike Terms", "Addition and Subtraction of Algebraic Expressions", "Multiplication of Algebraic Expressions: Introduction", "Multiplying a Monomial by a Monomial", "Multiplying a Monomial by a Polynomial", "Multiplying a Polynomial by a Polynomial", "What is an Identity?", "Standard Identities", "Applying Identities"]},
                    {"name": "Mensuration", "modules": ["Let us Recall", "Area of Trapezium", "Area of a General Quadrilateral", "Area of a Polygon", "Solid Shapes", "Surface Area of Cube, Cuboid and Cylinder", "Volume of Cube, Cuboid and Cylinder", "Volume and Capacity"]},
                    {"name": "Exponents and Powers", "modules": ["Powers with Negative Exponents", "Laws of Exponents", "Use of Exponents to Express Small Numbers in Standard Form"]},
                    {"name": "Direct and Inverse Proportions", "modules": ["Direct Proportion", "Inverse Proportion"]},
                    {"name": "Factorisation", "modules": ["What is Factorisation?", "Method of Common Factors", "Factorisation by Regrouping Terms", "Factorisation using Identities", "Factors of the form (x+a)(x+b)", "Division of Algebraic Expressions", "Division of a Polynomial by a Monomial", "Division of Algebraic Expressions Continued", "Can you Find the Error?"]},
                    {"name": "Introduction to Graphs", "modules": ["A Bar Graph", "A Pie Graph", "A Histogram", "A Line Graph", "Linear Graphs", "Some Applications"]}
                ]
            }
        ]
    },
    {
        "className": "Class 9",
        "subjects": [
            {
                "name": "Science",
                "chapters": [
                    {"name": "Matter in Our Surroundings", "modules": ["Physical Nature of Matter", "Characteristics of Particles of Matter", "States of Matter", "Can Matter Change its State?", "Evaporation"]},
                    {"name": "Is Matter Around Us Pure", "modules": ["What is a Mixture?", "What is a Solution?", "Separating the Components of a Mixture", "Physical and Chemical Changes", "What are the Types of Pure Substances?"]},
                    {"name": "Atoms and Molecules", "modules": ["Laws of Chemical Combination", "What is an Atom?", "What is a Molecule?", "Writing Chemical Formulae", "Molecular Mass and Mole Concept"]},
                    {"name": "Structure of the Atom", "modules": ["Charged Particles in Matter", "The Structure of an Atom", "How are Electrons Distributed in Different Orbits (Shells)?", "Valency", "Atomic Number and Mass Number", "Isotopes"]},
                    {"name": "The Fundamental Unit of Life", "modules": ["What are Living Organisms Made Up of?", "What is a Cell Made Up of? What is the Structural Organisation of a Cell?"]},
                    {"name": "Tissues", "modules": ["Are Plants and Animals Made of Same Types of Tissues?", "Plant Tissues", "Animal Tissues"]},
                    {"name": "Motion", "modules": ["Describing Motion", "Measuring the Rate of Motion", "Rate of Change of Velocity", "Graphical Representation of Motion", "Equations of Motion by Graphical Method", "Uniform Circular Motion"]},
                    {"name": "Force and Laws of Motion", "modules": ["Balanced and Unbalanced Forces", "First Law of Motion", "Inertia and Mass", "Second Law of Motion", "Third Law of Motion", "Conservation of Momentum"]},
                    {"name": "Gravitation", "modules": ["Gravitation", "Free Fall", "Mass", "Weight", "Thrust and Pressure", "Archimedes' Principle", "Relative Density"]},
                    {"name": "Work and Energy", "modules": ["Work", "Energy", "Rate of Doing Work"]},
                    {"name": "Sound", "modules": ["Production of Sound", "Propagation of Sound", "Reflection of Sound", "Range of Hearing", "Applications of Ultrasound", "Structure of Human Ear"]},
                    {"name": "Improvement in Food Resources", "modules": ["Improvement in Crop Yields", "Animal Husbandry"]}
                ]
            }
        ]
    }
]

with open('src/data/ncertSyllabus.json', 'w') as f:
    json.dump(syllabus, f, indent=2)

print("Generated src/data/ncertSyllabus.json")
