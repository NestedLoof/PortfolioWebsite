const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  
  // Set Nunjucks as the engine for .njk files
  eleventyConfig.setTemplateFormats([
    "md",
    "njk",
    "html",
    "liquid"
  ]);

  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
    autoescape: false,
  });


  // Add a dateToISO filter
  eleventyConfig.addFilter("dateToISO", (date) => {
    return DateTime.fromJSDate(date).toISO();
  });

  // Add a readableDate filter
  eleventyConfig.addFilter("readableDate", (date) => {
    return DateTime.fromJSDate(date).toFormat("d LLLL yyyy");
  });

  eleventyConfig.addPassthroughCopy("./src/css/");
  eleventyConfig.addWatchTarget("./src/css/");

  eleventyConfig.addPassthroughCopy({"src/assets/images": "images"});

  eleventyConfig.addPassthroughCopy("src/js");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addFilter("date", function(date, format) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    return DateTime.fromJSDate(date, {zone: 'utc'}).toFormat(format);
  });

  eleventyConfig.addCollection("tagList", function(collectionApi) {
    const tagsSet = new Set();
    collectionApi.getAll().forEach(item => {
      if ("tags" in item.data) {
        item.data.tags.filter(tag => !["post", "all"].includes(tag)).forEach(tag => tagsSet.add(tag));
      }
    });
    return [...tagsSet].sort();
  });

  eleventyConfig.addCollection("navItems", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/*.md")
  });

  // Update the posts collection
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/blog/posts/*.md").sort((a, b) => b.date - a.date);
  });

  // Update the projects collection
  eleventyConfig.addCollection("projects", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/projects/games/*.md").sort((a, b) => b.date - a.date);
  });

  // Add a new sortedPosts collection
  eleventyConfig.addCollection("sortedPosts", function(collectionApi) {
    return collectionApi.getAll()
      .filter(item => item.url && item.url.startsWith('/blog/'))
      .sort((a, b) => b.date - a.date);
  });
  

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
