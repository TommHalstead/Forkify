import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = s => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
}; // This setTimeout function, returns a new promise that will use the reject() function to reject this promise after the designated time has elapsed.

export const AJAX = async function (url, convertedFormData = undefined) {
  try {
    const fetchPro = convertedFormData
      ? fetch(url, {
          method: `POST`,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(convertedFormData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const makeObject = async function (recipeName) {
  return {
    bookmarked: false,
    id: recipeName.id,
    title: recipeName.title,
    publisher: recipeName.publisher,
    sourceUrl: recipeName.source_url,
    image: recipeName.image_url,
    servings: recipeName?.servings,
    cookingTime: recipeName?.cooking_time,
    ingredients: recipeName?.ingredients,
    key: `${!recipeName.key ? `` : recipeName.key}`,
  };
};
