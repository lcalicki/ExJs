/*eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_ENV = 'production';

console.log(chalk.green('Generating minified bundle for production. Take Us chance...'));

webpack(webpackConfig).run((err, stats) => {
    if (err) {
        console.log(chalk.red(err));
        return 1;
    }
    const jsonStats = stats.toJason();

    if (jsonStats.hasErrors) {
        return jsonStats.errors.map(error => console.log(chalk.red(error)));
    }
    if (jsonStats.hasWarnings) {
        console.log(chalk.yellow('Webpack generated the following warnings: '));
        jsonStats.warnings.map(warning => console.log(chalk.yellow(warning)));
    }

    console.log(chalk.green('Webpack stats: ${stats}'));

    console.log(chalk.blue('Your app has been built - Yuppi !!!'))

    return 0;
});