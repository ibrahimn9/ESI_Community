export const years = ["1CP", "2CP", "1CS", "2CS", "3CS"];

export const semesters = ["s1", "s2"];

export const specialities = ["SIW", "ISI"];

export const folders = ["Autres", "Books", "Cours", "EMD", "EXO", "TD"];

export const modules = {
  "1CP": {
    s1: [
      "Algèbre 1",
      "Algorithmique et structures de données statiques",
      "Analyse Mathématique 1",
      "Architecture des ordinateurs 1",
      "Bureautique et Web",
      "Electricité",
      "Introduction au Système d’exploitation 1",
      "TEE",
    ],
    s2: [
      "Algèbre 2",
      "Algorithmique et structures de données dynamiques",
      "Analyse Mathématique 2",
      "Anglais 1",
      "Electronique Fondamentale 1",
      "Mécanique du Point",
      "Introduction au Système d’exploitation 2",
      "TEO",
    ],
  },
  "2CP": {
    s1: [
      "Algèbre 3",
      "Analyse Mathématique 3",
      "Anglais",
      "Structure Fichiers et Structures de Données",
      "Probabilité & Statistiques 1",
      "Electronique fondamentale 2",
      "Economie d'entreprise",
      "Architecture des ordinateura 2",
    ],
    s2: [
      "Analyse Mathématique 4",
      "Anglais",
      "Système d’Information",
      "Logique Mathématique",
      "Optique et ondes",
      "Programmation orientée objet",
      "Probabilité & Statistiques 2",
    ],
  },
  "1CS": {
    s1: [
      "Système d'Exploitation 1",
      "Réseaux 1",
      "Introduction au Génie Logiciel",
      "Bases de Données",
      "Théorie des Langages",
      "Analyse Numérique",
      "Recherche Opérationnelle",
      "Langue Anglaise 1",
    ],
    s2: [
      "Système d'Exploitation 2",
      "Réseaux 2",
      "Architectures Évoluées des Ordinateurs",
      "Analyse et conception des Systèmes d’information",
      "Langages et Outils du Web",
      "Introduction à la Sécurité Informatique",
      "Langue Anglaise 2",
    ],
  },
  "2CS": {
    SIW: {
      s1: [
        "Base de données avancées 1",
        "Technologies et développement web 1",
        "Méthodes de conception avancées",
        "Systèmes d'information avancés",
        "Ingénierie de Connaissances",
        "Interaction Homme Machine",
        "Stage Pratique en Entreprise",
        "Système d'aide à la décision",
        "Qualité de logiciels",
        "Réseau avancées",
        "Analyse et conception des Algorithmes Avancés",
      ],
      s2: [
        "Technologies et développement web 2",
        "Technologies et développement mobile",
        "Intergiciels et services",
        "Administration des Bases de Données",
        "Analyse de données",
        "Ingénierie et management de la Sécurité des systèmes d'information" 
      ]
    },
    ISI: {
      s1: [
        "Systèmes embraqués 1",
        "Réseaux avancés",
        "Bases de données avancées",
        "Analyse et conception des algorithmiques avancés",
        "Intéraction Homme Machine",
        "Ingénierie de Connaissances",
        "Stage Pratique en Entreprise",
      ],
      s2 : [
        "Systèmes répartis",
        "Sécurité des systèmes et des Réseaux",
        "Systèmes embarqués 2",
        "Technologie et développement mobile",
        "Modélisation et simulation",
        "Analyse de données",
      ]
    }
  },
  "3CS": {
    SIW: {
        s1: [
            "Bases de données Avancées 2",
            "Apprentissage Automatique et Fouille de données",
            "Internet des Objets",
            "Web sémantique et web de données",
            "Cloud Computing",
            "Entreprenariat et éthique professionnelle",
            "Système d'information Géographique",
        ],
        s2: []
    },
    ISI: {
        s1: [
            "Internet des objets",
            "Cloud Computing",
            "IA Avancée",
            "Apprentissage Automatique et Fouille de données",
            "Robotique",
            "Système d'information Géographique",
            "Entreprenariat et éthique professionnelle"
        ],
        s2: []
    }
  }
};
