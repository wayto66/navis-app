const awaitFor = async (condition: boolean, secondsToWait: number) => {
  for (let i = 0; i < secondsToWait * 2; i++) {
    if (condition) return true;
    await new Promise((resolve) => setTimeout(() => resolve(3), 500));
  }

  return false;
};

export default awaitFor;
