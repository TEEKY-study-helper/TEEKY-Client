function randomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function simulateUpload(
  _fileId: string
): Promise<"success" | "error"> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.05 ? "success" : "error");
    }, randomDelay(1000, 2000));
  });
}

export async function simulateLearning(
  _fileId: string
): Promise<"completed" | "error"> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.2 ? "completed" : "error");
    }, randomDelay(1000, 3000));
  });
}

export async function simulateMove(
  _fileIds: string[],
  _targetWeek: number
): Promise<"success" | "error"> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() > 0.2 ? "success" : "error");
    }, randomDelay(1000, 2000));
  });
}

export async function simulateDelete(
  _fileIds: string[]
): Promise<"success"> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("success"), 300);
  });
}
