module.exports = {
   presets: [
      [
         "@babel/preset-env",
         {
            corejs: 3,
            useBuiltIns: "entry",
            targets: [
               "> 5%",
               "not dead"
            ]
         }
      ],
      "@babel/preset-react"
   ],
   plugins: ["babel-plugin-styled-components"]
};
