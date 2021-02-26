export const mainSentence = (tagObj, initial = false) => {
  const { tag, type } = tagObj;
  const tagL = tag.toLowerCase();
  const ingredient = type === 'ingredient';
  const tagPhrase = ingredient ? `have ${tagL} in them` : `are ${tagL}`;
  const tagFlavors = ingredient ? tagL : `${tagL} flavors`;
  if (initial) {
    return `We are here to find the best cocktail for you. What seperates cocktails the most is the flavor of ${tagL}. Do you like cocktails that ${tagPhrase}?`;
  }
  const phrases = [
    `Some great cocktails ${tagPhrase}, how do you feel about ${tagL} cocktails?`,
    `My favorite cocktails ${tagPhrase}. Are you like me?`,
    `Lets not forget about the importance of ${
      ingredient ? 'including' : 'being'
    } ${tagL}. Would you like a ${tagL} cocktail?`,
    `Many cocktails are also made with ${tagFlavors}. Would you like to include ${tagFlavors}?`,
    `If I made you a ${tagL} cocktail, how would you react?`,
  ];
  return phrases[Math.floor(Math.random() * phrases.length)];
};
