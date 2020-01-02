const webpack = require('webpack');
const devMW = require('webpack-dev-middleware');
const hotMW = require("webpack-hot-middleware");
const express = require('express');
const notifier = require('node-notifier');
const config = require('./webpack.config.js');

const app = express();

if (process.env.NODE_ENV === "production") {
   const PORT = process.env.PORT || 80;
   try {
      webpack(config, (err, stats) => {
         if (err) {
            console.error(err.stack || err);
            if (err.details) {
               console.error(err.details);
            }
            return;
         }

         const info = stats.toJson();
         console.log(stats.toString());
         if (stats.hasErrors()) {
            console.error(info.errors);
         }
         if (stats.hasWarnings()) {
            console.warn(info.warnings);
         }

         app.use(express.static('build'));
         app.listen(PORT, () => console.log(`Template listening on port ${PORT}`));
      });
   } catch (err) {
      process.exit(1);
   }
} else {
   const PORT = process.env.PORT || 3000;
   const compiler = webpack(config);

   const server = devMW(compiler, {
      publicPath: config.output.publicPath,
   });

   server.waitUntilValid(() => {
      notifier.notify({
         title: "npm run start:dev",
         message: "Compilation complete",
      });
   });

   app.use(server);
   app.use(hotMW(compiler));

   app.listen(PORT, () => console.log(`Template listening on port ${PORT}`));
}
