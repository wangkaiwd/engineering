import os from 'os';

export const getIp = () => {
  const networkInterfaces = os.networkInterfaces();
  return networkInterfaces.en7?.[1].address;
};
