const getBackgroundImage = category => {
  switch (category) {
    case 1:
      return require("../../assets/background/game/fruit.png");
    case 2:
      return require("../../assets/background/game/animal.png");
    case 3:
      return require("../../assets/background/game/thing.png");
    default:
      return require("../../assets/background/game/fruit.png"); // default case if category doesn't match any known value
  }
};

export default getBackgroundImage;
