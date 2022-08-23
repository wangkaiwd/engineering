export const getPrompts = () => {
  return [
    {
      type: 'checkbox',
      message: 'Select features',
      name: 'features',
      choices: [
        { name: 'Babel', value: 'babel' },
        { name: 'Router', value: 'router' },
        { name: 'Typescript', value: 'typescript' },
      ],
    },
  ];
};
