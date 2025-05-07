// Local storage interface for tasks
const STORAGE_KEY = 'tasks_v1';

export function loadTasksFromStorage() {
  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveTasksToStorage(tasks) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
