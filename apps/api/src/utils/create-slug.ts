export function createSlug(text: string): string {
  return text
    .toLowerCase() // Convert to lowercase
    .normalize('NFD') // Normalize the string
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\w\s-]/g, '') // Remove non-word characters
    .trim() // Trim spaces at the beginning and end
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
}

// Example usage:
//const text = "Olá, Mundo! Bem-vindo ao TypeScript.";
//const slug = createSlug(text);
//console.log(slug); // Output: "ola-mundo-bem-vindo-ao-typescript"
