import json

syllabus = [
  {
    "className": "Class 8",
    "subjects": [
      {
        "name": "Science",
        "chapters": [
          {"name": "Crop Production and Management", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc101.pdf", "modules": ["Agricultural Practices", "Preparation of Soil", "Sowing", "Adding Manure and Fertilisers"]},
          {"name": "Microorganisms: Friend and Foe", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc102.pdf", "modules": ["Microorganisms", "Where do Microorganisms Live?", "Microorganisms and Us", "Harmful Microorganisms"]},
          {"name": "Coal and Petroleum", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc103.pdf", "modules": ["Coal", "Petroleum", "Natural Gas", "Some Natural Resources are Limited"]},
          {"name": "Combustion and Flame", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc104.pdf", "modules": ["What is Combustion?", "How Do We Control Fire?", "Types of Combustion", "Flame"]},
          {"name": "Conservation of Plants and Animals", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc105.pdf", "modules": ["Deforestation and Its Causes", "Conservation of Forest and Wildlife", "Biosphere Reserve", "National Park"]},
          {"name": "Reproduction in Animals", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc106.pdf", "modules": ["Modes of Reproduction", "Sexual Reproduction", "Asexual Reproduction"]},
          {"name": "Reaching the Age of Adolescence", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc107.pdf", "modules": ["Adolescence and Puberty", "Changes at Puberty", "Secondary Sexual Characters", "Role of Hormones"]},
          {"name": "Force and Pressure", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc108.pdf", "modules": ["Force - A Push or a Pull", "Contact Forces", "Non-contact Forces", "Pressure"]},
          {"name": "Friction", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc109.pdf", "modules": ["Force of Friction", "Factors affecting Friction", "Friction: A Necessary Evil", "Increasing and Reducing Friction"]},
          {"name": "Sound", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc110.pdf", "modules": ["Sound is Produced by a Vibrating Body", "Sound Produced by Humans", "Audible and Inaudible Sounds", "Noise Pollution"]},
          {"name": "Chemical Effects of Electric Current", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc111.pdf", "modules": ["Do Liquids Conduct Electricity?", "Chemical Effects of Electric Current", "Electroplating"]},
          {"name": "Some Natural Phenomena", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc112.pdf", "modules": ["Lightning", "Charging by Rubbing", "Lightning Safety", "Earthquakes"]},
          {"name": "Light", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hesc113.pdf", "modules": ["Laws of Reflection", "Regular and Diffused Reflection", "Multiple Images", "What is inside Our Eyes?"]}
        ]
      },
      {
        "name": "Mathematics",
        "chapters": [
          {"name": "Rational Numbers", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh101.pdf", "modules": ["Properties of Rational Numbers", "Representation of Rational Numbers on the Number Line"]},
          {"name": "Linear Equations in One Variable", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh102.pdf", "modules": ["Solving Equations", "Some Applications", "Reducing Equations to Simpler Form"]},
          {"name": "Understanding Quadrilaterals", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh103.pdf", "modules": ["Polygons", "Sum of the Measures of the Exterior Angles", "Kinds of Quadrilaterals"]},
          {"name": "Data Handling", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh104.pdf", "modules": ["Looking for Information", "Organising Data", "Grouping Data", "Circle Graph or Pie Chart", "Chance and Probability"]},
          {"name": "Squares and Square Roots", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh105.pdf", "modules": ["Properties of Square Numbers", "Finding the Square of a Number", "Square Roots"]},
          {"name": "Cubes and Cube Roots", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh106.pdf", "modules": ["Cubes", "Cube Roots"]},
          {"name": "Comparing Quantities", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh107.pdf", "modules": ["Recalling Ratios and Percentages", "Finding Discounts", "Prices Related to Buying and Selling", "Compound Interest"]},
          {"name": "Algebraic Expressions and Identities", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh108.pdf", "modules": ["What are Expressions?", "Terms, Factors and Coefficients", "Multiplication of Algebraic Expressions", "Standard Identities"]},
          {"name": "Mensuration", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh109.pdf", "modules": ["Area of Trapezium", "Area of a General Quadrilateral", "Solid Shapes", "Surface Area", "Volume"]},
          {"name": "Exponents and Powers", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh110.pdf", "modules": ["Powers with Negative Exponents", "Laws of Exponents", "Use of Exponents"]},
          {"name": "Direct and Inverse Proportions", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh111.pdf", "modules": ["Direct Proportion", "Inverse Proportion"]},
          {"name": "Factorisation", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh112.pdf", "modules": ["What is Factorisation?", "Method of Common Factors", "Factorisation using Identities"]},
          {"name": "Introduction to Graphs", "pdfUrl": "https://ncert.nic.in/textbook/pdf/hemh113.pdf", "modules": ["A Bar Graph", "A Pie Graph", "A Histogram", "A Line Graph", "Linear Graphs"]}
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
          {"name": "Matter in Our Surroundings", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iesc101.pdf", "modules": ["Physical Nature of Matter", "Characteristics of Particles of Matter", "States of Matter", "Can Matter Change its State?", "Evaporation"]},
          {"name": "Is Matter Around Us Pure", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iesc102.pdf", "modules": ["What is a Mixture?", "What is a Solution?", "Separating the Components of a Mixture", "Physical and Chemical Changes", "Pure Substances"]},
          {"name": "Atoms and Molecules", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iesc103.pdf", "modules": ["Laws of Chemical Combination", "What is an Atom?", "What is a Molecule?", "Writing Chemical Formulae", "Molecular Mass"]},
          {"name": "Structure of the Atom", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iesc104.pdf", "modules": ["Charged Particles in Matter", "The Structure of an Atom", "Distribution of Electrons", "Valency", "Atomic Number and Mass Number", "Isotopes"]},
          {"name": "The Fundamental Unit of Life", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iesc105.pdf", "modules": ["What are Living Organisms Made Up of?", "What is a Cell Made Up of?", "Cell Organelles"]},
          {"name": "Tissues", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iesc106.pdf", "modules": ["Plant Tissues", "Animal Tissues"]},
          {"name": "Motion", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iesc107.pdf", "modules": ["Describing Motion", "Measuring the Rate of Motion", "Rate of Change of Velocity", "Graphical Representation of Motion", "Equations of Motion"]},
          {"name": "Force and Laws of Motion", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iesc108.pdf", "modules": ["Balanced and Unbalanced Forces", "First Law of Motion", "Inertia and Mass", "Second Law of Motion", "Third Law of Motion"]},
          {"name": "Gravitation", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iesc109.pdf", "modules": ["Gravitation", "Free Fall", "Mass and Weight", "Thrust and Pressure", "Archimedes' Principle"]},
          {"name": "Work and Energy", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iesc110.pdf", "modules": ["Work", "Energy", "Rate of Doing Work"]},
          {"name": "Sound", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iesc111.pdf", "modules": ["Production of Sound", "Propagation of Sound", "Reflection of Sound", "Range of Hearing"]},
          {"name": "Improvement in Food Resources", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iesc112.pdf", "modules": ["Improvement in Crop Yields", "Animal Husbandry"]}
        ]
      },
      {
        "name": "Mathematics",
        "chapters": [
          {"name": "Number Systems", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iemh101.pdf", "modules": ["Irrational Numbers", "Real Numbers and their Decimal Expansions", "Representing Real Numbers on the Number Line", "Operations on Real Numbers"]},
          {"name": "Polynomials", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iemh102.pdf", "modules": ["Polynomials in One Variable", "Zeroes of a Polynomial", "Factorisation of Polynomials", "Algebraic Identities"]},
          {"name": "Coordinate Geometry", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iemh103.pdf", "modules": ["Cartesian System", "Plotting a Point in the Plane if its Coordinates are Given"]},
          {"name": "Linear Equations in Two Variables", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iemh104.pdf", "modules": ["Linear Equations", "Solution of a Linear Equation", "Graph of a Linear Equation in Two Variables", "Equations of Lines Parallel to the x-axis and y-axis"]},
          {"name": "Introduction to Euclid's Geometry", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iemh105.pdf", "modules": ["Euclid's Definitions, Axioms and Postulates", "Equivalent Versions of Euclid's Fifth Postulate"]},
          {"name": "Lines and Angles", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iemh106.pdf", "modules": ["Basic Terms and Definitions", "Intersecting Lines and Non-intersecting Lines", "Pairs of Angles", "Parallel Lines and a Transversal"]},
          {"name": "Triangles", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iemh107.pdf", "modules": ["Congruence of Triangles", "Criteria for Congruence of Triangles", "Some Properties of a Triangle"]},
          {"name": "Quadrilaterals", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iemh108.pdf", "modules": ["Angle Sum Property of a Quadrilateral", "Types of Quadrilaterals", "Properties of a Parallelogram"]},
          {"name": "Circles", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iemh109.pdf", "modules": ["Circles and Its Related Terms", "Angle Subtended by a Chord at a Point", "Perpendicular from the Centre to a Chord", "Circle through Three Points"]},
          {"name": "Heron's Formula", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iemh110.pdf", "modules": ["Area of a Triangle – by Heron's Formula"]},
          {"name": "Surface Areas and Volumes", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iemh111.pdf", "modules": ["Surface Area of a Right Circular Cone", "Surface Area of a Sphere", "Volume of a Cone", "Volume of a Sphere"]},
          {"name": "Statistics", "pdfUrl": "https://ncert.nic.in/textbook/pdf/iemh112.pdf", "modules": ["Graphical Representation of Data"]}
        ]
      }
    ]
  },
  {
    "className": "Class 10",
    "subjects": [
      {
        "name": "Science",
        "chapters": [
          {"name": "Chemical Reactions and Equations", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc101.pdf", "modules": ["Chemical Equations", "Types of Chemical Reactions", "Effects of Oxidation"]},
          {"name": "Acids, Bases and Salts", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc102.pdf", "modules": ["Chemical Properties of Acids and Bases", "Common in All Acids and Bases", "Strength of Acids and Bases", "More about Salts"]},
          {"name": "Metals and Non-metals", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc103.pdf", "modules": ["Physical Properties", "Chemical Properties of Metals", "How do Metals and Non-metals React?", "Occurrence of Metals"]},
          {"name": "Carbon and its Compounds", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc104.pdf", "modules": ["Bonding in Carbon", "Versatile Nature of Carbon", "Chemical Properties of Carbon Compounds", "Some Important Carbon Compounds"]},
          {"name": "Life Processes", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc105.pdf", "modules": ["What are Life Processes?", "Nutrition", "Respiration", "Transportation", "Excretion"]},
          {"name": "Control and Coordination", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc106.pdf", "modules": ["Animals - Nervous System", "Coordination in Plants", "Hormones in Animals"]},
          {"name": "How do Organisms Reproduce?", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc107.pdf", "modules": ["Do Organisms Create Exact Copies of Themselves?", "Modes of Reproduction Used by Single Organisms", "Sexual Reproduction"]},
          {"name": "Heredity", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc108.pdf", "modules": ["Accumulation of Variation during Reproduction", "Heredity"]},
          {"name": "Light - Reflection and Refraction", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc109.pdf", "modules": ["Reflection of Light", "Spherical Mirrors", "Refraction of Light", "Lenses"]},
          {"name": "The Human Eye and the Colourful World", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc110.pdf", "modules": ["Refraction of Light Through a Prism", "Dispersion of White Light by a Glass Prism", "Atmospheric Refraction", "Scattering of Light"]},
          {"name": "Electricity", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc111.pdf", "modules": ["Electric Current and Circuit", "Electric Potential and Potential Difference", "Circuit Diagram", "Ohm's Law", "Factors on which the Resistance of a Conductor Depends"]},
          {"name": "Magnetic Effects of Electric Current", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc112.pdf", "modules": ["Magnetic Field and Field Lines", "Magnetic Field due to a Current-Carrying Conductor", "Force on a Current-Carrying Conductor", "Domestic Electric Circuits"]},
          {"name": "Our Environment", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jesc113.pdf", "modules": ["Eco-system — What are its Components?", "How do our Activities Affect the Environment?"]}
        ]
      },
      {
        "name": "Mathematics",
        "chapters": [
          {"name": "Real Numbers", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh101.pdf", "modules": ["The Fundamental Theorem of Arithmetic", "Revisiting Irrational Numbers"]},
          {"name": "Polynomials", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh102.pdf", "modules": ["Geometrical Meaning of the Zeroes of a Polynomial", "Relationship between Zeroes and Coefficients"]},
          {"name": "Pair of Linear Equations in Two Variables", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh103.pdf", "modules": ["Graphical Method of Solution", "Algebraic Methods of Solving"]},
          {"name": "Quadratic Equations", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh104.pdf", "modules": ["Quadratic Equations", "Solution of a Quadratic Equation by Factorisation", "Nature of Roots"]},
          {"name": "Arithmetic Progressions", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh105.pdf", "modules": ["Arithmetic Progressions", "nth Term of an AP", "Sum of First n Terms of an AP"]},
          {"name": "Triangles", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh106.pdf", "modules": ["Similar Figures", "Similarity of Triangles", "Criteria for Similarity of Triangles"]},
          {"name": "Coordinate Geometry", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh107.pdf", "modules": ["Distance Formula", "Section Formula"]},
          {"name": "Introduction to Trigonometry", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh108.pdf", "modules": ["Trigonometric Ratios", "Trigonometric Ratios of Some Specific Angles", "Trigonometric Identities"]},
          {"name": "Some Applications of Trigonometry", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh109.pdf", "modules": ["Heights and Distances"]},
          {"name": "Circles", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh110.pdf", "modules": ["Tangent to a Circle", "Number of Tangents from a Point on a Circle"]},
          {"name": "Areas Related to Circles", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh111.pdf", "modules": ["Areas of Sector and Segment of a Circle"]},
          {"name": "Surface Areas and Volumes", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh112.pdf", "modules": ["Surface Area of a Combination of Solids", "Volume of a Combination of Solids"]},
          {"name": "Statistics", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh113.pdf", "modules": ["Mean of Grouped Data", "Mode of Grouped Data", "Median of Grouped Data"]},
          {"name": "Probability", "pdfUrl": "https://ncert.nic.in/textbook/pdf/jemh114.pdf", "modules": ["Probability — A Theoretical Approach"]}
        ]
      }
    ]
  }
]

with open('src/data/ncertSyllabus.json', 'w') as f:
    json.dump(syllabus, f, indent=2)

