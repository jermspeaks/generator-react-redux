export default async () => {
  console.log('build');
  await require('./clean')();
  await require('./copy')();
  await require('./bundle')();
};
