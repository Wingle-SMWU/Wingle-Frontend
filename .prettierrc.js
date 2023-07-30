const tsOption = {
  arrowParens: "avoid",
  jsxSingleQuote: true,
  bracketSameLine: true,
  singleQuote: true,
  semi: true,
  bracketSpacing: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 100,
  endOfLine: "auto",
  // 뭐 설치해야됨 ㅇㅈ?
  // importOrder: [
  //   "^react$",
  //   "<THIRD_PARTY_MODULES>",
  //   "^@(?:redux|actions|reducer)",
  //   "^@(?:components|pages)(.)$",
  //   "^@(?:apis|config|constants|hoc|hooks|recoil|utility|/)(.)$",
  //   "^[./]",
  // ],
  // plugins: [plugin],
  // importOrderSeparation: true,
  // importOrderSortSpecifiers: true,
};

module.exports = {
  overrides: [
    {
      files: ".{ts,tsx}",
      options: {
        ...tsOption,
      },
    },
    {
      files: ".{js,jsx}",
      options: {
        ...tsOption,
        printWidth: 80,
      },
    },
  ],
};
