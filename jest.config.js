module.exports = {
    preset: "ts-jest",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.tsx?$": "ts-jest",
    },
    transformIgnorePatterns: ["/node_modules/(?!axios)/"],
  };
  