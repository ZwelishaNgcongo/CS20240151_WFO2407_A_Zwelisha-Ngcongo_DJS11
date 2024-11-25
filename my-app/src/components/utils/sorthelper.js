export const formatDate = (date) => new Date(date).toLocaleDateString();
export const sortByTitle = (a, b) => a.title.localeCompare(b.title);
export const sortByDate = (a, b) => new Date(b.updated) - new Date(a.updated);
